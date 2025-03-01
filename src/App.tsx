import React, { useState, useEffect } from 'react';
import { Clock, Infinity, Target, Eye, Code, FileText } from 'lucide-react';
import Header from './components/Header';
import TypingTest from './components/TypingTest';
import Footer from './components/Footer';
import ModeSelector from './components/ModeSelector';
import { TypingMode } from './types';

function App() {
  const [selectedMode, setSelectedMode] = useState<TypingMode>('classic');
  const [timeLimit, setTimeLimit] = useState<number>(60);
  const [resetKey, setResetKey] = useState<number>(0);

  const modes = [
    { id: 'classic', name: 'Classic', icon: <Clock size={20} />, description: 'Standard typing test with a fixed time limit' },
    { id: 'endless', name: 'Endless', icon: <Infinity size={20} />, description: 'Type continuously without a time limit' },
    { id: 'precision', name: 'Precision', icon: <Target size={20} />, description: 'Emphasizes accuracy by penalizing incorrect keystrokes' },
    { id: 'blind', name: 'Blind', icon: <Eye size={20} />, description: 'Typed text remains hidden, challenging muscle memory' },
    { id: 'code', name: 'Code', icon: <Code size={20} />, description: 'Practice typing programming syntax' },
    { id: 'custom', name: 'Custom', icon: <FileText size={20} />, description: 'Input your own text passages for practice' },
  ];

  const timeLimits = [
    { value: 30, label: '30s' },
    { value: 60, label: '1m' },
    { value: 120, label: '2m' },
    { value: 300, label: '5m' },
  ];

  // Function to reset the typing test
  const resetTest = () => {
    setResetKey(prevKey => prevKey + 1);
  };

  // Reset the test when the mode or time limit changes
  useEffect(() => {
    resetTest();
  }, [selectedMode, timeLimit]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Advanced Typing Test
            </h1>
            <p className="text-gray-300">Improve your typing speed and accuracy with our interactive tests</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-8">
          {/* Mode Selector */}
          <div className="lg:col-span-2">
            <ModeSelector
              modes={modes}
              selectedMode={selectedMode}
              onSelectMode={setSelectedMode}
              timeLimit={timeLimit}
              timeLimits={timeLimits}
              onSelectTimeLimit={setTimeLimit}
            />
          </div>

          {/* Typing Test */}
          <div className="lg:col-span-5">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700">
              <TypingTest key={resetKey} mode={selectedMode} timeLimit={timeLimit} onTestFinish={resetTest} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;