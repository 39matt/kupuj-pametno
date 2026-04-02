const ToolHighlight = () => {
    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 my-16 px-6">
            <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-800 flex items-center">
                    <img src="/trimmer-icon.png" className="w-10 mr-2" /> Pravi alat!
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                    Kvalitetni <span className="text-orange-500 font-bold">baštenski alati</span> mogu značajno olakšati održavanje...
                </p>
                {/* Further text with specific word highlights */}
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="border rounded-lg p-4 bg-white flex justify-between items-center">
                    <img src="/trimmer.jpg" className="w-1/2" />
                    <div className="text-right">
                        <span className="text-red-500 font-bold">SNIŽENO</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolHighlight;