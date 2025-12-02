import React, { useEffect, useState } from 'react';
import { X, Wallet, TrendingUp, TrendingDown, Sparkles, Loader2 } from 'lucide-react';
import { GOPerformanceData, KPClientData } from '../types';
import { generateKPInsight } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface KPDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GOPerformanceData | null;
}

export const KPDetailsModal: React.FC<KPDetailsModalProps> = ({ isOpen, onClose, data }) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && data && !aiInsight) {
      setIsGenerating(true);
      generateKPInsight(data).then(text => {
        setAiInsight(text);
        setIsGenerating(false);
      });
    }
  }, [isOpen, data, aiInsight]);

  if (!isOpen || !data) return null;

  const isPositiveAvg = (data.avgKpPerUnitChange || 0) >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#2F3E28]/60 dark:bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-5xl bg-[#F9F8F6] dark:bg-olive-900 rounded-2xl shadow-2xl border border-[#E5E0D8] dark:border-olive-700 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E0D8] dark:border-olive-700 bg-[#2F3E28] dark:bg-olive-800">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-[#F9F8F6]/20 rounded-lg">
                <Wallet className="w-6 h-6 text-[#C5A66F]" />
             </div>
             <div>
                <h3 className="text-xl font-bold text-white">Детализация Коммерческой Прибыли (КП)</h3>
                <p className="text-[#A3B19A] text-sm">Группа: <span className="text-white font-semibold">{data.name}</span></p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#3A4B32] dark:hover:bg-olive-700 rounded-full text-[#A3B19A] hover:text-white">
             <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#F9F8F6] dark:bg-olive-900 p-6">
           {/* Top Metrics */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-olive-800 p-6 rounded-2xl border border-[#E5E0D8] dark:border-olive-700 shadow-sm">
                  <span className="text-[#5D5D5D] dark:text-[#A3B19A] text-sm font-semibold block mb-1">Общая КП</span>
                  <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[#2C2C2C] dark:text-[#E0E0E0]">{data.kp} млн ₽</span>
                      <span className="text-[#4A6741] dark:text-[#8F9F83] text-sm font-bold">{data.kpChange}</span>
                  </div>
              </div>
              <div className="bg-white dark:bg-olive-800 p-6 rounded-2xl border border-[#E5E0D8] dark:border-olive-700 shadow-sm">
                  <span className="text-[#5D5D5D] dark:text-[#A3B19A] text-sm font-semibold block mb-1">КП Рентабельность</span>
                  <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[#2C2C2C] dark:text-[#E0E0E0]">{data.kpPercent}</span>
                      <span className="text-[#8F9F83] text-xs font-medium">от выручки</span>
                  </div>
              </div>
              <div className="bg-white dark:bg-olive-800 p-6 rounded-2xl border border-[#E5E0D8] dark:border-olive-700 shadow-sm">
                  <span className="text-[#5D5D5D] dark:text-[#A3B19A] text-sm font-semibold block mb-1">Средняя КП на 1 шт.</span>
                  <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[#2C2C2C] dark:text-[#E0E0E0]">{data.avgKpPerUnit} ₽</span>
                      <div className={`flex items-center text-sm font-bold ${isPositiveAvg ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                         {isPositiveAvg ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                         {Math.abs(data.avgKpPerUnitChange || 0)}%
                      </div>
                  </div>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
               {/* Left: Client List */}
               <div className="lg:col-span-1 flex flex-col h-full bg-white dark:bg-olive-800 rounded-2xl border border-[#E5E0D8] dark:border-olive-700 overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-[#E5E0D8] dark:border-olive-700 bg-[#F9F8F6] dark:bg-olive-900">
                     <h4 className="font-bold text-[#2F3E28] dark:text-[#E0E0E0] text-sm">Рейтинг клиентов по КП (абс.)</h4>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                     {data.kpDetailsClients?.map((client, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 hover:bg-[#F2F0EB] dark:hover:bg-olive-700 rounded-xl transition-colors group">
                           <div>
                              <div className="flex items-center gap-2">
                                 <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${idx < 3 ? 'bg-[#C5A66F] text-white' : 'bg-[#E5E0D8] dark:bg-olive-600 text-[#5D5D5D] dark:text-[#E0E0E0]'}`}>
                                    {idx + 1}
                                 </span>
                                 <span className="text-sm text-[#2C2C2C] dark:text-[#E0E0E0] font-semibold">{client.name}</span>
                              </div>
                              <div className="flex gap-2 mt-1 ml-8">
                                 <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${client.channel === 'Online' ? 'bg-[#8F9F83]/20 text-[#4A6741] dark:text-[#8F9F83]' : 'bg-[#BC6C6C]/20 text-[#A05E5E] dark:text-[#E08A8A]'}`}>
                                    {client.channel}
                                 </span>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="text-[#2C2C2C] dark:text-[#E0E0E0] font-bold text-sm">{client.kpValue}M</div>
                              <div className="text-xs text-[#8F9F83]">{client.kpPerUnit} ₽/шт</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Right: Charts & AI */}
               <div className="lg:col-span-2 flex flex-col gap-6 h-full">
                  {/* Chart */}
                  <div className="bg-white dark:bg-olive-800 rounded-2xl border border-[#E5E0D8] dark:border-olive-700 p-6 h-[320px] shadow-sm">
                      <h4 className="font-bold text-[#2F3E28] dark:text-[#E0E0E0] text-sm mb-4">Динамика КП: Онлайн vs Офлайн (6 мес)</h4>
                      <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={data.kpDetailsTrend} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" strokeOpacity={0.2} vertical={false} />
                            <XAxis dataKey="month" stroke="#8F9F83" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#8F9F83" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                               contentStyle={{ backgroundColor: 'var(--tooltip-bg, #FFFFFF)', border: '1px solid #E5E0D8', borderRadius: '12px', color: '#2C2C2C', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                            />
                            <Legend verticalAlign="top" height={36} />
                            <Line type="monotone" dataKey="onlineKP" name="Онлайн (МП)" stroke="#2F3E28" className="dark:stroke-[#8F9F83]" strokeWidth={3} dot={{ r: 4, fill: 'currentColor' }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="offlineKP" name="Офлайн (Сети)" stroke="#C5A66F" strokeWidth={3} dot={{ r: 4, fill: '#C5A66F' }} activeDot={{ r: 6 }} />
                         </LineChart>
                      </ResponsiveContainer>
                  </div>

                  {/* AI Insight */}
                  <div className="flex-1 bg-gradient-to-br from-[#8F9F83]/10 to-[#C5A66F]/10 dark:from-olive-700 dark:to-gold-900/20 rounded-2xl border border-[#8F9F83]/30 dark:border-olive-600 p-6 relative overflow-hidden shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                         <Sparkles className="w-5 h-5 text-[#C5A66F]" />
                         <h4 className="font-bold text-[#2F3E28] dark:text-[#E0E0E0]">AI Анализ рентабельности</h4>
                      </div>
                      
                      {isGenerating ? (
                          <div className="flex items-center gap-2 text-[#5D5D5D] dark:text-[#A3B19A] text-sm animate-pulse mt-4">
                             <Loader2 className="w-4 h-4 animate-spin text-[#2F3E28] dark:text-[#E0E0E0]" />
                             Анализирую структуру прибыли...
                          </div>
                      ) : (
                          <div className="prose prose-sm text-[#2C2C2C] dark:text-[#E0E0E0] leading-relaxed [&_strong]:text-[#2F3E28] dark:[&_strong]:text-[#C5A66F]">
                             <div dangerouslySetInnerHTML={{ __html: aiInsight || 'Нет данных' }} />
                          </div>
                      )}
                      
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C5A66F]/20 dark:bg-gold-500/10 blur-3xl rounded-full pointer-events-none"></div>
                  </div>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};