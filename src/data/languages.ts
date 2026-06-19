import { VocabularyWord, GrammarTopic, Scenario, QuizQuestion, AppLanguage, LanguageConfig } from "../types";

export const LANGUAGES: LanguageConfig[] = [
  {
    code: "en",
    name: "İngilizce",
    nativeName: "English",
    flag: "🇬🇧",
    description: "Global iletişimin anahtarı olan İngilizce dilini sıfırdan zirveye öğrenin.",
  },
  {
    code: "tr",
    name: "Türkçe",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    description: "Zengin tarihi ve melodik yapısıyla Türkçe dilini günlük konuşmalarla keşfedin.",
  },
  {
    code: "ka",
    name: "Gürcüce",
    nativeName: "ქართული (Kartuli)",
    flag: "🇬🇪",
    description: "Kafkasya'nın kadim ve benzersiz alfabesine sahip Gürcüceyi kolayca kavrayın.",
  },
];

// Vocabulary Data
export const VOCABULARY_DATA: Record<AppLanguage, VocabularyWord[]> = {
  en: [
    {
      id: "en_g1",
      word: "Hello",
      translation: "Merhaba",
      phonetic: "he-lou",
      exampleTarget: "Hello, nice to meet you!",
      exampleTranslation: "Merhaba, tanıştığımıza memnun oldum!",
      category: "Greetings",
    },
    {
      id: "en_g2",
      word: "Thank you",
      translation: "Teşekkür ederim",
      phonetic: "tenk yu",
      exampleTarget: "Thank you for your help.",
      exampleTranslation: "Yardımınız için teşekkür ederim.",
      category: "Greetings",
    },
    {
      id: "en_g3",
      word: "How are you?",
      translation: "Nasılsın?",
      phonetic: "hav ar yu",
      exampleTarget: "How are you doing today?",
      exampleTranslation: "Bugün nasılsın?",
      category: "Greetings",
    },
    {
      id: "en_f1",
      word: "Water",
      translation: "Su",
      phonetic: "voo-tır",
      exampleTarget: "Can I have a glass of water?",
      exampleTranslation: "Bir bardak su alabilir miyim?",
      category: "Food",
    },
    {
      id: "en_f2",
      word: "Delicious",
      translation: "Lezzetli",
      phonetic: "di-li-şıs",
      exampleTarget: "This pasta is very delicious.",
      exampleTranslation: "Bu makarna çok lezzetli.",
      category: "Food",
    },
    {
      id: "en_t1",
      word: "Airport",
      translation: "Havalimanı",
      phonetic: "eyır-port",
      exampleTarget: "Where is the nearest airport?",
      exampleTranslation: "En yakın havalimanı nerede?",
      category: "Travel",
    },
    {
      id: "en_t2",
      word: "Ticket",
      translation: "Bilet",
      phonetic: "ti-kıt",
      exampleTarget: "I need to buy a train ticket.",
      exampleTranslation: "Bir tren bileti almam gerekiyor.",
      category: "Travel",
    },
    {
      id: "en_d1",
      word: "Time",
      translation: "Zaman / Saat",
      phonetic: "taym",
      exampleTarget: "What time is it?",
      exampleTranslation: "Saat kaç?",
      category: "Daily",
    },
    {
      id: "en_d2",
      word: "Friend",
      translation: "Arkadaş",
      phonetic: "frend",
      exampleTarget: "He is my best friend.",
      exampleTranslation: "O benim en yakın arkadaşım.",
      category: "Daily",
    },
  ],
  tr: [
    {
      id: "tr_g1",
      word: "Merhaba",
      translation: "Hello",
      phonetic: "mer-ha-ba",
      exampleTarget: "Merhaba, nasılsınız?",
      exampleTranslation: "Hello, how are you?",
      category: "Greetings",
    },
    {
      id: "tr_g2",
      word: "Teşekkür ederim",
      translation: "Thank you",
      phonetic: "te-şek-kür e-de-rim",
      exampleTarget: "Her şey için teşekkür ederim.",
      exampleTranslation: "Thank you for everything.",
      category: "Greetings",
    },
    {
      id: "tr_g3",
      word: "Günaydın",
      translation: "Good morning",
      phonetic: "gü-nay-dın",
      exampleTarget: "Günaydın, güzel bir gün dilerim.",
      exampleTranslation: "Good morning, I wish you a beautiful day.",
      category: "Greetings",
    },
    {
      id: "tr_f1",
      word: "Yemek",
      translation: "Food / Meal",
      phonetic: "ye-mek",
      exampleTarget: "Yemek çok güzel kokuyor.",
      exampleTranslation: "The food smells very good.",
      category: "Food",
    },
    {
      id: "tr_f2",
      word: "Kahve",
      translation: "Coffee",
      phonetic: "kah-ve",
      exampleTarget: "Sütlü bir kahve lütfen.",
      exampleTranslation: "A coffee with milk, please.",
      category: "Food",
    },
    {
      id: "tr_t1",
      word: "Yolculuk",
      translation: "Journey / Travel",
      phonetic: "yol-cu-luk",
      exampleTarget: "İyi yolculuklar dilerim!",
      exampleTranslation: "I wish you a safe journey!",
      category: "Travel",
    },
    {
      id: "tr_t2",
      word: "Otel",
      translation: "Hotel",
      phonetic: "o-tel",
      exampleTarget: "Otelimiz merkeze çok yakın.",
      exampleTranslation: "Our hotel is very close to the center.",
      category: "Travel",
    },
    {
      id: "tr_d1",
      word: "Bugün",
      translation: "Today",
      phonetic: "bu-gün",
      exampleTarget: "Bugün hava çok güzel.",
      exampleTranslation: "The weather is very beautiful today.",
      category: "Daily",
    },
  ],
  ka: [
    {
      id: "ka_g1",
      word: "გამარჯობა",
      translation: "Merhaba (Gamarjoba)",
      phonetic: "ga-mar-co-ba",
      exampleTarget: "გამარჯობა, როგორ ხარ?",
      exampleTranslation: "Merhaba, nasılsın?",
      category: "Greetings",
    },
    {
      id: "ka_g2",
      word: "გმადლობთ",
      translation: "Teşekkürler (Gmadlobt)",
      phonetic: "g-mad-lobt",
      exampleTarget: "დიდი მადლობა დახმარებისთვის.",
      exampleTranslation: "Yardımınız için çok teşekkür ederim (Didi madloba).",
      category: "Greetings",
    },
    {
      id: "ka_g3",
      word: "როგორ ხარ?",
      translation: "Nasılsın? (Rogor khar?)",
      phonetic: "ro-gor khar",
      exampleTarget: "გამარჯობა მეგობარო, როგორ ხარ?",
      exampleTranslation: "Merhaba arkadaşım, nasılsın?",
      category: "Greetings",
    },
    {
      id: "ka_f1",
      word: "წყალი",
      translation: "Su (Tskali)",
      phonetic: "ts'k'a-li",
      exampleTarget: "ერთი ჭიქა წყალი, თუ შეიძლება.",
      exampleTranslation: "Bir bardak su lütfen (tu sheizleba).",
      category: "Food",
    },
    {
      id: "ka_f2",
      word: "ხაჭაპური",
      translation: "Haçapuri (Peynirli Ekmek)",
      phonetic: "kha-ça-p'u-ri",
      exampleTarget: "ეს ხაჭაპური ძალიან გემრიელია.",
      exampleTranslation: "Bu haçapuri çok lezzetli (dzalian gemrielia).",
      category: "Food",
    },
    {
      id: "ka_t1",
      word: "სად არის...?",
      translation: "Nerede...? (Sad aris...?)",
      phonetic: "sad a-ris",
      exampleTarget: "სად არის სასტუმრო?",
      exampleTranslation: "Otel nerede? (sastumro)",
      category: "Travel",
    },
    {
      id: "ka_t2",
      word: "მატარებელი",
      translation: "Tren (Matarebeli)",
      phonetic: "ma-t'a-re-be-li",
      exampleTarget: "მატარებელი როდის გადის?",
      exampleTranslation: "Tren ne zaman kalkıyor? (rodis gadis)",
      category: "Travel",
    },
    {
      id: "ka_d1",
      word: "კარგი",
      translation: "Tamam / İyi (Kargi)",
      phonetic: "kar-gi",
      exampleTarget: "ძალიან კარგი დღეა.",
      exampleTranslation: "Çok güzel bir gün.",
      category: "Daily",
    },
  ],
};

