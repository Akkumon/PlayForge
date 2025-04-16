export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg transform rotate-45"></div>
        <div className="absolute inset-[2px] bg-[#0a0118] rounded-lg transform rotate-45 flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-blue-500 transform -rotate-45"></div>
        </div>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
        PlayForge
      </span>
    </div>
  );
} 