import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, CheckCircle, Zap, Smartphone, Layout, Code, MessageCircle, 
  ArrowRight, Monitor, ShoppingBag, Globe, Database, Sparkles, Bot, 
  Loader2, CreditCard, Wallet, Banknote, QrCode, Moon, Sun, ArrowLeftRight,
  BarChart, ShieldCheck, Star, Cpu, Layers, Command, Send, HelpCircle,
  Server, Lock, Search, MousePointer, Share2, Award, Users, ChevronDown, 
  ChevronUp, Terminal, Facebook, Instagram, Twitter, Linkedin, Mail, Phone,
  ExternalLink, Eye, Clock, ThumbsUp, Heart, MessageSquare, User
} from 'lucide-react';

import favicon from './assets/favicon.png';
// --- CUSTOM ANIMATIONS & STYLES ---
const customStyles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-scroll {
    animation: scroll 40s linear infinite;
  }
  .glass-panel {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .dark .glass-panel {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);
  }
  /* Custom Scrollbar for Chat */
  .chat-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .chat-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .chat-scroll::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 10px;
  }
`;

// --- ICON HELPERS ---
const RocketIcon = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
);
const TagIcon = ({size=24}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l5 5a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-5-5z"></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle></svg>
);
const BookOpenIcon = ({size=24}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);

// --- CONFIGURATION ---
const WHATSAPP_NUMBER = "6282142437450"; 
const EXCHANGE_RATE = 15500; 
const apiKey = "AIzaSyDJMkeY1azUPNAvSxDXBi-RAhrfdCIC1uo"; // Kosongkan di sini, karena API Key biasanya disuntikkan lewat environment variables

// --- UTILITIES ---
const formatPrice = (priceIDR, currency, isPlus = false) => {
  let formatted;
  if (currency === 'IDR') {
    formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(priceIDR);
  } else {
    const priceUSD = Math.ceil(priceIDR / EXCHANGE_RATE);
    formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(priceUSD);
  }
  return isPlus ? `${formatted}+` : formatted; 
};

// --- DATA LAYER ---

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Coffee Shop Landing Page", category: "F&B", image: "https://placehold.co/800x600/3b2f2f/dfd7bf?text=Kopi+Senja", link: "#" },
  { id: 2, title: "Company Profile Konstruksi", category: "Corporate", image: "https://placehold.co/800x600/1e293b/94a3b8?text=Construction", link: "#" },
  { id: 3, title: "Toko Baju Online", category: "E-Commerce", image: "https://placehold.co/800x600/be185d/fce7f3?text=Fashion+Store", link: "#" },
  { id: 4, title: "Portal Berita Kampus", category: "Blog", image: "https://placehold.co/800x600/1e40af/bfdbfe?text=News+Portal", link: "#" },
  { id: 5, title: "Sistem Kasir Sederhana", category: "Web App", image: "https://placehold.co/800x600/047857/d1fae5?text=POS+System", link: "#" },
  { id: 6, title: "Portfolio Fotografer", category: "Creative", image: "https://placehold.co/800x600/5b21b6/ede9fe?text=Photo+Portfolio", link: "#" },
];

const WORK_VALUES = [
  { title: "Transparansi Harga", desc: "Tidak ada biaya tersembunyi. Apa yang disepakati di awal, itu yang Anda bayar. Jujur dari awal.", icon: <TagIcon /> },
  { title: "Edukasi Klien", desc: "Saya tidak hanya membuatkan web, tapi juga mengajari Anda cara mengelolanya agar tidak ketergantungan.", icon: <BookOpenIcon /> },
  { title: "Update Berkala", desc: "Anda tidak akan ditinggal bingung. Saya selalu memberi kabar progress pengerjaan setiap tahapnya.", icon: <Clock /> },
  { title: "Dedikasi Penuh", desc: "Karena saya baru merintis, setiap proyek adalah prioritas utama bagi portofolio saya. Hasil pasti maksimal.", icon: <Heart /> },
];

const FAQS = [
  { q: "Saya gaptek, apakah nanti diajari cara pakainya?", a: "Pasti! Saya akan buatkan video tutorial khusus cara mengelola website Anda (ganti teks, upload foto, dll) sampai Anda paham." },
  { q: "Berapa lama website bisa selesai?", a: "Untuk Landing Page sederhana bisa 2-3 hari. Kalau Toko Online atau Company Profile sekitar 1-2 minggu tergantung kelengkapan materi dari Anda." },
  { q: "Apakah ada biaya perpanjangan?", a: "Ada. Biaya perpanjangan Domain (.com) dan Hosting dibayar setahun sekali. Tenang, saya akan ingatkan sebelum jatuh tempo." },
  { q: "Kalau ada error gimana?", a: "Saya kasih garansi perbaikan error (bug) gratis selama 1 bulan setelah website jadi. Jadi aman!" },
  { q: "Bisa nego harga?", a: "Harga di atas sudah best price untuk kualitas yang saya tawarkan. Tapi kalau budget Anda terbatas, silakan chat WA, kita cari solusi bareng." },
];

const TECH_STACK = [
  { name: "React", icon: <Code size={24}/> },
  { name: "Next.js", icon: <Layers size={24}/> },
  { name: "Tailwind", icon: <Layout size={24}/> },
  { name: "Node.js", icon: <Server size={24}/> },
  { name: "Firebase", icon: <Database size={24}/> },
  { name: "Vercel", icon: <Globe size={24}/> },
  { name: "Figma", icon: <Layout size={24}/> },
  { name: "TypeScript", icon: <Code size={24}/> },
];

const TRANSLATIONS = {
  id: {
    nav: { services: "Layanan", ai: "AI Concept", packages: "Harga", portfolio: "Portofolio", faq: "FAQ", contact: "Chat Saya" },
    hero: {
      badge: "Freelance Web Developer & IT Student",
      title: "Solusi Digital Modern",
      titleHighlight: "Harga Mahasiswa.",
      desc: "Butuh website keren tapi budget terbatas? Saya bantu buatkan website profesional dengan teknologi terbaru (React & AI) tanpa bikin kantong bolong.",
      cta1: "Tanya-Tanya Dulu",
      cta2: "Lihat Hasil Karya",
      stat1: "Project Selesai",
      stat2: "Komitmen Waktu"
    },
    services: {
      title: "Kenapa Pakai Jasa Saya?",
      subtitle: "Meskipun freelance, kualitas tetap prioritas utama.",
      grid: [
        { title: "Desain Kekinian", desc: "Tampilan fresh & modern mengikuti tren desain 2024, bukan desain kaku ala tahun 2000-an.", icon: <Layout/> },
        { title: "Teknologi Terbaru", desc: "Dibangun pakai React & Tailwind (bukan cuma template Wordpress biasa), jadi lebih cepat & aman.", icon: <Zap/> },
        { title: "Tampilan Responsif", desc: "Website otomatis menyesuaikan layar HP, Tablet, dan Laptop. Enak dilihat di mana saja.", icon: <Smartphone/> },
        { title: "Siap Masuk Google", desc: "Struktur kode rapi supaya website mudah ditemukan di pencarian Google (SEO Basic).", icon: <Search/> },
        { title: "Keamanan Standar", desc: "Sudah termasuk setting SSL (Gembok Hijau) supaya pengunjung merasa aman.", icon: <ShieldCheck/> },
        { title: "Konsultasi Santai", desc: "Bingung teknis? Ngobrol aja dulu via WA, saya jelaskan pakai bahasa manusia, bukan bahasa robot.", icon: <MessageCircle/> }
      ]
    },
    ai: {
      title: "Bantu Cari Ide Website",
      subtitle: "Bingung mau bikin web kayak gimana? Masukkan ide bisnis kamu, biar AI bantu susun kerangkanya.",
      placeholder: "Contoh: Jualan sepatu thrift shop target anak muda...",
      btn: "Buat Konsep",
      loading: "Sedang Mikir..."
    },
    packages: {
      title: "Pilih Sesuai Budget",
      subtitle: "Harga transparan, gak ada biaya siluman. Cocok buat UMKM & Personal.",
      select: "Pilih Paket Ini",
      popular: "BEST SELLER",
      duration: "Estimasi Waktu"
    },
    modal: {
      title: "Formulir Pemesanan",
      subtitle: "Isi form ini, nanti langsung terhubung ke WhatsApp saya dengan format pesan yang rapi.",
      labels: {
        name: "Nama Kakak",
        company: "Nama Bisnis/Usaha (Kalau ada)",
        desc: "Ceritain dikit web yang dimau",
        budget: "Kira-kira budget berapa? (Opsional)"
      },
      placeholders: {
        name: "Budi",
        company: "Kopi Kenangan Mantan",
        desc: "Saya mau web buat portofolio foto...",
        budget: "Sekitar 1-2 juta"
      },
      submit: "Lanjut ke WhatsApp",
      secure: "Langsung chat personal dengan saya."
    },
    contact: {
      title: "Masih Ragu? Konsultasi Aja Dulu",
      desc: "Gratis kok! Tanya-tanya soal teknis, harga, atau sekedar curhat ide bisnis juga boleh.",
      waBtn: "Chat WhatsApp Sekarang"
    },
    consultant: {
      title: "Asisten Konsultan AI",
      desc: "Bingung mulai dari mana? Tanyakan apa saja ke AI Assistant saya. Gratis!",
      placeholder: "Ketik pertanyaanmu di sini...",
      btn: "Kirim",
      loading: "Mengetik..."
    }
  },
  en: {
    nav: { services: "Services", ai: "AI Concept", packages: "Pricing", portfolio: "Portfolio", faq: "FAQ", contact: "Contact Me" },
    hero: {
      badge: "Freelance Web Developer & IT Student",
      title: "Modern Digital Solution",
      titleHighlight: "Friendly Price.",
      desc: "Need a cool website on a budget? I build professional websites using the latest tech (React & AI) that fit your pocket.",
      cta1: "Free Consultation",
      cta2: "See My Work",
      stat1: "Projects Done",
      stat2: "Commitment"
    },
    services: {
      title: "Why Hire Me?",
      subtitle: "Freelance price, agency quality dedication.",
      grid: [
        { title: "Trendy Design", desc: "Fresh & modern layout following 2024 design trends.", icon: <Layout/> },
        { title: "Latest Tech", desc: "Built with React & Tailwind for speed and security.", icon: <Zap/> },
        { title: "Fully Responsive", desc: "Looks perfect on Mobile, Tablet, and Laptop.", icon: <Smartphone/> },
        { title: "SEO Friendly", desc: "Clean code structure loved by Google search.", icon: <Search/> },
        { title: "Standard Security", desc: "Includes SSL setup for visitor peace of mind.", icon: <ShieldCheck/> },
        { title: "Friendly Chat", desc: "Confused? Let's chat on WA. I explain in human language, not robot code.", icon: <MessageCircle/> }
      ]
    },
    ai: {
      title: "Idea Generator",
      subtitle: "Stuck on ideas? Tell me your business, AI will draft the website structure.",
      placeholder: "E.g.: Thrift shop for teenagers...",
      btn: "Generate Concept",
      loading: "Thinking..."
    },
    packages: {
      title: "Choose Your Budget",
      subtitle: "Transparent pricing. Perfect for Small Business & Personal.",
      select: "Select This Plan",
      popular: "BEST SELLER",
      duration: "Est. Time"
    },
    modal: {
      title: "Order Form",
      subtitle: "Fill this out, it will redirect to my WhatsApp with a formatted message.",
      labels: {
        name: "Your Name",
        company: "Business Name (If any)",
        desc: "Brief requirement",
        budget: "Rough Budget (Optional)"
      },
      placeholders: {
        name: "John",
        company: "My Coffee Shop",
        desc: "I need a portfolio website...",
        budget: "Around 1-2 million"
      },
      submit: "Continue to WhatsApp",
      secure: "Direct personal chat with me."
    },
    contact: {
      title: "Still Not Sure?",
      desc: "It's free! Ask about tech, pricing, or just discuss your business idea.",
      waBtn: "Chat WhatsApp Now"
    },
    consultant: {
      title: "AI Consultant Assistant",
      desc: "Have a specific question? Ask my AI assistant, it's free!",
      placeholder: "Type your question here...",
      btn: "Send",
      loading: "Typing..."
    }
  }
};

// --- API HANDLER (GENERATE CONCEPT) ---
const generateWebConcept = async (userIdea, lang) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=AIzaSyDJMkeY1azUPNAvSxDXBi-RAhrfdCIC1uo`;
  const langInstruction = lang === 'id' ? "Bahasa Indonesia" : "English";
  
  const systemPrompt = `
    Role: Professional Web Developer & Consultant.
    Task: Create a brief website concept structure based on the user's business idea.
    Language: ${langInstruction}.
    Format: Return ONLY HTML snippet (using <div>, <h3 class="font-bold text-blue-400">, <ul class="list-disc pl-5">, <li>). NO Markdown.
    Style: Professional, encouraging, modern.
    Context: The user is a potential client for "WebLavirix Studio".
  `;
  
  // Fallback Mock Data if API fails or no key
  const mockResponse = `<div class="space-y-4 text-left"><div class="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"><h3 class="font-bold text-blue-400 mb-1">💡 Ide Konsep: ${userIdea}</h3><p class="text-sm text-slate-400">Ini gambaran kasarnya kak (Mode Demo):</p></div><div class="grid md:grid-cols-2 gap-4"><div class="bg-slate-800 p-4 rounded-lg"><h4 class="font-bold text-white mb-2 border-b border-slate-700 pb-2">Halaman Penting</h4><ul class="list-disc pl-5 space-y-1 text-slate-300 text-sm"><li><b>Beranda:</b> Headline menarik & foto produk.</li><li><b>Tentang:</b> Cerita singkat usaha.</li><li><b>Produk:</b> Katalog harga.</li></ul></div><div class="bg-slate-800 p-4 rounded-lg"><h4 class="font-bold text-white mb-2 border-b border-slate-700 pb-2">Fitur Wajib</h4><ul class="list-disc pl-5 space-y-1 text-slate-300 text-sm"><li>Mobile Friendly.</li><li>Tombol WA.</li></ul></div></div></div>`;

  const payload = {
    contents: [{ parts: [{ text: `Business Idea: ${userIdea}` }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] }
  };

  try {
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || mockResponse;
  } catch (error) { 
    return mockResponse; 
  }
};

