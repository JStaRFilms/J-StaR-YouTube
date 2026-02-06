import { Img, staticFile } from 'remotion';

export const UglyPage: React.FC = () => {
    return (
        <div className="w-full h-full bg-[#e5e5e5] overflow-y-auto font-sans text-black">
            {/* Bad Header */}
            <div className="bg-blue-600 p-4 flex justify-between items-center border-b-4 border-black">
                <h1 className="text-3xl font-bold text-white tracking-tighter" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
                    WELCOME TO OUR WEBSITE!!
                </h1>
                <div className="flex space-x-2">
                    <button className="bg-green-500 text-white p-2 border-2 border-white rounded-none hover:bg-green-600 transition-none">
                        Home
                    </button>
                    <button className="bg-red-500 text-yellow-300 p-2 border-2 border-dashed border-white rounded-none">
                        About Us
                    </button>
                </div>
            </div>

            {/* Hero Section with clashing colors and bad alignment */}
            <div className="p-8 bg-[#ffff00] flex flex-col md:flex-row items-start space-y-4 md:space-y-0 relative">
                <div className="w-full md:w-1/2 p-4 border-2 border-red-500 bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-4xl text-red-600 mb-2 italic underline decoration-blue-500">
                        We are the #1 solution <br /> for your needs!!!!
                    </h2>
                    <p className="text-sm text-gray-600 leading-3 mb-6">
                        Providing  quality   services since 2002. <br />
                        Call us today for a FREE QUOTE.
                    </p>
                    <div className="flex space-x-1">
                        <button className="bg-red-600 text-white text-2xl font-bold px-8 py-4 animate-bounce">
                            CLICK HERE NOW
                        </button>
                        <button className="bg-green-600 text-white text-xs px-2 py-1">
                            (or dont)
                        </button>
                    </div>
                </div>

                {/* Bad Stock Photo - User Provided */}
                <div className="w-full md:w-1/2 h-64 border-4 border-dotted border-purple-500 flex items-center justify-center relative ml-[-20px] mt-[40px] z-10 overflow-hidden">
                    <Img
                        src={staticFile('assets/br07_vanilla_ai_cringe/Gemini_Generated_Image_dso1qndso1qndso1.png')}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Content Columns with bad text flow */}
            <div className="p-4 grid grid-cols-3 gap-1">
                <div className="bg-white p-2 border border-gray-400">
                    <h3 className="text-xl text-purple-700 mb-10">Services</h3>
                    <p className="text-justify text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
                <div className="bg-blue-100 p-6 border-l-8 border-blue-800">
                    <h3 className="text-lg text-blue-900 text-right">Why Us?</h3>
                    <ul className="list-disc pl-5 text-red-700">
                        <li>Fast</li>
                        <li>Cheap</li>
                        <li>Good</li>
                    </ul>
                </div>
                <div className="bg-pink-200 p-1 text-center">
                    <h3 className="text-3xl text-green-800 font-serif">TESTIMONIALS</h3>
                    <p className="text-[10px]">"They did a thing" - Bob</p>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-black text-white text-center p-10 mt-4">
                <p>© 1998 Your Company Name. All Rights Reserved. <a href="#" className="text-blue-500 underline">Email Webmaster</a></p>
                <div className="flex justify-center space-x-2 mt-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">f</div>
                    <div className="w-8 h-8 bg-sky-400 rounded-sm flex items-center justify-center">t</div>
                </div>
            </div>
        </div>
    );
};
