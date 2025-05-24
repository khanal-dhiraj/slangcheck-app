import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, TrendingUp, Zap, Brain, Eye, ArrowLeft, ArrowRight, Star, Share2 } from 'lucide-react';

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
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [cardFlipped, setCardFlipped] = useState(false);

  const slangTerms = [
    // REAL Gen Z Terms
    {
      term: "No Cap",
      definition: "No lie, for real, I'm being serious",
      isReal: true,
      context: "Used to emphasize honesty or truthfulness",
      example: "'This pizza is amazing, no cap!'",
      origin: "From 'capping' meaning lying",
      vibe: "linear-gradient(135deg, #3b82f6, #06b6d4)",
      emoji: "🧢"
    },
    {
      term: "Bussin",
      definition: "Really good, especially about food",
      isReal: true,
      context: "Describes something that tastes incredible",
      example: "'This ramen is absolutely bussin!'",
      origin: "Possibly from 'busting' with flavor",
      vibe: "linear-gradient(135deg, #f97316, #ef4444)",
      emoji: "🔥"
    },
    {
      term: "Periodt",
      definition: "Period but with emphasis - end of discussion",
      isReal: true,
      context: "Used to end a statement with finality",
      example: "'I'm the best at this game, periodt.'",
      origin: "Stylized version of 'period'",
      vibe: "linear-gradient(135deg, #ec4899, #8b5cf6)",
      emoji: "💅"
    },
    {
      term: "It's Giving",
      definition: "It's giving off vibes of..., it reminds me of...",
      isReal: true,
      context: "Describes the energy or aesthetic something has",
      example: "'This outfit is giving main character energy'",
      origin: "AAVE, popularized on social media",
      vibe: "linear-gradient(135deg, #8b5cf6, #ec4899)",
      emoji: "✨"
    },
    {
      term: "Touch Grass",
      definition: "Go outside, get off the internet",
      isReal: true,
      context: "Telling someone to go experience real life",
      example: "'You've been gaming for 12 hours, touch grass!'",
      origin: "Internet culture suggestion to go outdoors",
      vibe: "linear-gradient(135deg, #10b981, #059669)",
      emoji: "🌱"
    },
    {
      term: "Rent Free",
      definition: "Something living in your head without paying rent",
      isReal: true,
      context: "When you can't stop thinking about something",
      example: "'That song is living in my head rent free'",
      origin: "Metaphor for persistent thoughts",
      vibe: "linear-gradient(135deg, #6366f1, #3b82f6)",
      emoji: "🏠"
    },
    {
      term: "Say Less",
      definition: "I understand, you don't need to explain more",
      isReal: true,
      context: "Quick agreement or understanding",
      example: "'Want to get boba?' 'Say less!'",
      origin: "Shortened communication style",
      vibe: "linear-gradient(135deg, #14b8a6, #06b6d4)",
      emoji: "🤝"
    },
    {
      term: "Understood the Assignment",
      definition: "Nailed it, did exactly what was needed perfectly",
      isReal: true,
      context: "When someone exceeds expectations",
      example: "'Her outfit understood the assignment'",
      origin: "Academic reference for perfect execution",
      vibe: "linear-gradient(135deg, #eab308, #f97316)",
      emoji: "📝"
    },
    {
      term: "Sending Me",
      definition: "Making me laugh hysterically",
      isReal: true,
      context: "Something so funny it's overwhelming",
      example: "'This meme is absolutely sending me!'",
      origin: "Short for 'sending me to heaven' from laughter",
      vibe: "linear-gradient(135deg, #ef4444, #ec4899)",
      emoji: "😭"
    },
    {
      term: "Slaps",
      definition: "Really good, especially music",
      isReal: true,
      context: "When a song or beat hits perfectly",
      example: "'This new track absolutely slaps!'",
      origin: "Music hits so hard it metaphorically slaps",
      vibe: "linear-gradient(135deg, #7c3aed, #6366f1)",
      emoji: "🎵"
    },
    {
      term: "Mid",
      definition: "Mediocre, average, not impressive",
      isReal: true,
      context: "Describing something as just okay",
      example: "'That movie was pretty mid, honestly'",
      origin: "Short for 'middle' or average",
      vibe: "linear-gradient(135deg, #6b7280, #64748b)",
      emoji: "😐"
    },
    {
      term: "Cheugy",
      definition: "Outdated, trying too hard to be trendy",
      isReal: true,
      context: "Something that's no longer cool or was never cool",
      example: "'Side parts are so cheugy now'",
      origin: "Coined by Gen Z to describe millennial trends",
      vibe: "linear-gradient(135deg, #f59e0b, #eab308)",
      emoji: "🙄"
    },
    {
      term: "Sheesh",
      definition: "Expression of amazement or disbelief",
      isReal: true,
      context: "Reaction to something impressive or crazy",
      example: "'You got a 100% on that test? Sheesh!'",
      origin: "Old exclamation revived by Gen Z",
      vibe: "linear-gradient(135deg, #06b6d4, #3b82f6)",
      emoji: "😱"
    },
    {
      term: "Lowkey",
      definition: "Somewhat, kind of, a little bit",
      isReal: true,
      context: "Mild agreement or subtle admission",
      example: "'I'm lowkey obsessed with this show'",
      origin: "Means quietly or secretly",
      vibe: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      emoji: "🤫"
    },
    {
      term: "Hits Different",
      definition: "Has a unique or special quality",
      isReal: true,
      context: "When something feels particularly good",
      example: "'Coffee in the morning just hits different'",
      origin: "Emphasis on unique experience",
      vibe: "linear-gradient(135deg, #f43f5e, #ec4899)",
      emoji: "💫"
    },

    // FAKE Terms
    {
      term: "Glimp",
      definition: "When you almost understand a meme but not quite",
      isReal: false,
      context: "That moment of partial meme comprehension",
      example: "'I'm glimping this TikTok reference'",
      origin: "Combination of 'glimpse' and 'grasp'",
      vibe: "linear-gradient(135deg, #059669, #14b8a6)",
      emoji: "🤔"
    },
    {
      term: "Floss Mode",
      definition: "Being extra clean and fresh in appearance",
      isReal: false,
      context: "When your style is absolutely pristine",
      example: "'Got my haircut, I'm in full floss mode'",
      origin: "From dental floss = clean",
      vibe: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
      emoji: "✨"
    },
    {
      term: "Velcro Energy",
      definition: "Someone who's clingy or won't leave you alone",
      isReal: false,
      context: "Describing overly attached behavior",
      example: "'He's got serious velcro energy, won't stop texting'",
      origin: "Like velcro that sticks to everything",
      vibe: "linear-gradient(135deg, #ef4444, #f97316)",
      emoji: "🤝"
    },
    {
      term: "Moonwalking",
      definition: "Pretending you didn't see something awkward",
      isReal: false,
      context: "Smoothly avoiding uncomfortable situations",
      example: "'Saw my ex, started moonwalking out of there'",
      origin: "Like Michael Jackson's smooth backward move",
      vibe: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      emoji: "🌙"
    },
    {
      term: "Refrigerator Vibes",
      definition: "Someone who's cool but also kind of cold",
      isReal: false,
      context: "Mixed feelings about someone's personality",
      example: "'She's got refrigerator vibes - cool but distant'",
      origin: "Refrigerators are cool temperature-wise",
      vibe: "linear-gradient(135deg, #3b82f6, #06b6d4)",
      emoji: "🧊"
    }
  ];

  // Shuffle the array when component mounts
  const [shuffledTerms] = useState(() => [...slangTerms].sort(() => Math.random() - 0.5));
  const currentTerm = shuffledTerms[currentIndex];
  const progress = ((currentIndex + 1) / shuffledTerms.length) * 100;

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

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
      setShowResult(false);
      setLastAnswer(null);
      setCardFlipped(false);
    }, 2500);
  };

  const handleTouchStart = (e) => {
    if (showResult) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragOffset({ startX: touch.clientX, startY: touch.clientY, x: 0, y: 0 });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || showResult) return;
    e.preventDefault();
    const touch = e.touches[0];
    setDragOffset(prev => ({
      ...prev,
      x: touch.clientX - prev.startX,
      y: touch.clientY - prev.startY
    }));
  };

  const handleTouchEnd = () => {
    if (!isDragging || showResult) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 80) {
      handleGuess(dragOffset.x > 0);
    }

    setDragOffset({ x: 0, y: 0 });
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setShowResult(false);
    setLastAnswer(null);
    setCardFlipped(false);
  };

  const getEncouragement = () => {
    const percentage = (score / shuffledTerms.length) * 100;
    if (percentage >= 90) return "Gen Z Fluent! 🔥";
    if (percentage >= 75) return "Slang Savant! ✨";
    if (percentage >= 60) return "Pretty Based! 💯";
    if (percentage >= 45) return "Getting There! 📈";
    return "Time to Touch Grass! 🌱";
  };

  // Onboarding Component
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-600 to-purple-800 p-4 flex items-center justify-center">
        <div className="max-w-sm mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center text-white">
            <div className="text-6xl mb-6">🎯</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
              SlangCheck
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Test your Gen Z slang knowledge! Can you spot the fake terms?
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-left">
                <ArrowLeft className="text-red-400" size={20} />
                <span className="text-sm">Swipe left or tap ❌ for fake slang</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <ArrowRight className="text-green-400" size={20} />
                <span className="text-sm">Swipe right or tap ✅ for real slang</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <Star className="text-yellow-400" size={20} />
                <span className="text-sm">Build streaks for bonus points!</span>
              </div>
            </div>

            <button
              onClick={() => setShowOnboarding(false)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105"
            >
              Start Quiz 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentIndex >= shuffledTerms.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-600 to-purple-800 p-4 flex items-center justify-center">
        <div className="max-w-sm mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center text-white">
            <div className="text-8xl mb-6 animate-bounce">🎯</div>
            <h2 className="text-3xl font-bold mb-2">{getEncouragement()}</h2>
            <div className="text-xl opacity-80 mb-8">
              You scored {score} out of {shuffledTerms.length}!
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-4">
                <Zap className="mx-auto mb-2 text-green-400" size={24} />
                <p className="text-green-400 font-bold text-lg">{bestStreak}</p>
                <p className="text-xs opacity-80">Best Streak</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-4">
                <Brain className="mx-auto mb-2 text-blue-400" size={24} />
                <p className="text-blue-400 font-bold text-lg">{Math.round((score/shuffledTerms.length)*100)}%</p>
                <p className="text-xs opacity-80">Accuracy</p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={resetQuiz}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Play Again
              </button>
              
              <button
                onClick={() => {
                  const shareText = `I scored ${score}/${shuffledTerms.length} on SlangCheck! 🎯 Can you beat my ${Math.round((score/shuffledTerms.length)*100)}% accuracy? Test your Gen Z slang knowledge!`;
                  if (navigator.share) {
                    navigator.share({ text: shareText });
                  } else {
                    navigator.clipboard.writeText(shareText);
                    alert('Score copied to clipboard!');
                  }
                }}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Share2 size={18} />
                Share Score
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-600 to-purple-800 p-4">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 text-white">
            <div className="flex items-center gap-2">
              <Eye size={28} className="text-cyan-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                SlangCheck
              </h1>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-sm border border-white/20">
              {currentIndex + 1} / {shuffledTerms.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-4 backdrop-blur-md border border-white/20">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-center text-white/80 text-sm">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <TrendingUp className="mx-auto mb-1 text-green-400" size={18} />
              <p className="font-bold text-green-400 text-lg">{score}</p>
              <p>Correct</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <Zap className="mx-auto mb-1 text-yellow-400" size={18} />
              <p className="font-bold text-yellow-400 text-lg">{streak}</p>
              <p>Streak</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="relative h-96 mb-8">
          <div
            className="absolute inset-0 rounded-3xl p-1 shadow-2xl transition-all duration-300 ease-out"
            style={{
              background: currentTerm.vibe,
              transform: isDragging 
                ? `translate(${dragOffset.x}px, ${dragOffset.y * 0.5}px) rotate(${dragOffset.x * 0.05}deg) scale(${1 - Math.abs(dragOffset.x) * 0.0005})` 
                : isAnimating ? 'scale(0.95)' : 'scale(1)',
              transition: isDragging ? 'none' : 'all 0.3s ease-out',
              opacity: isAnimating ? 0 : 1
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="bg-black/20 backdrop-blur-md h-full rounded-3xl p-6 text-white relative overflow-hidden border border-white/10">
              
              {/* Result Overlay */}
              {showResult && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20 animate-in fade-in duration-300">
                  <div className="text-center">
                    {lastAnswer.correct ? (
                      <>
                        <div className="text-6xl mb-4 animate-bounce">🎉</div>
                        <CheckCircle size={48} className="mx-auto mb-4 text-green-400" />
                        <p className="text-2xl font-bold text-green-400 mb-2">Nailed it!</p>
                        <p className="text-white/80">You know your slang! 🔥</p>
                      </>
                    ) : (
                      <>
                        <div className="text-6xl mb-4 animate-pulse">😅</div>
                        <XCircle size={48} className="mx-auto mb-4 text-red-400" />
                        <p className="text-2xl font-bold text-red-400 mb-2">Not quite!</p>
                        <p className="text-white/80 text-sm px-4">
                          This one is {lastAnswer.term.isReal ? 'actually real' : 'totally made up'}!
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Background Pattern */}
              <div className="absolute top-0 right-0 text-8xl opacity-20 select-none pointer-events-none">
                {currentTerm.emoji}
              </div>

              {/* Card Content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{currentTerm.emoji}</div>
                  <h2 className="text-2xl font-bold mb-2">{currentTerm.term}</h2>
                  <p className="text-base opacity-90 mb-3">"{currentTerm.definition}"</p>
                  <p className="text-sm opacity-70 italic">{currentTerm.example}</p>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Real or Sus? 🤔</h3>
                    <p className="text-sm opacity-80">Is this actually Gen Z slang?</p>
                  </div>
                </div>

                {/* Swipe Indicators */}
                <div className="flex justify-between items-center text-xs opacity-60">
                  <div className={`flex items-center gap-1 transition-all duration-200 ${dragOffset.x < -30 ? 'opacity-100 scale-110 text-red-400' : ''}`}>
                    <XCircle size={14} />
                    <span>Sus</span>
                  </div>
                  <div className={`flex items-center gap-1 transition-all duration-200 ${dragOffset.x > 30 ? 'opacity-100 scale-110 text-green-400' : ''}`}>
                    <span>Real</span>
                    <CheckCircle size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-8">
          <button
            onClick={() => handleGuess(false)}
            disabled={isAnimating || showResult}
            className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-full p-4 transition-all duration-200 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 backdrop-blur-md"
          >
            <XCircle size={28} />
          </button>

          <button
            onClick={() => handleGuess(true)}
            disabled={isAnimating || showResult}
            className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 text-green-400 rounded-full p-4 transition-all duration-200 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 backdrop-blur-md"
          >
            <CheckCircle size={28} />
          </button>
        </div>

        {/* Helpful Tip */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-xs">
            💡 Swipe cards left/right or use buttons • Challenge your friends!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlangQuiz;