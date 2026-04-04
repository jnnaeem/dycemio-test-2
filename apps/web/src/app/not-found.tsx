import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a1a10]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/images/404-bg.png')" }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a1a10] via-transparent to-[#0a1a10]/50" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl">
        <h1 className="text-white text-3xl md:text-4xl font-black tracking-widest mb-4 uppercase">
          Page Not Found
        </h1>
        
        <p className="text-gray-300 text-base md:text-lg mb-10 leading-relaxed max-w-lg">
          Looks like this page has vanished into thin air... or maybe it's part of a bigger strategy. 
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link 
          href="/"
          className="px-8 py-3 bg-[#4ade80] hover:bg-[#22c55e] text-[#0a1a10] font-bold rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(74,222,128,0.3)] uppercase tracking-wider"
        >
          Go Back Home
        </Link>
      </div>

      {/* Subtle particles or glow effects can be added here with CSS if needed */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4ade80]/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
