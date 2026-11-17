import { useMemo, useState } from 'react';
import { BookOpen, Volume2, Search, Menu, X, Home, Leaf, GraduationCap, Building2, Bike, Bookmark, Sparkles, ChevronRight, ArrowLeft, CheckCircle2, RotateCcw, Headphones, Play, Star } from 'lucide-react';
import words from './data/vocabulary.json';

const categories = [
  { name: 'Semua', icon: BookOpen, note: 'Jelajahi semua kosakata', tone: 'mint' },
  { name: 'Rumah', icon: Home, note: 'Benda di dalam rumah', tone: 'peach' },
  { name: 'Sekolah', icon: GraduationCap, note: 'Tempat dan perlengkapan belajar', tone: 'sky' },
  { name: 'Alam', icon: Leaf, note: 'Unsur alam di sekitar kita', tone: 'mint' },
  { name: 'Fasilitas umum', icon: Building2, note: 'Tempat yang sering dikunjungi', tone: 'lilac' },
  { name: 'Jalan & transportasi', icon: Bike, note: 'Jalan dan kendaraan', tone: 'yellow' },
];
const tones = { peach: 'tone-peach', sand: 'tone-sand', sky: 'tone-sky', mint: 'tone-mint', lilac: 'tone-lilac', yellow: 'tone-yellow' };