// Grammar Lessons Data
export const GRAMMAR_DATA: Record<AppLanguage, GrammarTopic[]> = {
  en: [
    {
      id: "en_gr1",
      title: "Present Simple (Geniş Zaman)",
      level: "Beginner",
      description: "Genel gerçekleri, alışkanlıkları ve rutinleri belirtmek için kullanılır. Özneden sonra fiilin yalın hali gelir (He/She/It için fiile -s takısı eklenir).",
      rules: [
        "Olumlu cümlelerde: Özne + Fiil (Örn: I play, He plays)",
        "Olumsuz cümlelerde: Özne + don't/doesn't + Fiil (Örn: I don't go, She doesn't like)",
        "Soru cümlelerinde: Do/Does + Özne + Fiil? (Örn: Do you eat?)"
      ],
      examples: [
        {
          target: "I live in Istanbul.",
          translation: "İstanbul'da yaşıyorum.",
          explanation: "Her zaman geçerli bir durum olduğu için Geniş Zaman kullanıldı."
        },
        {
          target: "She speaks English fluently.",
          translation: "O akıcı bir şekilde İngilizce konuşur.",
          explanation: "Özne 'She' olduğu için fiile '-s' takısı eklendi (speak -> speaks)."
        }
      ]
    },
    {
      id: "en_gr2",
      title: "Present Continuous (Şimdiki Zaman)",
      level: "Beginner",
      description: "Şu anda gerçekleşmekte olan eylemleri anlatmak için kullanılır. Özneden sonra 'be' (am/is/are) yardımcı fiili ve fiile '-ing' takısı gelir.",
      rules: [
        "Formül: Özne + am/is/are + Fiil-ing",
        "Olumsuz: am not / isn't / aren't + Fiil-ing",
        "Soru: Am/Is/Are + Özne + Fiil-ing?"
      ],
      examples: [
        {
          target: "I am learning Georgian now.",
          translation: "Şu anda Gürcüce öğreniyorum.",
          explanation: "Eylem şu anda gerçekleşiyor ve 'am learning' yapısı kuruldu."
        },
        {
          target: "Why are you laughing?",
          translation: "Neden gülüyorsun?",
          explanation: "Soru sormak için yardımcı fiil 'are' öznenin önüne getirildi."
        }
      ]
    }
  ],
  tr: [
    {
      id: "tr_gr1",
      title: "Şimdiki Zaman (-yor Eki)",
      level: "Beginner",
      description: "Şu an yapılan veya yakın gelecekte yapılacak eylemler için kullanılır. Fiil köküne ünlü uyumuna göre -yor eki ve şahıs eki eklenir.",
      rules: [
        "Formül: Fiil Kökü + -uyor/-iyor/-uyor/-iyor + Şahıs Eki (Örn: Geliyorum)",
        "Olumsuz: Fiil Kökü + -mı/-mi/-mu/-mü + -yor + Şahıs Eki (Örn: Gitmiyorum)",
        "Soru: Fiil Kökü + -yor + mu/mi + Şahıs Eki? (Örn: Geliyor musun?)"
      ],
      examples: [
        {
          target: "Türkçe öğreniyorum.",
          translation: "I am learning Turkish.",
          explanation: "Fiil 'öğrenmek', -iyor şimdiki zaman eki ve -um (ben) şahıs ekiyle birleşti."
        },
        {
          target: "Bugün çalışmıyor musun?",
          translation: "Aren't you working today?",
          explanation: "Olumsuz soru yapısı: Fiil + -mı + -yor + mu + -sun."
        }
      ]
    }
  ],
  ka: [
    {
      id: "ka_gr1",
      title: "Gürcü Alfabesi & Ses Yapısı",
      level: "Beginner",
      description: "Gürcü alfabesi (Mkhedruli) 33 harften oluşur. Büyük-küçük harf ayrımı yoktur. Yazıldığı gibi okunur. Her harf tek bir sese karşılık gelir.",
      rules: [
        "ა = a, ბ = b, გ = g, დ = d, ე = e",
        "Önemli Ünlüler: ა (a), ე (e), ი (i), ო (o), უ (u)",
        "Sert ünsüzlere dikkat edilmelidir: ყ, ჭ, წ, ტ, პ, კ boğazdan patlamalı seslerdir."
      ],
      examples: [
        {
          target: "დედა (deda)",
          translation: "Anne",
          explanation: "დ (d) + ე (e) + დ (d) + ა (a)"
        },
        {
          target: "მამა (mama)",
          translation: "Baba",
          explanation: "მ (m) + ა (a) + მ (m) + ა (a)"
        }
      ]
    },
    {
      id: "ka_gr2",
      title: "Kişi Zamirleri ve Olmak (To Be) Fiili",
      level: "Beginner",
      description: "Gürcücede kişi zamirleri oldukça sadedir. 'Olmak' fiili şahıslara göre çekimlenir.",
      rules: [
        "მე (me) = Ben | შენ (shen) = Sen | ის (is) = O",
        "ჩვენ (chven) = Biz | თქვენ (tqven) = Siz | ისინი (isini) = Onlar",
        "Olmak (Present): Ben ...-yim = მე ვარ (me var) | Sen ...-sin = შენ ხარ (shen khar) | O ...-dir = ის არის (is aris)"
      ],
      examples: [
        {
          target: "მე ვარ თურქი (me var turqi).",
          translation: "Ben Türküm.",
          explanation: "'მე' (Ben) + 'ვარ' (olmak fiili çekimi) + 'თურქი' (Türk)."
        },
        {
          target: "ის არის მასწავლებელი (is aris masts'avlebeli).",
          translation: "O öğretmendir.",
          explanation: "'ის' (O) + 'არის' (dir) + 'მასწავლებელი' (Öğretmen)."
        }
      ]
    }
  ]
};

