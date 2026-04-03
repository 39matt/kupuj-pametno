import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
// app/utils/supabase/middleware.ts

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request: { headers: request.headers },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!, // Proveri ime env varijable
        {
            cookies: {
                getAll() { return request.cookies.getAll() },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request: { headers: request.headers },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    await supabase.auth.getUser()

    const { data: { user } } = await supabase.auth.getUser()

    if (request.nextUrl.pathname.startsWith('/admin')) {
        console.log("Pokušaj pristupa: ", user?.email);

        const adminEmails = ['luka@gmail.com', 'adnectmarketing@gmail.com'];

        const isAllowed = user && adminEmails.includes(user.email?.toLowerCase() || '');

        if (!isAllowed) {
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            url.searchParams.set('error', 'unauthorized')
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}