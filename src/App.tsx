import React, { useState } from "react";
import MobileFrame from "./components/MobileFrame";
import { LANGUAGES, VOCABULARY_DATA, GRAMMAR_DATA, SCENARIO_DATA, QUIZ_DATA } from "./data/languages";
import { AppLanguage, CoachAnalysis, ChatMessage } from "./types";
import { BookOpen, MessageCircle, Mic, HelpCircle, Globe, Send, Star, ChevronRight } from "lucide-react";

type Tab = "vocab" | "grammar" | "scenarios" | "quiz" | "coach" | "chat";

export default function App() {
  const [selectedLang, setSelectedLang] = useState<AppLanguage | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("vocab");

  // Coach state
  const [coachText, setCoachText] = useState("");
  const [coachResult, setCoachResult] = useState<CoachAnalysis | null>(null);
  const [coachLoading, setCoachLoading] = useState(false);
  const [coachError, setCoachError] = useState("");

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  if (!selectedLang) {
    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-gradient-to-br from-indigo-600 to-purple-700 p-6 overflow-y-auto">
          <div className="text-center mb-8 pt-4">
            <Globe className="mx-auto mb-3 text-white" size={48} />
            <h1 className="text-2xl font-bold text-white">Dil Öğrenme Koçu</h1>
            <p className="text-indigo-200 text-sm mt-1">Hangi dili öğrenmek istersin?</p>
          </div>
          <div className="flex flex-col gap-4">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className="bg-white/20 backdrop-blur border border-white/30 rounded-2xl p-4 text-left hover:bg-white/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{lang.flag}</span>
                  <div>
                    <p className="font-bold text-white">{lang.name}</p>
                    <p className="text-indigo-200 text-xs">{lang.nativeName}</p>
                  </div>
                  <ChevronRight className="ml-auto text-white/60" size={20} />
                </div>
                <p className="text-indigo-100 text-xs mt-2">{lang.description}</p>
              </button>
            ))}
          </div>
        </div>
      </MobileFrame>
    );
  }

  const lang = LANGUAGES.find((l) => l.code === selectedLang)!;
  const vocab = VOCABULARY_DATA[selectedLang];
  const grammar = GRAMMAR_DATA[selectedLang];
  const scenarios = SCENARIO_DATA[selectedLang];
  const quiz = QUIZ_DATA[selectedLang];

  async function handleCoach() {
    if (!coachText.trim()) return;
    setCoachLoading(true);
    setCoachError("");
    setCoachResult(null);
    try {
      const res = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: coachText, targetLanguage: lang.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCoachResult(data);
    } catch (e: any) {
      setCoachError(e.message);
    } finally {
      setCoachLoading(false);
    }
  }

  async function handleChat() {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          targetLanguage: lang.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        translation: data.replyTranslation,
        feedback: data.feedback,
        score: data.userScore,
        suggestions: data.suggestions,
        timestamp: new Date(),
      };
      setChatMessages([...updatedMessages, aiMsg]);
    } catch (e: any) {
      console.error(e);
    } finally {
      setChatLoading(false);
    }
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "vocab", label: "Kelime", icon: <BookOpen size={16} /> },
    { id: "grammar", label: "Gramer", icon: <BookOpen size={16} /> },
    { id: "scenarios", label: "Senaryo", icon: <MessageCircle size={16} /> },
    { id: "quiz", label: "Quiz", icon: <HelpCircle size={16} /> },
    { id: "coach", label: "Koç", icon: <Mic size={16} /> },
    { id: "chat", label: "Sohbet", icon: <MessageCircle size={16} /> },
  ];

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-slate-50">
        {/* Header */}
        <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between shrink-0">
          <button onClick={() => setSelectedLang(null)} className="text-indigo-200 text-sm">← Geri</button>
          <div className="flex items-center gap-2">
            <span className="text-xl">{lang.flag}</span>
            <span className="text-white font-bold">{lang.name}</span>
          </div>
          <div className="w-12" />
        </div>

        {/* Tabs */}
        <div className="flex bg-white border-b border-slate-200 overflow-x-auto shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-slate-500"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* VOCAB */}
          {activeTab === "vocab" && (
            <div className="p-4 flex flex-col gap-3">
              {vocab.map((w) => (
                <div key={w.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-slate-800 text-lg">{w.word}</p>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{w.category}</span>
                  </div>
                  <p className="text-slate-500 text-sm">{w.translation}</p>
                  <p className="text-indigo-500 text-xs mt-1">📢 {w.phonetic}</p>
                  <p className="text-slate-600 text-xs mt-2 italic">"{w.exampleTarget}"</p>
                  <p className="text-slate-400 text-xs">{w.exampleTranslation}</p>
                </div>
              ))}
            </div>
          )}

          {/* GRAMMAR */}
          {activeTab === "grammar" && (
            <div className="p-4 flex flex-col gap-4">
              {grammar.map((g) => (
                <div key={g.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-slate-800">{g.title}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{g.level}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">{g.description}</p>
                  <div className="bg-slate-50 rounded-lg p-3 mb-3">
                    {g.rules.map((r, i) => (
                      <p key={i} className="text-xs text-slate-600 mb-1">• {r}</p>
                    ))}
                  </div>
                  {g.examples.map((ex, i) => (
                    <div key={i} className="border-l-2 border-indigo-300 pl-3 mb-2">
                      <p className="text-sm font-medium text-slate-800">{ex.target}</p>
                      <p className="text-xs text-slate-500">{ex.translation}</p>
                      <p className="text-xs text-indigo-600 mt-0.5">{ex.explanation}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* SCENARIOS */}
          {activeTab === "scenarios" && (
            <div className="p-4 flex flex-col gap-4">
              {scenarios.map((sc) => (
                <div key={sc.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{sc.emoji}</span>
                    <p className="font-bold text-slate-800">{sc.title}</p>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{sc.description}</p>
                  {sc.expressions.map((ex, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-3 mb-2">
                      <p className="font-medium text-slate-800 text-sm">{ex.target}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{ex.translation}</p>
                      <p className="text-indigo-500 text-xs mt-0.5">📢 {ex.phonetic}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* QUIZ */}
          {activeTab === "quiz" && (
            <div className="p-4">
              {quiz.length === 0 ? (
                <p className="text-center text-slate-500 mt-8">Bu dil için henüz quiz yok.</p>
              ) : quizIndex >= quiz.length ? (
                <div className="text-center mt-8">
                  <Star className="mx-auto text-yellow-500 mb-3" size={48} />
                  <p className="text-2xl font-bold text-slate-800">{quizScore}/{quiz.length}</p>
                  <p className="text-slate-500 mt-1">Quiz tamamlandı!</p>
                  <button
                    onClick={() => { setQuizIndex(0); setQuizScore(0); setQuizSelected(null); }}
                    className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full text-sm"
                  >
                    Tekrar Dene
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <p className="text-xs text-slate-400 mb-2">Soru {quizIndex + 1}/{quiz.length}</p>
                  <p className="font-semibold text-slate-800 mb-4">{quiz[quizIndex].question}</p>
                  <div className="flex flex-col gap-2">
                    {quiz[quizIndex].options.map((opt) => {
                      let cls = "border border-slate-200 text-slate-700";
                      if (quizSelected) {
                        if (opt === quiz[quizIndex].correctAnswer) cls = "border-green-500 bg-green-50 text-green-700";
                        else if (opt === quizSelected) cls = "border-red-400 bg-red-50 text-red-600";
                      }
                      return (
                        <button
                          key={opt}
                          disabled={!!quizSelected}
                          onClick={() => {
                            setQuizSelected(opt);
                            if (opt === quiz[quizIndex].correctAnswer) setQuizScore((s) => s + 1);
                          }}
                          className={`rounded-xl px-4 py-3 text-sm text-left transition-all ${cls}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSelected && (
                    <div className="mt-3 bg-indigo-50 rounded-lg p-3">
                      <p className="text-xs text-indigo-700">{quiz[quizIndex].explanation}</p>
                      <button
                        onClick={() => { setQuizIndex((i) => i + 1); setQuizSelected(null); }}
                        className="mt-2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs"
                      >
                        Sonraki →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* COACH */}
          {activeTab === "coach" && (
            <div className="p-4 flex flex-col gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <p className="text-sm font-semibold text-slate-700 mb-2">Bir cümle yaz, analiz edelim:</p>
                <textarea
                  value={coachText}
                  onChange={(e) => setCoachText(e.target.value)}
                  placeholder={`${lang.name} dilinde bir cümle yaz...`}
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:border-indigo-400"
                />
                <button
                  onClick={handleCoach}
                  disabled={coachLoading}
                  className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  {coachLoading ? "Analiz ediliyor..." : "Analiz Et"}
                </button>
              </div>
              {coachError && <p className="text-red-500 text-sm text-center">{coachError}</p>}
              {coachResult && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-800">Sonuç</p>
                    <span className={`text-lg font-bold ${coachResult.score >= 70 ? "text-green-600" : "text-orange-500"}`}>
                      {coachResult.score}/100
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">Düzeltilmiş Hali</p>
                    <p className="text-sm font-medium text-slate-800">{coachResult.correctedText}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">Türkçe Çeviri</p>
                    <p className="text-sm text-slate-700">{coachResult.translation}</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <p className="text-xs text-indigo-600">📢 Telaffuz</p>
                    <p className="text-sm text-indigo-800">{coachResult.pronunciationGuide}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Analiz</p>
                    <p className="text-sm text-slate-700">{coachResult.analysis}</p>
                  </div>
                  {coachResult.alternatives.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Alternatifler</p>
                      {coachResult.alternatives.map((a, i) => (
                        <p key={i} className="text-sm text-indigo-700 bg-indigo-50 rounded px-2 py-1 mb-1">• {a}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CHAT */}
          {activeTab === "chat" && (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {chatMessages.length === 0 && (
                  <p className="text-center text-slate-400 text-sm mt-8">
                    AI ile {lang.name} dilinde sohbet et!
                  </p>
                )}
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === "user" ? "bg-indigo-600 text-white" : "bg-white text-slate-800 border border-slate-100 shadow-sm"
                    }`}>
                      {msg.content}
                    </div>
                    {msg.translation && (
                      <p className="text-xs text-slate-400 mt-0.5 max-w-[80%]">🇹🇷 {msg.translation}</p>
                    )}
                    {msg.feedback && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mt-1 max-w-[80%]">
                        <p className="text-xs text-amber-700">{msg.feedback}</p>
                        {msg.score !== undefined && (
                          <p className="text-xs font-bold text-amber-600 mt-1">Puan: {msg.score}/100</p>
                        )}
                      </div>
                    )}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-col gap-1 mt-1 max-w-[80%]">
                        {msg.suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => setChatInput(s)}
                            className="text-xs bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-left"
                          >
                            💬 {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex items-start">
                    <div className="bg-white border border-slate-100 rounded-2xl px-4 py-2 text-sm text-slate-400">
                      Yazıyor...
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3 bg-white border-t border-slate-200 flex gap-2 shrink-0">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleChat()}
                  placeholder={`${lang.name} dilinde yaz...`}
                  className="flex-1 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
                />
                <button
                  onClick={handleChat}
                  disabled={chatLoading}
                  className="bg-indigo-600 text-white rounded-full p-2 disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileFrame>
  );
}
