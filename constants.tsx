
import { KPIMetric, ChartDataPoint, GOPerformanceData, KPClientData, KPTrendData, ManagerProfile } from './types';
import { DollarSign, Wallet, Percent, Briefcase, Smile, Wind, User, Palette, FlaskConical, Home, Pill, Gem, Crown, Sparkles } from 'lucide-react';

export const KPI_DATA: KPIMetric[] = [
  {
    id: 'sales',
    title: 'Продажи с начала месяца',
    subtitle: 'Ноябрь 2025',
    value: '2 460',
    unit: 'млн ₽',
    change: '+3% к аналог. пер.',
    isPositive: true,
    
    hasProgressBar: true,
    visualizationType: 'bar',
    progressLabel: '105% тек.', // Overperforming
    progressRightLabel: '77%',
    fillPercentage: 78, // Past target position
    targetPosition: 74, // Represents plan to date
    progressBarColor: 'green',

    planValue: '3 200 млн',
    planLabel: 'План',
    icon: DollarSign,
    color: 'indigo'
  },
  {
    id: 'kp_abs',
    title: 'КП с начала мес.',
    subtitle: 'Ноябрь 2025',
    value: '1 150',
    unit: 'млн ₽',
    change: '+5.2% к аналог. пер.',
    isPositive: true,
    
    hasProgressBar: true,
    visualizationType: 'bar',
    progressLabel: '98% тек.', // Slightly lagging (<5%)
    progressRightLabel: '75%',
    fillPercentage: 72, // Slightly behind target
    targetPosition: 74,
    progressBarColor: 'yellow',

    planValue: '1 500 млн',
    planLabel: 'План',
    icon: Wallet,
    color: 'indigo'
  },
  {
    id: 'kp_percent',
    title: 'КП %',
    subtitle: 'Ноябрь 2025',
    value: '32.0%',
    unit: '',
    change: '-1 п.п. к аналог. пер.',
    isPositive: false,
    
    hasProgressBar: true,
    visualizationType: 'gauge',
    progressLabel: '- 2 п.п. от плана', // Used for deviation text
    
    // Gauge Config
    // Plan is 34%. Range +/- 5 p.p. -> 29% to 39%
    gaugeMin: 29,
    gaugeMax: 39,
    gaugeValue: 32,

    planValue: '34%',
    planLabel: 'План',
    icon: Percent,
    color: 'indigo'
  },
  {
    id: 'rentability',
    title: 'Рентабельность',
    subtitle: '',
    value: '24.6%',
    unit: '',
    change: '-1.1% к пред. мес.',
    isPositive: false,
    
    hasProgressBar: false,
    visualizationType: 'none',

    icon: Briefcase,
    color: 'slate'
  }
];

export const SALES_TREND_DATA: ChartDataPoint[] = [
  { name: '1 Ноя', value: 45, plan: 50 },
  { name: '5 Ноя', value: 120, plan: 110 },
  { name: '10 Ноя', value: 300, plan: 290 },
  { name: '15 Ноя', value: 680, plan: 650 },
  { name: '20 Ноя', value: 1800, plan: 1750 },
  { name: '22 Ноя', value: 2460, plan: 2300 },
  { name: '25 Ноя', value: 2460, plan: 2600 }, // Forecast logic
  { name: '30 Ноя', value: 2460, plan: 3200 }, // Target
];

export const CATEGORY_SHARE_DATA = [
  { name: 'Лицо', value: 45, fill: '#2F3E28' }, // Olive
  { name: 'Тело', value: 25, fill: '#8F9F83' }, // Sage
  { name: 'Волосы', value: 15, fill: '#C5A66F' }, // Gold
  { name: 'Макияж', value: 10, fill: '#BC6C6C' }, // Muted Red
  { name: 'Дом', value: 5, fill: '#A3B19A' }, // Light Sage
];

