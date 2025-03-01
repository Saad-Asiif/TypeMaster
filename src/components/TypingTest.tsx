import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RefreshCw, Clock, BarChart2, Volume2, VolumeX } from 'lucide-react';
import { TypingMode, TypingStats, Character } from '../types';
import TypingResults from './TypingResults';
import { getRandomText } from '../utils/textUtils';
import useKeypressSound from '../hooks/useKeypressSound'; // Import the custom hook

interface TypingTestProps {
  mode: TypingMode;
  timeLimit: number;
}

const TypingTest: React.FC<TypingTestProps> = ({ mode, timeLimit }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true); // State for sound toggle

  // Use the custom hook to play sound on keypress
  useKeypressSound(isSoundEnabled);

  const [text, setText] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    elapsedTime: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize text based on mode
  useEffect(() => {
    let testText = '';

    switch (mode) {
      case 'code':
        testText = getRandomText('code');
        break;
      case 'custom':
        testText = "Type your custom text here. You can paste any text you want to practice with.";
        break;
      default:
        testText = getRandomText('normal');
    }

    setText(testText);
    resetTest();
  }, [mode]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Convert text to characters array
  useEffect(() => {
    if (text) {
      const chars = text.split('').map((char) => ({
        char,
        status: 'waiting' as const,
      }));

      if (chars.length > 0) {
        chars[0].status = 'current';
      }

      setCharacters(chars);
    }
  }, [text]);

  // Timer logic
  useEffect(() => {
    if (isStarted && !isFinished) {
      timerRef.current = window.setInterval(() => {
        if (startTime) {
          const now = Date.now();
          const elapsed = (now - startTime) / 1000;
          setElapsedTime(elapsed);

          // Update WPM in real-time
          updateStats(elapsed);

          // Check if time limit reached for all modes except 'endless'
          if (mode !== 'endless' && elapsed >= timeLimit) {
            finishTest();
          }
        }
      }, 100);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted, isFinished, startTime, mode, timeLimit]);

  // Calculate and update stats
  const updateStats = useCallback((elapsed: number) => {
    const correctChars = characters.filter(char => char.status === 'correct').length;
    const incorrectChars = characters.filter(char => char.status === 'incorrect').length;
    const totalProcessed = correctChars + incorrectChars;

    // Words per minute: (characters / 5) / minutes
    const minutes = elapsed / 60;
    const wpm = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;

    // Accuracy percentage
    const accuracy = totalProcessed > 0
      ? Math.round((correctChars / totalProcessed) * 100)
      : 100;

    setStats({
      wpm,
      accuracy,
      correctChars,
      incorrectChars,
      totalChars: characters.length,
      elapsedTime: elapsed,
    });
  }, [characters]);

  // Start the test
  const startTest = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setIsFinished(false);
    inputRef.current?.focus();
  };

  // Reset the test
  const resetTest = () => {
    setInput('');
    setCurrentIndex(0);
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(null);
    setElapsedTime(0);
    setStats({
      wpm: 0,
      accuracy: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      elapsedTime: 0,
    });

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Finish the test
  const finishTest = () => {
    setIsFinished(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Final stats update
    if (startTime) {
      const finalElapsed = (Date.now() - startTime) / 1000;
      updateStats(finalElapsed);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isStarted) {
      startTest();
    }

    const value = e.target.value;
    setInput(value);

    // Process each character
    const newChars = [...characters];

    for (let i = 0; i < value.length && i < newChars.length; i++) {
      if (value[i] === newChars[i].char) {
        newChars[i].status = 'correct';
      } else {
        newChars[i].status = 'incorrect';
      }
    }

    // Reset characters that are no longer being typed
    for (let i = value.length; i < newChars.length; i++) {
      newChars[i].status = i === value.length ? 'current' : 'waiting';
    }

    setCharacters(newChars);
    setCurrentIndex(value.length);

    // Check if test is complete
    if (value.length === text.length) {
      finishTest();
    }
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render the text display with character styling
  const renderText = () => {
    return (
      <div className="font-mono text-lg leading-relaxed whitespace-pre-wrap mb-6">
        {characters.map((char, index) => {
          let className = 'transition-colors duration-100 ';

          switch (char.status) {
            case 'correct':
              className += 'text-green-400';
              break;
            case 'incorrect':
              className += 'text-red-400 bg-red-900/30';
              break;
            case 'current':
              className += 'text-white bg-cyan-500/30 border-b-2 border-cyan-400 animate-pulse';
              break;
            default:
              className += 'text-gray-400';
          }

          return (
            <span key={index} className={className}>
              {char.char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
        </h2>

        <div className="flex items-center gap-4">
          {/* Timer Display */}
          {mode !== 'endless' && (
            <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-lg">
              <Clock size={16} className="text-cyan-400" />
              <span className="font-mono">
                {isStarted ? formatTime(timeLimit - elapsedTime) : formatTime(timeLimit)}
              </span>
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={resetTest}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <RefreshCw size={16} />
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {isSoundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {!isFinished ? (
        <>
          <div className="bg-gray-900/50 rounded-lg p-4 mb-4 min-h-[200px] border border-gray-700">
            {renderText()}
          </div>

          <div className="flex gap-4 items-center">
            <input
              ref={inputRef}
              type={mode === 'blind' ? 'password' : 'text'}
              value={input}
              onChange={handleInputChange}
              disabled={isFinished}
              className={`flex-grow bg-gray-700/50 border ${isStarted ? 'border-cyan-600' : 'border-gray-600'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all`}
              placeholder={isStarted ? '' : 'Click here or press Start to begin typing...'}
            />

            {!isStarted && (
              <button
                onClick={startTest}
                className="px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 transition-colors flex items-center gap-2"
              >
                <Play size={16} />
                <span>Start</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">WPM</div>
              <div className="text-2xl font-bold text-cyan-400">{stats.wpm}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Accuracy</div>
              <div className="text-2xl font-bold text-purple-400">{stats.accuracy}%</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Progress</div>
              <div className="text-2xl font-bold text-green-400">
                {stats.totalChars > 0
                  ? Math.round((currentIndex / stats.totalChars) * 100)
                  : 0}%
              </div>
            </div>
          </div>
        </>
      ) : (
        <TypingResults stats={stats} mode={mode} onRestart={resetTest} />
      )}
    </div>
  );
};

export default TypingTest;