// Daily Conversation Scenarios
export const SCENARIO_DATA: Record<AppLanguage, Scenario[]> = {
  en: [
    {
      id: "en_sc1",
      title: "Kafede Sipariş Vermek",
      emoji: "☕",
      description: "Yabancı bir kafede kahve sipariş etme ve ödeme yapma pratiği.",
      role: "Kafe Garsonu",
      expressions: [
        { target: "I would like a large cappuccino, please.", translation: "Büyük boy bir kapuçino rica ediyorum.", phonetic: "ay vud layk e larc kapuçiino pliiz" },
        { target: "How much is it?", translation: "Fiyatı ne kadar?", phonetic: "hav maç iz it" },
        { target: "Keep the change.", translation: "Üstü kalsın.", phonetic: "kiip dı çeync" }
      ]
    },
    {
      id: "en_sc2",
      title: "Havalimanında Check-in",
      emoji: "✈️",
      description: "Uçuş işlemleri ve bagaj teslimi konuşma kalıpları.",
      role: "Check-in Görevlisi",
      expressions: [
        { target: "Here is my passport and ticket.", translation: "Buyurun, pasaportum ve biletim.", phonetic: "hiir iz may pasport end ti-kıt" },
        { target: "Is this bag going to the cabin?", translation: "Bu çanta kabine mi gidecek?", phonetic: "iz dis beg going tu dı ke-bin" }
      ]
    }
  ],
  tr: [
    {
      id: "tr_sc1",
      title: "Adres Sorma",
      emoji: "🗺️",
      description: "Sokakta kaybolduğunuzda birine yön sorma diyaloğu.",
      role: "Yoldan Geçen Yardımsever Biri",
      expressions: [
        { target: "Affedersiniz, metro istasyonu nerede acaba?", translation: "Excuse me, where is the metro station?", phonetic: "af-fe-der-si-niz me-tro is-tas-yo-nu ne-re-de" },
        { target: "Yakınlarda güzel bir lokanta var mı?", translation: "Is there a good restaurant nearby?", phonetic: "ya-kın-lar-da gü-zel bir lo-kan-ta var mı" }
      ]
    }
  ],
  ka: [
    {
      id: "ka_sc1",
      title: "Kafede Sipariş (Gürcistan)",
      emoji: "🍷",
      description: "Tiflis'te bir restoranda haçapuri ve içecek siparişi verme pratiği.",
      role: "Tiflis'te Restoran Garsonu",
      expressions: [
        { target: "ერთი ხაჭაპური და წყალი, თუ შეიძლება.", translation: "Bir haçapuri ve su lütfen.", phonetic: "erti khaçapuri da tskali, tu sheizleba" },
        { target: "ანგარიში მოგვიტანეთ, თუ შეიძლება.", translation: "Hesabı getirebilir misiniz lütfen?", phonetic: "angarişi mogvitanet, tu sheizleba" },
        { target: "ძალიან გემრიელი იყო!", translation: "Çok lezzetliydi!", phonetic: "dzalian gemrieli iqo" }
      ]
    },
    {
      id: "ka_sc2",
      title: "Tanışma ve Sosyalleşme",
      emoji: "🤝",
      description: "Yeni insanlarla tanışıp nereli olduğunu söyleme.",
      role: "Gürcü Arkadaş Canlısı Yerel",
      expressions: [
        { target: "რა გქვია?", translation: "Adın ne? (Ra gqvia?)", phonetic: "ra g-qvi-a" },
        { target: "მე მქვია ალი.", translation: "Benim adım Ali (Me mqvia Ali).", phonetic: "me m-qvi-a a-li" },
        { target: "სასიამოვნოა შენი გაცნობა.", translation: "Tanıştığımıza memnun oldum.", phonetic: "sasiamovnoa şeni gacnoba" }
      ]
    }
  ]
};

