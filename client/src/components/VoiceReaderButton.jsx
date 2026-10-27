import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function VoiceReaderButton({ text, lang = 'en', label = 'Read Aloud', className = '' }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (e) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language code to BCP 47
    const langMap = {
      en: 'en-US',
      hi: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      bn: 'bn-IN',
      kn: 'kn-IN',
      mr: 'mr-IN',
      es: 'es-ES'
    };
    utterance.lang = langMap[lang] || 'en-US';
    utterance.rate = 0.95; // Slightly slower for clarity

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={isSpeaking ? 'Stop reading' : 'Read aloud for accessibility'}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all shadow-sm ${
        isSpeaking
          ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
          : 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100'
      } ${className}`}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-amber-600" />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-teal-600" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