function speakArabic(text) {
  if (!('speechSynthesis' in window)) {
    alert('Browser ini belum mendukung fitur suara.');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.78;
  const voices = window.speechSynthesis.getVoices();
  const arabicVoice = voices.find(v => v.lang.toLowerCase().startsWith('ar'));
  if (arabicVoice) {
    utterance.voice = arabicVoice;
  }
  utterance.onerror = () => {
    console.warn('Text-to-speech tidak dapat memutar suara pada browser ini.');
  };
  window.speechSynthesis.speak(utterance);
}

function Header({ page, setPage, savedCount }) {
  const [open, setOpen] = useState(false);
  const nav = [{id:'home',label:'Beranda'},{id:'vocabulary',label:'Kosakata'},{id:'quiz',label:'Kuis'}];
  return <header className="topbar"><div className="nav-wrap">
    <button className="brand" onClick={()=>setPage('home')} aria-label="Ke beranda"><span className="brand-mark">م</span><span><b>mufradat</b><small>kamus visual bahasa Arab</small></span></button>
    <nav className={open?'nav-links show':'nav-links'}>{nav.map(n=><button key={n.id} className={page===n.id?'nav-item active':'nav-item'} onClick={()=>{setPage(n.id);setOpen(false)}}>{n.label}</button>)}
      <button className="nav-saved" onClick={()=>{setPage('saved');setOpen(false)}}><Bookmark size={16}/> Tersimpan <span>{savedCount}</span></button>
    </nav>
    <button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label="Buka menu">{open?<X/>:<Menu/>}</button>
  </div></header>
}

function WordCard({ word, saved, toggleSaved, openWord }) {
  return <article className="word-card">
    <div className={`word-art ${tones[word.color]}`} onClick={()=>openWord(word)} role="button" tabIndex="0" onKeyDown={e=>e.key==='Enter'&&openWord(word)}>
      <span className="art-orbit"></span><span className="word-emoji">{word.emoji}</span>
      <span className="art-label">{word.category}</span>
    </div>
    <div className="word-info">
      <div className="word-arabic" dir="rtl" lang="ar">{word.arabic}</div>
      <div className="word-latin">{word.latin}</div>
      <div className="word-bottom"><b>{word.meaning}</b><div className="card-actions">
        <button className="icon-btn sound-btn" title="Dengarkan pelafalan" onClick={()=>speakArabic(word.arabic)}><Volume2 size={17}/></button>
        <button className={saved?'icon-btn saved':'icon-btn'} title="Simpan kosakata" onClick={()=>toggleSaved(word.id)}><Bookmark size={16} fill={saved?'currentColor':'none'}/></button>
      </div></div>
    </div>
  </article>
}

function DetailModal({ word, onClose, saved, toggleSaved }) {
  if (!word) return null;
  return <div className="modal-backdrop" onClick={onClose}><section className="detail-modal" onClick={e=>e.stopPropagation()}>
    <button className="modal-close" onClick={onClose}><X size={20}/></button>
    <div className={`detail-art ${tones[word.color]}`}><span>{word.emoji}</span></div>
    <div className="detail-category">{word.category}</div>
    <div className="detail-arabic" dir="rtl" lang="ar">{word.arabic}</div>
    <div className="detail-latin">{word.latin}</div>
    <h2>{word.meaning}</h2>
    <div className="example-box"><small>CONTOH KALIMAT</small><div className="example-arabic" dir="rtl" lang="ar">{word.example}</div><p>{word.exampleMeaning}</p></div>
    <div className="detail-actions"><button className="btn-primary" onClick={()=>speakArabic(word.arabic)}><Volume2 size={18}/> Dengarkan pelafalan</button><button className="btn-secondary" onClick={()=>toggleSaved(word.id)}><Bookmark size={17} fill={saved?'currentColor':'none'}/>{saved?'Tersimpan':'Simpan'}</button></div>
  </section></div>
}

function HomePage({ setPage, setCategory, openWord, saved, toggleSaved }) {
  const featured = [words[0], words[14], words[10]];
  return <main>
    <section className="hero page-width">
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"></span> BELAJAR BAHASA ARAB JADI LEBIH DEKAT</div>
        <h1>Kenali lingkunganmu,<br/><em>kuasai bahasa Arab.</em></h1>
        <p>Temukan kosakata bahasa Arab dari benda dan tempat di sekitarmu. Lihat gambarnya, dengarkan cara mengucapkannya, lalu uji pemahamanmu.</p>
        <div className="hero-actions"><button className="btn-primary" onClick={()=>setPage('vocabulary')}>Mulai belajar <ChevronRight size={18}/></button><button className="btn-text" onClick={()=>setPage('quiz')}><Play size={16}/> Coba kuis</button></div>
        <div className="hero-meta"><span><BookOpen size={15}/> 28 kosakata</span><span><Headphones size={15}/> Audio pelafalan</span><span><Sparkles size={15}/> Kuis interaktif</span></div>
      </div>
      <div className="hero-visual"><div className="hero-blob"></div><div className="hero-note note-one"><span>🌳</span><b>شَجَرَةٌ</b><small>Pohon</small></div><div className="hero-note note-two"><span>🏠</span><b>بَيْتٌ</b><small>Rumah</small></div><div className="hero-main-illustration"><div className="sun"></div><div className="cloud cloud-a"></div><div className="cloud cloud-b"></div><div className="hill hill-back"></div><div className="hill hill-front"></div><div className="house"><div className="roof"></div><div className="house-body"><div className="window"></div><div className="door"></div></div></div><div className="tree tree-a"><i></i><b></b></div><div className="tree tree-b"><i></i><b></b></div><div className="path"></div></div><div className="hero-stamp"><span>مُفْرَدَات</span><small>Belajar setiap hari</small></div></div>
    </section>
    <section className="page-width section-block"><div className="section-heading"><div><div className="eyebrow">JELAJAHI BERDASARKAN TEMA</div><h2>Mulai dari sekitarmu</h2><p>Pilih kategori yang ingin kamu pelajari.</p></div><button className="btn-text" onClick={()=>setPage('vocabulary')}>Lihat semua <ChevronRight size={16}/></button></div>
      <div className="category-grid">{categories.slice(1).map((c,i)=>{const Icon=c.icon;return <button className="category-card" key={c.name} onClick={()=>{setCategory(c.name);setPage('vocabulary')}}><span className={`category-icon ${tones[c.tone]}`}><Icon size={23}/></span><span className="category-name">{c.name}</span><span className="category-note">{c.note}</span><span className="category-arrow"><ChevronRight size={17}/></span></button>})}</div>
    </section>
    <section className="featured-section"><div className="page-width"><div className="section-heading"><div><div className="eyebrow">MULAI DENGAN KATA PILIHAN</div><h2>Kosakata pilihan</h2><p>Tiga kata untuk membuka sesi belajarmu.</p></div><button className="btn-text" onClick={()=>setPage('vocabulary')}>Jelajahi kosakata <ChevronRight size={16}/></button></div><div className="word-grid">{featured.map(w=><WordCard key={w.id} word={w} saved={saved.includes(w.id)} toggleSaved={toggleSaved} openWord={openWord}/>)}</div></div></section>
  </main>
}

function VocabularyPage({ category, setCategory, saved, toggleSaved, openWord }) {
  const [search,setSearch] = useState('');
  const filtered = useMemo(()=>words.filter(w=>(category==='Semua'||w.category===category) && `${w.meaning} ${w.arabic} ${w.latin}`.toLowerCase().includes(search.toLowerCase())),[category,search]);
  return <main className="page-width inner-page"><div className="page-intro"><div className="eyebrow">PERPUSTAKAAN KOSAKATA</div><h1>Jelajahi kosakata</h1><p>Pelajari kata demi kata. Tekan kartu untuk melihat contoh kalimat dan mendengarkan pelafalannya.</p></div>
    <div className="toolbar"><div className="search-box"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari kata Indonesia, Arab, atau latin..."/></div><span className="result-count">{filtered.length} kosakata</span></div>
    <div className="filter-row">{categories.map(c=><button key={c.name} className={category===c.name?'filter-chip selected':'filter-chip'} onClick={()=>setCategory(c.name)}>{c.name}</button>)}</div>
    {filtered.length?<div className="word-grid">{filtered.map(w=><WordCard key={w.id} word={w} saved={saved.includes(w.id)} toggleSaved={toggleSaved} openWord={openWord}/>)}</div>:<div className="empty-state"><Search size={30}/><h3>Kosakata tidak ditemukan</h3><p>Coba kata kunci lain atau pilih kategori berbeda.</p></div>}
  </main>
}

function SavedPage({ saved, toggleSaved, openWord }) {
  const items=words.filter(w=>saved.includes(w.id));
  return <main className="page-width inner-page"><div className="page-intro"><div className="eyebrow">KOLEKSI PRIBADI</div><h1>Kosakata tersimpan</h1><p>Kata-kata yang kamu tandai agar mudah dipelajari kembali.</p></div>
    {items.length?<div className="word-grid">{items.map(w=><WordCard key={w.id} word={w} saved={true} toggleSaved={toggleSaved} openWord={openWord}/>)}</div>:<div className="empty-state"><Bookmark size={30}/><h3>Belum ada kosakata tersimpan</h3><p>Tekan ikon penanda pada kartu kosakata untuk menyimpannya.</p></div>}
  </main>
}

function QuizPage() {
  const [round,setRound]=useState(0), [choice,setChoice]=useState(null), [score,setScore]=useState(0), [done,setDone]=useState(false);
  const questions=useMemo(()=>[...words].sort((a,b)=>((a.id*17+3)%31)-((b.id*17+3)%31)).slice(0,8),[]);
  const current=questions[round];
  const options=useMemo(()=>current?[current,...words.filter(w=>w.id!==current.id).sort((a,b)=>((a.id*13+round*7)%37)-((b.id*13+round*7)%37)).slice(0,3)].sort((a,b)=>((a.id*11+round*3)%29)-((b.id*11+round*3)%29)):[],[round,current]);
  const answer=(id)=>{if(choice!==null)return;setChoice(id);if(id===current.id)setScore(s=>s+1)};
  const next=()=>{if(round===7){setDone(true)}else{setRound(r=>r+1);setChoice(null)}};
  const restart=()=>{setRound(0);setChoice(null);setScore(0);setDone(false)};
  return <main className="page-width inner-page quiz-page"><div className="page-intro"><div className="eyebrow">UJI PEMAHAMANMU</div><h1>Waktunya bermain kuis!</h1><p>Perhatikan gambar, lalu pilih arti kata yang paling tepat.</p></div>
    <section className="quiz-panel">{done?<div className="quiz-result"><div className="result-medal">🏆</div><div className="eyebrow">SESI SELESAI</div><h2>Bagus! Kamu sudah berlatih.</h2><div className="score-number">{score}<small>/ 8</small></div><p>{score>=7?'Luar biasa! Pemahaman kosakatamu sangat baik.':score>=5?'Bagus. Terus ulangi kosakata yang belum tepat.':'Terus berlatih. Setiap pengulangan membuatmu semakin ingat.'}</p><button className="btn-primary" onClick={restart}><RotateCcw size={17}/> Ulangi kuis</button></div>:<><div className="quiz-top"><span className="quiz-tag"><Sparkles size={15}/> KUIS GAMBAR</span><span className="quiz-counter">Pertanyaan {round+1} <b>/ 8</b></span></div><div className="progress-track"><span style={{width:`${(round+(choice!==null?1:0))/8*100}%`}}/></div><div className="quiz-question"><p>Apa bahasa Indonesia dari kata berikut?</p><div className={`quiz-art ${tones[current.color]}`}><span>{current.emoji}</span></div><div className="quiz-arabic" dir="rtl" lang="ar">{current.arabic}</div><button className="listen-link" onClick={()=>speakArabic(current.arabic)}><Volume2 size={16}/> Dengarkan pelafalan</button></div><div className="answer-grid">{options.map(o=><button key={o.id} disabled={choice!==null} onClick={()=>answer(o.id)} className={`answer-option ${choice!==null&&o.id===current.id?'correct':choice===o.id?'incorrect':''}`}>{o.meaning}{choice!==null&&o.id===current.id&&<CheckCircle2 size={17}/>}</button>)}</div>{choice!==null&&<div className={choice===current.id?'feedback good':'feedback bad'}>{choice===current.id?'Tepat sekali! Jawabanmu benar.':`Belum tepat. Jawaban yang benar adalah ${current.meaning}.`}<button className="btn-primary" onClick={next}>{round===7?'Lihat hasil':'Lanjutkan'} <ChevronRight size={17}/></button></div>}</>}</section>
  </main>
}

export default function App() {
  const [page,setPage]=useState('home');
  const [category,setCategory]=useState('Semua');
  const [detail,setDetail]=useState(null);
  const [saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem('mufradat-saved')||'[]')}catch{return []}});
  const toggleSaved=(id)=>setSaved(old=>{const next=old.includes(id)?old.filter(x=>x!==id):[...old,id];localStorage.setItem('mufradat-saved',JSON.stringify(next));return next});
  const goPage=(p)=>{setPage(p);window.scrollTo({top:0,behavior:'smooth'})};
  return <><Header page={page} setPage={goPage} savedCount={saved.length}/>
    {page==='home'&&<HomePage setPage={goPage} setCategory={setCategory} openWord={setDetail} saved={saved} toggleSaved={toggleSaved}/>}
    {page==='vocabulary'&&<VocabularyPage category={category} setCategory={setCategory} saved={saved} toggleSaved={toggleSaved} openWord={setDetail}/>}
    {page==='saved'&&<SavedPage saved={saved} toggleSaved={toggleSaved} openWord={setDetail}/>}
    {page==='quiz'&&<QuizPage/>}
    <footer className="footer"><div className="page-width footer-inner"><div className="brand footer-brand"><span className="brand-mark">م</span><span><b>mufradat</b><small>Belajar dari lingkungan sekitar.</small></span></div><span>Materi belajar bahasa Arab · 2026</span></div></footer>
    <DetailModal word={detail} onClose={()=>setDetail(null)} saved={detail?saved.includes(detail.id):false} toggleSaved={toggleSaved}/>
  </>;
}