// Helper to generate realistic detailed KP data
const getMockKPDetails = (totalKp: number, onlineShare: number, avgPerUnit: number): { clients: KPClientData[], trend: KPTrendData[], avgChange: number } => {
    const onlineKpTotal = totalKp * onlineShare;
    const offlineKpTotal = totalKp * (1 - onlineShare);

    // Client list as requested
    const clientsTemplate = [
        { name: 'Wildberries', type: 'Online', weight: 0.55 },
        { name: 'Ozon', type: 'Online', weight: 0.40 },
        { name: 'Яндекс Маркет', type: 'Online', weight: 0.05 },
        { name: 'Тандер (Магнит)', type: 'Offline', weight: 0.25 },
        { name: 'Золотое Яблоко', type: 'Offline', weight: 0.15 },
        { name: 'Подружка', type: 'Offline', weight: 0.12 },
        { name: 'Рив Гош', type: 'Offline', weight: 0.08 },
        { name: 'Улыбка Радуги', type: 'Offline', weight: 0.10 },
        { name: 'Пятерочка', type: 'Offline', weight: 0.08 },
        { name: 'Перекресток', type: 'Offline', weight: 0.05 },
        { name: 'Лента', type: 'Offline', weight: 0.05 },
        { name: 'Парфюм Лидер', type: 'Offline', weight: 0.04 },
        { name: 'Дистрибьюторы', type: 'Offline', weight: 0.03 },
        { name: 'Аптеки', type: 'Offline', weight: 0.03 },
        { name: 'СНГ', type: 'Offline', weight: 0.01 },
        { name: 'Прочие сети', type: 'Offline', weight: 0.01 },
    ];

    const clients: KPClientData[] = clientsTemplate.map(c => {
        const baseTotal = c.type === 'Online' ? onlineKpTotal : offlineKpTotal;
        const val = baseTotal * c.weight;
        return {
            name: c.name,
            channel: c.type as 'Online' | 'Offline',
            kpValue: parseFloat(val.toFixed(1)),
            kpPerUnit: Math.round(avgPerUnit * (c.type === 'Online' ? 1.1 : 0.9) + (Math.random() * 20 - 10)),
            sharePercent: parseFloat(((val / totalKp) * 100).toFixed(1))
        };
    }).sort((a, b) => b.kpValue - a.kpValue); // Sort by absolute KP value descending

    // Trend Data (6 months)
    const months = ['Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя'];
    const trend: KPTrendData[] = months.map((m, i) => {
        const growthFactor = 1 + (i * 0.05); // Slight growth trend
        return {
            month: m,
            onlineKP: parseFloat((onlineKpTotal * 0.8 * growthFactor + (Math.random() * 10)).toFixed(1)),
            offlineKP: parseFloat((offlineKpTotal * 0.9 * (1 + i * 0.02) + (Math.random() * 5)).toFixed(1))
        };
    });

    return { clients, trend, avgChange: parseFloat((Math.random() * 10 - 2).toFixed(1)) };
};

// Helper to generate Manager Profile (FIFA Stats)
const calculateManagerProfile = (go: any): ManagerProfile => {
    // 1. MP Score: Based on Ratings and Online Share
    const ratingAvg = (parseFloat(go.ratingWB) + parseFloat(go.ratingOzon)) / 2;
    const mpScore = Math.min(99, Math.round(ratingAvg * 20)); 

    // 2. Chains Score: Based on Offline Share (inverse relation to MP for balance) or pure performance
    // If shareOffline is low, score might be lower, but we also check KP per unit off
    const shareOff = parseFloat(go.shareOffline) / 100;
    const chainsScore = Math.min(99, Math.round(70 + (shareOff * 30)));

    // 3. Promotion: Reach Fact vs Plan
    const reachPercent = go.reachFact / go.reachPlan;
    const promoScore = Math.min(99, Math.round(reachPercent * 95));

    // 4. Planning: Plan Completion
    const planScore = Math.min(99, Math.round(go.planCompletion));

    // 5. Operations: Turnover (Lower is better but not too low). Optimal ~45
    const turnoverAvg = (go.turnoverWB + go.turnoverOzon) / 2;
    // Score peaks at 45. 
    const opScore = Math.min(99, Math.round(100 - Math.abs(turnoverAvg - 45)));

    // 6. Discipline: Random high value as it's subjective usually
    const discScore = Math.floor(Math.random() * (99 - 85 + 1) + 85);

    // 7. Benevolence (Доброжелательность): Random high value
    const benevolenceScore = Math.floor(Math.random() * (99 - 88 + 1) + 88);

    const skills = [
        { name: 'Работа с МП', score: mpScore },
        { name: 'Работа с Сетями', score: chainsScore },
        { name: 'Продвижение', score: promoScore },
        { name: 'Операц. работа', score: opScore },
        { name: 'Планирование', score: planScore },
        { name: 'Дисциплина', score: discScore },
        { name: 'Доброжелательность', score: benevolenceScore },
    ];

    const overallScore = Math.round(skills.reduce((acc, curr) => acc + curr.score, 0) / skills.length);

    return { overallScore, skills };
};


