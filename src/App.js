import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, TrendingUp, Zap, Brain, Eye } from 'lucide-react';

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
    },
    {
      term: "Keyboard Warrior",
      definition: "Someone brave online but quiet in person",
      isReal: false,
      context: "Calling out internet tough guys",
      example: "'He's such a keyboard warrior, won't say it IRL'",
      origin: "Fighting battles only with keyboards",
      vibe: "linear-gradient(135deg, #64748b, #6b7280)",
      emoji: "⌨️"
    },
    {
      term: "Screenshot Energy",
      definition: "Something so iconic it deserves to be saved",
      isReal: false,
      context: "When a moment is perfectly capture-worthy",
      example: "'This conversation has screenshot energy'",
      origin: "Worth screenshotting for posterity",
      vibe: "linear-gradient(135deg, #ec4899, #f43f5e)",
      emoji: "📸"
    },
    {
      term: "Bluetooth Mode",
      definition: "When you're connected to someone mentally",
      isReal: false,
      context: "Perfect synchronization with a friend",
      example: "'We're in bluetooth mode, thinking the same thing'",
      origin: "Like wireless connection between devices",
      vibe: "linear-gradient(135deg, #3b82f6, #6366f1)",
      emoji: "📡"
    },
    {
      term: "Buffering",
      definition: "When your brain needs a moment to process",
      isReal: false,
      context: "Mental lag during conversations",
      example: "'Wait, I'm buffering... what did you just say?'",
      origin: "Like video buffering but for thoughts",
      vibe: "linear-gradient(135deg, #f97316, #ef4444)",
      emoji: "⏳"
    },
    {
      term: "Airplane Mode",
      definition: "Completely disconnecting from drama",
      isReal: false,
      context: "Intentionally avoiding toxic situations",
      example: "'All this drama has me in airplane mode'",
      origin: "Like turning off all connections",
      vibe: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
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

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
      setShowResult(false);
      setLastAnswer(null);
    }, 2000);
  };

  const handleMouseDown = (e) => {
    if (showResult) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || showResult) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setDragOffset({
      x: e.clientX - centerX,
      y: e.clientY - centerY
    });
  };

  const handleMouseUp = () => {
    if (!isDragging || showResult) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 100) {
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
  };

  const getEncouragement = () => {
    const percentage = (score / shuffledTerms.length) * 100;
    if (percentage >= 90) return "Gen Z Fluent! 🔥";
    if (percentage >= 75) return "Slang Savant! ✨";
    if (percentage >= 60) return "Pretty Based! 💯";
    if (percentage >= 45) return "Getting There! 📈";
    return "Time to Touch Grass! 🌱";
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #581c87, #be185d, #4c1d95)',
      padding: '16px'
    },
    maxWidthContainer: {
      maxWidth: '28rem',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px',
      color: 'white'
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    titleText: {
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #06b6d4, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    counter: {
      fontSize: '14px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '9999px',
      padding: '4px 12px',
      backdropFilter: 'blur(4px)'
    },
    statsContainer: {
      display: 'flex',
      gap: '16px',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px',
      marginBottom: '24px'
    },
    statBox: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '12px',
      backdropFilter: 'blur(4px)'
    },
    cardContainer: {
      position: 'relative',
      height: '384px',
      marginBottom: '32px'
    },
    card: {
      position: 'absolute',
      inset: 0,
      borderRadius: '24px',
      padding: '4px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
      transform: 'scale(1)',
      opacity: 1,
      transition: 'all 0.3s ease',
      cursor: 'grab'
    },
    cardAnimating: {
      transform: 'scale(0.95)',
      opacity: 0
    },
    cardInner: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(4px)',
      borderRadius: '24px',
      height: '100%',
      padding: '24px',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    },
    resultOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20
    },
    backgroundPattern: {
      position: 'absolute',
      inset: 0,
      opacity: 0.2
    },
    backgroundEmoji: {
      fontSize: '200px',
      position: 'absolute',
      top: '-64px',
      right: '-64px',
      userSelect: 'none'
    },
    content: {
      position: 'relative',
      zIndex: 10,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    termHeader: {
      textAlign: 'center',
      marginBottom: '24px'
    },
    emoji: {
      fontSize: '48px',
      marginBottom: '16px',
      display: 'block'
    },
    termTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    definition: {
      fontSize: '18px',
      opacity: 0.9,
      marginBottom: '16px'
    },
    example: {
      fontSize: '14px',
      opacity: 0.7,
      fontStyle: 'italic'
    },
    questionSection: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    questionContent: {
      textAlign: 'center'
    },
    questionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    questionSubtitle: {
      fontSize: '14px',
      opacity: 0.8
    },
    swipeIndicators: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '12px',
      opacity: 0.6
    },
    indicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '24px'
    },
    button: {
      borderRadius: '50%',
      padding: '16px',
      transition: 'all 0.2s ease',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      border: '2px solid',
      background: 'rgba(255, 255, 255, 0.1)',
      cursor: 'pointer'
    },
    susButton: {
      borderColor: '#ef4444',
      color: '#ef4444'
    },
    realButton: {
      borderColor: '#10b981',
      color: '#10b981'
    },
    buttonText: {
      fontSize: '12px',
      fontWeight: '600'
    },
    ticker: {
      position: 'fixed',
      bottom: '16px',
      left: '16px',
      right: '16px',
      textAlign: 'center'
    },
    tickerText: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px'
    },
    finalScreen: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '32px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    finalEmoji: {
      fontSize: '96px',
      marginBottom: '24px'
    },
    finalTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '8px'
    },
    finalScore: {
      fontSize: '18px',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '24px'
    },
    finalStatsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '32px'
    },
    finalStatBox: {
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    },
    streakBox: {
      background: 'linear-gradient(to right, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))',
      border: '1px solid rgba(16, 185, 129, 0.3)'
    },
    accuracyBox: {
      background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },
    resetButton: {
      background: 'linear-gradient(to right, #7c3aed, #ec4899)',
      color: 'white',
      fontWeight: 'bold',
      padding: '12px 32px',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      margin: '0 auto',
      transition: 'transform 0.2s ease'
    },
    shareText: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px',
      marginTop: '16px'
    }
  };

  if (currentIndex >= shuffledTerms.length) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.maxWidthContainer, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={styles.finalScreen}>
            <div style={styles.finalEmoji}>🎯</div>
            <h2 style={styles.finalTitle}>{getEncouragement()}</h2>
            <div style={styles.finalScore}>
              You scored {score} out of {shuffledTerms.length}!
            </div>

            <div style={styles.finalStatsContainer}>
              <div style={{ ...styles.finalStatBox, ...styles.streakBox }}>
                <Zap size={24} color="#10b981" />
                <p style={{ color: '#10d97a', fontWeight: '600', margin: 0 }}>Best Streak: {bestStreak}</p>
              </div>
              <div style={{ ...styles.finalStatBox, ...styles.accuracyBox }}>
                <Brain size={24} color="#3b82f6" />
                <p style={{ color: '#60a5fa', fontWeight: '600', margin: 0 }}>{Math.round((score/shuffledTerms.length)*100)}% Accuracy</p>
              </div>
            </div>

            <button
              onClick={resetQuiz}
              style={styles.resetButton}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <RotateCcw size={20} />
              Play Again
            </button>

            <p style={styles.shareText}>Share your score and challenge your friends!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.maxWidthContainer}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={styles.header}>
            <div style={styles.title}>
              <Eye size={32} color="#06b6d4" />
              <h1 style={styles.titleText}>SlangCheck</h1>
            </div>
            <div style={styles.counter}>
              {currentIndex + 1} / {shuffledTerms.length}
            </div>
          </div>

          <div style={styles.statsContainer}>
            <div style={styles.statBox}>
              <TrendingUp size={20} color="#10b981" style={{ margin: '0 auto 4px' }} />
              <p style={{ fontWeight: '600', color: '#10d97a', margin: 0 }}>{score}</p>
              <p style={{ margin: 0 }}>Correct</p>
            </div>
            <div style={styles.statBox}>
              <Zap size={20} color="#eab308" style={{ margin: '0 auto 4px' }} />
              <p style={{ fontWeight: '600', color: '#facc15', margin: 0 }}>{streak}</p>
              <p style={{ margin: 0 }}>Streak</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div style={styles.cardContainer}>
          <div
            style={{
              ...styles.card,
              ...(isAnimating ? styles.cardAnimating : {}),
              background: currentTerm.vibe,
              transform: isDragging ? `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)` : (isAnimating ? 'scale(0.95)' : 'scale(1)'),
              transition: isDragging ? 'none' : 'all 0.3s ease'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div style={styles.cardInner}>
              {/* Result Overlay */}
              {showResult && (
                <div style={styles.resultOverlay}>
                  <div style={{ textAlign: 'center' }}>
                    {lastAnswer.correct ? (
                      <>
                        <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 16px' }} />
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10d97a', margin: '0 0 8px' }}>Nailed it! 🔥</p>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>You know your slang!</p>
                      </>
                    ) : (
                      <>
                        <XCircle size={64} color="#ef4444" style={{ margin: '0 auto 16px' }} />
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f87171', margin: '0 0 8px' }}>Not quite! 😅</p>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                          This one is {lastAnswer.term.isReal ? 'actually real' : 'totally made up'}!
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Background Pattern */}
              <div style={styles.backgroundPattern}>
                <div style={styles.backgroundEmoji}>
                  {currentTerm.emoji}
                </div>
              </div>

              {/* Content */}
              <div style={styles.content}>
                <div style={styles.termHeader}>
                  <span style={styles.emoji}>{currentTerm.emoji}</span>
                  <h2 style={styles.termTitle}>{currentTerm.term}</h2>
                  <p style={styles.definition}>"{currentTerm.definition}"</p>
                  <p style={styles.example}>{currentTerm.example}</p>
                </div>

                <div style={styles.questionSection}>
                  <div style={styles.questionContent}>
                    <h3 style={styles.questionTitle}>Real or Sus? 🤔</h3>
                    <p style={styles.questionSubtitle}>Is this actually Gen Z slang?</p>
                  </div>
                </div>

                {/* Swipe Indicators */}
                <div style={styles.swipeIndicators}>
                  <div style={{ ...styles.indicator, color: '#ef4444' }}>
                    <XCircle size={16} />
                    <span>Sus (Fake)</span>
                  </div>
                  <div style={{ ...styles.indicator, color: '#10b981' }}>
                    <span>Real</span>
                    <CheckCircle size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonContainer}>
          <button
            onClick={() => handleGuess(false)}
            style={{ ...styles.button, ...styles.susButton }}
            disabled={isAnimating || showResult}
            onMouseEnter={(e) => !e.target.disabled && (e.target.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <XCircle size={32} />
            <span style={styles.buttonText}>Sus</span>
          </button>

          <button
            onClick={() => handleGuess(true)}
            style={{ ...styles.button, ...styles.realButton }}
            disabled={isAnimating || showResult}
            onMouseEnter={(e) => !e.target.disabled && (e.target.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <CheckCircle size={32} />
            <span style={styles.buttonText}>Real</span>
          </button>
        </div>
      </div>

      {/* Fun Stats Ticker */}
      <div style={styles.ticker}>
        <p style={styles.tickerText}>
          Test your Gen Z fluency • Can you spot the fake slang? • Challenge your friends!
        </p>
      </div>
    </div>
  );
};

export default SlangQuiz;
