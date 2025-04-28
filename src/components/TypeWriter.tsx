import React, { useState, useEffect, useCallback } from 'react';

interface TypeWriterProps {
  words: string[];
  delay?: number;
  infinite?: boolean;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ words, delay = 100, infinite = true }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const type = useCallback(() => {
    const currentWord = words[wordIndex];
    
    if (isPaused) {
      setTimeout(() => setIsPaused(false), 1500);
      return;
    }

    if (!isDeleting) {
      setCurrentText(currentWord.substring(0, currentIndex + 1));
      setCurrentIndex(prev => prev + 1);

      if (currentIndex >= currentWord.length) {
        setIsPaused(true);
        setIsDeleting(true);
      }
    } else {
      setCurrentText(currentWord.substring(0, currentIndex - 1));
      setCurrentIndex(prev => prev - 1);

      if (currentIndex <= 1) {
        setIsDeleting(false);
        setWordIndex(prev => (prev + 1) % words.length);
      }
    }
  }, [currentIndex, isDeleting, isPaused, wordIndex, words]);

  useEffect(() => {
    const timeout = setTimeout(type, isPaused ? 1500 : isDeleting ? delay / 2 : delay);
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, isDeleting, isPaused, type]);

  return (
    <span className="inline-block min-w-[20ch] text-red-500">
      {currentText}
      <span className={`inline-block w-0.5 h-5 ml-1 bg-red-500 ${isPaused ? 'animate-pulse' : 'animate-blink'}`} />
    </span>
  );
};

export default TypeWriter;