const RAW_GO_DATA = [
  // 1. Лицо (Face) - Sales 650M
  { 
    id: '2', name: 'Лицо', managerName: 'Любовь',
    managerImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', categoryIcon: Smile,
    sales: '650', salesChange: '5.2%', isSalesGrowth: true,
    kp: '234', kpPercent: '36.0%', kpChange: '+1.2 п.п.', isKpGrowth: true,
    planToDateLabel: '113%', planCompletion: 85, planToDatePercent: 75,
    goShare: '26%', skuCount: 145,
    focusSkuCount: 45, focusSkuShare: '72%',
    ratingWB: '4.92', ratingWBChange: 0.02,
    ratingOzon: '4.85', ratingOzonChange: 0.05,
    shareWB: '4.5%', shareWBChange: 1.2,
    shareOzon: '3.8%', shareOzonChange: -0.3,
    turnoverWB: 45, turnoverWBChange: -2.5,
    turnoverOzon: 38, turnoverOzonChange: 1.2,
    salesSplitWB: '55%', salesSplitOzon: '45%',
    shareOnline: '72%', shareOffline: '28%',
    smmBudgetFact: '18.5', smmBudgetPlan: '19.5',
    reachFact: 835000, reachPlan: 973000, cpv: '0.58',
    funnelWB: { impressions: { value: 12500000, change: 12.5 }, clicks: { value: 600000, change: 13.1 }, ctr: { value: 4.8, change: 0.5 }, cr1: { value: 22.5, change: 1.2 }, carts: { value: 45000, change: 8.4 }, orders: { value: 15750, change: 8.9 }, avgPrice: { value: 650, change: 2.1 }, orderSum: { value: 10237500, change: 11.2 }, buyoutPercent: { value: 92.5, change: 0.5 }, cr2: { value: 35.0, change: 0.5 } },
    funnelOzon: { impressions: { value: 9800000, change: 5.2 }, clicks: { value: 411600, change: 4.9 }, ctr: { value: 4.2, change: -0.3 }, cr1: { value: 20.1, change: 0.8 }, carts: { value: 32000, change: 4.1 }, orders: { value: 10560, change: 4.5 }, avgPrice: { value: 680, change: 1.5 }, orderSum: { value: 7180800, change: 6.1 }, buyoutPercent: { value: 93.1, change: 0.2 }, cr2: { value: 33.0, change: 0.4 } }
  },
  // 2. Волосы (Hair) - Sales 500M
  { 
    id: '4', name: 'Волосы', managerName: 'Анастасия',
    managerImage: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', categoryIcon: Wind,
    sales: '500', salesChange: '3.8%', isSalesGrowth: true,
    kp: '160', kpPercent: '32.0%', kpChange: '-0.5 п.п.', isKpGrowth: false,
    planToDateLabel: '104%', planCompletion: 78, planToDatePercent: 75,
    goShare: '20%', skuCount: 98,
    focusSkuCount: 25, focusSkuShare: '65%',
    ratingWB: '4.81', ratingWBChange: -0.02,
    ratingOzon: '4.75', ratingOzonChange: 0.01,
    shareWB: '4.2%', shareWBChange: 0.5,
    shareOzon: '3.6%', shareOzonChange: 0.2,
    turnoverWB: 52, turnoverWBChange: 1.5,
    turnoverOzon: 45, turnoverOzonChange: -0.5,
    salesSplitWB: '60%', salesSplitOzon: '40%',
    shareOnline: '68%', shareOffline: '32%',
    smmBudgetFact: '14.2', smmBudgetPlan: '15.0',
    reachFact: 371000, reachPlan: 501000, cpv: '1.15',
    funnelWB: { impressions: { value: 8200000, change: 8.1 }, clicks: { value: 319800, change: 8.3 }, ctr: { value: 3.9, change: 0.2 }, cr1: { value: 18.5, change: -1.5 }, carts: { value: 28000, change: 2.2 }, orders: { value: 9240, change: 2.5 }, avgPrice: { value: 450, change: 1.0 }, orderSum: { value: 4158000, change: 3.5 }, buyoutPercent: { value: 91.8, change: -0.2 }, cr2: { value: 33.0, change: 0.3 } },
    funnelOzon: { impressions: { value: 6100000, change: 4.5 }, clicks: { value: 213500, change: 4.6 }, ctr: { value: 3.5, change: 0.1 }, cr1: { value: 17.2, change: 0.5 }, carts: { value: 21000, change: 3.8 }, orders: { value: 6720, change: 4.0 }, avgPrice: { value: 460, change: 0.5 }, orderSum: { value: 3091200, change: 4.5 }, buyoutPercent: { value: 92.5, change: 0.1 }, cr2: { value: 32.0, change: 0.2 } }
  },
  // 3. Тело (Body) - Sales 400M
  { 
    id: '3', name: 'Тело', managerName: 'Ирина',
    managerImage: 'https://i.pravatar.cc/150?u=a042581f4e29026703d', categoryIcon: User,
    sales: '400', salesChange: '1.5%', isSalesGrowth: true,
    kp: '120', kpPercent: '30.0%', kpChange: '-1.2 п.п.', isKpGrowth: false,
    planToDateLabel: '109%', planCompletion: 82, planToDatePercent: 75,
    goShare: '16%', skuCount: 112,
    focusSkuCount: 32, focusSkuShare: '68%',
    ratingWB: '4.90', ratingWBChange: 0.00,
    ratingOzon: '4.82', ratingOzonChange: -0.03,
    shareWB: '4.3%', shareWBChange: -0.2,
    shareOzon: '3.5%', shareOzonChange: 0.1,
    turnoverWB: 60, turnoverWBChange: 5.2,
    turnoverOzon: 50, turnoverOzonChange: 2.1,
    salesSplitWB: '52%', salesSplitOzon: '48%',
    shareOnline: '75%', shareOffline: '25%',
    smmBudgetFact: '11.8', smmBudgetPlan: '12.0',
    reachFact: 475000, reachPlan: 536000, cpv: '1.18',
    funnelWB: { impressions: { value: 7500000, change: -2.5 }, clicks: { value: 337500, change: -3.3 }, ctr: { value: 4.5, change: -0.8 }, cr1: { value: 21.0, change: 0.5 }, carts: { value: 26000, change: -1.2 }, orders: { value: 9100, change: -1.0 }, avgPrice: { value: 550, change: 2.2 }, orderSum: { value: 5005000, change: 1.2 }, buyoutPercent: { value: 93.5, change: 0.8 }, cr2: { value: 35.0, change: 0.2 } },
    funnelOzon: { impressions: { value: 6900000, change: 3.1 }, clicks: { value: 282900, change: 3.3 }, ctr: { value: 4.1, change: 0.2 }, cr1: { value: 19.8, change: 1.2 }, carts: { value: 24500, change: 4.5 }, orders: { value: 8330, change: 4.8 }, avgPrice: { value: 560, change: 1.8 }, orderSum: { value: 4664800, change: 6.7 }, buyoutPercent: { value: 93.8, change: 0.5 }, cr2: { value: 34.0, change: 0.3 } }
  },
  // 4. Мейкап (Makeup) - Sales 300M
  { 
    id: '5', name: 'Мейкап', managerName: 'Алина',
    managerImage: 'https://i.pravatar.cc/150?u=a042581f4e29026702d', categoryIcon: Palette,
    sales: '300', salesChange: '2.1%', isSalesGrowth: false,
    kp: '102', kpPercent: '34.0%', kpChange: '+0.5 п.п.', isKpGrowth: true,
    planToDateLabel: '99%', planCompletion: 74, planToDatePercent: 75,
    goShare: '12%', skuCount: 210,
    focusSkuCount: 40, focusSkuShare: '55%',
    ratingWB: '4.75', ratingWBChange: 0.05,
    ratingOzon: '4.68', ratingOzonChange: 0.04,
    shareWB: '3.9%', shareWBChange: 0.3,
    shareOzon: '3.2%', shareOzonChange: 0.1,
    turnoverWB: 90, turnoverWBChange: 12.5,
    turnoverOzon: 85, turnoverOzonChange: 10.1,
    salesSplitWB: '70%', salesSplitOzon: '30%',
    shareOnline: '85%', shareOffline: '15%',
    smmBudgetFact: '9.5', smmBudgetPlan: '9.0',
    reachFact: 473000, reachPlan: 588000, cpv: '0.33',
    funnelWB: { impressions: { value: 9100000, change: 15.2 }, clicks: { value: 473200, change: 16.5 }, ctr: { value: 5.2, change: 1.1 }, cr1: { value: 16.5, change: 2.5 }, carts: { value: 35000, change: 18.5 }, orders: { value: 10500, change: 19.1 }, avgPrice: { value: 850, change: -1.5 }, orderSum: { value: 8925000, change: 17.3 }, buyoutPercent: { value: 90.5, change: -0.5 }, cr2: { value: 30.0, change: 0.5 } },
    funnelOzon: { impressions: { value: 3200000, change: 1.2 }, clicks: { value: 128000, change: 1.1 }, ctr: { value: 4.0, change: -0.1 }, cr1: { value: 15.8, change: 0.2 }, carts: { value: 9500, change: 1.5 }, orders: { value: 2660, change: 1.8 }, avgPrice: { value: 880, change: -0.5 }, orderSum: { value: 2340800, change: 1.3 }, buyoutPercent: { value: 91.2, change: 0.1 }, cr2: { value: 28.0, change: 0.3 } }
  },
  // 5. LAB - Sales 200M
  { 
    id: '7', name: 'LAB', managerName: 'Надежда',
    managerImage: 'https://i.pravatar.cc/150?u=a042581f4e29026701d', categoryIcon: FlaskConical,
    sales: '200', salesChange: '12.5%', isSalesGrowth: true,
    kp: '66', kpPercent: '33.0%', kpChange: '+2.1 п.п.', isKpGrowth: true,
    planToDateLabel: '80%', planCompletion: 60, planToDatePercent: 75,
    goShare: '8%', skuCount: 45,
    focusSkuCount: 10, focusSkuShare: '80%',
    ratingWB: '4.62', ratingWBChange: -0.02,
    ratingOzon: '4.55', ratingOzonChange: 0.01,
    shareWB: '3.5%', shareWBChange: 0.5,
    shareOzon: '2.8%', shareOzonChange: 0.2,
    turnoverWB: 35, turnoverWBChange: -5.5,
    turnoverOzon: 30, turnoverOzonChange: -2.1,
    salesSplitWB: '50%', salesSplitOzon: '50%',
    shareOnline: '92%', shareOffline: '8%',
    smmBudgetFact: '5.1', smmBudgetPlan: '6.0',
    reachFact: 837000, reachPlan: 913000, cpv: '0.34',
    funnelWB: { impressions: { value: 2500000, change: 22.5 }, clicks: { value: 80000, change: 23.1 }, ctr: { value: 3.2, change: 0.5 }, cr1: { value: 14.5, change: 3.2 }, carts: { value: 8200, change: 25.1 }, orders: { value: 3280, change: 26.5 }, avgPrice: { value: 1250, change: 1.5 }, orderSum: { value: 4100000, change: 28.4 }, buyoutPercent: { value: 92.8, change: 0.5 }, cr2: { value: 40.0, change: 1.1 } },
    funnelOzon: { impressions: { value: 2400000, change: 18.2 }, clicks: { value: 72000, change: 18.6 }, ctr: { value: 3.0, change: 0.4 }, cr1: { value: 13.8, change: 2.8 }, carts: { value: 7900, change: 21.5 }, orders: { value: 3002, change: 22.1 }, avgPrice: { value: 1280, change: 1.1 }, orderSum: { value: 3842560, change: 23.4 }, buyoutPercent: { value: 93.0, change: 0.4 }, cr2: { value: 38.0, change: 0.5 } }
  },
  // 6. Улыбка (Smile) - Sales 150M
  { 
    id: '8', name: 'Улыбка', managerName: 'Марина',
    managerImage: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', categoryIcon: Smile,
    sales: '150', salesChange: '0.5%', isSalesGrowth: true,
    kp: '45', kpPercent: '30.0%', kpChange: '-0.8 п.п.', isKpGrowth: false,
    planToDateLabel: '101%', planCompletion: 76, planToDatePercent: 75,
    goShare: '6%', skuCount: 32,
    focusSkuCount: 8, focusSkuShare: '62%',
    ratingWB: '4.82', ratingWBChange: 0.01,
    ratingOzon: '4.78', ratingOzonChange: 0.02,
    shareWB: '4.0%', shareWBChange: -0.1,
    shareOzon: '3.4%', shareOzonChange: 0.1,
    turnoverWB: 42, turnoverWBChange: 1.5,
    turnoverOzon: 40, turnoverOzonChange: 0.5,
    salesSplitWB: '45%', salesSplitOzon: '55%',
    shareOnline: '60%', shareOffline: '40%',
    smmBudgetFact: '4.4', smmBudgetPlan: '4.5',
    reachFact: 555000, reachPlan: 863000, cpv: '1.37',
    funnelWB: { impressions: { value: 1800000, change: -5.2 }, clicks: { value: 50400, change: -5.4 }, ctr: { value: 2.8, change: -0.2 }, cr1: { value: 12.5, change: -1.5 }, carts: { value: 4500, change: -6.8 }, orders: { value: 1125, change: -7.5 }, avgPrice: { value: 350, change: 0.5 }, orderSum: { value: 393750, change: -7.0 }, buyoutPercent: { value: 91.5, change: 0.1 }, cr2: { value: 25.0, change: -0.7 } },
    funnelOzon: { impressions: { value: 2100000, change: 1.5 }, clicks: { value: 60900, change: 1.6 }, ctr: { value: 2.9, change: 0.1 }, cr1: { value: 13.1, change: 0.5 }, carts: { value: 5200, change: 2.1 }, orders: { value: 1404, change: 2.5 }, avgPrice: { value: 360, change: 0.2 }, orderSum: { value: 505440, change: 2.7 }, buyoutPercent: { value: 92.1, change: -0.1 }, cr2: { value: 27.0, change: 0.4 } }
  },
  // 7. Бады (Supplements) - Sales 100M
  { 
    id: '9', name: 'Бады', managerName: 'Екатерина',
    managerImage: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', categoryIcon: Pill,
    sales: '100', salesChange: '3.2%', isSalesGrowth: false,
    kp: '28', kpPercent: '28.0%', kpChange: '-2.5 п.п.', isKpGrowth: false,
    planToDateLabel: '87%', planCompletion: 65, planToDatePercent: 75,
    goShare: '4%', skuCount: 28,
    focusSkuCount: 6, focusSkuShare: '75%',
    ratingWB: '4.70', ratingWBChange: -0.05,
    ratingOzon: '4.65', ratingOzonChange: -0.02,
    shareWB: '3.8%', shareWBChange: 0.2,
    shareOzon: '3.0%', shareOzonChange: 0.3,
    turnoverWB: 55, turnoverWBChange: 4.2,
    turnoverOzon: 48, turnoverOzonChange: 2.5,
    salesSplitWB: '30%', salesSplitOzon: '70%',
    shareOnline: '95%', shareOffline: '5%',
    smmBudgetFact: '2.8', smmBudgetPlan: '3.0',
    reachFact: 579000, reachPlan: 694000, cpv: '1.13',
    funnelWB: { impressions: { value: 950000, change: 4.2 }, clicks: { value: 33250, change: 4.5 }, ctr: { value: 3.5, change: 0.2 }, cr1: { value: 11.5, change: 0.5 }, carts: { value: 2800, change: 5.5 }, orders: { value: 980, change: 6.2 }, avgPrice: { value: 1500, change: 1.2 }, orderSum: { value: 1470000, change: 7.5 }, buyoutPercent: { value: 93.2, change: 0.2 }, cr2: { value: 35.0, change: 0.7 } },
    funnelOzon: { impressions: { value: 1900000, change: 6.8 }, clicks: { value: 72200, change: 7.3 }, ctr: { value: 3.8, change: 0.4 }, cr1: { value: 12.2, change: 1.1 }, carts: { value: 6100, change: 7.2 }, orders: { value: 2196, change: 7.8 }, avgPrice: { value: 1550, change: 0.8 }, orderSum: { value: 3403800, change: 8.6 }, buyoutPercent: { value: 93.5, change: 0.3 }, cr2: { value: 36.0, change: 0.6 } }
  },
  // 8. Парфюм (Perfume) - Sales 80M
  { 
    id: '10', name: 'Парфюм', managerName: 'Светлана',
    managerImage: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', categoryIcon: Gem,
    sales: '80', salesChange: '8.4%', isSalesGrowth: true,
    kp: '32', kpPercent: '40.0%', kpChange: '+3.0 п.п.', isKpGrowth: true,
    planToDateLabel: '120%', planCompletion: 90, planToDatePercent: 75,
    goShare: '3%', skuCount: 15,
    focusSkuCount: 5, focusSkuShare: '90%',
    ratingWB: '4.95', ratingWBChange: 0.01,
    ratingOzon: '4.92', ratingOzonChange: 0.01,
    shareWB: '4.1%', shareWBChange: 0.4,
    shareOzon: '3.5%', shareOzonChange: 0.3,
    turnoverWB: 65, turnoverWBChange: 8.2,
    turnoverOzon: 60, turnoverOzonChange: 7.5,
    salesSplitWB: '55%', salesSplitOzon: '45%',
    shareOnline: '45%', shareOffline: '55%',
    smmBudgetFact: '2.5', smmBudgetPlan: '2.4',
    reachFact: 704000, reachPlan: 901000, cpv: '1.42',
    funnelWB: { impressions: { value: 1100000, change: 10.5 }, clicks: { value: 60500, change: 11.2 }, ctr: { value: 5.5, change: 0.8 }, cr1: { value: 19.5, change: 2.2 }, carts: { value: 3800, change: 12.4 }, orders: { value: 1140, change: 13.5 }, avgPrice: { value: 950, change: 1.5 }, orderSum: { value: 1083000, change: 15.2 }, buyoutPercent: { value: 92.0, change: 0.5 }, cr2: { value: 30.0, change: 0.9 } },
    funnelOzon: { impressions: { value: 950000, change: 8.2 }, clicks: { value: 48450, change: 9.1 }, ctr: { value: 5.1, change: 0.6 }, cr1: { value: 18.2, change: 1.5 }, carts: { value: 3100, change: 9.8 }, orders: { value: 868, change: 10.5 }, avgPrice: { value: 980, change: 1.2 }, orderSum: { value: 850640, change: 11.8 }, buyoutPercent: { value: 92.5, change: 0.2 }, cr2: { value: 28.0, change: 0.6 } }
  },
  // 9. Уход за домом (Home) - Sales 46M
  { 
    id: '6', name: 'Уход за домом', managerName: 'Ольга',
    managerImage: 'https://i.pravatar.cc/150?u=a042581f4e29026708d', categoryIcon: Home,
    sales: '46', salesChange: '1.2%', isSalesGrowth: false,
    kp: '11.5', kpPercent: '25.0%', kpChange: '-1.8 п.п.', isKpGrowth: false,
    planToDateLabel: '95%', planCompletion: 71.5, planToDatePercent: 75,
    goShare: '2%', skuCount: 55,
    focusSkuCount: 12, focusSkuShare: '58%',
    ratingWB: '4.52', ratingWBChange: -0.08,
    ratingOzon: '4.45', ratingOzonChange: -0.05,
    shareWB: '3.2%', shareWBChange: -0.1,
    shareOzon: '2.5%', shareOzonChange: 0.0,
    turnoverWB: 75, turnoverWBChange: 12.5,
    turnoverOzon: 70, turnoverOzonChange: 11.2,
    salesSplitWB: '40%', salesSplitOzon: '60%',
    shareOnline: '35%', shareOffline: '65%',
    smmBudgetFact: '1.2', smmBudgetPlan: '1.4',
    reachFact: 731000, reachPlan: 1100000, cpv: '1.25',
    funnelWB: { impressions: { value: 450000, change: -1.2 }, clicks: { value: 11250, change: -1.5 }, ctr: { value: 2.5, change: -0.1 }, cr1: { value: 9.5, change: -0.5 }, carts: { value: 1200, change: -2.5 }, orders: { value: 240, change: -3.5 }, avgPrice: { value: 320, change: 1.5 }, orderSum: { value: 76800, change: -2.1 }, buyoutPercent: { value: 90.5, change: -0.2 }, cr2: { value: 20.0, change: -0.8 } },
    funnelOzon: { impressions: { value: 620000, change: 2.5 }, clicks: { value: 17360, change: 2.8 }, ctr: { value: 2.8, change: 0.2 }, cr1: { value: 10.2, change: 0.4 }, carts: { value: 1800, change: 3.2 }, orders: { value: 396, change: 3.8 }, avgPrice: { value: 330, change: 1.1 }, orderSum: { value: 130680, change: 4.9 }, buyoutPercent: { value: 91.0, change: 0.1 }, cr2: { value: 22.0, change: 0.6 } }
  },
  // 10. Sammy Beauty - Sales 34M
  { 
    id: '1', name: 'Sammy Beauty', managerName: 'Полина',
    managerImage: 'https://i.pravatar.cc/150?u=a042581f4e29026709d', categoryIcon: Crown,
    sales: '34', salesChange: '15.0%', isSalesGrowth: true,
    kp: '10.2', kpPercent: '30.0%', kpChange: '+1.5 п.п.', isKpGrowth: true,
    planToDateLabel: '127%', planCompletion: 95, planToDatePercent: 75,
    goShare: '1.5%', skuCount: 85,
    focusSkuCount: 25, focusSkuShare: '85%',
    ratingWB: '4.98', ratingWBChange: 0.02,
    ratingOzon: '4.95', ratingOzonChange: 0.03,
    shareWB: '5.2%', shareWBChange: 0.8,
    shareOzon: '4.8%', shareOzonChange: 0.5,
    turnoverWB: 28, turnoverWBChange: -15.5,
    turnoverOzon: 25, turnoverOzonChange: -12.2,
    salesSplitWB: '80%', salesSplitOzon: '20%',
    shareOnline: '88%', shareOffline: '12%',
    smmBudgetFact: '1.1', smmBudgetPlan: '1.0',
    reachFact: 674000, reachPlan: 1000000, cpv: '0.68',
    funnelWB: { impressions: { value: 550000, change: 25.2 }, clicks: { value: 34100, change: 26.8 }, ctr: { value: 6.2, change: 1.5 }, cr1: { value: 25.5, change: 4.2 }, carts: { value: 2500, change: 28.5 }, orders: { value: 1000, change: 30.1 }, avgPrice: { value: 1800, change: 2.5 }, orderSum: { value: 1800000, change: 33.3 }, buyoutPercent: { value: 93.5, change: 0.5 }, cr2: { value: 40.0, change: 1.2 } },
    funnelOzon: { impressions: { value: 120000, change: 10.5 }, clicks: { value: 6960, change: 11.8 }, ctr: { value: 5.8, change: 1.2 }, cr1: { value: 24.2, change: 3.5 }, carts: { value: 600, change: 12.2 }, orders: { value: 228, change: 13.5 }, avgPrice: { value: 1850, change: 1.8 }, orderSum: { value: 421800, change: 15.5 }, buyoutPercent: { value: 93.8, change: 0.2 }, cr2: { value: 38.0, change: 1.1 } }
  },
];

