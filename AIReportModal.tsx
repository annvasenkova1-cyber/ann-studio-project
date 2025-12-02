import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { X, Sparkles, Bot, Loader2, Send, MessageSquare, Plus, ArrowRight, User } from 'lucide-react';
import { GOPerformanceData, ChatMessage, SuggestedTask } from '../types';
import { generateChatResponse, generateSuggestedTasks } from '../services/geminiService';
import { TaskCreationModal } from './TaskCreationModal';

interface AIReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GOPerformanceData | null;
  reportContent: string | null;
  isLoading: boolean;
  onGenerate: () => void;
}

export const AIReportModal: React.FC<AIReportModalProps> = ({
  isOpen,
  onClose,
  data,
  reportContent,
  isLoading,
  onGenerate
}) => {
  // ... [Logic Hooks remain same] ...
  const hasGeneratedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [suggestedTasks, setSuggestedTasks] = useState<SuggestedTask[]>([]);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SuggestedTask | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [managerComment, setManagerComment] = useState('');

  useLayoutEffect(() => {
    if (isOpen && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && data) {
        const isNegative = !data.isSalesGrowth || !data.isKpGrowth;
        const mockComment = isNegative 
            ? `По категории "${data.name}" мы фиксируем временное отклонение показателей. Основная причина — задержка в поставках новинок и агрессивная ценовая политика конкурентов на WB. Меры приняты: запущена дополнительная мотивация для дистрибьюторов, скорректированы ставки CPV. Ожидаем выравнивание к 30 числу.`
            : `Категория "${data.name}" показывает отличную динамику. Мы успешно реализовали запуск сезонных наборов, что дало прирост в КП. Сейчас фокусируемся на удержании позиций в ТОП-3 на Ozon и оптимизации логистических затрат.`;
        setManagerComment(mockComment);
    }
    if (isOpen && data && !reportContent && !isLoading && !hasGeneratedRef.current) {
      hasGeneratedRef.current = true;
      onGenerate();
      setIsTasksLoading(true);
      generateSuggestedTasks(data).then(tasks => {
          setSuggestedTasks(tasks);
          setIsTasksLoading(false);
      });
    }
  }, [isOpen, data, reportContent, isLoading, onGenerate]);

  useEffect(() => {
    if (!isOpen) {
      hasGeneratedRef.current = false;
      setChatMessages([]);
      setUserInput('');
      setManagerComment('');
      setSuggestedTasks([]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || !data) return;
    const userMsg: ChatMessage = { role: 'user', content: userInput, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsChatLoading(true);
    const aiResponseText = await generateChatResponse(data, chatMessages, userMsg.content);
    const aiMsg: ChatMessage = { role: 'ai', content: aiResponseText, timestamp: new Date() };
    setChatMessages(prev => [...prev, aiMsg]);
    setIsChatLoading(false);
  };

  const handleTaskClick = (task: SuggestedTask) => {
      setSelectedTask(task);
      setIsTaskModalOpen(true);
  };

  if (!isOpen || !data) return null;

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#2F3E28]/60 dark:bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-[95vw] h-[90vh] bg-[#F9F8F6] dark:bg-olive-900 rounded-2xl shadow-2xl border border-[#E5E0D8] dark:border-olive-700 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#E5E0D8] dark:border-olive-700 bg-[#2F3E28] dark:bg-olive-800 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#F9F8F6]/10 rounded-xl border border-[#F9F8F6]/20">
              <Sparkles className="w-5 h-5 text-[#C5A66F]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">AI Анализ эффективности</h3>
              <p className="text-sm text-[#A3B19A] font-medium">Группа: <span className="text-white ml-1">{data.name}</span></p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#3A4B32] dark:hover:bg-olive-600 rounded-full text-[#A3B19A] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto custom-scrollbar bg-[#F9F8F6] dark:bg-olive-900 relative">
            <div className="flex flex-col lg:flex-row min-h-full">
                
                {/* Left Column: Report */}
                <div className="w-full lg:w-[60%] p-8 lg:p-10 bg-white dark:bg-olive-900">
                     {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-[#8F9F83]/30 border-t-[#2F3E28] rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                <Bot className="w-6 h-6 text-[#2F3E28] dark:text-[#E0E0E0]" />
                                </div>
                            </div>
                            <p className="text-[#5D5D5D] dark:text-[#A3B19A] font-medium animate-pulse">Анализирую показатели...</p>
                        </div>
                     ) : reportContent ? (
                        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
                            {/* Inject content with dark mode specific text colors via prose modification or simple class overrides */}
                            <div 
                                className="prose prose-sm max-w-none text-[#2C2C2C] dark:text-[#E0E0E0] [&_strong]:text-[#2F3E28] dark:[&_strong]:text-[#C5A66F]"
                                dangerouslySetInnerHTML={{ __html: reportContent }} 
                            />
                            <div className="flex justify-end pt-4 border-t border-[#E5E0D8] dark:border-olive-700">
                                <span className="text-xs text-[#8F9F83] italic flex items-center gap-1 font-medium">
                                    <Sparkles className="w-3 h-3" />
                                    Powered by Gemini 2.5 Flash
                                </span>
                            </div>
                        </div>
                     ) : null}
                </div>

                {/* Right Column: Comments & Chat */}
                <div className="w-full lg:w-[40%] bg-[#F9F8F6] dark:bg-olive-800 flex flex-col border-t lg:border-t-0 lg:border-l border-[#E5E0D8] dark:border-olive-700 p-6 gap-6">
                    
                    {/* Manager Comment */}
                    <div className="bg-white dark:bg-olive-900 p-6 rounded-2xl border border-[#E5E0D8] dark:border-olive-700 shadow-sm flex-shrink-0">
                         <h4 className="text-[#2F3E28] dark:text-[#C5A66F] font-bold uppercase tracking-wide mb-4 text-xs flex items-center gap-2">
                            <div className="p-1.5 bg-[#F2F0EB] dark:bg-olive-800 rounded-lg">
                                <MessageSquare className="w-3.5 h-3.5 text-[#C5A66F]" />
                            </div>
                            Комментарий Бренд-менеджера
                        </h4>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#E5E0D8] dark:bg-olive-700 overflow-hidden flex-shrink-0 border border-[#C5A66F]/30">
                                {data.managerImage ? (
                                    <img src={data.managerImage} alt={data.managerName} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-full h-full p-2 text-[#8F9F83]" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-bold text-[#2C2C2C] dark:text-white mb-1">{data.managerName}</div>
                                <div className="bg-[#F9F8F6] dark:bg-olive-800 rounded-xl rounded-tl-none p-4 text-sm text-[#5D5D5D] dark:text-[#E0E0E0] italic leading-relaxed border border-[#E5E0D8] dark:border-olive-700">
                                    "{managerComment}"
                                </div>
                                <div className="text-[10px] text-[#A3B19A] mt-2 text-right">
                                    Добавлено сегодня, 10:45
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Chat */}
                    <div className="flex-1 bg-white dark:bg-olive-900 rounded-[2rem] border border-[#E5E0D8] dark:border-olive-700 shadow-sm flex flex-col overflow-hidden relative min-h-[400px]">
                        <div className="px-5 py-4 border-b border-[#E5E0D8] dark:border-olive-700 bg-[#2F3E28] dark:bg-olive-800 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 bg-[#FFFFFF]/10 rounded-lg backdrop-blur-sm">
                                    <Bot className="w-4 h-4 text-[#C5A66F]" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm leading-tight">AI-ассистент</h4>
                                    <p className="text-[10px] text-[#A3B19A] leading-tight">Онлайн помощник</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-[#FDFCFB] dark:bg-olive-900">
                            {chatMessages.length === 0 && (
                                <div className="text-center text-[#A3B19A] text-xs mt-8 px-6 leading-relaxed">
                                    <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-50" />
                                    Задайте вопрос по отчету или выберите одну из предложенных задач ниже.
                                </div>
                            )}
                            {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm shadow-sm leading-relaxed ${
                                        msg.role === 'user' 
                                            ? 'bg-[#2F3E28] dark:bg-gold-600 text-white rounded-tr-sm' 
                                            : 'bg-white dark:bg-olive-800 border border-[#E5E0D8] dark:border-olive-700 text-[#2C2C2C] dark:text-[#E0E0E0] rounded-tl-sm'
                                    }`}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[9px] text-[#A3B19A] mt-1 px-1">
                                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                            ))}
                            {isChatLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-olive-800 border border-[#E5E0D8] dark:border-olive-700 px-3 py-2 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                                        <div className="w-1 h-1 bg-[#8F9F83] rounded-full animate-bounce"></div>
                                        <div className="w-1 h-1 bg-[#8F9F83] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1 h-1 bg-[#8F9F83] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Tasks */}
                        <div className="bg-[#F9F8F6] dark:bg-olive-800 border-t border-[#E5E0D8] dark:border-olive-700 p-3 shrink-0">
                            <div className="flex items-center justify-between mb-2 px-1">
                                <span className="text-[10px] font-bold text-[#8F9F83] uppercase tracking-wider">Предложенные задачи</span>
                                {isTasksLoading && <Loader2 className="w-3 h-3 text-[#8F9F83] animate-spin" />}
                            </div>
                            
                            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar snap-x">
                                {!isTasksLoading && suggestedTasks.map((task, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => handleTaskClick(task)}
                                        className="min-w-[180px] max-w-[200px] bg-white dark:bg-olive-900 border border-[#E5E0D8] dark:border-olive-600 hover:border-[#C5A66F] hover:shadow-md p-2.5 rounded-xl text-left flex-shrink-0 snap-start transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-1.5">
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                                                task.priority === 'Высокий' ? 'bg-[#BC6C6C]/10 text-[#BC6C6C]' : 
                                                task.priority === 'Средний' ? 'bg-[#D4B483]/20 text-[#9C7B43]' : 'bg-[#8F9F83]/20 text-[#4A6741]'
                                            }`}>
                                                {task.priority}
                                            </span>
                                            <ArrowRight className="w-3 h-3 text-[#C5A66F] -ml-2 opacity-0 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        </div>
                                        <p className="text-xs font-bold text-[#2C2C2C] dark:text-[#E0E0E0] line-clamp-2 leading-tight mb-1">{task.title}</p>
                                        <p className="text-[9px] text-[#5D5D5D] dark:text-[#A3B19A] line-clamp-2 leading-snug">{task.description}</p>
                                    </button>
                                ))}
                                <button
                                    onClick={() => handleTaskClick({ title: '', description: '', priority: 'Высокий', deadlineSuggestion: '' })}
                                    className="min-w-[60px] bg-[#F2F0EB] dark:bg-olive-800 border border-dashed border-[#8F9F83] rounded-xl flex items-center justify-center hover:bg-[#E5E0D8] dark:hover:bg-olive-700 transition-colors flex-shrink-0 snap-start"
                                >
                                    <Plus className="w-5 h-5 text-[#8F9F83]" />
                                </button>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white dark:bg-olive-900 border-t border-[#E5E0D8] dark:border-olive-700 shrink-0">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Спросите AI-ассистента..."
                                    disabled={isChatLoading}
                                    className="w-full bg-[#F9F8F6] dark:bg-olive-800 border border-[#E5E0D8] dark:border-olive-600 text-[#2C2C2C] dark:text-[#E0E0E0] text-sm rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:border-[#8F9F83] focus:ring-1 focus:ring-[#8F9F83]/20 transition-all placeholder:text-[#A3B19A]"
                                />
                                <button 
                                    onClick={handleSendMessage}
                                    disabled={!userInput.trim() || isChatLoading}
                                    className="absolute right-1.5 top-1.5 p-1.5 bg-[#C5A66F] hover:bg-[#B0925D] disabled:bg-[#E5E0D8] disabled:dark:bg-olive-700 text-white rounded-full transition-colors shadow-sm"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    
    <TaskCreationModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        initialTask={selectedTask}
        managerName={data.managerName}
    />
    </>
  );
};