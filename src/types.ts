export type TypingMode = 'classic' | 'endless' | 'precision' | 'blind' | 'code' | 'custom';

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  elapsedTime: number;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  smoothCursor: boolean;
  soundEffects: boolean;
  capsLockWarning: boolean;
  focusMode: boolean;
  keyboardLayout: 'qwerty' | 'dvorak' | 'colemak' | 'azerty';
}

export interface TestResult extends TypingStats {
  mode: TypingMode;
  date: Date;
  text: string;
}

export interface Character {
  char: string;
  status: 'waiting' | 'correct' | 'incorrect' | 'current';
}