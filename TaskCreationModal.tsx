import React, { useState, useEffect } from 'react';
import { X, Calendar, Flag, CheckCircle2 } from 'lucide-react';
import { SuggestedTask } from '../types';

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTask: SuggestedTask | null;
  managerName: string;
}

export const TaskCreationModal: React.FC<TaskCreationModalProps> = ({ 
  isOpen, onClose, initialTask, managerName 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<string>('Высокий');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (initialTask) {
        setTitle(initialTask.title);
        setDescription(initialTask.description);
        setPriority(initialTask.priority);
        setDeadline(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    } else {
        setTitle('');
        setDescription('');
        setPriority('Высокий');
        setDeadline('');
    }
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Task Assigned:", { managerName, title, description, priority, deadline });
    onClose();
    alert(`Задача успешно поставлена менеджеру ${managerName}!`);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#2F3E28]/70 dark:bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#F9F8F6] dark:bg-olive-900 rounded-2xl shadow-2xl border border-[#E5E0D8] dark:border-olive-700 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 bg-[#2F3E28] dark:bg-olive-800 border-b border-[#E5E0D8] dark:border-olive-700 flex justify-between items-center">
             <h3 className="text-white font-bold text-lg tracking-wide">Постановка задачи</h3>
             <button onClick={onClose} className="text-[#A3B19A] hover:text-white transition-colors">
                <X className="w-6 h-6" />
             </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
                <label className="block text-xs font-bold uppercase text-[#8F9F83] mb-1">Исполнитель</label>
                <div className="text-[#2C2C2C] dark:text-[#E0E0E0] font-semibold text-sm bg-white dark:bg-olive-800 border border-[#E5E0D8] dark:border-olive-600 px-3 py-2 rounded-lg">
                    {managerName}
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase text-[#8F9F83] mb-1">Заголовок задачи</label>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white dark:bg-olive-800 border border-[#E5E0D8] dark:border-olive-600 rounded-xl px-4 py-2.5 text-[#2C2C2C] dark:text-[#E0E0E0] text-sm focus:outline-none focus:border-[#C5A66F] focus:ring-1 focus:ring-[#C5A66F] transition-all"
                    placeholder="Например: Разработать план промо-акций..."
                />
            </div>

            <div>
                <label className="block text-xs font-bold uppercase text-[#8F9F83] mb-1">Описание</label>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-32 bg-white dark:bg-olive-800 border border-[#E5E0D8] dark:border-olive-600 rounded-xl px-4 py-2.5 text-[#2C2C2C] dark:text-[#E0E0E0] text-sm focus:outline-none focus:border-[#C5A66F] focus:ring-1 focus:ring-[#C5A66F] transition-all resize-none"
                    placeholder="Детальное описание задачи..."
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase text-[#8F9F83] mb-1 flex items-center gap-1">
                        <Flag className="w-3 h-3" /> Приоритет
                    </label>
                    <select 
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full bg-white dark:bg-olive-800 border border-[#E5E0D8] dark:border-olive-600 rounded-xl px-4 py-2.5 text-[#2C2C2C] dark:text-[#E0E0E0] text-sm focus:outline-none focus:border-[#C5A66F]"
                    >
                        <option value="Высокий">Высокий</option>
                        <option value="Средний">Средний</option>
                        <option value="Низкий">Низкий</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-[#8F9F83] mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Дедлайн
                    </label>
                    <input 
                        type="date" 
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full bg-white dark:bg-olive-800 border border-[#E5E0D8] dark:border-olive-600 rounded-xl px-4 py-2.5 text-[#2C2C2C] dark:text-[#E0E0E0] text-sm focus:outline-none focus:border-[#C5A66F]"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#E5E0D8] dark:border-olive-600">
                <button 
                    type="button" 
                    onClick={onClose}
                    className="px-6 py-2.5 text-[#5D5D5D] dark:text-[#A3B19A] text-sm font-semibold hover:text-[#2C2C2C] dark:hover:text-white mr-4 transition-colors"
                >
                    Отмена
                </button>
                <button 
                    type="submit"
                    className="px-8 py-2.5 bg-[#2F3E28] dark:bg-gold-600 text-white text-sm font-bold rounded-full hover:bg-[#3A4B32] dark:hover:bg-gold-700 transition-all shadow-md flex items-center gap-2"
                >
                    <CheckCircle2 className="w-4 h-4" />
                    Поставить задачу
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};