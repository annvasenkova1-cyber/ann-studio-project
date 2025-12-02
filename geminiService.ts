
import { GoogleGenAI, Type } from "@google/genai";
import { KPIMetric, GOPerformanceData, ChatMessage, SuggestedTask, ManagerProfile, HRTask } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateDashboardInsights = async (metrics: KPIMetric[], context: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Cannot generate insights.";
  }

  try {
    const metricsSummary = metrics.map(m => 
      `${m.title}: ${m.value}${m.unit || ''} (${m.change})`
    ).join('\n');

    const prompt = `
      You are an expert Brand Director Assistant for a major cosmetics company called MIXIT.
      Analyze the following dashboard metrics for November 2025:
      
      ${metricsSummary}
      
      Context: ${context}
      
      Provide a concise, 3-point strategic summary in Russian. 
      Focus on actionable advice based on the gap between actuals and plans.
      If a metric is red (negative), prioritize it.
      Format as HTML bullet points (<ul><li>...</li></ul>) but return plain string with HTML tags.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Нет данных для анализа.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Не удалось загрузить аналитику. Пожалуйста, попробуйте позже.";
  }
};

export const generateCategoryInsight = async (data: GOPerformanceData): Promise<string> => {
  if (!apiKey) {
    return "<p>API Key is missing.</p>";
  }

  try {
    const prompt = `
      You are a Senior Business Analyst for MIXIT cosmetics. 
      Your task is to generate a strategic report for the Brand Director about a specific product category (Reporting Group).
      
      Reporting Group: "${data.name}"
      Brand Manager: ${data.managerName}
      
      Data:
      - Sales: ${data.sales}M RUB (${data.salesChange}, Trend: ${data.isSalesGrowth ? 'Growth' : 'Decline'})
      - Commercial Profit (KP): ${data.kp}M RUB (${data.kpPercent}, Deviation: ${data.kpChange})
      - Plan Execution: ${data.planCompletion}% (Target to date: ${data.planToDatePercent}%)
      - SKU Count: ${data.skuCount} (Focus SKUs: ${data.focusSkuCount}, Focus Share: ${data.focusSkuShare})
      - Online Share: ${data.shareOnline} / Offline Share: ${data.shareOffline}
      - Marketplace Split: WB ${data.salesSplitWB} / Ozon ${data.salesSplitOzon}
      - Ratings: WB ${data.ratingWB} / Ozon ${data.ratingOzon}
      - SMM Budget: ${data.smmBudgetFact}M (Plan: ${data.smmBudgetPlan}M)
      - Reach: ${data.reachFact} (Plan: ${data.reachPlan})
      - CPV: ${data.cpv} RUB

      Instructions:
      1.  **Strictly NO Emojis.** Use professional, high-level business Russian.
      2.  **Visual Style:** Use the following specific HTML structure with Tailwind classes to match the corporate theme (Beige/Olive/Gold).
      3.  **Tone:** Constructive, analytical, strategic.

      Required HTML Structure (return ONLY this HTML inside a div):

      <div class="space-y-6">
        
        <!-- 1. Manager Evaluation -->
        <div class="bg-[#F2F0EB] p-5 rounded-2xl border-l-4 border-[#C5A66F] shadow-sm">
           <h4 class="text-[#2F3E28] font-bold uppercase tracking-wide mb-2 text-sm">Оценка работы Бренд-менеджера</h4>
           <p class="text-[#2C2C2C] text-base font-semibold mb-1">
              <!-- Evaluation: e.g. "Высокая эффективность", "Требует внимания" etc. -->
           </p>
           <p class="text-[#5D5D5D] text-sm leading-relaxed">
              <!-- Detailed justification for ${data.managerName}. Mention specific metrics. -->
           </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- 2. Positive Trends -->
            <div class="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-sm">
               <h4 class="text-[#4A6741] font-bold uppercase tracking-wide mb-3 text-sm">Позитивные тренды</h4>
               <ul class="list-disc list-inside text-[#2C2C2C] text-sm space-y-2">
                  <!-- List 2-3 key positive points -->
               </ul>
            </div>

            <!-- 3. Negative Trends / Risks -->
            <div class="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-sm">
               <h4 class="text-[#BC6C6C] font-bold uppercase tracking-wide mb-3 text-sm">Зоны риска и Проблемы</h4>
               <ul class="list-disc list-inside text-[#2C2C2C] text-sm space-y-2">
                  <!-- List 2-3 key negative points or risks -->
               </ul>
            </div>
        </div>

        <!-- 4. Key Insights -->
        <div class="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-sm">
           <h4 class="text-[#2F3E28] font-bold uppercase tracking-wide mb-3 text-sm">Главное из аналитики</h4>
           <p class="text-[#2C2C2C] text-sm leading-relaxed">
              <!-- Deep dive into why these results are happening. Connect marketing spend to sales, or channel mix to profit. -->
           </p>
        </div>

        <!-- 5. Recommendations for Director -->
        <div class="bg-[#2F3E28] p-5 rounded-2xl shadow-md text-white">
            <h4 class="text-[#C5A66F] font-bold uppercase tracking-wide mb-3 text-sm">Рекомендации Руководителю</h4>
            <ul class="list-disc list-inside text-[#E0E0E0] text-sm space-y-2">
                <!-- 2-3 strategic actions the Director should take regarding this category/manager -->
            </ul>
        </div>

      </div>
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "<p>Не удалось сгенерировать отчет.</p>";
  } catch (error) {
    console.error("Gemini Category Error:", error);
    return "<p>Ошибка соединения с AI сервисом.</p>";
  }
};

