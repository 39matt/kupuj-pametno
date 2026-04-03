import { Truck, Image as ImageIcon, Zap } from 'lucide-react';

export default function TrustUrgency() {
    const badges = [
        {
            icon: <Truck className="text-[#F5A623]" size={24} />,
            title: "Pregled pre slanja",
            text: "Svaki artikal prolazi kroz rigoroznu kontrolu kvaliteta pre nego što napusti naš magacin."
        },
        {
            icon: <ImageIcon className="text-[#F5A623]" size={24} />,
            title: "100% kao na slici",
            text: "Bez skrivenih mana"
        },
        {
            icon: <Zap className="text-[#F5A623]" size={24} />,
            title: "Ekspresna dostava",
            text: "Na vašoj adresi za 1-2 dana"
        }
    ];

    return (
        <div className="flex flex-col gap-3 my-6 font-sans">
            {/* Trust Badges */}
            {badges.map((badge, index) => (
                <div
                    key={index}
                    className="flex items-start gap-4 p-4 border-2 border-dashed border-[#22C55E]/40 rounded-2xl bg-[#F0FDF4]/50"
                >
                    <div className="shrink-0 mt-1">
                        {badge.icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-[#15803D] text-sm md:text-base">
                            {badge.title}
                        </h4>
                        <p className="text-gray-600 text-xs md:text-sm leading-snug">
                            {badge.text}
                        </p>
                    </div>
                </div>
            ))}

            {/* Urgency Box (Stock) */}
            <div className="flex items-center gap-3 p-4 bg-[#FEF2F2] border border-[#FEE2E2] rounded-2xl text-[#991B1B]">
                <div className="w-3 h-3 bg-[#EF4444] rounded-full animate-pulse shrink-0" />
                <p className="text-sm md:text-base font-medium">
                    <span className="font-black uppercase tracking-tight">Požurite!</span> Ostalo je još samo <span className="font-black border-b-2 border-[#991B1B]">14 komada</span> na zalihama zbog velike potražnje.
                </p>
            </div>
        </div>
    );
}