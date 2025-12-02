import React from 'react';
import { Search, Bell, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className="flex items-center justify-between py-5 px-8 bg-[#2F3E28] dark:bg-olive-800 text-[#F9F8F6] transition-colors duration-300 shadow-md">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-wide text-white">MIXIT</h1>
        <span className="text-sm text-[#C5A66F] font-medium tracking-wide">Бренд-менеджмент</span>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8F9F83] w-4 h-4 group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Поиск..." 
            className="bg-[#3A4B32] dark:bg-olive-900 text-white pl-10 pr-4 py-2.5 rounded-full text-sm border border-transparent focus:border-[#C5A66F] focus:outline-none w-64 transition-all placeholder:text-[#8F9F83]"
          />
        </div>

        {/* Date */}
        <span className="text-[#E0E0E0] text-sm hidden lg:block font-medium">
          суббота, 22 ноября 2025 г.
        </span>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="relative w-14 h-7 rounded-full bg-[#3A4B32] dark:bg-olive-900 border border-[#4A5D43] dark:border-olive-700 transition-colors shadow-inner flex items-center px-1"
          title={isDarkMode ? "Включить светлую тему" : "Включить темную тему"}
        >
          <div className={`absolute w-5 h-5 rounded-full bg-gradient-to-br from-[#C5A66F] to-[#E5E0D8] shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDarkMode ? 'translate-x-7' : 'translate-x-0'}`}>
             {isDarkMode ? <Moon className="w-3 h-3 text-[#2F3E28]" /> : <Sun className="w-3 h-3 text-[#2F3E28]" />}
          </div>
        </button>

        {/* Notification */}
        <div className="relative cursor-pointer p-2 hover:bg-[#3A4B32] dark:hover:bg-olive-700 rounded-full transition-colors">
          <Bell className="text-[#C5A66F] w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#2F3E28]"></span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-[#3A4B32] dark:hover:bg-olive-700 py-1 px-2 rounded-full transition-colors border border-transparent hover:border-[#8F9F83]/30">
          <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-[#C5A66F] to-[#8F9F83]">
             <img 
               src="https://picsum.photos/100/100" 
               alt="User" 
               className="rounded-full w-full h-full object-cover border-2 border-[#2F3E28]"
             />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-semibold text-white leading-tight">Мария Беленцова</span>
            <span className="text-xs text-[#C5A66F]">CEO, Mixit</span>
          </div>
        </div>
      </div>
    </header>
  );
};