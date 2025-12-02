import React from 'react';
import { KPIMetric } from '../types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface KPICardProps {
  metric: KPIMetric;
}

export const KPICard: React.FC<KPICardProps> = ({ metric }) => {
  const Icon = metric.icon;
  // Use muted earthy colors for trends
  const trendColor = metric.isPositive ? 'text-[#4A6741] dark:text-[#8F9F83]' : 'text-[#BC6C6C] dark:text-[#E08A8A]'; 

  // Determine progress bar color based on prop or fallback to default trend logic
  const getBarColor = (color?: string) => {
    switch(color) {
        case 'green': return 'bg-[#607d53] dark:bg-[#7FA36F]'; // distinct olive green
        case 'yellow': return 'bg-[#D4B483] dark:bg-[#E5C492]'; // gold/mustard
        case 'red': return 'bg-[#C77D7D] dark:bg-[#D98F8F]'; // muted red
        default: return metric.isPositive ? 'bg-[#8F9F83]' : 'bg-[#BC6C6C]';
    }
  }
  const barColor = getBarColor(metric.progressBarColor);

  const renderGauge = () => {
     if (metric.visualizationType !== 'gauge' || !metric.gaugeMin || !metric.gaugeMax || !metric.gaugeValue) return null;

     // Gauge Config for "Flatter" Arc
     const width = 180;
     const height = 80;
     const cx = width / 2;
     const cy = height + 15;
     const r = 80;
     
     const startAngle = 150;
     const endAngle = 30;
     
     const minVal = metric.gaugeMin;
     const maxVal = metric.gaugeMax;
     const val = metric.gaugeValue;
     
     const totalAngleSpan = startAngle - endAngle;
     const valRange = maxVal - minVal;
     const percent = (val - minVal) / valRange;
     const clampedPercent = Math.max(0, Math.min(1, percent));
     
     const currentAngle = startAngle - (clampedPercent * totalAngleSpan);

     // Helper to get coordinates
     const getCoords = (angleDeg: number, radius: number) => {
         const rad = (angleDeg * Math.PI) / 180;
         return {
             x: cx + radius * Math.cos(rad),
             y: cy - radius * Math.sin(rad) // SVG Y is down
         };
     };

     const start = getCoords(startAngle, r);
     const end = getCoords(endAngle, r);
     
     const trackPath = `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`;

     const needleLen = r - 15;
     const needleEnd = getCoords(currentAngle, needleLen);
     
     const planStart = getCoords(90, r - 5);
     const planEnd = getCoords(90, r + 5);

     return (
        <div className="flex items-center h-full w-full gap-4">
            {/* Left: Digital Display */}
            <div className="w-1/2 flex flex-col justify-center pl-1">
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-[#2C2C2C] dark:text-[#E0E0E0]">{metric.value}</span>
                </div>
                
                {/* Trend */}
                <div className={`flex items-center gap-1 text-xs font-bold mb-3 ${trendColor}`}>
                    {metric.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    <span>{metric.change}</span>
                </div>

                {/* Deviation Badge */}
                <div className={`text-[10px] font-bold px-2 py-1 rounded-md w-fit mb-1 ${metric.isPositive ? 'bg-[#8F9F83]/20 text-[#4A6741] dark:text-[#8F9F83]' : 'bg-[#BC6C6C]/20 text-[#BC6C6C] dark:text-[#E08A8A]'}`}>
                    {metric.progressLabel}
                </div>
                
                {/* Fact Label */}
                <div className="text-xs text-[#5D5D5D] dark:text-[#A3B19A] mt-1">
                    Факт: <span className="font-semibold">{metric.value}</span>
                </div>
            </div>

            {/* Right: Graphic */}
            <div className="w-1/2 flex justify-center items-center relative -mt-4">
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#BC6C6C" />
                            <stop offset="45%" stopColor="#D4B483" />
                            <stop offset="100%" stopColor="#607d53" />
                        </linearGradient>
                    </defs>
                    
                    {/* Background Track */}
                    <path d={trackPath} fill="none" stroke="#E5E0D8" className="dark:stroke-olive-700" strokeWidth="12" strokeLinecap="round" />
                    
                    {/* Colored Track */}
                    <path d={trackPath} fill="none" stroke="url(#gaugeGradient)" strokeWidth="12" strokeLinecap="round" />

                    {/* Target Marker */}
                    <line x1={planStart.x} y1={planStart.y} x2={planEnd.x} y2={planEnd.y} stroke="#2C2C2C" className="dark:stroke-[#E0E0E0]" strokeWidth="2" />
                    
                    {/* Plan Label 34% */}
                    <text x={planEnd.x} y={planEnd.y - 8} textAnchor="middle" fontSize="10" fill="currentColor" className="text-[#2C2C2C] dark:text-[#E0E0E0]" fontWeight="bold">34%</text>

                    {/* Min/Max Labels */}
                    <text x={start.x - 10} y={start.y + 15} textAnchor="start" fontSize="9" fill="#8F9F83" fontWeight="bold">29%</text>
                    <text x={start.x - 10} y={start.y + 25} textAnchor="start" fontSize="8" fill="#5D5D5D" className="opacity-70 dark:fill-[#A3B19A]">-5 п.п.</text>

                    <text x={end.x + 10} y={end.y + 15} textAnchor="end" fontSize="9" fill="#8F9F83" fontWeight="bold">39%</text>
                    <text x={end.x + 10} y={end.y + 25} textAnchor="end" fontSize="8" fill="#5D5D5D" className="opacity-70 dark:fill-[#A3B19A]">+5 п.п.</text>

                    {/* Needle Pivot */}
                    <circle cx={cx} cy={cy} r="4" fill="currentColor" className="text-[#2C2C2C] dark:text-[#E0E0E0]" />
                    {/* Needle */}
                    <path d={`M ${cx} ${cy-3} L ${needleEnd.x} ${needleEnd.y} L ${cx} ${cy+3} Z`} fill="currentColor" className="text-[#2C2C2C] dark:text-[#E0E0E0]" />
                </svg>
            </div>
        </div>
     );
  }

  // Gauge Layout
  if (metric.visualizationType === 'gauge') {
      return (
        <div className="bg-white dark:bg-olive-800 rounded-2xl p-6 border border-[#E5E0D8] dark:border-olive-700 flex flex-col h-full hover:border-[#C5A66F] dark:hover:border-[#C5A66F] hover:shadow-lg hover:shadow-[#2F3E28]/5 dark:hover:shadow-black/20 transition-all duration-300">
             <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-[#5D5D5D] dark:text-[#A3B19A] text-sm font-semibold tracking-wide uppercase mb-1">{metric.title}</h3>
                    {metric.subtitle && <span className="text-[#8F9F83] text-xs font-medium">{metric.subtitle}</span>}
                </div>
                <div className="p-2.5 bg-[#F2F0EB] dark:bg-olive-900 rounded-xl text-[#2F3E28] dark:text-[#C5A66F]">
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
                {renderGauge()}
            </div>
        </div>
      );
  }

  return (
    <div className="bg-white dark:bg-olive-800 rounded-2xl p-6 border border-[#E5E0D8] dark:border-olive-700 flex flex-col justify-between h-full hover:border-[#C5A66F] dark:hover:border-[#C5A66F] hover:shadow-lg hover:shadow-[#2F3E28]/5 dark:hover:shadow-black/20 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-[#5D5D5D] dark:text-[#A3B19A] text-sm font-semibold tracking-wide uppercase mb-1">{metric.title}</h3>
          {metric.subtitle && <span className="text-[#8F9F83] text-xs font-medium">{metric.subtitle}</span>}
        </div>
        <div className="p-2.5 bg-[#F2F0EB] dark:bg-olive-900 rounded-xl text-[#2F3E28] dark:text-[#C5A66F]">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#2C2C2C] dark:text-[#E0E0E0]">{metric.value}</span>
          {metric.unit && <span className="text-lg text-[#8F9F83] font-medium">{metric.unit}</span>}
        </div>
      </div>

      <div className={`flex items-center gap-1.5 text-xs font-bold mb-6 ${trendColor} bg-[#F9F8F6] dark:bg-olive-900 px-2 py-1 rounded-lg w-fit`}>
        {metric.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
        <span>{metric.change}</span>
      </div>

      {metric.hasProgressBar && (
        <div className="mt-auto">
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span className={trendColor}>{metric.progressLabel}</span>
            {metric.progressRightLabel && <span className="text-[#2C2C2C] dark:text-[#E0E0E0]">{metric.progressRightLabel}</span>}
          </div>
          
          <div className="w-full bg-[#E5E0D8] dark:bg-olive-700 rounded-full h-2 mb-2 relative overflow-visible"> 
            {/* Background track wrapper */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full ${barColor}`} 
                    style={{ width: `${metric.fillPercentage}%` }}
                ></div>
            </div>
            
            {/* Target Marker */}
            <div 
                className="absolute top-1/2 -translate-y-1/2 w-[4px] bg-[#2C2C2C] dark:bg-[#E0E0E0] h-4 z-20 rounded-full border border-white dark:border-olive-800 shadow-md" 
                style={{ left: `${metric.targetPosition}%` }}
            ></div>
          </div>
          
          {(metric.planLabel || metric.planValue) && (
            <div className="flex justify-end text-xs text-[#5D5D5D] dark:text-[#A3B19A] font-medium">
              <span>{metric.planLabel}{metric.planValue ? `: ${metric.planValue}` : ''}</span>
            </div>
          )}
        </div>
      )}
      
      {!metric.hasProgressBar && (
           <div className="mt-auto pt-8"></div>
      )}
    </div>
  );
};