// --- API HANDLER (SMART CONSULTANT) ---
const askGeminiConsultant = async (question, lang) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=AIzaSyDJMkeY1azUPNAvSxDXBi-RAhrfdCIC1uo`;
  const langInstruction = lang === 'id' ? "Bahasa Indonesia (Gaya santai tapi sopan)" : "English (Casual but professional)";
  
  const systemPrompt = `
    Role: AI Assistant for "WebLavirix Studio" (a Freelance Web Developer).
    Task: Answer client questions about web development, pricing, technical terms, or business advice.
    Language: ${langInstruction}.
    Tone: Friendly, helpful, convincing but honest.
    Constraint: Keep answers concise (max 3-4 sentences). Refer to the packages if relevant (Starter/Hemat, Business/Usaha, Commerce/Jualan).
  `;

  const payload = {
    contents: [{ parts: [{ text: `Question: ${question}` }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] }
  };

  try {
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) { 
    return lang === 'id' ? "Maaf kak, sistem AI sedang sibuk. Bisa tanyakan langsung via WhatsApp ya!" : "Sorry, AI is busy. Please ask via WhatsApp!";
  }
};

// --- DATA: PACKAGES (UPDATED FOR STUDENT/FREELANCER) ---
const getPackagesData = (t, currency) => {
  const rawPrices = [899000, 1999000, 3899000, 5000000]; 
  const items = [
    { 
      name: "Paket Hemat (Landing Page)", 
      desc: "Solusi paling murah buat yang baru mau mulai go-digital.",
      features: ["1 Halaman Panjang (Scroll)", "Pilih Template Desain", "Gratis Domain .my.id / .com", "Hosting 1 Tahun", "Tombol Chat WhatsApp", "Revisi 2x (Kecil)"] 
    },
    { 
      name: "Paket Usaha (Company Profile)", 
      desc: "Biar usahamu kelihatan bonafide dan dipercaya orang.",
      features: ["Sampai 5 Halaman Menu", "Desain Lebih Premium", "Lokasi Google Maps", "Gratis Domain .com (1 Tahun)", "SEO Dasar (Biar muncul di Google)", "Revisi 3x (Kecil)"] 
    },
    { 
      name: "Paket Jualan (Toko Online)", 
      desc: "Buat katalog produk online, gak perlu sewa ruko.",
      features: ["Sistem Toko Online", "Fitur Keranjang Belanja", "Input 10 Produk Awal (Sisanya diajari)", "Hitung Ongkir Otomatis", "Tutorial Kelola Admin", "Support 1 Bulan"] 
    },
    { 
      name: "Paket Custom (Web App)", 
      desc: "Butuh sistem yang ribet/khusus? Kita obrolin dulu.",
      features: ["Sesuai Request (Custom)", "Desain Eksklusif", "Database & Login Sistem", "Dashboard Admin Khusus", "Source Code Dikasih", "Garansi Error 3 Bulan"] 
    }
  ];
  return items.map((item, i) => ({
    id: i + 1, ...item,
    price: formatPrice(rawPrices[i], currency, i === 3), 
    duration: i === 0 ? "2-3 Hari" : i === 1 ? "1 Minggu" : i === 2 ? "2 Minggu" : "Sesuai Project",
    popular: i === 1
  }));
};

// --- COMPONENTS UI ---

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 border-none",
    secondary: "bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700",
    glow: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] border-none relative overflow-hidden",
    outline: "bg-transparent border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
  };
  return (
    <button className={`px-6 py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''} relative z-10`}>
    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">{title}</h2>
    <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
    <div className={`h-1.5 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-6 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const InfiniteMarquee = () => {
  return (
    <div className="w-full overflow-hidden bg-slate-50 dark:bg-black/50 py-10 border-y border-slate-200 dark:border-slate-800 backdrop-blur-sm">
      <div className="relative flex w-full">
        <div className="flex animate-scroll whitespace-nowrap items-center">
          {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div key={i} className="mx-8 flex items-center gap-2 text-slate-400 dark:text-slate-600 grayscale hover:grayscale-0 transition-all duration-300 hover:text-blue-500 hover:scale-110 cursor-default">
              {tech.icon}
              <span className="text-lg font-bold">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQAccordion = ({ items, t, lang }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  // Smart Consultant Logic
  const [consultQuestion, setConsultQuestion] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: lang === 'id' ? 'Halo! Ada yang bisa saya bantu soal website?' : 'Hi! How can I help you with your website today?' }
  ]);
  const [consultLoading, setConsultLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll only if there are NEW messages (prevents auto scroll on load)
  useEffect(() => {
    if (messages.length > 1) { 
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  const handleAsk = async (e) => {
    e.preventDefault();
    if(!consultQuestion.trim()) return;
    
    const userMsg = { role: 'user', text: consultQuestion };
    setMessages(prev => [...prev, userMsg]);
    setConsultQuestion('');
    setConsultLoading(true);

    const ans = await askGeminiConsultant(userMsg.text, lang);
    
    setMessages(prev => [...prev, { role: 'ai', text: ans }]);
    setConsultLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
      
      {/* --- AI CONSULTANT CHAT WIDGET --- */}
      <div className="lg:col-span-2 sticky top-24">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                <Bot className="text-white w-6 h-6" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-indigo-600 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">AI Consultant</h3>
              <p className="text-blue-200 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto chat-scroll space-y-4 bg-slate-950/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {consultLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none p-3 flex gap-1 items-center">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <form onSubmit={handleAsk} className="relative flex items-center gap-2">
              <input 
                value={consultQuestion}
                onChange={(e) => setConsultQuestion(e.target.value)}
                className="w-full bg-slate-800 text-white text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
                placeholder={t.consultant.placeholder}
                spellCheck="false"
              />
              <button 
                type="submit"
                disabled={consultLoading || !consultQuestion.trim()}
                className="absolute right-1 top-1 w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- STANDARD FAQ ACCORDION --- */}
      <div className="lg:col-span-3 space-y-4">
        {items.map((item, i) => (
          <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300 hover:border-blue-500/50">
            <button 
              className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-lg">{item.q}</span>
              {openIndex === i ? <ChevronUp className="text-blue-500"/> : <ChevronDown className="text-slate-400"/>}
            </button>
            <div className={`px-6 bg-slate-50 dark:bg-slate-950/50 text-slate-600 dark:text-slate-400 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-48 py-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
              <p className="leading-relaxed">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MODAL ORDER (WHATSAPP INTEGRATION) ---
const OrderModal = ({ isOpen, onClose, pkg, t }) => {
  if (!isOpen) return null;
  
  const [formData, setFormData] = useState({ name: '', company: '', desc: '', budget: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `
Halo Kak, saya mau tanya/pesan jasa website-nya.

*Detail Paket:*
📦 *Paket:* ${pkg.name}
💰 *Harga:* ${pkg.price}

*Data Saya:*
👤 *Nama:* ${formData.name}
🏢 *Usaha:* ${formData.company || '-'}
💵 *Budget:* ${formData.budget || '-'}

*Kebutuhan Saya:*
${formData.desc}

Mohon infonya ya kak. Terima kasih.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(waLink, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"><X size={20}/></button>
          
          <h3 className="text-3xl font-black mb-2">{t.modal.title}</h3>
          <p className="text-blue-100 opacity-90">{t.modal.subtitle}</p>
          
          <div className="mt-6 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
            <div className="w-12 h-12 bg-white text-blue-600 rounded-lg flex items-center justify-center shadow-lg shrink-0">
              <ShoppingBag size={24}/>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest opacity-80">Paket Pilihan</p>
              <p className="text-xl font-bold">{pkg?.name}</p>
              <p className="text-sm opacity-90">{pkg?.price} • {pkg?.duration}</p>
            </div>
          </div>
        </div>

        {/* Form Body - Scrollable */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.modal.labels.name} <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 pl-11 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder={t.modal.placeholders.name} />
                  <Users className="absolute left-3 top-3.5 text-slate-400" size={18}/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.modal.labels.company}</label>
                <div className="relative">
                  <input name="company" value={formData.company} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 pl-11 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder={t.modal.placeholders.company} />
                  <Award className="absolute left-3 top-3.5 text-slate-400" size={18}/>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.modal.labels.budget}</label>
              <div className="relative">
                <input name="budget" value={formData.budget} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 pl-11 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder={t.modal.placeholders.budget} />
                <Wallet className="absolute left-3 top-3.5 text-slate-400" size={18}/>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.modal.labels.desc} <span className="text-red-500">*</span></label>
              <textarea required name="desc" value={formData.desc} onChange={handleInputChange} rows="4" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder={t.modal.placeholders.desc}></textarea>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl flex items-start gap-3 border border-green-200 dark:border-green-800">
              <div className="mt-1 bg-green-500 text-white rounded-full p-1"><CheckCircle size={14}/></div>
              <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">{t.modal.secure}</p>
            </div>

            <Button variant="glow" type="submit" className="w-full text-lg py-4 shadow-green-500/30 from-green-500 to-emerald-600 hover:shadow-green-500/50">
              <MessageCircle className="w-6 h-6"/> {t.modal.submit}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function App() {
  const [lang, setLang] = useState('id');
  const [currency, setCurrency] = useState('IDR');
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalPkg, setModalPkg] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = TRANSLATIONS[lang];
  const packages = getPackagesData(t, currency);

  const toggleLocale = () => { setLang(l => l === 'id' ? 'en' : 'id'); setCurrency(c => c === 'IDR' ? 'USD' : 'IDR'); };
  const scrollTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  // AI Logic
  const [aiIdea, setAiIdea] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const handleAiGen = async () => {
    if(!aiIdea) return;
    setAiLoading(true);
    const res = await generateWebConcept(aiIdea, lang);
    setAiResult(res);
    setAiLoading(false);
  };

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="font-sans bg-white dark:bg-black min-h-screen text-slate-900 dark:text-white transition-colors duration-500 selection:bg-blue-500/30">
        <style>{customStyles}</style>
        
        <OrderModal isOpen={!!modalPkg} pkg={modalPkg} onClose={() => setModalPkg(null)} t={t} />

        {/* --- NAVBAR --- */}
        <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-lg' : 'bg-transparent py-4'}`}>
          <div className="container mx-auto px-4 h-20 flex justify-between items-center">
             <div className="flex items-center gap-3 font-black text-2xl tracking-tighter cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
                <div className="relative">
                  <img src={favicon} alt="ikon" className="w-12 h-12" />
                </div>
                <span className="text-slate-900 dark:text-white group-hover:tracking-normal transition-all duration-300">Web<span className="text-blue-500">Lavirix</span></span>
             </div>
             
             <div className="hidden lg:flex items-center gap-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-8 py-2 rounded-full border border-slate-200 dark:border-slate-800">
                {Object.keys(t.nav).map(key => (
                  <button key={key} onClick={() => scrollTo(key)} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors uppercase tracking-wide hover:scale-105 transform">{t.nav[key]}</button>
                ))}
             </div>

             <div className="hidden lg:flex items-center gap-4">
                <button onClick={toggleLocale} className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  <Globe size={14}/> {lang.toUpperCase()}
                </button>
                <button onClick={() => setDark(!dark)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-yellow-500">
                  {dark ? <Sun size={20}/> : <Moon size={20}/>}
                </button>
                <Button variant="glow" onClick={() => scrollTo('contact')} className="px-6 h-10 text-sm">
                  {t.nav.contact}
                </Button>
             </div>
             <button className="lg:hidden p-2 text-slate-900 dark:text-white" onClick={() => setMenuOpen(!menuOpen)}><Menu size={28}/></button>
          </div>
        </nav>
        
        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl pt-24 px-6 animate-in slide-in-from-top-10 duration-300">
             <div className="flex flex-col gap-6">
               {Object.keys(t.nav).map(key => (
                  <button key={key} onClick={() => scrollTo(key)} className="text-3xl font-black text-slate-900 dark:text-white text-left border-b border-slate-200 dark:border-slate-800 pb-4">{t.nav[key]}</button>
               ))}
               <div className="flex gap-4 mt-4">
                 <button onClick={toggleLocale} className="flex-1 py-4 rounded-xl bg-slate-100 dark:bg-slate-900 font-bold">Switch to {lang === 'id' ? 'English' : 'Indonesia'}</button>
                 <button onClick={() => setDark(!dark)} className="flex-1 py-4 rounded-xl bg-slate-100 dark:bg-slate-900 flex justify-center">{dark ? <Sun/> : <Moon/>}</button>
               </div>
             </div>
          </div>
        )}

        {/* --- HERO SECTION --- */}
        <section id="hero" className="relative pt-32 pb-32 px-4 min-h-screen flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-500/20 dark:bg-purple-900/20 rounded-full blur-[120px] animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 dark:bg-blue-900/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-cyan-500/20 dark:bg-cyan-900/20 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
          </div>

          <div className="container mx-auto relative z-10 text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-panel border border-slate-200 dark:border-slate-700 shadow-xl mb-10 hover:scale-105 transition-transform cursor-default">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="font-bold text-slate-800 dark:text-white text-sm tracking-wide uppercase">{t.hero.badge}</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[0.9] drop-shadow-2xl">
              {t.hero.title} <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              {t.hero.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button variant="glow" onClick={() => scrollTo('packages')} className="text-lg px-10 py-5 w-full sm:w-auto shadow-2xl shadow-blue-600/40">
                <RocketIcon className="w-6 h-6 animate-pulse"/> {t.hero.cta1}
              </Button>
              <Button variant="secondary" onClick={() => scrollTo('portfolio')} className="text-lg px-10 py-5 w-full sm:w-auto border-2 hover:border-slate-400 dark:hover:border-slate-500">
                {t.hero.cta2} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200 dark:border-slate-800 pt-10">
               {[
                 { label: t.hero.stat1, val: "15+" }, // Adjusted for student
                 { label: t.hero.stat2, val: "100%" },
                 { label: "Dedikasi", val: "100%" },
                 { label: "Response", val: "Cepat" }
               ].map((stat, i) => (
                 <div key={i}>
                   <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">{stat.val}</div>
                   <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        <InfiniteMarquee />

        {/* --- SERVICES GRID (BENTO STYLE) --- */}
        <section id="services" className="py-32 px-4 bg-slate-50 dark:bg-black relative">
          <div className="container mx-auto">
            <SectionTitle title={t.services.title} subtitle={t.services.subtitle} />
            
            <div className="grid md:grid-cols-3 gap-6">
              {t.services.grid.map((srv, i) => (
                <div key={i} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {React.cloneElement(srv.icon, { size: 28 })}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{srv.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{srv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- AI ARCHITECT --- */}
        <section id="ai" className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-900">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[150px]"></div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-blue-400 font-bold mb-6 uppercase tracking-wider text-sm bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
                  <Bot size={18} /> New Feature
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">{t.ai.title}</h2>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed">{t.ai.subtitle}</p>
                
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl">
                  <label className="text-sm font-bold text-slate-400 uppercase mb-3 block ml-1">Deskripsikan Visi Anda</label>
                  <textarea 
                    value={aiIdea}
                    onChange={(e) => setAiIdea(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600 text-lg mb-6"
                    rows="4"
                    placeholder={t.ai.placeholder}
                  />
                  <Button variant="glow" onClick={handleAiGen} className="w-full text-lg h-14" disabled={aiLoading}>
                    {aiLoading ? <><Loader2 className="animate-spin"/> {t.ai.loading}</> : <><Sparkles size={20}/> {t.ai.btn}</>}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30"></div>
                <div className="relative bg-slate-950 border border-slate-800 rounded-3xl p-8 min-h-[500px] flex flex-col shadow-2xl">
                  <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs font-mono text-slate-500">AI_ARCHITECT_V2.0</div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {aiResult ? (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" dangerouslySetInnerHTML={{ __html: aiResult }}></div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-600">
                        <Terminal size={64} className="mb-4 opacity-20"/>
                        <p className="font-mono text-sm">Menunggu ide cemerlang kakak...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PACKAGES / PRICING --- */}
        <section id="packages" className="py-32 px-4 bg-slate-50 dark:bg-black">
          <div className="container mx-auto">
            <SectionTitle title={t.packages.title} subtitle={t.packages.subtitle} />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg, i) => (
                <div key={i} className={`relative p-8 rounded-[2rem] flex flex-col transition-all duration-500 ${pkg.popular ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-2xl scale-105 z-10 border-none ring-4 ring-blue-500/30' : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-blue-400'}`}>
                  {pkg.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg tracking-widest uppercase">
                      {t.packages.popular}
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className={`text-sm mb-6 min-h-[40px] ${pkg.popular ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500'}`}>{pkg.desc}</p>
                  
                  <div className="text-3xl font-black mb-1">{pkg.price}</div>
                  <div className={`text-xs mb-8 font-bold uppercase tracking-wide ${pkg.popular ? 'text-blue-400 dark:text-blue-600' : 'text-blue-600 dark:text-blue-400'}`}>{pkg.duration}</div>
                  
                  <div className={`h-px w-full mb-8 ${pkg.popular ? 'bg-slate-700 dark:bg-slate-200' : 'bg-slate-100 dark:bg-slate-800'}`}></div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex gap-3 text-sm items-start">
                        <CheckCircle size={18} className={`shrink-0 mt-0.5 ${pkg.popular ? "text-green-400 dark:text-green-600" : "text-green-500"}`} />
                        <span className={pkg.popular ? 'text-slate-200 dark:text-slate-800' : 'text-slate-600 dark:text-slate-300'}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => setModalPkg(pkg)}
                    className={`w-full py-4 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2 ${pkg.popular ? 'bg-white text-black hover:bg-slate-100 dark:bg-black dark:text-white dark:hover:bg-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600'}`}
                  >
                    <MessageCircle size={18}/> {t.packages.select}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PORTFOLIO SLIDER (INTERACTIVE HOVER) --- */}
        <section id="portfolio" className="py-32 px-4 bg-white dark:bg-slate-950 overflow-hidden">
          <div className="container mx-auto">
            <SectionTitle title={t.nav.portfolio} subtitle="Beberapa hasil karya yang pernah saya buat." />
            
            <div className="grid md:grid-cols-3 gap-8">
               {PORTFOLIO_ITEMS.map((item) => (
                 <div key={item.id} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 aspect-[4/3]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Hover Overlay with Button */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                      <h4 className="text-white font-bold text-xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h4>
                      <p className="text-slate-300 text-sm mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.category}</p>
                      
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-blue-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-100 flex items-center gap-2"
                      >
                        View Project <ExternalLink size={16}/>
                      </a>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* --- VALUES / COMMITMENTS --- */}
        <section className="py-24 px-4 bg-slate-50 dark:bg-black">
          <div className="container mx-auto">
            <SectionTitle title="Kenapa Memilih Saya?" subtitle="Prinsip kerja yang saya pegang teguh." />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WORK_VALUES.map((val, i) => (
                <div key={i} className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 transition-colors bg-white dark:bg-slate-900 group hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    {React.cloneElement(val.icon, { size: 24 })}
                  </div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{val.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section id="faq" className="py-24 px-4 bg-white dark:bg-slate-950">
          <div className="container mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t.nav.faq}</h2>
            <p className="text-slate-500 mb-12">Pertanyaan yang sering diajukan calon klien.</p>
            <FAQAccordion items={FAQS} t={t} lang={lang} />
          </div>
        </section>

        {/* --- CTA / CONTACT SECTION --- */}
        <section id="contact" className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900 dark:bg-slate-950">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/50 to-purple-900/50"></div>
          </div>

          <div className="container mx-auto max-w-4xl relative z-10 text-center">
            <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md mb-8 animate-bounce">
              <MessageCircle size={40} className="text-white"/>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">{t.contact.title}</h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">{t.contact.desc}</p>
            
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl shadow-green-500/40 transition-transform hover:scale-105 active:scale-95"
            >
              <Smartphone size={28}/> {t.contact.waBtn}
            </a>
            
            <p className="mt-8 text-blue-200 text-sm font-mono">Saya online hampir 24 jam (kecuali tidur 😅).</p>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-slate-100 dark:bg-black pt-20 pb-10 px-4 border-t border-slate-200 dark:border-slate-900">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-2">
                <div className="flex items-center gap-2 font-black text-2xl tracking-tighter mb-6">
                  <img src={favicon} 
                    alt="ikon" 
                    className="w-12 h-12" 
                  />
                  <span className="text-slate-900 dark:text-white">Web<span className="text-blue-600">Lavirix</span></span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 max-w-sm">
                  Jasa pembuatan website profesional dengan harga mahasiswa. Solusi tepat buat UMKM dan Personal Branding.
                </p>
                <div className="flex gap-4">
                  {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-blue-500 hover:shadow-lg transition-all"><Icon size={18}/></a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Services</h4>
                <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                  <li><a href="#services" onClick={() => scrollTo('services')} className="hover:text-blue-500 transition-colors">Web Development</a></li>
                  <li><a href="#services" onClick={() => scrollTo('services')} className="hover:text-blue-500 transition-colors">UI/UX Design</a></li>
                  <li><a href="#packages" onClick={() => scrollTo('packages')} className="hover:text-blue-500 transition-colors">E-Commerce</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
                <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                  <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors">WhatsApp</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Email</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Instagram</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">© {new Date().getFullYear()} WebLavirix Studio. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* --- FLOATING WHATSAPP BUTTON --- */}
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}`} 
          target="_blank"
          rel="noreferrer" 
          className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 transition-transform hover:scale-110 animate-in zoom-in slide-in-from-bottom-10"
        >
          <MessageCircle size={28} />
        </a>

      </div>
    </div>
  );
}