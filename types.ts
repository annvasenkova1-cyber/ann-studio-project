
import { LucideIcon } from 'lucide-react';

export interface KPIMetric {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  unit?: string;
  change: string;
  isPositive: boolean;
  
  // Progress Bar / Gauge specific properties
  hasProgressBar: boolean;
  visualizationType?: 'bar' | 'gauge' | 'none'; // New field
  
  progressLabel?: string;
  progressRightLabel?: string;
  fillPercentage?: number;
  targetPosition?: number; // Percentage 0-100
  progressBarColor?: 'green' | 'yellow' | 'red';
  
  // Gauge specific
  gaugeMin?: number;
  gaugeMax?: number;
  gaugeValue?: number; // Numeric value for the needle
  
  planValue?: string;
  planLabel?: string;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'indigo' | 'slate';
}

export type CategoryFilter = 'Все' | 'Лицо' | 'Тело' | 'Волосы' | 'Макияж' | 'Дом и гигиена';
export type TimeFilter = 'День' | 'Неделя' | 'Месяц';
export type NavTab = 'Пульс' | 'Продажи' | 'Продвижение' | 'Ассортимент' | 'Новинки' | 'Планирование';

export interface ChartDataPoint {
  name: string;
  value: number;
  plan: number;
}

export interface FunnelMetric {
  value: number;
  change: number; // Percentage change vs previous period
}

export interface MPFunnelData {
  impressions: FunnelMetric; // Absolute number
  clicks: FunnelMetric;      // Absolute number
  ctr: FunnelMetric;         // Percentage (0-100)
  cr1: FunnelMetric;         // Conversion to Cart % (0-100)
  carts: FunnelMetric;       // Absolute number
  orders: FunnelMetric;      // Absolute number
  avgPrice: FunnelMetric;    // RUB
  orderSum: FunnelMetric;    // RUB
  buyoutPercent: FunnelMetric; // Buyout/Redemption Rate % (0-100)
  cr2: FunnelMetric;         // Cart to Order % (0-100)
}

export interface KPClientData {
  name: string;
  channel: 'Online' | 'Offline';
  kpValue: number; // Absolute in millions
  kpPerUnit: number; // RUB per unit
  sharePercent: number; // Share of total KP
}

export interface KPTrendData {
  month: string;
  onlineKP: number;
  offlineKP: number;
}

// Manager Card Interfaces
export interface ManagerSkill {
  name: string;
  score: number; // 0-100
}

export interface ManagerProfile {
  overallScore: number;
  skills: ManagerSkill[];
}

export interface HRTask {
  title: string;
  type: 'Training' | 'Bonus' | 'Meeting' | 'Promotion';
}

export interface GOPerformanceData {
  id: string;
  name: string;
  managerName: string; // Added field
  
  // Visuals
  managerImage: string;
  categoryIcon: LucideIcon;
  managerProfile?: ManagerProfile; // Added Profile

  // Financials
  sales: string;
  salesChange: string;     // e.g. "12%"
  isSalesGrowth: boolean;  // true for positive, false for negative
  
  kp: string;
  kpPercent: string;
  kpChange: string;        // e.g. "-1.2 п.п."
  isKpGrowth: boolean;
  
  // Detailed KP Data
  kpDetailsClients?: KPClientData[];
  kpDetailsTrend?: KPTrendData[];
  
  // KP Per Unit Breakdown
  avgKpPerUnit: number;
  avgKpPerUnitChange: number; // Percentage
  avgKpPerUnitOnline: number;
  avgKpPerUnitOnlineChange: number;
  avgKpPerUnitOffline: number;
  avgKpPerUnitOfflineChange: number;

  // Plan Execution
  planToDateLabel: string;
  planCompletion: number;
  planToDatePercent: number;

  // General Stats
  goShare: string;          // Share of GO in total sales
  skuCount: number;
  focusSkuCount: number;    // Count of Focus SKUs
  focusSkuShare: string;    // Share of Focus SKUs in sales (e.g. "65%")
  
  // Marketplace Metrics
  ratingWB: string;         // e.g. "4.82"
  ratingWBChange: number;   // e.g. 0.02
  ratingOzon: string;       // e.g. "4.75"
  ratingOzonChange: number; // e.g. -0.05
  
  shareWB: string;          // Market share on platform e.g. "4.5%"
  shareWBChange: number;    // Percentage change e.g. 1.2
  shareOzon: string;        // Market share on platform e.g. "3.8%"
  shareOzonChange: number;  // Percentage change e.g. -0.5
  
  // Turnover (Days)
  turnoverWB: number;       // e.g. 45 days
  turnoverWBChange: number; // e.g. -2.5%
  turnoverOzon: number;     // e.g. 38 days
  turnoverOzonChange: number;// e.g. 1.2%

  // Internal Split
  salesSplitWB: string;     // Internal sales split WB
  salesSplitOzon: string;   // Internal sales split Ozon
  
  // Funnel
  funnelWB: MPFunnelData;
  funnelOzon: MPFunnelData;

  // Channel Split
  shareOnline: string;
  shareOffline: string;

  // Marketing
  smmBudgetFact: string;    // e.g. "19.5"
  smmBudgetPlan: string;    // e.g. "20.0"
  
  // Reach & CPV
  reachFact: number; // e.g. 835000
  reachPlan: number; // e.g. 973000
  cpv: string;       // e.g. "0.58"
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface SuggestedTask {
  title: string;
  description: string;
  priority: 'Высокий' | 'Средний' | 'Низкий';
  deadlineSuggestion: string; 
}
