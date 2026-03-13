import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RotateCcw, 
  ArrowRight,
  Star,
  Book,
  Gamepad2
} from 'lucide-react';

// --- Types ---

interface LetterRuleQuestion {
  id: number;
  word: string;
  options: string[];
  correct: string;
  rule: string;
  image: string;
}

// --- Data ---

const QUIZ_DATA: LetterRuleQuestion[] = [
  {
    id: 1,
    word: "EDUCATION",
    options: ["EDUCACIÓN", "EDUCADO", "EDUCACION"],
    correct: "EDUCACIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/education/800/400"
  },
  {
    id: 2,
    word: "CONVERSATION",
    options: ["CONVERSADO", "CONVERSACIÓN", "CONVERSACION"],
    correct: "CONVERSACIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/talk/800/400"
  },
  {
    id: 3,
    word: "PREPARATION",
    options: ["PREPARACIÓN", "PREPARADO", "PREPARACION"],
    correct: "PREPARACIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/cooking/800/400"
  },
  {
    id: 4,
    word: "DIRECTION",
    options: ["DIRECTO", "DIRECCIÓN", "DIRECCION"],
    correct: "DIRECCIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/direction/800/400"
  },
  {
    id: 5,
    word: "SITUATION",
    options: ["SITUACIÓN", "SITUADO", "SITUACION"],
    correct: "SITUACIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/office/800/400"
  },
  {
    id: 6,
    word: "ACTION",
    options: ["ACCION", "ACCIÓN", "ACTO"],
    correct: "ACCIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/action/800/400"
  },
  {
    id: 7,
    word: "ORGANIZATION",
    options: ["ORGANIZACIÓN", "ORGANIZADO", "ORGANIZACION"],
    correct: "ORGANIZACIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/organization/800/400"
  },
  {
    id: 8,
    word: "COLLECTION",
    options: ["COLECCIÓN", "COLECTA", "COLECCION"],
    correct: "COLECCIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/collection/800/400"
  },
  {
    id: 9,
    word: "POSITION",
    options: ["POSICIÓN", "PUESTO", "POSICION"],
    correct: "POSICIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/position/800/400"
  },
  {
    id: 10,
    word: "TRADITION",
    options: ["TRADICIÓN", "TRADICIONAL", "TRADICION"],
    correct: "TRADICIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/tradition/800/400"
  },
  {
    id: 11,
    word: "EMOTION",
    options: ["EMOCIONADO", "EMOCIÓN", "EMOCION"],
    correct: "EMOCIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/emotion/800/400"
  },
  {
    id: 12,
    word: "ADMIRATION",
    options: ["ADMIRACIÓN", "ADMIRADO", "ADMIRACION"],
    correct: "ADMIRACIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/admire/800/400"
  },
  {
    id: 13,
    word: "CELEBRATION",
    options: ["CELEBRACIÓN", "CELEBRADO", "CELEBRACION"],
    correct: "CELEBRACIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/celebration/800/400"
  },
  {
    id: 14,
    word: "INTUITION",
    options: ["INTUICIÓN", "INTUITIVO", "INTUICION"],
    correct: "INTUICIÓN",
    rule: "-TION → -CIÓN",
    image: "https://picsum.photos/seed/intuition/800/400"
  },
  {
    id: 15,
    word: "CITY",
    options: ["CIUDAD", "CITA", "CITO"],
    correct: "CIUDAD",
    rule: "-ITY → -IDAD",
    image: "https://picsum.photos/seed/city/800/400"
  },
  {
    id: 16,
    word: "UNIVERSITY",
    options: ["UNIVERSO", "UNIVERSIDAD", "UNIVERSITARIO"],
    correct: "UNIVERSIDAD",
    rule: "-ITY → -IDAD",
    image: "https://picsum.photos/seed/university/800/400"
  },
  {
    id: 17,
    word: "CAPACITY",
    options: ["CAPAZ", "CAPACIDAD", "CAPACITADO"],
    correct: "CAPACIDAD",
    rule: "-ITY → -IDAD",
    image: "https://picsum.photos/seed/capacity/800/400"
  },
  {
    id: 18,
    word: "ARTIST",
    options: ["ARTE", "ARTISTA", "ARTISTICO"],
    correct: "ARTISTA",
    rule: "-IST → -ISTA",
    image: "https://picsum.photos/seed/artist/800/400"
  },
  {
    id: 19,
    word: "TOURIST",
    options: ["TURISMO", "TURISTA", "TURISTICO"],
    correct: "TURISTA",
    rule: "-IST → -ISTA",
    image: "https://picsum.photos/seed/tourist/800/400"
  },
  {
    id: 20,
    word: "DENTIST",
    options: ["DENTISTA", "DIENTE", "DENTAL"],
    correct: "DENTISTA",
    rule: "-IST → -ISTA",
    image: "https://picsum.photos/seed/dentist/800/400"
  },
  {
    id: 21,
    word: "FAMOUS",
    options: ["FAMA", "FAMOSO", "FAMOSAMENTE"],
    correct: "FAMOSO",
    rule: "-OUS → -OSO",
    image: "https://picsum.photos/seed/famous/800/400"
  },
  {
    id: 22,
    word: "CURIOUS",
    options: ["CURIOSO", "CURIOSIDAD", "CURIOSAMENTE"],
    correct: "CURIOSO",
    rule: "-OUS → -OSO",
    image: "https://picsum.photos/seed/curious/800/400"
  },
  {
    id: 23,
    word: "DELICIOUS",
    options: ["DELICIA", "DELICIOSO", "DELICIOSAMENTE"],
    correct: "DELICIOSO",
    rule: "-OUS → -OSO",
    image: "https://picsum.photos/seed/delicious/800/400"
  }
];

