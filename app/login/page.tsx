'use client';

import { useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const supabase = createClient();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError('Pogrešni podaci za pristup.');
        } else {
            router.refresh();
            setTimeout(() => {
                router.push('/admin');
            }, 100);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
            <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-[#F5A623] p-4 rounded-2xl text-white mb-4">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-center">Admin Pristup</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#F5A623] transition-all text-sm font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Lozinka</label>
                        <input
                            type="password"
                            required
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#F5A623] transition-all text-sm font-medium"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-[10px] font-black uppercase text-center mt-2">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-[#F5A623] transition-all active:scale-95 mt-4"
                    >
                        Uloguj se
                    </button>
                </form>
            </div>
        </div>
    );
}