export const generateKPInsight = async (data: GOPerformanceData): Promise<string> => {
  if (!apiKey) {
    return "<p>API Key is missing.</p>";
  }

  try {
    const topClients = data.kpDetailsClients?.slice(0, 3).map(c => c.name).join(', ') || '';
    
    const prompt = `
      You are a Financial Analyst for MIXIT. Analyze the Commercial Profit (KP) for group "${data.name}".
      
      Data:
      - Total KP: ${data.kp}M RUB (${data.kpPercent}, Deviation: ${data.kpChange})
      - Avg KP per Unit: ${data.avgKpPerUnit} RUB (Change: ${data.avgKpPerUnitChange}%)
      - Online Share: ${data.shareOnline}
      - Top Clients by Profit: ${topClients}
      
      Provide a concise profitability analysis in Russian.
      Structure:
      1. <strong class="text-[#2F3E28]">Marginality Trend:</strong> Is per-unit profit growing? Why?
      2. <strong class="text-[#2F3E28]">Channel Mix:</strong> Which channel (Online/Offline) is driving profit?
      3. <strong class="text-[#2F3E28]">Key Risk:</strong> One profitability risk (e.g., low margin on WB).
      
      Keep it short (max 150 words). Return raw HTML paragraphs. NO Emojis.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "<p>Нет данных.</p>";
  } catch (error) {
    console.error("Gemini KP Error:", error);
    return "<p>Ошибка анализа КП.</p>";
  }
};

export const generateChatResponse = async (data: GOPerformanceData, history: ChatMessage[], userMessage: string): Promise<string> => {
    if (!apiKey) {
        return "API Key is missing.";
    }

    try {
        const context = JSON.stringify(data, null, 2);
        const historyText = history.map(h => `${h.role === 'user' ? 'User' : 'AI'}: ${h.content}`).join('\n');

        const prompt = `
          You are an intelligent data analyst assistant for MIXIT cosmetics. 
          You are currently discussing the performance of the reporting group: "${data.name}".
          The brand manager responsible is ${data.managerName}.

          Data Context:
          ${context}

          History:
          ${historyText}

          Question: "${userMessage}"

          Instructions:
          1. Answer strictly in Russian.
          2. NO Emojis.
          3. Be concise, professional, and data-driven.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "Извините, я не смог сформулировать ответ.";

    } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "Произошла ошибка при обработке вашего запроса.";
    }
}

export const generateSuggestedTasks = async (data: GOPerformanceData): Promise<SuggestedTask[]> => {
    if (!apiKey) {
      return [];
    }

    try {
        const prompt = `
          You are the Executive Brand Director at MIXIT. 
          Based on the performance data below, suggest 3 specific, SMART tasks to assign to the Brand Manager ${data.managerName}.
          
          Reporting Group: ${data.name}
          Sales: ${data.sales}M (${data.salesChange})
          KP: ${data.kp}M (${data.kpPercent})
          Plan Completion: ${data.planCompletion}%
          
          Tasks should address the biggest gaps or risks.
          
          Return strictly a JSON array of objects with the following schema:
          {
             title: string (Task title),
             description: string (Detailed description of what needs to be done),
             priority: "Высокий" | "Средний" | "Низкий",
             deadlineSuggestion: string (e.g. "До конца недели", "3 дня")
          }
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      priority: { type: Type.STRING },
                      deadlineSuggestion: { type: Type.STRING }
                    }
                  }
                }
            }
        });

        return JSON.parse(response.text) as SuggestedTask[];

    } catch (error) {
        console.error("Gemini Task Gen Error:", error);
        return [];
    }
};

export const generateHRDevelopmentPlan = async (profile: ManagerProfile, managerName: string): Promise<{ advice: string, tasks: HRTask[] }> => {
    if (!apiKey) {
      return { 
          advice: "AI сервис недоступен.", 
          tasks: [] 
      };
    }

    try {
        const prompt = `
          You are an Expert HR Consultant. Analyze the profile of Brand Manager ${managerName}.
          
          Skills (0-100):
          ${profile.skills.map(s => `${s.name}: ${s.score}`).join('\n')}
          Overall: ${profile.overallScore}

          1. Provide 1 sentence of strategic advice to the HR Director on how to develop this employee. Russian language.
          2. Suggest 2 specific HR tasks (e.g. "Send to negotiation training", "Assign bonus").

          Return strictly JSON:
          {
             advice: string,
             tasks: [{ title: string, type: "Training" | "Bonus" | "Meeting" | "Promotion" }]
          }
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        advice: { type: Type.STRING },
                        tasks: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    type: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });
        
        return JSON.parse(response.text);

    } catch (error) {
        console.error("Gemini HR Error:", error);
        return { advice: "Не удалось получить рекомендации.", tasks: [] };
    }
}
