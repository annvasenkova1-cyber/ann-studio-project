import React from 'react';
import { NavTab } from '../types';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const TABS: NavTab[] = [
  'Пульс', 'Продажи', 'Продвижение', 'Ассортимент', 'Новинки', 'Планирование'
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-[#2F3E28] dark:bg-olive-800 px-8 pb-6 pt-2 overflow-x-auto rounded-b-3xl shadow-lg shadow-[#2F3E28]/10 dark:shadow-black/20 mb-6 transition-colors duration-300">
      <div className="flex gap-2 min-w-max">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${activeTab === tab 
                ? 'bg-[#C5A66F] text-[#2F3E28] shadow-md transform scale-105 font-bold' 
                : 'bg-[#3A4B32] dark:bg-olive-900 text-[#A3B19A] hover:bg-[#4A5D43] hover:text-white'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
};