import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { generateDashboardInsights } from '../services/geminiService';
import { KPI_DATA } from '../constants';

export const GeminiAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await generateDashboardInsights(KPI_DATA, "Конец месяца, фокус на удержание маржинальности.");
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="mx-6 mb-6">
      <div className="bg-gradient-to-r from-[#8F9F83]/20 to-[#C5A66F]/10 dark:from-olive-800 dark:to-gold-600/10 rounded-2xl border border-[#8F9F83]/30 dark:border-olive-600 p-8 relative overflow-hidden shadow-sm transition-colors duration-300">
        {/* Decorative background element */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#C5A66F]/20 dark:bg-gold-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white dark:bg-olive-900 rounded-full shadow-sm">
                 <Sparkles className="w-5 h-5 text-[#C5A66F]" />
            </div>
            <div>
                 <h3 className="text-xl font-bold text-[#2F3E28] dark:text-white">AI Ассистент Бренд-директора</h3>
                 <p className="text-sm text-[#5D5D5D] dark:text-[#A3B19A]">Анализ стратегических показателей</p>
            </div>
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#2F3E28] hover:bg-[#3A4B32] dark:bg-gold-500 dark:text-olive-900 dark:hover:bg-gold-600 text-white rounded-full text-sm font-semibold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {analysis ? 'Обновить анализ' : 'Сгенерировать инсайты'}
          </button>
        </div>

        {analysis && (
          <div className="bg-white/60 dark:bg-olive-900/60 backdrop-blur-sm rounded-xl p-6 border border-[#E5E0D8] dark:border-olive-700 relative z-10">
             <div className="prose prose-sm max-w-none text-[#2C2C2C] dark:text-[#E0E0E0]">
                <div dangerouslySetInnerHTML={{ __html: analysis }} />
             </div>
          </div>
        )}
        
        {!analysis && !loading && (
            <p className="text-[#5D5D5D] dark:text-[#A3B19A] text-sm relative z-10 bg-white/40 dark:bg-black/20 inline-block px-3 py-1 rounded-lg">
                Нажмите кнопку, чтобы получить стратегическую сводку по текущим показателям с помощью Gemini 2.5 Flash.
            </p>
        )}
      </div>
    </div>
  );
};