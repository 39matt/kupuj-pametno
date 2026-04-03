'use server';

import { revalidatePath } from "next/cache";
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { createClient } from '@/app/utils/supabase/server';

interface OrderFormData {
    full_name: string;
    phone: string;
    address: string;
    city: string;
    zip_code: string;
    email: string;
    note?: string;
}

interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface ActionResponse {
    success: boolean;
    message: string;
    orderId?: string;
}

export async function createOrder(
    formDataObj: OrderFormData,
    cartItems: CartItem[],
    total: number
): Promise<ActionResponse> {

    const supabaseAdmin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    try {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .insert([{
                customer_name: formDataObj.full_name,
                customer_phone: formDataObj.phone,
                address: formDataObj.address,
                city: formDataObj.city,
                zip_code: formDataObj.zip_code,
                email: formDataObj.email,
                items: cartItems,
                total_price: total,
                note: formDataObj.note || ""
            }])
            .select('id')
            .single();

        if (error) {
            return {
                success: false,
                message: error.message
            };
        }

        return {
            success: true,
            message: 'Porudžbina uspešno kreirana!',
            orderId: data?.id
        };

    } catch (err: unknown) {
        const errorMessage = err instanceof Error
            ? err.message
            : "Došlo je do neočekivane greške pri kreiranju porudžbine.";

        return {
            success: false,
            message: errorMessage
        };
    }
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (error) {
            return { success: false, message: error.message };
        }

        revalidatePath('/admin');
        return { success: true, message: `Status promenjen u ${newStatus}` };
    } catch (err: unknown) {
        return {
            success: false,
            message: err instanceof Error ? err.message : "Greška pri ažuriranju statusa"
        };
    }
}