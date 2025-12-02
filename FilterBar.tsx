import React from 'react';
import { CategoryFilter, TimeFilter } from '../types';

interface FilterBarProps {
  activeCategory: CategoryFilter;
  setCategory: (c: CategoryFilter) => void;
  activeTime: TimeFilter;
  setTime: (t: TimeFilter) => void;
}

const CATEGORIES: CategoryFilter[] = ['Все', 'Лицо', 'Тело', 'Волосы', 'Макияж', 'Дом и гигиена'];
const TIMES: TimeFilter[] = ['День', 'Неделя', 'Месяц'];

export const FilterBar: React.FC<FilterBarProps> = ({ 
  activeCategory, setCategory, activeTime, setTime 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-4 mb-2">
      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar items-center">
        <span className="text-xs font-bold text-[#8F9F83] uppercase tracking-wider mr-2">Категории:</span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border
              ${activeCategory === cat 
                ? 'bg-[#2F3E28] dark:bg-gold-500 text-white dark:text-olive-900 border-[#2F3E28] dark:border-gold-500 shadow-md' 
                : 'bg-white dark:bg-olive-800 text-[#5D5D5D] dark:text-[#A3B19A] border-[#E5E0D8] dark:border-olive-700 hover:border-[#8F9F83] hover:text-[#2F3E28] dark:hover:text-white'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Time Toggle */}
      <div className="flex items-center gap-1 bg-white dark:bg-olive-800 p-1 rounded-full border border-[#E5E0D8] dark:border-olive-700 shadow-sm transition-colors">
         {TIMES.map(time => (
            <button
               key={time}
               onClick={() => setTime(time)}
               className={`
                 px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200
                 ${activeTime === time 
                 ? 'bg-[#8F9F83] text-white shadow-sm' 
                 : 'text-[#5D5D5D] dark:text-[#A3B19A] hover:bg-[#F2F0EB] dark:hover:bg-olive-700'
               }`}
            >
               {time}
            </button>
         ))}
      </div>
    </div>
  );
};