// Enrich data
export const GO_PERFORMANCE_DATA: GOPerformanceData[] = RAW_GO_DATA.map(go => {
    const kp = parseFloat(go.kp);
    const onlineShare = parseFloat(go.shareOnline) / 100;
    const avgKpPerUnit = 150 + Math.round(Math.random() * 50);
    const { clients, trend, avgChange } = getMockKPDetails(kp, onlineShare, avgKpPerUnit); 
    
    // Generate mock specific KP per unit values
    const avgKpPerUnitOnline = Math.round(avgKpPerUnit * (1.1 + Math.random() * 0.2));
    const avgKpPerUnitOffline = Math.round(avgKpPerUnit * (0.8 + Math.random() * 0.2));

    // Calculate Manager Profile
    const profile = calculateManagerProfile(go);

    return {
        ...go,
        managerProfile: profile,
        kpDetailsClients: clients,
        kpDetailsTrend: trend,
        avgKpPerUnit: avgKpPerUnit,
        avgKpPerUnitChange: avgChange,
        avgKpPerUnitOnline: avgKpPerUnitOnline,
        avgKpPerUnitOnlineChange: parseFloat((Math.random() * 5 - 1).toFixed(1)),
        avgKpPerUnitOffline: avgKpPerUnitOffline,
        avgKpPerUnitOfflineChange: parseFloat((Math.random() * 5 - 2).toFixed(1)),
    };
});
