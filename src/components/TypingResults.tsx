import React from 'react';
import { TypingMode, TypingStats } from '../types';
import { RefreshCw, Award, BarChart2, Clock, Target } from 'lucide-react';

interface TypingResultsProps {
  stats: TypingStats;
  mode: TypingMode;
  onRestart: () => void;
}

const TypingResults: React.FC<TypingResultsProps> = ({ stats, mode, onRestart }) => {
  // Calculate grade based on WPM
  const getGrade = (wpm: number): { grade: string; color: string } => {
    if (wpm >= 100) return { grade: 'S+', color: 'text-yellow-400' };
    if (wpm >= 90) return { grade: 'S', color: 'text-yellow-500' };
    if (wpm >= 80) return { grade: 'A+', color: 'text-green-400' };
    if (wpm >= 70) return { grade: 'A', color: 'text-green-500' };
    if (wpm >= 60) return { grade: 'B+', color: 'text-cyan-400' };
    if (wpm >= 50) return { grade: 'B', color: 'text-cyan-500' };
    if (wpm >= 40) return { grade: 'C+', color: 'text-blue-400' };
    if (wpm >= 30) return { grade: 'C', color: 'text-blue-500' };
    if (wpm >= 20) return { grade: 'D', color: 'text-purple-500' };
    return { grade: 'F', color: 'text-red-500' };
  };

  const grade = getGrade(stats.wpm);
  
  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Test Complete!</h3>
        <p className="text-gray-400">Here's how you performed</p>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className={`text-6xl font-bold ${grade.color}`}>{grade.grade}</div>
          <div className="absolute -top-2 -right-2">
            <Award className={`${grade.color}`} size={24} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800/70 rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <BarChart2 className="text-cyan-400" size={24} />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats.wpm}</div>
          <div className="text-xs text-gray-400">Words Per Minute</div>
        </div>
        
        <div className="bg-gray-800/70 rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <Target className="text-purple-400" size={24} />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats.accuracy}%</div>
          <div className="text-xs text-gray-400">Accuracy</div>
        </div>
        
        <div className="bg-gray-800/70 rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <Clock className="text-green-400" size={24} />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{formatTime(stats.elapsedTime)}</div>
          <div className="text-xs text-gray-400">Time Taken</div>
        </div>
        
        <div className="bg-gray-800/70 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-white mb-1">{stats.correctChars}</div>
          <div className="text-xs text-gray-400">Correct Keystrokes</div>
          <div className="mt-1 text-xs text-red-400">{stats.incorrectChars} errors</div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
};

export default TypingResults;