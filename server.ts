import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Lazy-initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error(
      "GEMINI_API_KEY eksik veya hatalı. Lütfen sağ taraftaki 'Secrets' panelinden GEMINI_API_KEY değerini ekleyin."
    );
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. AI Pronunciation & Correction Coach Endpoint
app.post("/api/ai/coach", async (req, res) => {
  try {
    const { text, targetLanguage, nativeLanguage = "Turkish", scenario = "Genel Pratik" } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ error: "Eksik parametreler: 'text' ve 'targetLanguage' gereklidir." });
    }

    const ai = getAI();

    const systemInstruction = `Sen uzman bir dil öğretmeni ve telaffuz koçusun.
Kullanıcının yazdığı cümleyi analiz etmelisin.
Hedef Dil (Target Language): ${targetLanguage}
Ana Dil (Native Language): ${nativeLanguage}
Durum / Senaryo: ${scenario}

Lütfen şu kurallara göre analiz yap:
1. Kullanıcının yazdığı ifadeyi oku. Dilbilgisi, yazım kuralları ve bağlam açısından doğruluğunu incele.
2. Cümlenin düzeltilmiş (en doğal) halini oluştur.
3. Türkçe çevirisini yap.
4. Okunuş ve fonetik ipuçları ekle. (Özellikle Gürcü alfabesi varsa Latin harfleriyle okunuşunu ver, İngilizce veya Türkçe ise vurgu ve telaffuz tüyo/detayı ekle).
5. Kullanıcıya 100 üzerinden bir dil puanı (score) ver.
6. Cümlenin geliştirilmesi için Türkçe dilinde detaylı analiz ve tavsiye yaz.
7. Alternatif olarak kullanabileceği 2-3 farklı günlük konuşma kalıbı veya kelime öner.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analiz edilecek metin: "${text}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Cümlenin 100 üzerinden dil bilgisi ve doğallık puanı" },
            isCorrect: { type: Type.BOOLEAN, description: "Cümle tamamen hatasız ve doğal mı?" },
            translation: { type: Type.STRING, description: "Cümlenin Türkçe çevirisi" },
            analysis: { type: Type.STRING, description: "Türkçe olarak dil bilgisi, imla ve gelişim önerileri analizi" },
            correctedText: { type: Type.STRING, description: "Cümlenin hedef dildeki en doğru ve doğal yazılışı" },
            pronunciationGuide: { type: Type.STRING, description: "Cümlenin Türkçe harflerle okunuş kılavuzu veya telaffuz vurguları" },
            alternatives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Aynı anlamı taşıyan alternatif 2-3 adet hedef dildeki kalıp veya ifade"
            }
          },
          required: ["score", "isCorrect", "translation", "analysis", "correctedText", "pronunciationGuide", "alternatives"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Yapay zekadan boş yanıt döndü.");
    }

    const parsedResult = JSON.parse(resultText.trim());
    res.json(parsedResult);
  } catch (error: any) {
    console.error("Coach API Error:", error);
    res.status(500).json({
      error: error.message || "Yapay zeka analizi sırasında beklenmedik bir hata oluştu."
    });
  }
});

// 2. AI Interactive Chat Dialog Partner Endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { messages, targetLanguage, role = "friendly_local", scenario = "Cafe" } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0 || !targetLanguage) {
      return res.status(400).json({ error: "Eksik parametreler: 'messages' dizisi ve 'targetLanguage' gereklidir." });
    }

    const ai = getAI();

    // The prompt guides the assistant to play a specific role in targetLanguage,
    // AND evaluate the user's latest message.
    const lastUserMessage = messages[messages.length - 1].content;

    const systemInstruction = `Sen interaktif bir dil öğrenme ortağısın. Kullanıcı ile karşılıklı sohbet ediyorsun.
Hedef Dil (Target Language): ${targetLanguage}
Senin Rolün (Role): ${role} (Örn: Kafe çalışanı, otel resepsiyonisti, gümrük memuru, arkadaş canlısı bir yerel vb.)
Sohbet Senaryosu (Scenario): ${scenario}

Görevlerin:
1. Son kullanıcı mesajına hedef dilde (${targetLanguage}) rolüne tamamen sadık kalarak, samimi ve gerçekçi bir yanıt (reply) ver.
2. Bu verdiğin yanıtın Türkçe çevirisini (replyTranslation) ekle.
3. Kullanıcının son yazdığı mesajı (${targetLanguage}) dil bilgisi, yazım kuralları ve kelime seçimi yönünden Türkçe değerlendir (feedback).
4. Kullanıcının cümlesine 100 üzerinden bir dil puanı (userScore) ver.
5. Sohbeti devam ettirebilmesi için kullanıcının seçebileceği hedef dilde (${targetLanguage}) 1 veya 2 adet örnek devam cümlesi (suggestions) öner.

Tüm bunları JSON formatında geri döndür.`;

    // Format chat history for context
    const conversationHistory = messages
      .map((msg: any) => `${msg.role === "user" ? "Kullanıcı" : "Sen"}: ${msg.content}`)
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Sohbet Geçmişi ve Son Kullanıcı Mesajı:\n${conversationHistory}\n\nLütfen son kullanıcı mesajını "${lastUserMessage}" analiz edip rolüne uygun yanıt oluştur.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING, description: "Kullanıcıya hedef dilde vereceğin rol içi yanıt" },
            replyTranslation: { type: Type.STRING, description: "Yazdığın yanıtın Türkçe çevirisi" },
            feedback: { type: Type.STRING, description: "Kullanıcının son mesajının Türkçe dil bilgisi, akıcılık analizi ve yapıcı geri bildirimi" },
            userScore: { type: Type.INTEGER, description: "Kullanıcının son cümlesinin 100 üzerinden başarı puanı" },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Kullanıcının bir sonraki adımda seçip veya esinlenip yazabileceği 1-2 adet hedef dildeki öneri cümle"
            }
          },
          required: ["reply", "replyTranslation", "feedback", "userScore", "suggestions"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Yapay zekadan boş yanıt döndü.");
    }

    const parsedResult = JSON.parse(resultText.trim());
    res.json(parsedResult);
  } catch (error: any) {
    console.error("Chat API Error:", error);
    res.status(500).json({
      error: error.message || "Yapay zeka sohbet yanıtı oluşturulurken bir hata oluştu."
    });
  }
});

// Serve Frontend App
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
