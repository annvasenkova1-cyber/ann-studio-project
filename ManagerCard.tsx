import React, { useEffect, useState } from 'react';
import { GOPerformanceData, HRTask } from '../types';
import { generateHRDevelopmentPlan } from '../services/geminiService';
import { Loader2, Plus, Sparkles, User, Trophy, Zap, Brain, Briefcase, Calendar, CheckCircle2, Crown, X, Heart } from 'lucide-react';

interface ManagerCardProps {
  manager: GOPerformanceData;
  isOpen: boolean; 
  onClose: () => void;
}

export const ManagerCard: React.FC<ManagerCardProps> = ({ manager, isOpen, onClose }) => {
  const [advice, setAdvice] = useState<string>('');
  const [tasks, setTasks] = useState<HRTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [assignedTaskIndex, setAssignedTaskIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && manager.managerProfile) {
        setIsLoading(true);
        generateHRDevelopmentPlan(manager.managerProfile, manager.managerName).then(data => {
            setAdvice(data.advice);
            setTasks(data.tasks);
            setIsLoading(false);
        });
    } else if (!isOpen) {
        // Reset state on close
        setAdvice('');
        setTasks([]);
        setAssignedTaskIndex(null);
    }
  }, [manager, isOpen]);

  const handleAssignTask = (index: number) => {
      setAssignedTaskIndex(index);
      setTimeout(() => {
          alert("Задача отправлена в HR отдел");
      }, 500);
  };

  if (!isOpen) return null;

  const profile = manager.managerProfile!;
  
  // Dynamic color for rating
  const getRatingColor = (score: number) => {
      if (score >= 90) return 'text-[#C5A66F]'; // Gold
      if (score >= 80) return 'text-[#4A6741] dark:text-[#8F9F83]'; // Green
      return 'text-[#5D5D5D] dark:text-[#A3B19A]';
  };

  const getSkillIcon = (name: string) => {
      if (name.includes('МП')) return <Zap className="w-3 h-3" />;
      if (name.includes('Сетями')) return <Briefcase className="w-3 h-3" />;
      if (name.includes('Продвижение')) return <Trophy className="w-3 h-3" />;
      if (name.includes('Операц')) return <Brain className="w-3 h-3" />;
      if (name.includes('Планирование')) return <Calendar className="w-3 h-3" />;
      if (name.includes('Доброжелательность')) return <Heart className="w-3 h-3 text-[#C5A66F]" />;
      return <CheckCircle2 className="w-3 h-3" />;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
            className="absolute inset-0 bg-[#2F3E28]/70 dark:bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={onClose}
        ></div>

        {/* Modal Card - Glassmorphism + FIFA Style */}
        <div className="relative w-full max-w-[360px] bg-gradient-to-b from-[#F9F8F6] to-[#E5E0D8] dark:from-olive-800 dark:to-olive-900 rounded-[2rem] border-[3px] border-[#C5A66F] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* Header Title Bar */}
            <div className="absolute top-0 inset-x-0 h-12 flex justify-center items-center z-20">
                <div className="bg-[#2F3E28] dark:bg-gold-600 text-white dark:text-olive-900 px-4 py-1.5 rounded-b-xl text-xs font-bold uppercase tracking-wider shadow-md">
                    Развитие сотрудника
                </div>
            </div>

            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-30 p-1.5 bg-white/50 dark:bg-black/30 hover:bg-white dark:hover:bg-olive-700 rounded-full text-[#5D5D5D] dark:text-[#E0E0E0] transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
            
            {/* Header Background Pattern */}
            <div className="absolute top-0 inset-x-0 h-48 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-5"></div>
            
            {/* Top Section */}
            <div className="relative pt-16 px-6 flex flex-col items-center pb-4">
                {/* Overall Rating Badge */}
                <div className="absolute top-16 left-5 flex flex-col items-center">
                    <span className={`text-4xl font-black ${getRatingColor(profile.overallScore)} drop-shadow-sm`}>
                        {profile.overallScore}
                    </span>
                    <span className="text-[10px] font-bold text-[#8F9F83] uppercase tracking-wider">OVR</span>
                </div>

                {/* Crown */}
                <div className="absolute top-16 right-5 w-8 h-8 rounded-full border border-[#C5A66F] flex items-center justify-center bg-white dark:bg-olive-800 shadow-sm">
                   <Crown className="w-4 h-4 text-[#C5A66F]" />
                </div>

                {/* Photo */}
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-[#C5A66F] via-[#F2F0EB] to-[#8F9F83] shadow-lg mb-3 z-10">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-olive-800 bg-white dark:bg-olive-900">
                        {manager.managerImage ? (
                            <img src={manager.managerImage} alt={manager.managerName} className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-full h-full text-[#E5E0D8] p-4" />
                        )}
                    </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-bold text-[#2F3E28] dark:text-[#E0E0E0]">{manager.managerName}</h3>
                <p className="text-xs font-semibold text-[#8F9F83] uppercase tracking-wider">Бренд-менеджер</p>
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C5A66F] to-transparent mt-4 opacity-50"></div>
            </div>

            {/* Stats Grid */}
            <div className="px-5 pb-6">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {profile.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#5D5D5D] dark:text-[#A3B19A] uppercase tracking-tight flex items-center gap-1.5 whitespace-nowrap">
                                {getSkillIcon(skill.name)}
                                {skill.name.replace('Доброжелательность', 'Доброж-ть')}
                            </span>
                            <span className={`text-sm font-black ${getRatingColor(skill.score)}`}>{skill.score}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI HR Section (Dark Footer) */}
            <div className="bg-[#2F3E28] dark:bg-olive-900 p-5 text-white relative">
                 <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#C5A66F]" />
                    <h4 className="text-xs font-bold text-[#C5A66F] uppercase">HR Рекомендации (AI)</h4>
                 </div>
                 
                 {isLoading ? (
                     <div className="flex justify-center py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-[#8F9F83]" />
                     </div>
                 ) : (
                     <>
                        <p className="text-[10px] leading-relaxed text-[#E0E0E0] mb-4 min-h-[40px]">
                            {advice || "Анализ профиля..."}
                        </p>
                        
                        <div className="space-y-2">
                            {tasks.map((task, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAssignTask(idx)}
                                    disabled={assignedTaskIndex === idx}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                        assignedTaskIndex === idx 
                                        ? 'bg-[#4A6741] text-white cursor-default'
                                        : 'bg-[#3A4B32] dark:bg-olive-800 hover:bg-[#4A5D43] dark:hover:bg-olive-700 text-[#A3B19A] hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {assignedTaskIndex === idx ? <CheckCircle2 className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                        <span className="truncate max-w-[180px]">{task.title}</span>
                                    </div>
                                    <span className="text-[9px] uppercase tracking-wider opacity-60">{task.type}</span>
                                </button>
                            ))}
                        </div>
                     </>
                 )}
            </div>
        </div>
    </div>
  );
};