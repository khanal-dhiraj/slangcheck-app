import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, TrendingUp, Zap, Brain, Sparkles, Eye } from 'lucide-react';

const SlangQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const slangTerms = [
    // REAL Gen Z Terms
    {
      term: "No Cap",
      definition: "No lie, for real, I'm being serious",
      isReal: true,
      context: "Used to emphasize honesty or truthfulness",
      example: "'This pizza is amazing, no cap!'",
      origin: "From 'capping' meaning lying",
      vibe: "from-blue-500 to-cyan-500",
      emoji: "🧢"
    },
    {
      term: "Bussin",
      definition: "Really good, especially about food",
      isReal: true,
      context: "Describes something that tastes incredible",
      example: "'This ramen is absolutely bussin!'",
      origin: "Possibly from 'busting' with flavor",
      vibe: "from-orange-500 to-red-500",
      emoji: "🔥"
    },
    {
      term: "Periodt",
      definition: "Period but with emphasis - end of discussion",
      isReal: true,
      context: "Used to end a statement with finality",
      example: "'I'm the best at this game, periodt.'",
      origin: "Stylized version of 'period'",
      vibe: "from-pink-500 to-purple-500",
      emoji: "💅"
    },
    {
      term: "It's Giving",
      definition: "It's giving off vibes of..., it reminds me of...",
      isReal: true,
      context: "Describes the energy or aesthetic something has",
      example: "'This outfit is giving main character energy'",
      origin: "AAVE, popularized on social media",
      vibe: "from-purple-500 to-pink-500",
      emoji: "✨"
    },
    {
      term: "Touch Grass",
      definition: "Go outside, get off the internet",
      isReal: true,
      context: "Telling someone to go experience real life",
      example: "'You've been gaming for 12 hours, touch grass!'",
      origin: "Internet culture suggestion to go outdoors",
      vibe: "from-green-500 to-emerald-500",
      emoji: "🌱"
    },
    {
      term: "Rent Free",
      definition: "Something living in your head without paying rent",
      isReal: true,
      context: "When you can't stop thinking about something",
      example: "'That song is living in my head rent free'",
      origin: "Metaphor for persistent thoughts",
      vibe: "from-indigo-500 to-blue-500",
      emoji: "🏠"
    },
    {
      term: "Say Less",
      definition: "I understand, you don't need to explain more",
      isReal: true,
      context: "Quick agreement or understanding",
      example: "'Want to get boba?' 'Say less!'",
      origin: "Shortened communication style",
      vibe: "from-teal-500 to-cyan-500",
      emoji: "🤝"
    },
    {
      term: "Understood the Assignment",
      definition: "Nailed it, did exactly what was needed perfectly",
      isReal: true,
      context: "When someone exceeds expectations",
      example: "'Her outfit understood the assignment'",
      origin: "Academic reference for perfect execution",
      vibe: "from-yellow-500 to-orange-500",
      emoji: "📝"
    },
    {
      term: "Sending Me",
      definition: "Making me laugh hysterically",
      isReal: true,
      context: "Something so funny it's overwhelming",
      example: "'This meme is absolutely sending me!'",
      origin: "Short for 'sending me to heaven' from laughter",
      vibe: "from-red-500 to-pink-500",
      emoji: "😭"
    },
    {
      term: "Slaps",
      definition: "Really good, especially music",
      isReal: true,
      context: "When a song or beat hits perfectly",
      example: "'This new track absolutely slaps!'",
      origin: "Music hits so hard it metaphorically slaps",
      vibe: "from-purple-600 to-indigo-600",
      emoji: "🎵"
    },
    {
      term: "Mid",
      definition: "Mediocre, average, not impressive",
      isReal: true,
      context: "Describing something as just okay",
      example: "'That movie was pretty mid, honestly'",
      origin: "Short for 'middle' or average",
      vibe: "from-gray-500 to-slate-500",
      emoji: "😐"
    },
    {
      term: "Cheugy",
      definition: "Outdated, trying too hard to be trendy",
      isReal: true,
      context: "Something that's no longer cool or was never cool",
      example: "'Side parts are so cheugy now'",
      origin: "Coined by Gen Z to describe millennial trends",
      vibe: "from-amber-500 to-yellow-500",
      emoji: "🙄"
    },
    {
      term: "Sheesh",
      definition: "Expression of amazement or disbelief",
      isReal: true,
      context: "Reaction to something impressive or crazy",
      example: "'You got a 100% on that test? Sheesh!'",
      origin: "Old exclamation revived by Gen Z",
      vibe: "from-cyan-500 to-blue-500",
      emoji: "😱"
    },
    {
      term: "Lowkey",
      definition: "Somewhat, kind of, a little bit",
      isReal: true,
      context: "Mild agreement or subtle admission",
      example: "'I'm lowkey obsessed with this show'",
      origin: "Means quietly or secretly",
      vibe: "from-violet-500 to-purple-500",
      emoji: "🤫"
    },
    {
      term: "Hits Different",
      definition: "Has a unique or special quality",
      isReal: true,
      context: "When something feels particularly good",
      example: "'Coffee in the morning just hits different'",
      origin: "Emphasis on unique experience",
      vibe: "from-rose-500 to-pink-500",
      emoji: "💫"
    },

    // FAKE Terms (Sound plausible but aren't real)
    {
      term: "Glimp",
      definition: "When you almost understand a meme but not quite",
      isReal: false,
      context: "That moment of partial meme comprehension",
      example: "'I'm glimping this TikTok reference'",
      origin: "Combination of 'glimpse' and 'grasp'",
      vibe: "from-emerald-500 to-teal-500",
      emoji: "🤔"
    },
    {
      term: "Floss Mode",
      definition: "Being extra clean and fresh in appearance",
      isReal: false,
      context: "When your style is absolutely pristine",
      example: "'Got my haircut, I'm in full floss mode'",
      origin: "From dental floss = clean",
      vibe: "from-sky-500 to-blue-500",
      emoji: "✨"
    },
    {
      term: "Velcro Energy",
      definition: "Someone who's clingy or won't leave you alone",
      isReal: false,
      context: "Describing overly attached behavior",
      example: "'He's got serious velcro energy, won't stop texting'",
      origin: "Like velcro that sticks to everything",
      vibe: "from-red-500 to-orange-500",
      emoji: "🤝"
    },
    {
      term: "Moonwalking",
      definition: "Pretending you didn't see something awkward",
      isReal: false,
      context: "Smoothly avoiding uncomfortable situations",
      example: "'Saw my ex, started moonwalking out of there'",
      origin: "Like Michael Jackson's smooth backward move",
      vibe: "from-indigo-500 to-purple-500",
      emoji: "🌙"
    },
    {
      term: "Refrigerator Vibes",
      definition: "Someone who's cool but also kind of cold",
      isReal: false,
      context: "Mixed feelings about someone's personality",
      example: "'She's got refrigerator vibes - cool but distant'",
      origin: "Refrigerators are cool temperature-wise",
      vibe: "from-blue-500 to-cyan-500",
      emoji: "🧊"
    },
    {
      term: "Keyboard Warrior",
      definition: "Someone brave online but quiet in person",
      isReal: false,
      context: "Calling out internet tough guys",
      example: "'He's such a keyboard warrior, won't say it IRL'",
      origin: "Fighting battles only with keyboards",
      vibe: "from-slate-500 to-gray-500",
      emoji: "⌨️"
    },
    {
      term: "Screenshot Energy",
      definition: "Something so iconic it deserves to be saved",
      isReal: false,
      context: "When a moment is perfectly capture-worthy",
      example: "'This conversation has screenshot energy'",
      origin: "Worth screenshotting for posterity",
      vibe: "from-pink-500 to-rose-500",
      emoji: "📸"
    },
    {
      term: "Bluetooth Mode",
      definition: "When you're connected to someone mentally",
      isReal: false,
      context: "Perfect synchronization with a friend",
      example: "'We're in bluetooth mode, thinking the same thing'",
      origin: "Like wireless connection between devices",
      vibe: "from-blue-500 to-indigo-500",
      emoji: "📡"
    },
    {
      term: "Buffering",
      definition: "When your brain needs a moment to process",
      isReal: false,
      context: "Mental lag during conversations",
      example: "'Wait, I'm buffering... what did you just say?'",
      origin: "Like video buffering but for thoughts",
      vibe: "from-orange-500 to-red-500",
      emoji: "⏳"
    },
    {
      term: "Airplane Mode",
      definition: "Completely disconnecting from drama",
      isReal: false,
      context: "Intentionally avoiding toxic situations",
      example: "'All this drama has me in airplane mode'",
      origin: "Like turning off all connections",
      vibe: "from-sky-500 to-cyan-500",
      emoji: "✈️"
    }
  ];

  // Shuffle the array when component mounts
  const [shuffledTerms] = useState(() => [...slangTerms].sort(() => Math.random() - 0.5));
  const currentTerm = shuffledTerms[currentIndex];

  const handleGuess = (guess) => {
    if (isAnimating || currentIndex >= shuffledTerms.length) return;

    setIsAnimating(true);
    const isCorrect = guess === currentTerm.isReal;

    setLastAnswer({ correct: isCorrect, term: currentTerm });
    setShowResult(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setAnswers(prev => [...prev, { term: currentTerm, guess, correct: isCorrect }]);

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
      setShowResult(false);
      setLastAnswer(null);
    }, 2000);
  };

  // Get position from mouse or touch event
  const getEventPos = (e) => {
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  // Unified start handler for both mouse and touch
  const handleStart = (e) => {
    if (showResult) return;
    e.preventDefault();
    setIsDragging(true);
    const pos = getEventPos(e);
    setStartPos(pos);
  };

  // Unified move handler for both mouse and touch
  const handleMove = (e) => {
    if (!isDragging || showResult) return;
    e.preventDefault();

    const pos = getEventPos(e);
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setDragOffset({
      x: pos.x - centerX,
      y: pos.y - centerY
    });
  };

  // Unified end handler for both mouse and touch
  const handleEnd = (e) => {
    if (!isDragging || showResult) return;
    e.preventDefault();
    setIsDragging(false);

    // Check if it was a significant swipe (more than 80px)
    if (Math.abs(dragOffset.x) > 80) {
      handleGuess(dragOffset.x > 0); // right = real (true), left = sus (false)
    }

    setDragOffset({ x: 0, y: 0 });
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setAnswers([]);
    setShowResult(false);
    setLastAnswer(null);
  };

  const getEncouragement = () => {
    const percentage = (score / shuffledTerms.length) * 100;
    if (percentage >= 90) return "Gen Z Fluent! 🔥";
    if (percentage >= 75) return "Slang Savant! ✨";
    if (percentage >= 60) return "Pretty Based! 💯";
    if (percentage >= 45) return "Getting There! 📈";
    return "Time to Touch Grass! 🌱";
  };

  if (currentIndex >= shuffledTerms.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center border border-white/20">
          <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🎯</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{getEncouragement()}</h2>
          <div className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6">
            You scored {score} out of {shuffledTerms.length}!
          </div>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-3 sm:p-4 border border-green-500/30">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-2" />
              <p className="text-green-300 font-semibold text-sm sm:text-base">Best Streak: {bestStreak}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-3 sm:p-4 border border-blue-500/30">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-blue-300 font-semibold text-sm sm:text-base">{Math.round((score/shuffledTerms.length)*100)}% Accuracy</p>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 sm:px-8 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 mx-auto text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            Play Again
          </button>

          <p className="text-white/60 text-xs sm:text-sm mt-4">Share your score and challenge your friends!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 p-3 sm:p-4 overflow-hidden">
      {/* Header */}
      <div className="max-w-sm sm:max-w-md mx-auto mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4 text-white">
          <div className="flex items-center gap-2">
            <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              SlangCheck
            </h1>
          </div>
          <div className="text-xs sm:text-sm bg-white/10 rounded-full px-2 sm:px-3 py-1 backdrop-blur-sm">
            {currentIndex + 1} / {shuffledTerms.length}
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4 text-center text-white/80 text-xs sm:text-sm">
          <div className="flex-1 bg-white/10 rounded-xl p-2 sm:p-3 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-green-400" />
            <p className="font-semibold text-green-400 text-sm sm:text-base">{score}</p>
            <p className="text-xs sm:text-sm">Correct</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-2 sm:p-3 backdrop-blur-sm">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-yellow-400" />
            <p className="font-semibold text-yellow-400 text-sm sm:text-base">{streak}</p>
            <p className="text-xs sm:text-sm">Streak</p>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-sm sm:max-w-md mx-auto relative h-80 sm:h-96 mb-6 sm:mb-8">
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${currentTerm.vibe} p-1 shadow-2xl transform transition-all duration-300 ${
            isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          } touch-none select-none`}
          style={{
            transform: isDragging ? `translate(${dragOffset.x}px, ${dragOffset.y * 0.3}px) rotate(${dragOffset.x * 0.05}deg)` : '',
            transition: isDragging ? 'none' : 'all 0.3s ease'
          }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-3xl h-full p-4 sm:p-6 text-white relative overflow-hidden cursor-grab active:cursor-grabbing">
            {/* Result Overlay */}
            {showResult && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
                <div className="text-center px-4">
                  {lastAnswer.correct ? (
                    <>
                      <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mx-auto mb-3 sm:mb-4" />
                      <p className="text-xl sm:text-2xl font-bold text-green-400 mb-2">Nailed it! 🔥</p>
                      <p className="text-white/80 text-sm sm:text-base">You know your slang!</p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto mb-3 sm:mb-4" />
                      <p className="text-xl sm:text-2xl font-bold text-red-400 mb-2">Not quite! 😅</p>
                      <p className="text-white/80 text-sm sm:text-base">
                        This one is {lastAnswer.term.isReal ? 'actually real' : 'totally made up'}!
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="text-8xl sm:text-[200px] absolute -top-8 sm:-top-16 -right-8 sm:-right-16 select-none">
                {currentTerm.emoji}
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              <div className="text-center mb-4 sm:mb-6">
                <span className="text-3xl sm:text-5xl mb-2 sm:mb-4 block">{currentTerm.emoji}</span>
                <h2 className="text-2xl sm:text-4xl font-bold mb-2">{currentTerm.term}</h2>
                <p className="text-sm sm:text-lg opacity-90 mb-2 sm:mb-4">"{currentTerm.definition}"</p>
                <p className="text-xs sm:text-sm opacity-70 italic px-2">{currentTerm.example}</p>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Real or Sus? 🤔</h3>
                  <p className="text-xs sm:text-sm opacity-80">Is this actually Gen Z slang?</p>
                  <p className="text-xs opacity-60 mt-2">👈 Swipe or tap below 👉</p>
                </div>
              </div>

              {/* Swipe Indicators */}
              <div className="flex justify-between items-center text-center text-xs opacity-60">
                <div className="flex items-center gap-1 text-red-400">
                  <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Sus</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <span>Real</span>
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-sm sm:max-w-md mx-auto flex justify-center gap-4 sm:gap-6 px-4">
        <button
          onClick={() => handleGuess(false)}
          className="bg-red-500/20 hover:bg-red-500/30 active:bg-red-500/40 border-2 border-red-500 text-red-500 rounded-full p-3 sm:p-4 transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-sm flex flex-col items-center gap-1 min-w-[60px] sm:min-w-[80px] touch-manipulation"
          disabled={isAnimating || showResult}
        >
          <XCircle className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-xs font-semibold">Sus</span>
        </button>

        <button
          onClick={() => handleGuess(true)}
          className="bg-green-500/20 hover:bg-green-500/30 active:bg-green-500/40 border-2 border-green-500 text-green-500 rounded-full p-3 sm:p-4 transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-sm flex flex-col items-center gap-1 min-w-[60px] sm:min-w-[80px] touch-manipulation"
          disabled={isAnimating || showResult}
        >
          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-xs font-semibold">Real</span>
        </button>
      </div>

      {/* Fun Stats Ticker - Hidden on very small screens */}
      <div className="fixed bottom-2 sm:bottom-4 left-4 right-4 text-center hidden sm:block">
        <p className="text-white/60 text-xs sm:text-sm">
          Test your Gen Z fluency • Can you spot the fake slang? • Challenge your friends!
        </p>
      </div>
    </div>
  );
};

export default SlangQuiz;
