'use server';

import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import {SupabaseClient} from "@supabase/supabase-js";

async function checkAuth(supabase: SupabaseClient) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("Unauthorized");
    }
    return user;
}

export async function addProduct(formData: FormData) {
    const supabase = await createClient();
    await checkAuth(supabase);

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const oldPrice = parseFloat(formData.get('oldPrice') as string);
    const discountPercentage = parseInt(formData.get('discountPercentage') as string);
    const isFeatured = formData.get('isFeatured') === 'on';

    const imageFiles = formData.getAll('images') as File[];
    const uploadedUrls: string[] = [];

    for (const file of imageFiles) {
        if (file.size === 0) continue;

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (uploadError) {
            return { success: false, message: `Greška pri uploadu slike: ${uploadError.message}` };
        }

        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
    }

    const { error } = await supabase
        .from('products')
        .insert([
            {
                name,
                description,
                price,
                oldPrice,
                discountPercentage,
                isFeatured,
                imageUrls: uploadedUrls
            }
        ]);

    if (error) {
        return { success: false, message: `Baza Error: ${error.message}` };
    }

    revalidatePath('/');
    return { success: true, message: 'Proizvod i slike uspešno dodati!' };
}

export async function deleteProduct(id: string) {
    const supabase = await createClient();
    await checkAuth(supabase);

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) return { success: false, message: error.message };

    revalidatePath('/admin');
    return { success: true, message: "Proizvod obrisan" };
}

async function uploadImages(supabase: SupabaseClient, files: File[]) {
    const uploadedUrls: string[] = [];
    for (const file of files) {
        if (file.size === 0) continue;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName);
        uploadedUrls.push(publicUrl);
    }
    return uploadedUrls;
}

export async function updateProduct(id: string, formData: FormData) {
    const supabase = await createClient();
    try {
        await checkAuth(supabase);

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const oldPrice = parseFloat(formData.get('oldPrice') as string);
        const discountPercentage = parseInt(formData.get('discountPercentage') as string);
        const isFeatured = formData.get('isFeatured') === 'on';

        const newImageFiles = formData.getAll('images') as File[];
        const uploadedUrls = await uploadImages(supabase, newImageFiles);

        const existingUrlsInput = formData.get('existingImageUrls') as string;
        const existingUrls = existingUrlsInput ? existingUrlsInput.split(',') : [];

        const finalImageUrls = [...existingUrls, ...uploadedUrls];

        await supabase
            .from('products')
            .update({
                name, description, price, oldPrice,
                discountPercentage, isFeatured, imageUrls: finalImageUrls
            })
            .eq('id', id);

        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true, message: 'Proizvod uspešno ažuriran!' };
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Došlo je do nepoznate greške";
        return { success: false, message: errorMessage };
    }
}