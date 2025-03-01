import { useEffect } from 'react';

const useKeypressSound = (isSoundEnabled: boolean) => {
  useEffect(() => {
    const handleKeypress = () => {
      if (isSoundEnabled) {
        const audio = new Audio('/keypress.mp3');
        audio.play();
      }
    };

    window.addEventListener('keydown', handleKeypress);

    return () => {
      window.removeEventListener('keydown', handleKeypress);
    };
  }, [isSoundEnabled]);
};

export default useKeypressSound;