const THEORY_DATA = [
  { letter: "Կանոն 1", rules: ["-TION (անգլ.) → -CIÓN (իսպ.)", "EDUCATION → EDUCACIÓN (Կրթություն)", "CONVERSATION → CONVERSACIÓN (Զրույց)", "ACTION → ACCIÓN (Գործողություն)"] },
  { letter: "Կանոն 2", rules: ["-ITY (անգլ.) → -IDAD (իսպ.)", "CITY → CIUDAD (Քաղաք)", "UNIVERSITY → UNIVERSIDAD (Համալսարան)", "CAPACITY → CAPACIDAD (Կարողություն)"] },
  { letter: "Կանոն 3", rules: ["-IST (անգլ.) → -ISTA (իսպ.)", "ARTIST → ARTISTA (Արվեստագետ)", "TOURIST → TURISTA (Զբոսաշրջիկ)", "DENTIST → DENTISTA (Ատամնաբույժ)"] },
  { letter: "Կանոն 4", rules: ["-OUS (անգլ.) → -OSO (իսպ.)", "FAMOUS → FAMOSO (Հայտնի)", "CURIOUS → CURIOSO (Հետաքրքրասեր)", "DELICIOUS → DELICIOSO (Համեղ)"] }
];

export default function App() {
  const [gameState, setGameState] = useState<'theory' | 'quiz' | 'results'>('theory');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = QUIZ_DATA[currentIdx];
  const progress = ((currentIdx + 1) / QUIZ_DATA.length) * 100;

  const handleOptionClick = (option: string) => {
    if (showFeedback) return;
    setSelectedOption(option);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    const correct = selectedOption === currentQuestion.correct;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setIsCorrect(null);
    if (currentIdx < QUIZ_DATA.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setGameState('results');
    }
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setGameState('theory');
  };

  return (
    <div className="min-h-screen bg-[#1e40af] bg-gradient-to-b from-[#1e40af] to-[#1e3a8a] flex flex-col font-sans text-white overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 blur-[120px] rounded-full -z-10" />

      {/* Header */}
      <header className="p-6 max-w-2xl mx-auto w-full z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
              <Gamepad2 className="w-6 h-6 text-blue-100" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Իսպաներենի Կանոններ</h1>
          </div>
          {gameState === 'quiz' && (
            <div className="bg-white/10 px-4 py-1.5 rounded-2xl border border-white/20 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-bold">{score * 5}</span>
            </div>
          )}
        </div>
        
        {gameState === 'quiz' && (
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.6)]"
            />
          </div>
        )}
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-6 flex flex-col z-10 overflow-y-auto no-scrollbar pb-32">
        <AnimatePresence mode="wait">
          {gameState === 'theory' ? (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Book className="w-8 h-8 text-blue-300" />
                    <h2 className="text-3xl font-black">Տեսություն</h2>
                  </div>
                </div>
                
                <p className="text-blue-100 mb-6 font-medium leading-relaxed">
                  Այս ուղեցույցը սովորեցնում է, թե ինչպես անգլերեն բառերը վերածել իսպաներենի՝ օգտագործելով վերջածանցների փոխարինման պարզ կանոններ։
                </p>
                
                <div className="space-y-6">
                  {THEORY_DATA.map((item, idx) => (
                    <div key={idx} className="bg-white/5 p-5 rounded-3xl border border-white/10">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center text-xl font-black text-white border border-white/20">
                          {item.letter}
                        </div>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>
                      <ul className="space-y-2">
                        {item.rules.map((rule, rIdx) => (
                          <li key={rIdx} className="text-blue-100 font-medium flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setGameState('quiz')}
                  className="w-full mt-8 py-5 bg-blue-400 hover:bg-blue-300 text-white rounded-3xl font-black text-xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  Սկսել խաղը
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          ) : gameState === 'quiz' ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-6">
                <div className="relative w-full aspect-video rounded-[32px] overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img 
                    src={currentQuestion.image} 
                    alt={currentQuestion.word}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-6">
                    <h2 className="text-5xl font-black text-white tracking-tight drop-shadow-lg">
                      {currentQuestion.word}
                    </h2>
                  </div>
                </div>
                <h3 className="text-blue-200 text-sm font-bold uppercase tracking-[0.2em]">Ընտրեք իսպաներեն տարբերակը / Select Spanish version:</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((option, i) => {
                  const isSelected = selectedOption === option;
                  const isCorrectOption = option === currentQuestion.correct;
                  
                  let btnClass = "bg-white/10 hover:bg-white/20 border-white/10 text-white";
                  if (showFeedback) {
                    if (isCorrectOption) btnClass = "bg-green-500/40 border-green-500 text-white";
                    else if (isSelected) btnClass = "bg-red-500/40 border-red-500 text-white";
                    else btnClass = "bg-white/5 border-white/5 opacity-30";
                  } else if (isSelected) {
                    btnClass = "bg-blue-500/40 border-blue-400 text-white scale-[1.02]";
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(option)}
                      disabled={showFeedback}
                      className={`p-6 rounded-3xl border-2 font-black text-2xl transition-all active:scale-95 flex items-center justify-between shadow-lg ${btnClass}`}
                    >
                      {option}
                      {showFeedback && isCorrectOption && <CheckCircle2 className="w-7 h-7" />}
                      {showFeedback && isSelected && !isCorrectOption && <XCircle className="w-7 h-7" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[50px] p-12 border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-blue-400" />
                <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                <h2 className="text-4xl font-black mb-2">Խաղն ավարտվեց!</h2>
                <p className="text-blue-200 font-bold uppercase tracking-widest mb-8">Game Over</p>
                
                <div className="flex justify-center gap-8 mb-10">
                  <div className="text-center">
                    <p className="text-4xl font-black">{score * 5}</p>
                    <p className="text-[10px] font-bold text-blue-300 uppercase">Միավոր</p>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <p className="text-4xl font-black">{score}</p>
                    <p className="text-[10px] font-bold text-blue-300 uppercase">Ճիշտ</p>
                  </div>
                </div>

                <button
                  onClick={resetGame}
                  className="w-full py-5 bg-white text-[#1e40af] rounded-3xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <RotateCcw className="w-6 h-6" />
                  Կրկնել
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Feedback Panel */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className={`fixed bottom-0 left-0 right-0 p-8 pb-12 z-50 ${
              isCorrect ? 'bg-green-600' : 'bg-red-600'
            } shadow-[0_-20px_50px_rgba(0,0,0,0.3)]`}
          >
            <div className="max-w-2xl mx-auto flex flex-col gap-6">
              <div className="flex items-center gap-5 text-white">
                <div className="p-4 bg-white/20 rounded-[24px]">
                  {isCorrect ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                </div>
                <div>
                  <h4 className="text-3xl font-black">{isCorrect ? 'Ճիշտ է!' : 'Սխալ է:'}</h4>
                  <p className="text-lg font-bold opacity-90 mt-1">
                    {isCorrect ? 'Հիանալի աշխատանք:' : `Ճիշտ պատասխանն է՝ ${currentQuestion.correct}`}
                  </p>
                  <p className="text-sm font-bold bg-black/20 px-3 py-1 rounded-lg inline-block mt-2">
                    {currentQuestion.rule}
                  </p>
                </div>
              </div>
              <button
                onClick={nextQuestion}
                className="w-full py-5 bg-white text-[#1e3a8a] rounded-3xl font-black text-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                Շարունակել
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Check Button */}
      {gameState === 'quiz' && !showFeedback && (
        <div className="fixed bottom-0 left-0 right-0 p-8 pb-12 z-40 bg-gradient-to-t from-[#1e3a8a] to-transparent">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleCheck}
              disabled={!selectedOption}
              className={`w-full py-6 rounded-3xl font-black text-2xl shadow-2xl transition-all ${
                selectedOption 
                  ? 'bg-blue-400 text-white hover:scale-[1.02] active:scale-95 shadow-blue-500/40' 
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              Ստուգել
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
