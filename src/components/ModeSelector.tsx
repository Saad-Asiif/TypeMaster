import React from 'react';

interface ModeSelectorProps {
  modes: { id: string; name: string; icon: JSX.Element; description: string }[];
  selectedMode: string;
  onSelectMode: (mode: string) => void;
  timeLimit: number;
  timeLimits: { value: number; label: string }[];
  onSelectTimeLimit: (limit: number) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({
  modes,
  selectedMode,
  onSelectMode,
  timeLimit,
  timeLimits,
  onSelectTimeLimit,
}) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Select Mode</h2>
      <div className="space-y-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${selectedMode === mode.id
              ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            {mode.icon}
            <div>
              <p className="font-medium">{mode.name}</p>
              <p className="text-sm text-gray-300">{mode.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Timer for Non-Endless Modes */}
      {selectedMode !== 'endless' && (
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Time Limit</h3>
          <div className="grid grid-cols-4 gap-2">
            {timeLimits.map((limit) => (
              <button
                key={limit.value}
                className={`py-2 px-3 rounded-lg text-center transition-colors ${timeLimit === limit.value
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                onClick={() => onSelectTimeLimit(limit.value)}
              >
                {limit.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message for Endless Mode */}
      {selectedMode === 'endless' && (
        <p className="mt-6 text-sm text-gray-400">No time limit in Endless mode. Type as long as you want!</p>
      )}
    </div>
  );
};

export default ModeSelector;