// Vocabulary Quiz Questions
export const QUIZ_DATA: Record<AppLanguage, QuizQuestion[]> = {
  en: [
    {
      id: "en_q1",
      question: "'Thank you' kelimesinin Türkçe anlamı nedir?",
      options: ["Lütfen", "Rica ederim", "Teşekkür ederim", "Görüşürüz"],
      correctAnswer: "Teşekkür ederim",
      explanation: "'Thank you' kalıbı teşekkür etmek için kullanılır."
    },
    {
      id: "en_q2",
      question: "'En yakın havalimanı nerede?' cümlesinin İngilizce karşılığı hangisidir?",
      options: [
        "Where is the nearest restaurant?",
        "Where is the nearest airport?",
        "How can I buy a ticket?",
        "What time is the flight?"
      ],
      correctAnswer: "Where is the nearest airport?",
      explanation: "'Airport' havalimanı, 'nearest' ise en yakın demektir."
    }
  ],
  tr: [
    {
      id: "tr_q1",
      question: "Which of the following means 'Good morning' in Turkish?",
      options: ["Tünaydın", "İyi geceler", "Günaydın", "Merhaba"],
      correctAnswer: "Günaydın",
      explanation: "'Günaydın' is the Turkish equivalent of 'Good morning'."
    }
  ],
  ka: [
    {
      id: "ka_q1",
      question: "Gürcüce 'გამარჯობა (Gamarjoba)' ne anlama gelir?",
      options: ["Görüşürüz", "Merhaba", "Teşekkürler", "Lütfen"],
      correctAnswer: "Merhaba",
      explanation: "Gürcüce en yaygın selamlaşma sözcüğü 'Gamarjoba' yani 'Merhaba'dır."
    },
    {
      id: "ka_q2",
      question: "Gürcücede 'წყალი (Tskali)' ne demektir?",
      options: ["Ekmek", "Peynir", "Su", "Kahve"],
      correctAnswer: "Su",
      explanation: "'Tskali' Gürcücede su anlamına gelmektedir."
    }
  ]
};
