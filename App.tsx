import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { FilterBar } from './components/FilterBar';
import { KPICard } from './components/KPICard';
import { ChartsSection } from './components/ChartsSection';
import { GOPerformanceTable } from './components/GOPerformanceTable';
import { GeminiAnalysis } from './components/GeminiAnalysis';
import { KPI_DATA } from './constants';
import { CategoryFilter, TimeFilter, NavTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('Пульс');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Все');
  const [activeTime, setActiveTime] = useState<TimeFilter>('Месяц');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[#F9F8F6] dark:bg-olive-900 text-[#2C2C2C] dark:text-[#E0E0E0] font-sans selection:bg-[#C5A66F]/30 transition-colors duration-300">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        <main className="max-w-[1920px] mx-auto">
          <Navigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          
          <FilterBar 
            activeCategory={activeCategory} 
            setCategory={setActiveCategory}
            activeTime={activeTime}
            setTime={setActiveTime}
          />

          <div className="px-6 pb-6">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {KPI_DATA.map((metric) => (
                <KPICard key={metric.id} metric={metric} />
              ))}
            </div>

            {/* AI Insights Section */}
            <div className="mt-8">
               <GeminiAnalysis />
            </div>

            {/* Charts Section */}
            <ChartsSection />

            {/* GO Performance Table */}
            <GOPerformanceTable />
          </div>
        </main>
      </div>
    </div>
  );
}