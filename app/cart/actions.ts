'use server';

import { createClient } from '@/app/utils/supabase/server';
import {revalidatePath} from "next/cache";

// Tip za podatke iz forme
interface OrderFormData {
    full_name: string;
    phone: string;
    address: string;
    city: string;
    zip_code: string;
    email: string;
    note?: string;
}

// Tip za stavku u korpi (prilagodi svojim poljima)
interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

// Tip za odgovor akcije
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
    const supabase = await createClient();

    try {
        const { data } = await supabase
            .from('orders')
            .insert([{
                customer_name: formDataObj.full_name,
                customer_phone: formDataObj.phone,
                address: formDataObj.address,
                city: formDataObj.city,
                zip_code: formDataObj.zip_code,
                email: formDataObj.email,
                items: cartItems, // JSONB kolona prihvata niz objekata
                total_price: total,
                note: formDataObj.note || ""
            }])
            .select('id')
            .single();

        return {
            success: true,
            message: 'Porudžbina uspešno kreirana!',
            orderId: data?.id
        };

    } catch (err: unknown) {
        // Handle nepoznate greške bez 'any'
        const errorMessage = err instanceof Error
            ? err.message
            : "Došlo je do neočekivane greške pri kreiranju porudžbine.";

        console.error("Order Creation Error:", err);

        return {
            success: false,
            message: errorMessage
        };
    }
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
    const supabase = await createClient();

    try {
        await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        revalidatePath('/admin');
        return { success: true, message: `Status promenjen u ${newStatus}` };
    } catch (err: unknown) {
        return {
            success: false,
            message: err instanceof Error ? err.message : "Greška pri ažuriranju statusa"
        };
    }
}