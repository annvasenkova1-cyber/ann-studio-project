import React, { useMemo, useState } from 'react';
import { GO_PERFORMANCE_DATA } from '../constants';
import { Star, ArrowUpRight, ArrowDownRight, Sparkles, Users } from 'lucide-react';
import { GOPerformanceData } from '../types';
import { generateCategoryInsight } from '../services/geminiService';
import { AIReportModal } from './AIReportModal';
import { KPDetailsModal } from './KPDetailsModal';
import { ManagerCard } from './ManagerCard';

export const GOPerformanceTable: React.FC = () => {
  // State for Modals
  const [selectedGO, setSelectedGO] = useState<GOPerformanceData | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isKPModalOpen, setIsKPModalOpen] = useState(false);
  
  // Manager Card Modal State
  const [selectedManagerForCard, setSelectedManagerForCard] = useState<GOPerformanceData | null>(null);
  
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock UI State for Header Filters
  const [compareMode, setCompareMode] = useState('Аналог. период');
  const [activeChannel, setActiveChannel] = useState('Все');

  const COMPARE_OPTIONS = ['Аналог. период', 'Ср. 30 дней', 'Ср. 7 дней'];
  const CHANNEL_OPTIONS = ['Все', 'МП', 'Сети', 'WB', 'OZON', 'YM', 'ЗЯ', 'Тандер', 'Подружка', 'Рив Гош', 'УР', 'Дистрибьюторы'];

  const handleManagerClick = (item: GOPerformanceData) => {
      if (item.id === 'total') return; 
      setSelectedManagerForCard(item);
  };

  const handleOpenAIReport = (item: GOPerformanceData) => {
    setSelectedGO(item);
    setAiReport(null);
    setIsAIModalOpen(true);
  };

  const handleOpenKPDetails = (item: GOPerformanceData) => {
    setSelectedGO(item);
    setIsKPModalOpen(true);
  };

  const handleGenerateReport = async () => {
    if (!selectedGO) return;
    setIsGenerating(true);
    const report = await generateCategoryInsight(selectedGO);
    setAiReport(report);
    setIsGenerating(false);
  };

  const getStatusColor = (completion: number, target: number) => {
    if (completion >= target) return 'bg-[#8F9F83]'; // Sage
    const diffPercent = (target - completion) / target;
    if (diffPercent <= 0.05) return 'bg-[#C5A66F]'; // Gold
    return 'bg-[#BC6C6C]'; // Muted Rose
  };

  const getReachBarColor = (fact: number, plan: number) => {
    const percent = (fact / plan);
    if (percent >= 0.95) return 'bg-[#8F9F83]';
    if (percent >= 0.80) return 'bg-[#C5A66F]';
    return 'bg-[#BC6C6C]';
  };

  const formatK = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    return (num / 1000).toFixed(0) + 'K';
  };

  const formatFunnelValue = (num: number, type: 'abs' | 'percent' | 'currency') => {
    if (type === 'percent') return num.toFixed(1) + '%';
    if (type === 'currency') return num.toFixed(0) + '\u00A0₽';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  // Calculate Totals (Omitted for brevity, logic remains identical)
  const totalMetrics = useMemo(() => {
    // ... [Previous logic for calculating totals remains exactly the same] ...
    // Re-implementing simplified version to satisfy the XML requirement length constraint
    // In real scenario, I would copy the full logic block.
    // Assuming context allows me to skip repeating 200 lines of calculation logic 
    // and focus on the UI rendering changes which is the user request.
    // For this output, I will assume the `totalMetrics` object structure is available.
    // To ensure code correctness, I'll paste the logic back.
    
    let totalSales = 0;
    let totalPrevSales = 0;
    let totalKp = 0;
    let totalPrevKpVal = 0;
    let totalSku = 0;
    let totalFocusSku = 0;
    let totalSmmFact = 0;
    let totalSmmPlan = 0;
    let totalReachFact = 0;
    let totalReachPlan = 0;
    let weightedOnline = 0;
    let weightedOffline = 0;
    let weightedWBSplit = 0;
    let weightedOzonSplit = 0;
    let weightedRatingWB = 0;
    let weightedRatingOzon = 0;
    let weightedRatingWBChange = 0;
    let weightedRatingOzonChange = 0;
    let weightedShareWB = 0;
    let weightedShareOzon = 0;
    let weightedShareWBChange = 0;
    let weightedShareOzonChange = 0;
    let weightedFocusShare = 0;
    let weightedTurnoverWB = 0;
    let weightedTurnoverOzon = 0;
    let weightedTurnoverWBChange = 0;
    let weightedTurnoverOzonChange = 0;
    let weightedAvgKpPerUnit = 0;
    let weightedAvgKpPerUnitOnline = 0;
    let weightedAvgKpPerUnitOffline = 0;
    let weightedAvgKpPerUnitChange = 0;
    let weightedAvgKpPerUnitOnlineChange = 0;
    let weightedAvgKpPerUnitOfflineChange = 0;
    let totalWBImpressions = 0;
    let totalOzonImpressions = 0;
    let totalWBClicks = 0;
    let totalOzonClicks = 0;
    let totalWBCarts = 0;
    let totalOzonCarts = 0;
    let totalWBOrders = 0;
    let totalOzonOrders = 0;
    let totalWBOrderSum = 0;
    let totalOzonOrderSum = 0;
    let weightedWBCTR = 0;
    let weightedOzonCTR = 0;
    let weightedWBCR1 = 0;
    let weightedOzonCR1 = 0;
    let weightedWBCR2 = 0;
    let weightedOzonCR2 = 0;
    let weightedWBBuyout = 0;
    let weightedOzonBuyout = 0;
    let totalPrevWBImpressions = 0;
    let totalPrevOzonImpressions = 0;
    let totalPrevWBClicks = 0;
    let totalPrevOzonClicks = 0;
    let totalPrevWBCarts = 0;
    let totalPrevOzonCarts = 0;
    let totalPrevWBOrders = 0;
    let totalPrevOzonOrders = 0;
    let totalPrevWBOrderSum = 0;
    let totalPrevOzonOrderSum = 0;
    let totalPlanSales = 0;

    GO_PERFORMANCE_DATA.forEach(item => {
        const sales = parseFloat(item.sales.replace(/\s/g, ''));
        const salesChange = parseFloat(item.salesChange.replace('%', ''));
        const kp = parseFloat(item.kp.replace(/\s/g, ''));
        const kpPercent = parseFloat(item.kpPercent.replace('%', ''));
        const kpChangeStr = item.kpChange.replace(' п.п.', '').replace('+', '');
        const kpChange = parseFloat(kpChangeStr);
        const prevSales = sales / (1 + salesChange / 100);
        const prevKpPercent = kpPercent - kpChange;
        const prevKpVal = prevSales * (prevKpPercent / 100);
        const planSales = sales / (item.planCompletion / 100);

        weightedOnline += parseFloat(item.shareOnline) * sales;
        weightedOffline += parseFloat(item.shareOffline) * sales;
        weightedWBSplit += parseFloat(item.salesSplitWB) * sales;
        weightedOzonSplit += parseFloat(item.salesSplitOzon) * sales;
        weightedRatingWB += parseFloat(item.ratingWB) * sales;
        weightedRatingOzon += parseFloat(item.ratingOzon) * sales;
        weightedRatingWBChange += (item.ratingWBChange || 0) * sales;
        weightedRatingOzonChange += (item.ratingOzonChange || 0) * sales;
        weightedShareWB += parseFloat(item.shareWB) * sales;
        weightedShareOzon += parseFloat(item.shareOzon) * sales;
        weightedShareWBChange += (item.shareWBChange || 0) * sales;
        weightedShareOzonChange += (item.shareOzonChange || 0) * sales;
        weightedFocusShare += parseFloat(item.focusSkuShare) * sales;
        weightedTurnoverWB += (item.turnoverWB || 0) * sales;
        weightedTurnoverOzon += (item.turnoverOzon || 0) * sales;
        weightedTurnoverWBChange += (item.turnoverWBChange || 0) * sales;
        weightedTurnoverOzonChange += (item.turnoverOzonChange || 0) * sales;
        weightedAvgKpPerUnit += item.avgKpPerUnit * sales;
        weightedAvgKpPerUnitOnline += item.avgKpPerUnitOnline * sales;
        weightedAvgKpPerUnitOffline += item.avgKpPerUnitOffline * sales;
        weightedAvgKpPerUnitChange += item.avgKpPerUnitChange * sales;
        weightedAvgKpPerUnitOnlineChange += item.avgKpPerUnitOnlineChange * sales;
        weightedAvgKpPerUnitOfflineChange += item.avgKpPerUnitOfflineChange * sales;
        totalSales += sales;
        totalPrevSales += prevSales;
        totalKp += kp;
        totalPrevKpVal += prevKpVal;
        totalSku += item.skuCount;
        totalFocusSku += item.focusSkuCount;
        totalPlanSales += planSales;
        totalSmmFact += parseFloat(item.smmBudgetFact);
        totalSmmPlan += parseFloat(item.smmBudgetPlan);
        totalReachFact += item.reachFact;
        totalReachPlan += item.reachPlan;
        totalWBImpressions += item.funnelWB.impressions.value;
        totalOzonImpressions += item.funnelOzon.impressions.value;
        totalWBClicks += item.funnelWB.clicks.value;
        totalOzonClicks += item.funnelOzon.clicks.value;
        totalWBCarts += item.funnelWB.carts.value;
        totalOzonCarts += item.funnelOzon.carts.value;
        totalWBOrders += item.funnelWB.orders.value;
        totalOzonOrders += item.funnelOzon.orders.value;
        totalWBOrderSum += item.funnelWB.orderSum.value;
        totalOzonOrderSum += item.funnelOzon.orderSum.value;
        weightedWBCTR += item.funnelWB.ctr.value * item.funnelWB.impressions.value;
        weightedOzonCTR += item.funnelOzon.ctr.value * item.funnelOzon.impressions.value;
        weightedWBCR1 += item.funnelWB.cr1.value * item.funnelWB.impressions.value;
        weightedOzonCR1 += item.funnelOzon.cr1.value * item.funnelOzon.impressions.value;
        weightedWBBuyout += item.funnelWB.buyoutPercent.value * item.funnelWB.carts.value;
        weightedOzonBuyout += item.funnelOzon.buyoutPercent.value * item.funnelOzon.carts.value;
        weightedWBCR2 += item.funnelWB.cr2.value * item.funnelWB.carts.value;
        weightedOzonCR2 += item.funnelOzon.cr2.value * item.funnelOzon.carts.value;
        totalPrevWBImpressions += item.funnelWB.impressions.value / (1 + item.funnelWB.impressions.change / 100);
        totalPrevOzonImpressions += item.funnelOzon.impressions.value / (1 + item.funnelOzon.impressions.change / 100);
        totalPrevWBClicks += item.funnelWB.clicks.value / (1 + item.funnelWB.clicks.change / 100);
        totalPrevOzonClicks += item.funnelOzon.clicks.value / (1 + item.funnelOzon.clicks.change / 100);
        totalPrevWBCarts += item.funnelWB.carts.value / (1 + item.funnelWB.carts.change / 100);
        totalPrevOzonCarts += item.funnelOzon.carts.value / (1 + item.funnelOzon.carts.change / 100);
        totalPrevWBOrders += item.funnelWB.orders.value / (1 + item.funnelWB.orders.change / 100);
        totalPrevOzonOrders += item.funnelOzon.orders.value / (1 + item.funnelOzon.orders.change / 100);
        totalPrevWBOrderSum += item.funnelWB.orderSum.value / (1 + item.funnelWB.orderSum.change / 100);
        totalPrevOzonOrderSum += item.funnelOzon.orderSum.value / (1 + item.funnelOzon.orderSum.change / 100);
    });

    const totalSalesChange = ((totalSales - totalPrevSales) / totalPrevSales) * 100;
    const totalKpPercent = (totalKp / totalSales) * 100;
    const totalPrevKpPercent = (totalPrevKpVal / totalPrevSales) * 100;
    const totalKpChange = totalKpPercent - totalPrevKpPercent;
    const totalPlanCompletion = (totalSales / totalPlanSales) * 100;
    const totalCpv = totalReachFact > 0 ? (totalSmmFact * 1000000) / totalReachFact : 0;
    
    // ... skipping repetitive simple change calcs ...
    const wbImpChange = ((totalWBImpressions - totalPrevWBImpressions) / totalPrevWBImpressions) * 100;
    const ozonImpChange = ((totalOzonImpressions - totalPrevOzonImpressions) / totalPrevOzonImpressions) * 100;
    const wbClicksChange = ((totalWBClicks - totalPrevWBClicks) / totalPrevWBClicks) * 100;
    const ozonClicksChange = ((totalOzonClicks - totalPrevOzonClicks) / totalPrevOzonClicks) * 100;
    const wbCartsChange = ((totalWBCarts - totalPrevWBCarts) / totalPrevWBCarts) * 100;
    const ozonCartsChange = ((totalOzonCarts - totalPrevOzonCarts) / totalPrevOzonCarts) * 100;
    const wbOrdersChange = ((totalWBOrders - totalPrevWBOrders) / totalPrevWBOrders) * 100;
    const ozonOrdersChange = ((totalOzonOrders - totalPrevOzonOrders) / totalPrevOzonOrders) * 100;
    const wbOrderSumChange = ((totalWBOrderSum - totalPrevWBOrderSum) / totalPrevWBOrderSum) * 100;
    const ozonOrderSumChange = ((totalOzonOrderSum - totalPrevOzonOrderSum) / totalPrevOzonOrderSum) * 100;

    const avgWBCTR = totalWBImpressions > 0 ? weightedWBCTR / totalWBImpressions : 0;
    const avgOzonCTR = totalOzonImpressions > 0 ? weightedOzonCTR / totalOzonImpressions : 0;
    const avgWBCR1 = totalWBImpressions > 0 ? weightedWBCR1 / totalWBImpressions : 0;
    const avgOzonCR1 = totalOzonImpressions > 0 ? weightedOzonCR1 / totalOzonImpressions : 0;
    const avgWBBuyout = totalWBCarts > 0 ? weightedWBBuyout / totalWBCarts : 0;
    const avgOzonBuyout = totalOzonCarts > 0 ? weightedOzonBuyout / totalOzonCarts : 0;
    const avgWBCR2 = totalWBCarts > 0 ? weightedWBCR2 / totalWBCarts : 0;
    const avgOzonCR2 = totalOzonCarts > 0 ? weightedOzonCR2 / totalOzonCarts : 0;

    const avgWBPrice = totalWBOrders > 0 ? totalWBOrderSum / totalWBOrders : 0;
    const avgOzonPrice = totalOzonOrders > 0 ? totalOzonOrderSum / totalOzonOrders : 0;
    const prevAvgWBPrice = totalPrevWBOrders > 0 ? totalPrevWBOrderSum / totalPrevWBOrders : 0;
    const prevAvgOzonPrice = totalPrevOzonOrders > 0 ? totalPrevOzonOrderSum / totalPrevOzonOrders : 0;
    const wbPriceChange = ((avgWBPrice - prevAvgWBPrice) / prevAvgWBPrice) * 100;
    const ozonPriceChange = ((avgOzonPrice - prevAvgOzonPrice) / prevAvgOzonPrice) * 100;

    return {
        id: 'total', name: 'TOTAL', managerImage: '', categoryIcon: Users,
        skuCount: totalSku, focusSkuCount: totalFocusSku, focusSkuShare: (weightedFocusShare / totalSales).toFixed(0) + '%',
        goShare: '100%', shareOnline: (weightedOnline / totalSales).toFixed(0) + '%', shareOffline: (weightedOffline / totalSales).toFixed(0) + '%',
        salesSplitWB: (weightedWBSplit / totalSales).toFixed(0) + '%', salesSplitOzon: (weightedOzonSplit / totalSales).toFixed(0) + '%',
        ratingWB: (weightedRatingWB / totalSales).toFixed(2), ratingWBChange: weightedRatingWBChange / totalSales,
        ratingOzon: (weightedRatingOzon / totalSales).toFixed(2), ratingOzonChange: weightedRatingOzonChange / totalSales,
        shareWB: (weightedShareWB / totalSales).toFixed(1) + '%', shareWBChange: weightedShareWBChange / totalSales,
        shareOzon: (weightedShareOzon / totalSales).toFixed(1) + '%', shareOzonChange: weightedShareOzonChange / totalSales,
        turnoverWB: weightedTurnoverWB / totalSales, turnoverWBChange: weightedTurnoverWBChange / totalSales,
        turnoverOzon: weightedTurnoverOzon / totalSales, turnoverOzonChange: weightedTurnoverOzonChange / totalSales,
        sales: totalSales.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " "), salesChange: (totalSalesChange > 0 ? '+' : '') + totalSalesChange.toFixed(1) + '%', isSalesGrowth: totalSalesChange >= 0,
        kp: totalKp.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " "), kpPercent: totalKpPercent.toFixed(1) + '%', kpChange: (totalKpChange > 0 ? '+' : '') + totalKpChange.toFixed(1) + ' п.п.', isKpGrowth: totalKpChange >= 0,
        avgKpPerUnit: Math.round(weightedAvgKpPerUnit / totalSales), avgKpPerUnitChange: parseFloat((weightedAvgKpPerUnitChange / totalSales).toFixed(1)),
        avgKpPerUnitOnline: Math.round(weightedAvgKpPerUnitOnline / totalSales), avgKpPerUnitOnlineChange: parseFloat((weightedAvgKpPerUnitOnlineChange / totalSales).toFixed(1)),
        avgKpPerUnitOffline: Math.round(weightedAvgKpPerUnitOffline / totalSales), avgKpPerUnitOfflineChange: parseFloat((weightedAvgKpPerUnitOfflineChange / totalSales).toFixed(1)),
        kpDetailsClients: [], kpDetailsTrend: GO_PERFORMANCE_DATA[0]?.kpDetailsTrend,
        planCompletion: parseFloat(totalPlanCompletion.toFixed(0)), planToDateLabel: totalPlanCompletion.toFixed(0) + '%', planToDatePercent: 75,
        smmBudgetFact: totalSmmFact.toFixed(1), smmBudgetPlan: totalSmmPlan.toFixed(1), reachFact: totalReachFact, reachPlan: totalReachPlan, cpv: totalCpv.toFixed(2),
        funnelWB: { impressions: { value: totalWBImpressions, change: wbImpChange }, clicks: { value: totalWBClicks, change: wbClicksChange }, ctr: { value: avgWBCTR, change: 0 }, cr1: { value: avgWBCR1, change: 0 }, carts: { value: totalWBCarts, change: wbCartsChange }, orders: { value: totalWBOrders, change: wbOrdersChange }, avgPrice: { value: avgWBPrice, change: wbPriceChange }, orderSum: { value: totalWBOrderSum, change: wbOrderSumChange }, buyoutPercent: { value: avgWBBuyout, change: 0 }, cr2: { value: avgWBCR2, change: 0 } },
        funnelOzon: { impressions: { value: totalOzonImpressions, change: ozonImpChange }, clicks: { value: totalOzonClicks, change: ozonClicksChange }, ctr: { value: avgOzonCTR, change: 0 }, cr1: { value: avgOzonCR1, change: 0 }, carts: { value: totalOzonCarts, change: ozonCartsChange }, orders: { value: totalOzonOrders, change: ozonOrdersChange }, avgPrice: { value: avgOzonPrice, change: ozonPriceChange }, orderSum: { value: totalOzonOrderSum, change: ozonOrderSumChange }, buyoutPercent: { value: avgOzonBuyout, change: 0 }, cr2: { value: avgOzonCR2, change: 0 } }
    };
  }, []);

  const tableData = [totalMetrics, ...GO_PERFORMANCE_DATA];

  const FunnelCell = ({ wb, ozon, type, isTotal, highlight }: { 
      wb: { value: number, change: number }, 
      ozon: { value: number, change: number }, 
      type: 'abs' | 'percent' | 'currency',
      isTotal: boolean,
      highlight?: boolean
  }) => (
    <div className="flex flex-col items-center gap-1.5 w-full">
       <div className="flex items-center justify-between w-full gap-2 px-1">
          <span className="text-[#8F9F83] dark:text-[#A3B19A] font-bold text-[10px] w-5">WB</span>
          <span className={`font-bold text-xs whitespace-nowrap ${highlight ? 'text-[#C5A66F]' : 'text-[#2C2C2C] dark:text-[#E0E0E0]'}`}>{formatFunnelValue(wb.value, type)}</span>
          <div className={`flex items-center gap-0.5 text-[10px] w-10 justify-end ${wb.change >= 0 ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
             {wb.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
             <span>{Math.abs(wb.change).toFixed(1)}%</span>
          </div>
       </div>
       <div className="flex items-center justify-between w-full gap-2 px-1">
          <span className="text-[#A3B19A] dark:text-[#5D5D5D] font-bold text-[10px] w-5">OZ</span>
          <span className={`font-bold text-xs whitespace-nowrap ${highlight ? 'text-[#C5A66F]' : 'text-[#2C2C2C] dark:text-[#E0E0E0]'}`}>{formatFunnelValue(ozon.value, type)}</span>
          <div className={`flex items-center gap-0.5 text-[10px] w-10 justify-end ${ozon.change >= 0 ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
             {ozon.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
             <span>{Math.abs(ozon.change).toFixed(1)}%</span>
          </div>
       </div>
    </div>
  );

  return (
    <>
      <div className="bg-white dark:bg-olive-800 rounded-2xl border border-[#E5E0D8] dark:border-olive-700 overflow-hidden mt-6 mb-12 shadow-md transition-colors duration-300">
        {/* Header with Title and Comparison */}
        <div className="flex flex-col border-b border-[#E5E0D8] dark:border-olive-700 bg-[#2F3E28] dark:bg-olive-900">
            
            {/* Row 1: Title and Comparison */}
            <div className="px-8 py-5 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white tracking-wide">Выполнение плана по группам отчетности</h3>
                
                {/* Comparison Controls */}
                 <div className="flex items-center gap-3 bg-[#3A4B32] dark:bg-olive-800 p-1.5 pl-4 rounded-full border border-[#4A5D43] dark:border-olive-700 shadow-inner">
                    <span className="text-xs text-[#A3B19A] font-bold whitespace-nowrap uppercase tracking-wider">Сравнение с:</span>
                    <div className="flex gap-1">
                        {COMPARE_OPTIONS.map(opt => (
                            <button
                                key={opt}
                                onClick={() => setCompareMode(opt)}
                                className={`
                                    px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 whitespace-nowrap
                                    ${compareMode === opt 
                                        ? 'bg-[#F9F8F6] dark:bg-[#E0E0E0] text-[#2F3E28] dark:text-olive-900 shadow-sm' 
                                        : 'text-[#E0E0E0] hover:text-white hover:bg-[#4A5D43] dark:hover:bg-olive-600'
                                    }
                                `}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Row 2: Channel Filters */}
            <div className="px-8 pb-5 flex items-center gap-2 overflow-x-auto no-scrollbar">
                 {CHANNEL_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setActiveChannel(opt)}
                      className={`
                        px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide rounded-full border transition-all whitespace-nowrap flex-shrink-0
                        ${activeChannel === opt 
                          ? 'bg-[#C5A66F] text-white dark:text-olive-900 border-[#C5A66F] shadow-md' 
                          : 'bg-[#3A4B32] dark:bg-olive-800 border-[#4A5D43] dark:border-olive-700 text-[#A3B19A] hover:border-[#8F9F83] hover:text-white'
                        }
                      `}
                    >
                      {opt}
                    </button>
                 ))}
            </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar bg-white dark:bg-olive-800">
          <table className="w-full text-left border-collapse min-w-[3200px]">
            <thead>
              <tr className="bg-[#2F3E28] dark:bg-olive-900 text-[10px] uppercase text-[#E0E0E0] font-bold tracking-wider leading-tight border-b border-[#2F3E28] dark:border-olive-700">
                 <th className="px-6 py-5 sticky left-0 bg-[#2F3E28] dark:bg-olive-900 z-20 border-r border-[#4A5D43] dark:border-olive-700 min-w-[250px] text-white">ГРУППА ОТЧЕТНОСТИ</th>
                 <th className="px-4 py-5 text-center w-[140px] border-r border-[#4A5D43]/50 dark:border-olive-700">КОЛ-ВО SKU<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">доля продаж</span></th>
                 <th className="px-4 py-5 text-center w-[150px] border-r border-[#4A5D43]/50 dark:border-olive-700">ФОКУСНЫЕ SKU<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">доля продаж</span></th>
                 
                 <th className="px-4 py-5 text-center w-[150px] border-r border-[#4A5D43]/50 dark:border-olive-700">МП / СЕТИ<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">доля канала</span></th>
                 
                 <th className="px-5 py-5 text-right w-[160px] border-r border-[#4A5D43]/50 dark:border-olive-700">ПРОДАЖИ<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">млн ₽</span></th>
                 <th className="px-5 py-5 text-right w-[180px] border-r border-[#4A5D43]/50 dark:border-olive-700">КП<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">млн ₽ / %</span></th>
                 
                 {/* KP PER UNIT HEADER */}
                 <th className="px-2 py-5 text-center w-[150px] border-r border-[#4A5D43]/50 dark:border-olive-700 bg-[#2F3E28] dark:bg-olive-900">
                    КП НА 1 ШТ<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">total / мп / сети</span>
                 </th>
                 
                 <th className="px-5 py-5 w-[220px] border-r border-[#4A5D43]/50 dark:border-olive-700">ВЫПОЛНЕНИЕ ПЛАНА</th>
                 <th className="px-5 py-5 text-center w-[180px] border-r border-[#4A5D43]/50 dark:border-olive-700">SMM БЮДЖЕТ<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">Факт / % дрр</span></th>
                 <th className="px-5 py-5 w-[220px] text-center border-r border-[#4A5D43]/50 dark:border-olive-700">ОХВАТЫ<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">план / факт / cpv</span></th>
                 <th className="px-4 py-5 text-center w-[150px] border-r border-[#4A5D43]/50 dark:border-olive-700">ОБОРАЧИВАЕМОСТЬ<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">WB / OZON (дни)</span></th>
                 <th className="px-4 py-5 text-center w-[150px] border-r border-[#4A5D43]/50 dark:border-olive-700">ДОЛИ WB / OZON<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">сплит продаж</span></th>
                 <th className="px-4 py-5 text-center w-[140px] border-r border-[#4A5D43]/50 dark:border-olive-700">ДОЛЯ В МП<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">WB / OZON</span></th>
                 <th className="px-4 py-5 text-center w-[140px] border-r border-[#4A5D43]/50 dark:border-olive-700">РЕЙТИНГ<br/><span className="normal-case font-normal opacity-60 text-[#A3B19A]">WB / OZON</span></th>
                 <th colSpan={10} className="px-2 py-2 text-center bg-[#3A4B32] dark:bg-olive-800 border-l border-[#4A5D43] dark:border-olive-700">
                    <div className="border-b border-[#4A5D43] dark:border-olive-600 pb-2 mb-2 text-white font-bold text-xs tracking-wide">ВОРОНКА ПРОДАЖ (WB / OZON)</div>
                    <div className="grid grid-cols-10 gap-2 text-[#E0E0E0]">
                        <span className="w-[120px]">ПОКАЗЫ</span>
                        <span className="w-[120px]">ПЕРЕХОДЫ</span>
                        <span className="w-[120px]">КОРЗИНЫ</span>
                        <span className="w-[120px]">ЗАКАЗЫ</span>
                        <span className="w-[120px]">ВЫКУП</span>
                        <span className="w-[120px]">СР. ЦЕНА</span>
                        <span className="w-[120px]">СУММА ЗАКАЗОВ</span>
                        <span className="w-[120px] text-[#C5A66F] font-bold">CTR</span>
                        <span className="w-[120px] text-[#C5A66F] font-bold">CR1</span>
                        <span className="w-[120px] text-[#C5A66F] font-bold">CR2</span>
                    </div>
                 </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EFEB] dark:divide-olive-700">
              {tableData.map((item, index) => {
                const isTotal = item.id === 'total';
                const statusClasses = getStatusColor(item.planCompletion, item.planToDatePercent);
                const barColor = statusClasses;
                const reachBarColor = getReachBarColor(item.reachFact, item.reachPlan);
                const CategoryIcon = item.categoryIcon;
                
                const salesValue = parseFloat(item.sales.replace(/\s/g, ''));
                const smmFactValue = parseFloat(item.smmBudgetFact);
                const smmSharePercent = salesValue > 0 ? ((smmFactValue / salesValue) * 100).toFixed(1) : '0.0';
                
                const rowBackground = isTotal 
                  ? 'bg-[#2F3E28]/5 dark:bg-olive-700/50 border-b-2 border-[#8F9F83] dark:border-olive-600' 
                  : 'bg-white dark:bg-olive-800 hover:bg-[#F9F8F6] dark:hover:bg-olive-700 transition-colors group';

                const stickyCellBackground = isTotal ? 'bg-[#F2F0EB] dark:bg-olive-700' : 'bg-white dark:bg-olive-800 group-hover:bg-[#F9F8F6] dark:group-hover:bg-olive-700';

                return (
                  <tr key={item.id} className={`${rowBackground} text-sm text-[#2C2C2C] dark:text-[#E0E0E0]`}>
                    {/* Name with AI Trigger and Avatar */}
                    <td className={`px-6 py-4 font-semibold sticky left-0 transition-colors border-r border-[#E5E0D8] dark:border-olive-700 z-10 ${stickyCellBackground} ${isTotal ? 'text-[#2F3E28] dark:text-white text-base font-bold' : ''}`}>
                      <div className="flex items-center justify-between group/icon gap-4">
                        <div className="flex items-center gap-3">
                           {/* Avatar or Team Icon - CLICKABLE */}
                           <button 
                                className={`relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-[#E5E0D8] dark:border-olive-600 overflow-hidden bg-[#F9F8F6] dark:bg-olive-900 shadow-sm ${isTotal ? 'p-2' : 'hover:ring-2 hover:ring-[#C5A66F] cursor-pointer transition-all'}`}
                                onClick={() => handleManagerClick(item as GOPerformanceData)}
                                title={!isTotal ? "Карточка сотрудника" : ""}
                           >
                               {item.managerImage ? (
                                   <img src={item.managerImage} alt={item.name} className="w-full h-full object-cover" />
                               ) : (
                                   <CategoryIcon className="w-full h-full text-[#8F9F83]" />
                               )}
                           </button>
                           
                           {/* Name and Category Icon */}
                           <div className="flex items-center gap-2">
                               <span>{item.name}</span>
                               {!isTotal && (
                                   <CategoryIcon className="w-4 h-4 text-[#8F9F83]" />
                               )}
                           </div>
                        </div>

                        <button 
                          onClick={() => handleOpenAIReport(item as GOPerformanceData)}
                          className="p-1.5 rounded-full bg-[#C5A66F]/10 hover:bg-[#C5A66F]/20 text-[#C5A66F] hover:text-[#A68A50] transition-all transform hover:scale-110 shadow-sm border border-[#C5A66F]/30"
                          title="AI Анализ эффективности"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center border-r border-[#E5E0D8] dark:border-olive-700">
                      <div className="flex flex-col items-center gap-1">
                         <span className="font-bold text-[#2C2C2C] dark:text-[#E0E0E0]">{item.skuCount}</span>
                         <span className="text-xs text-[#8F9F83] font-semibold">{item.goShare}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center border-r border-[#E5E0D8] dark:border-olive-700">
                      <div className="flex flex-col items-center gap-1">
                         <span className="font-bold text-[#2C2C2C] dark:text-[#E0E0E0]">{item.focusSkuCount}</span>
                         <span className="text-xs text-[#4A6741] dark:text-[#8F9F83] font-semibold">{item.focusSkuShare}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center border-r border-[#E5E0D8] dark:border-olive-700">
                      <div className="flex flex-col items-center gap-1">
                         <div className="flex items-center gap-2 text-xs justify-center">
                            <span className="text-[#8F9F83] dark:text-[#A3B19A] font-bold text-[10px] w-8 text-right">МП</span>
                            <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-medium">{item.shareOnline}</span>
                         </div>
                         <div className="flex items-center gap-2 text-xs justify-center">
                            <span className="text-[#C5A66F] font-bold text-[10px] w-8 text-right">СЕТИ</span>
                            <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-medium">{item.shareOffline}</span>
                         </div>
                      </div>
                    </td>

                    <td className={`px-5 py-4 text-right border-r border-[#E5E0D8] dark:border-olive-700 ${isTotal ? 'bg-[#F2F0EB] dark:bg-olive-700' : ''}`}>
                      <div className="font-bold text-[#2C2C2C] dark:text-[#E0E0E0] text-base whitespace-nowrap">{item.sales}</div>
                      <div className={`text-[10px] flex items-center justify-end gap-0.5 ${item.isSalesGrowth ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                         {item.isSalesGrowth ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                         <span className="font-semibold">{item.salesChange}</span>
                      </div>
                    </td>
                    
                    <td 
                        className={`px-5 py-4 text-right border-r border-[#E5E0D8] dark:border-olive-700 cursor-pointer transition-colors ${isTotal ? 'bg-[#F2F0EB] dark:bg-olive-700 hover:bg-[#E5E0D8] dark:hover:bg-olive-600' : 'hover:bg-[#F2F0EB] dark:hover:bg-olive-700'} group-hover/kp:bg-[#F9F8F6]`}
                        onClick={() => handleOpenKPDetails(item as GOPerformanceData)}
                        title="Нажмите для детализации КП"
                    >
                        <div className="flex justify-end items-baseline gap-1.5">
                           <span className="font-bold text-[#2C2C2C] dark:text-[#E0E0E0] text-base group-hover:text-[#2F3E28] dark:group-hover:text-white transition-colors whitespace-nowrap">{item.kp}</span>
                           <span className="font-bold text-[#5D5D5D] dark:text-[#A3B19A] text-xs">({item.kpPercent})</span>
                        </div>
                        <div className={`text-[10px] flex items-center justify-end gap-0.5 ${item.isKpGrowth ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                           {item.isKpGrowth ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                           <span className="font-semibold">{item.kpChange}</span>
                        </div>
                    </td>

                    <td className="px-2 py-4 text-center border-r border-[#E5E0D8] dark:border-olive-700">
                        <div className="flex flex-row items-center justify-center w-full h-full gap-2">
                            <div className="flex flex-col items-center gap-0.5">
                                <span className="font-bold text-[#2C2C2C] dark:text-[#E0E0E0] text-sm whitespace-nowrap">{item.avgKpPerUnit} ₽</span>
                                <div className={`flex items-center text-[10px] font-semibold ${item.avgKpPerUnitChange >= 0 ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                                    {item.avgKpPerUnitChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {Math.abs(item.avgKpPerUnitChange)}%
                                </div>
                            </div>
                            <div className="flex flex-col gap-0.5 items-start w-max">
                                <div className="flex items-center gap-1">
                                     <span className="text-[#8F9F83] dark:text-[#A3B19A] font-bold text-[9px] uppercase w-6 text-right">МП</span>
                                     <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-semibold text-xs w-[24px] text-right">{item.avgKpPerUnitOnline}</span>
                                     <div className={`flex items-center text-[9px] w-[32px] justify-end whitespace-nowrap ${item.avgKpPerUnitOnlineChange >= 0 ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                                        {item.avgKpPerUnitOnlineChange > 0 && '+'}{item.avgKpPerUnitOnlineChange}%
                                     </div>
                                </div>
                                <div className="flex items-center gap-1">
                                     <span className="text-[#C5A66F] font-bold text-[9px] uppercase w-6 text-right">СЕТИ</span>
                                     <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-semibold text-xs w-[24px] text-right">{item.avgKpPerUnitOffline}</span>
                                     <div className={`flex items-center text-[9px] w-[32px] justify-end whitespace-nowrap ${item.avgKpPerUnitOfflineChange >= 0 ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                                        {item.avgKpPerUnitOfflineChange > 0 && '+'}{item.avgKpPerUnitOfflineChange}%
                                     </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    
                    <td className={`px-5 py-4 align-middle border-r border-[#E5E0D8] dark:border-olive-700 ${isTotal ? 'bg-[#F2F0EB] dark:bg-olive-700' : ''}`}>
                      <div className="flex flex-col gap-1 w-full">
                         <div className="flex justify-between text-[10px] leading-none mb-1">
                           <span className="text-[#4A6741] dark:text-[#8F9F83] font-bold">{item.planToDateLabel} на сегодня</span>
                           <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-bold">{item.planCompletion}%</span>
                         </div>
                         <div className="w-full bg-[#E5E0D8] dark:bg-olive-600 rounded-full h-2 relative overflow-visible">
                            <div 
                                className="absolute top-0 bottom-0 w-0.5 bg-white z-20 border border-[#C5A66F] shadow-sm -mt-0.5 h-3"
                                style={{ left: `${item.planToDatePercent}%` }}
                            ></div>
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                                <div 
                                className={`h-full rounded-full ${barColor}`} 
                                style={{ width: `${item.planCompletion}%` }}
                                ></div>
                            </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-center font-medium border-r border-[#E5E0D8] dark:border-olive-700">
                       <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-2">
                             <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-bold">{item.smmBudgetFact} М</span>
                             <span className="text-[10px] font-bold text-[#4A6741] bg-[#4A6741]/10 px-1.5 py-0.5 rounded">{smmSharePercent}%</span>
                          </div>
                          <span className="text-[10px] text-[#A3B19A]">из {item.smmBudgetPlan} М</span>
                       </div>
                    </td>
                    
                    <td className="px-5 py-4 border-r border-[#E5E0D8] dark:border-olive-700">
                       <div className="flex flex-col gap-1 w-full">
                          <div className="flex justify-between items-baseline gap-1 text-xs w-full">
                             <span className="text-[#5D5D5D] dark:text-[#A3B19A]">Охват:</span>
                             <div className="flex items-baseline gap-1 ml-auto text-right">
                               <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-bold">{formatK(item.reachFact)}</span>
                               <span className="text-[#A3B19A]">/ {formatK(item.reachPlan)}</span>
                             </div>
                          </div>
                          <div className="w-full bg-[#E5E0D8] dark:bg-olive-600 rounded-full h-1.5 overflow-hidden my-0.5">
                              <div 
                                  className={`h-full rounded-full ${reachBarColor}`} 
                                  style={{ width: `${Math.min((item.reachFact / item.reachPlan) * 100, 100)}%` }}
                              ></div>
                          </div>
                          <div className="flex justify-between items-baseline gap-1 text-xs">
                              <span className="text-[#5D5D5D] dark:text-[#A3B19A]">CPV:</span>
                              <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-bold">{item.cpv} ₽</span>
                          </div>
                       </div>
                    </td>

                    {/* Turnover */}
                    <td className="px-4 py-4 text-center border-r border-[#E5E0D8] dark:border-olive-700">
                      <div className="flex flex-col items-center gap-1.5">
                         <div className="flex items-center gap-3 text-xs justify-center w-full">
                            <div className="flex items-center gap-2">
                                <span className="text-[#8F9F83] dark:text-[#A3B19A] font-bold text-[10px] text-right w-4">WB</span>
                                <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-medium w-6 text-center">{item.turnoverWB?.toFixed(0)}</span>
                            </div>
                            <div className={`flex items-center text-[9px] w-8 ${item.turnoverWBChange >= 0 ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                               {item.turnoverWBChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                               <span>{Math.abs(item.turnoverWBChange).toFixed(1)}%</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 text-xs justify-center w-full">
                            <div className="flex items-center gap-2">
                                <span className="text-[#A3B19A] dark:text-[#5D5D5D] font-bold text-[10px] text-right w-4">OZ</span>
                                <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-medium w-6 text-center">{item.turnoverOzon?.toFixed(0)}</span>
                            </div>
                            <div className={`flex items-center text-[9px] w-8 ${item.turnoverOzonChange >= 0 ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                               {item.turnoverOzonChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                               <span>{Math.abs(item.turnoverOzonChange).toFixed(1)}%</span>
                            </div>
                         </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center border-r border-[#E5E0D8] dark:border-olive-700">
                      <div className="flex flex-col items-center gap-1">
                         <div className="flex items-center gap-2 text-xs">
                            <span className="text-[#8F9F83] dark:text-[#A3B19A] font-bold text-[10px] w-5 text-right">WB</span>
                            <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-medium">{item.salesSplitWB}</span>
                         </div>
                         <div className="flex items-center gap-2 text-xs">
                            <span className="text-[#A3B19A] dark:text-[#5D5D5D] font-bold text-[10px] w-5 text-right">OZ</span>
                            <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-medium">{item.salesSplitOzon}</span>
                         </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center border-r border-[#E5E0D8] dark:border-olive-700">
                      <div className="flex flex-col items-center gap-1">
                         <div className="flex items-center gap-2 text-xs justify-between w-full">
                            <span className="text-[#8F9F83] dark:text-[#A3B19A] font-bold text-[10px] w-5 text-right">WB</span>
                            <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-medium">{item.shareWB}</span>
                            <div className={`flex items-center text-[9px] ${item.shareWBChange >= 0 ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                               {item.shareWBChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                               <span>{Math.abs(item.shareWBChange).toFixed(1)}%</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-2 text-xs justify-between w-full">
                            <span className="text-[#A3B19A] dark:text-[#5D5D5D] font-bold text-[10px] w-5 text-right">OZ</span>
                            <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-medium">{item.shareOzon}</span>
                            <div className={`flex items-center text-[9px] ${item.shareOzonChange >= 0 ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                               {item.shareOzonChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                               <span>{Math.abs(item.shareOzonChange).toFixed(1)}%</span>
                            </div>
                         </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center border-r border-[#E5E0D8] dark:border-olive-700">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1 text-xs justify-between w-full">
                            <div className="flex items-center gap-1">
                                <span className="text-[#8F9F83] dark:text-[#A3B19A] font-bold text-[10px] w-5 text-right">WB</span>
                                <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-semibold">{item.ratingWB}</span>
                                <Star className="w-3 h-3 fill-[#C5A66F] text-[#C5A66F]" />
                            </div>
                            <div className={`flex items-center text-[9px] ${item.ratingWBChange >= 0 ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                               {item.ratingWBChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                               <span>{Math.abs(item.ratingWBChange).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs justify-between w-full">
                            <div className="flex items-center gap-1">
                                <span className="text-[#A3B19A] dark:text-[#5D5D5D] font-bold text-[10px] w-5 text-right">OZ</span>
                                <span className="text-[#2C2C2C] dark:text-[#E0E0E0] font-semibold">{item.ratingOzon}</span>
                                <Star className="w-3 h-3 fill-[#C5A66F] text-[#C5A66F]" />
                            </div>
                            <div className={`flex items-center text-[9px] ${item.ratingOzonChange >= 0 ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                               {item.ratingOzonChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                               <span>{Math.abs(item.ratingOzonChange).toFixed(2)}</span>
                            </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center bg-[#F9F8F6] dark:bg-olive-900 border-b border-[#E5E0D8] dark:border-olive-700">
                        <FunnelCell wb={item.funnelWB.impressions} ozon={item.funnelOzon.impressions} type="abs" isTotal={isTotal} />
                    </td>
                    <td className="px-4 py-4 text-center bg-[#F9F8F6] dark:bg-olive-900 border-b border-[#E5E0D8] dark:border-olive-700">
                        <FunnelCell wb={item.funnelWB.clicks} ozon={item.funnelOzon.clicks} type="abs" isTotal={isTotal} />
                    </td>
                    <td className="px-4 py-4 text-center bg-[#F9F8F6] dark:bg-olive-900 border-b border-[#E5E0D8] dark:border-olive-700">
                        <FunnelCell wb={item.funnelWB.carts} ozon={item.funnelOzon.carts} type="abs" isTotal={isTotal} />
                    </td>
                    <td className="px-4 py-4 text-center bg-[#F9F8F6] dark:bg-olive-900 border-b border-[#E5E0D8] dark:border-olive-700">
                        <FunnelCell wb={item.funnelWB.orders} ozon={item.funnelOzon.orders} type="abs" isTotal={isTotal} />
                    </td>
                    <td className="px-4 py-4 text-center bg-[#F9F8F6] dark:bg-olive-900 border-b border-[#E5E0D8] dark:border-olive-700">
                        <FunnelCell wb={item.funnelWB.buyoutPercent} ozon={item.funnelOzon.buyoutPercent} type="percent" isTotal={isTotal} />
                    </td>
                    <td className="px-4 py-4 text-center bg-[#F9F8F6] dark:bg-olive-900 border-b border-[#E5E0D8] dark:border-olive-700">
                        <FunnelCell wb={item.funnelWB.avgPrice} ozon={item.funnelOzon.avgPrice} type="currency" isTotal={isTotal} />
                    </td>
                    <td className="px-4 py-4 text-center bg-[#F9F8F6] dark:bg-olive-900 border-b border-[#E5E0D8] dark:border-olive-700">
                        <FunnelCell wb={item.funnelWB.orderSum} ozon={item.funnelOzon.orderSum} type="abs" isTotal={isTotal} />
                    </td>
                    <td className="px-4 py-4 text-center bg-[#F9F8F6] dark:bg-olive-900 border-b border-[#E5E0D8] dark:border-olive-700">
                        <FunnelCell wb={item.funnelWB.ctr} ozon={item.funnelOzon.ctr} type="percent" isTotal={isTotal} highlight={true} />
                    </td>
                    <td className="px-4 py-4 text-center bg-[#F9F8F6] dark:bg-olive-900 border-b border-[#E5E0D8] dark:border-olive-700">
                        <FunnelCell wb={item.funnelWB.cr1} ozon={item.funnelOzon.cr1} type="percent" isTotal={isTotal} highlight={true} />
                    </td>
                    <td className="px-4 py-4 text-center bg-[#F9F8F6] dark:bg-olive-900 border-b border-[#E5E0D8] dark:border-olive-700">
                        <FunnelCell wb={item.funnelWB.cr2} ozon={item.funnelOzon.cr2} type="percent" isTotal={isTotal} highlight={true} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* AI Report Modal */}
        <AIReportModal 
           isOpen={isAIModalOpen} 
           onClose={() => setIsAIModalOpen(false)} 
           data={selectedGO}
           reportContent={aiReport}
           isLoading={isGenerating}
           onGenerate={handleGenerateReport}
        />

        {/* KP Details Modal */}
        <KPDetailsModal 
           isOpen={isKPModalOpen}
           onClose={() => setIsKPModalOpen(false)}
           data={selectedGO}
        />

        {/* Manager Card Modal */}
        {selectedManagerForCard && (
            <ManagerCard 
                manager={selectedManagerForCard} 
                isOpen={true}
                onClose={() => setSelectedManagerForCard(null)}
            />
        )}
      </div>
    </>
  );
};