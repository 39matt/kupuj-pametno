'use server';

import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addProduct(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

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