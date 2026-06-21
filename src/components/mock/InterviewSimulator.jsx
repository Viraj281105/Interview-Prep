import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Video, VideoOff, Mic, MicOff, AlertCircle, Clock, Send, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InterviewFeedback } from './InterviewFeedback';
import { generateMockQuestions } from '../../utils/mockInterviewGenerator';
import { aiService } from '../../services/aiService';

export const InterviewSimulator = ({ type, companyId, onEnd }) => {
  const [stream, setStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(type === 'behavioral' ? 30 * 60 : 45 * 60);
  const [isStarted, setIsStarted] = useState(false);
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  
  const [transcript, setTranscript] = useState([]);
  
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Voice AI states
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isDictating, setIsDictating] = useState(false);
  const [speechSupported] = useState('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  const recognitionRef = useRef(null);
  
  const videoRef = useRef(null);

  useEffect(() => {
    if (speechSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        // Append final transcript and show interim
        if (finalTranscript) {
          setUserAnswer(prev => prev + (prev.endsWith(' ') ? '' : ' ') + finalTranscript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsDictating(false);
      };
    }

    return () => {
      window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [speechSupported]);

  useEffect(() => {
    setQuestions(generateMockQuestions(type));
  }, [type]);

  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0 && !showFeedback) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isStarted) {
      handleEnd();
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft, showFeedback]);

  // Handle AI speaking the question
  useEffect(() => {
    if (isStarted && questions.length > 0 && !showFeedback) {
      speakQuestion(questions[currentQuestionIdx]);
    }
  }, [isStarted, currentQuestionIdx, questions, showFeedback]);

  const speakQuestion = (text) => {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Optional: pick a nice English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) 
                        || voices.find(v => v.lang.startsWith('en-US'));
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.rate = 0.95; // slightly slower for clarity
    
    utterance.onstart = () => setIsAiSpeaking(true);
    utterance.onend = () => setIsAiSpeaking(false);
    utterance.onerror = () => setIsAiSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleDictation = () => {
    if (!speechSupported || !recognitionRef.current) return;
    
    if (isDictating) {
      recognitionRef.current.stop();
      setIsDictating(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsDictating(true);
      } catch (e) {
        console.error("Speech recognition error:", e);
      }
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      setError('Camera/Microphone access denied. Please enable permissions.');
      setVideoEnabled(false);
      setAudioEnabled(false);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => track.enabled = !videoEnabled);
      setVideoEnabled(!videoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => track.enabled = !audioEnabled);
      setAudioEnabled(!audioEnabled);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    
    if (isDictating && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsDictating(false);
    }
    
    setIsEvaluating(true);
    
    try {
      const result = await aiService.evaluateAnswer(questions[currentQuestionIdx], userAnswer, type);
      setEvaluation(result);
      
      // Do NOT read evaluation aloud to avoid overwhelming UX, 
      // but we could if requested.
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = () => {
    // Save to transcript
    setTranscript(prev => [...prev, {
      question: questions[currentQuestionIdx],
      answer: userAnswer,
      evaluation: evaluation
    }]);

    setEvaluation(null);
    setUserAnswer('');
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      handleEnd();
    }
  };

  const handleEnd = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    window.speechSynthesis.cancel();
    if (isDictating && recognitionRef.current) recognitionRef.current.stop();
    setIsDictating(false);
    setIsAiSpeaking(false);
    setShowFeedback(true);
  };

  if (showFeedback) {
    // Save the final answer to transcript if not already saved (happens if interview ends by timeout)
    const finalTranscript = [...transcript];
    if (evaluation && finalTranscript.length === currentQuestionIdx) {
      finalTranscript.push({
        question: questions[currentQuestionIdx],
        answer: userAnswer,
        evaluation: evaluation
      });
    }

    return <InterviewFeedback 
      type={type} 
      duration={type === 'behavioral' ? 30*60 - timeLeft : 45*60 - timeLeft} 
      transcript={finalTranscript}
      onExit={onEnd} 
    />;
  }

  if (questions.length === 0) return null;

  if (!isStarted) {
    return (
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in-95 duration-500">
        <h2 className="text-3xl font-heading font-bold mb-8 text-slate-900 dark:text-white">Setup Your Environment</h2>
        <Card className="w-full max-w-2xl overflow-hidden bg-slate-900 border-slate-800 shadow-2xl">
          <div className="relative aspect-video bg-black flex items-center justify-center">
            {error ? (
              <div className="text-rose-500 flex flex-col items-center gap-4">
                <AlertCircle size={48} />
                <p className="font-medium">{error}</p>
              </div>
            ) : (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className={`w-full h-full object-cover transition-opacity duration-300 ${!videoEnabled ? 'opacity-0' : 'opacity-100'}`}
              />
            )}
            
            {!videoEnabled && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                <VideoOff size={48} className="mb-4" />
                <p className="font-medium">Camera is disabled</p>
              </div>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
              <Button size="icon" variant={audioEnabled ? "default" : "destructive"} onClick={toggleAudio} className="rounded-full w-14 h-14 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md border border-slate-600 shadow-lg">
                {audioEnabled ? <Mic size={24} className="text-white" /> : <MicOff size={24} />}
              </Button>
              <Button size="icon" variant={videoEnabled ? "default" : "destructive"} onClick={toggleVideo} className="rounded-full w-14 h-14 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md border border-slate-600 shadow-lg">
                {videoEnabled ? <Video size={24} className="text-white" /> : <VideoOff size={24} />}
              </Button>
            </div>
          </div>
          <div className="p-8 bg-slate-950 text-white flex flex-col sm:flex-row justify-between items-center border-t border-slate-800 gap-6">
            <div className="text-center sm:text-left">
              <p className="font-bold text-lg mb-1">{companyId ? `Ready for ${companyId.toUpperCase()}?` : 'Ready to begin?'}</p>
              <p className="text-sm text-slate-400">Ensure you are in a quiet room with good lighting.</p>
            </div>
            <Button onClick={() => setIsStarted(true)} size="lg" className="w-full sm:w-auto bg-brand-indigo hover:bg-brand-purple shadow-brand-indigo/20 shadow-lg text-white font-bold px-8">
              Start AI Interview
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const isTechnical = type === 'dsa' || type === 'system-design';
  const headerTitle = companyId 
    ? `${companyId.toUpperCase()} Mock: ${type.replace('-', ' ')}` 
    : `Mock Interview: ${type.replace('-', ' ')}`;

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0A] text-slate-200 flex flex-col h-screen font-sans">
      {/* Top Bar */}
      <div className="h-14 bg-[#111111] border-b border-[#222222] flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]"></div>
          <span className="font-bold tracking-wide uppercase text-sm text-slate-300">{headerTitle}</span>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 font-mono font-bold text-lg ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-slate-300'}`}>
            <Clock size={18} /> {formatTime(timeLeft)}
          </div>
          <Button variant="ghost" size="sm" onClick={handleEnd} className="text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors">
            End Interview
          </Button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-4 gap-4 bg-[#0A0A0A]">
        
        {/* Left Column (Question + Input Area) */}
        <div className={`flex flex-col gap-4 ${isTechnical ? 'lg:w-[65%]' : 'lg:w-1/2 mx-auto'} h-full`}>
          <Card className="p-6 bg-[#111111] border border-[#222222] shrink-0 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-brand-indigo uppercase tracking-wider">
                Question {currentQuestionIdx + 1} of {questions.length}
              </div>
              {isEvaluating && (
                <div className="text-xs font-bold text-brand-cyan uppercase tracking-wider flex items-center gap-2 animate-pulse">
                  <Sparkles size={14} /> AI Evaluating
                </div>
              )}
            </div>
            <h2 className="text-xl leading-relaxed text-slate-100 font-medium">
              {questions[currentQuestionIdx]}
            </h2>
          </Card>

          <AnimatePresence mode="wait">
            {evaluation ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2"
              >
                <Card className="p-6 bg-brand-indigo/10 border-brand-indigo/30 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="text-brand-indigo" size={20} /> AI Feedback
                    </h3>
                    <div className="px-3 py-1 rounded-full bg-white/10 text-white font-bold text-sm">
                      Score: {evaluation.score}/10
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6">{evaluation.feedback}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                      <h4 className="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wider">Strengths</h4>
                      <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                        {evaluation.strengths.length > 0 ? evaluation.strengths.map((s, i) => <li key={i}>{s}</li>) : <li>None identified</li>}
                      </ul>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
                      <h4 className="text-rose-400 font-bold text-sm mb-2 uppercase tracking-wider">Weaknesses</h4>
                      <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                        {evaluation.weaknesses.length > 0 ? evaluation.weaknesses.map((w, i) => <li key={i}>{w}</li>) : <li>None identified</li>}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <h4 className="text-white font-bold text-sm mb-2">Ideal Answer Framework</h4>
                    <p className="text-slate-400 text-sm">{evaluation.idealAnswer}</p>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col"
              >
                <Card className="flex-1 flex flex-col bg-[#0F0F11] border border-[#222222] overflow-hidden shadow-lg group relative">
                  <div className="h-11 bg-[#161618] flex items-center px-4 border-b border-[#222222]">
                    <div className="flex gap-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <span className="text-[13px] font-mono text-slate-400 flex items-center gap-2">
                      {isTechnical ? 'solution.js' : 'your-answer.txt'}
                      {isDictating && <span className="flex items-center gap-1 text-rose-500 font-sans"><div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></div> Recording...</span>}
                    </span>
                  </div>
                  <div className="flex-1 relative flex">
                    {isTechnical && (
                      <div className="w-12 bg-[#161618] border-r border-[#222222] text-right py-4 pr-3 select-none flex flex-col font-mono text-xs text-slate-600">
                        {Array.from({ length: 30 }).map((_, i) => <span key={i} className="mb-1 leading-relaxed">{i + 1}</span>)}
                      </div>
                    )}
                    <textarea 
                      className={`flex-1 bg-transparent resize-none outline-none p-4 text-[14px] leading-relaxed text-[#c9d1d9] placeholder:text-[#8b949e] caret-brand-indigo ${isTechnical ? 'font-mono' : 'font-sans'}`}
                      placeholder={isTechnical ? "// Write your optimized solution here..." : "Type your response here. Use the STAR method..."}
                      spellCheck="false"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      disabled={isEvaluating}
                    ></textarea>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

           <div className="flex justify-between items-center shrink-0 pt-2 gap-4">
            <div className="flex items-center gap-2">
              {speechSupported && !evaluation && (
                <Button 
                  variant={isDictating ? "destructive" : "outline"} 
                  onClick={toggleDictation}
                  disabled={isEvaluating}
                  className={`gap-2 ${isDictating ? 'animate-pulse' : 'border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'}`}
                >
                  {isDictating ? <MicOff size={16} /> : <Mic size={16} />}
                  {isDictating ? 'Stop Dictating' : 'Dictate'}
                </Button>
              )}
            </div>
            {!evaluation ? (
              <Button 
                onClick={handleSubmitAnswer} 
                disabled={!userAnswer.trim() || isEvaluating}
                className="bg-brand-indigo hover:bg-brand-purple text-white shadow-lg shadow-brand-indigo/20 px-8 gap-2"
              >
                {isEvaluating ? 'Evaluating...' : <><Send size={16} /> Submit Answer</>}
              </Button>
            ) : (
              <Button 
                onClick={handleNext} 
                className="bg-brand-cyan hover:bg-cyan-500 text-slate-900 font-bold shadow-lg shadow-brand-cyan/20 px-8"
              >
                {currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
              </Button>
            )}
          </div>
        </div>

        {/* Right Column (Webcam / Interviewer feed) */}
        <div className={`${isTechnical ? 'lg:w-[35%]' : 'hidden lg:flex lg:w-1/2'} flex-col gap-4 h-full`}>
          <Card className="w-full aspect-video bg-black overflow-hidden relative border-[#222222] p-0 flex items-center justify-center shadow-lg rounded-xl">
            <video 
              ref={(el) => {
                if (el && stream) el.srcObject = stream;
              }}
              autoPlay 
              playsInline 
              muted 
              className={`w-full h-full object-cover transition-opacity duration-300 ${!videoEnabled ? 'opacity-0' : 'opacity-100'}`}
            />
            {!videoEnabled && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-[#111]">
                <VideoOff size={48} className="mb-4 text-slate-700" />
              </div>
            )}
            <div className="absolute bottom-3 right-3 bg-black/60 px-3 py-1 rounded-md text-xs font-medium text-white backdrop-blur-md border border-white/10">
              You
            </div>
          </Card>

          <Card className="w-full flex-1 bg-[#111111] border border-[#222222] p-8 flex flex-col items-center justify-center text-center shadow-lg rounded-xl relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo/5 to-transparent pointer-events-none"></div>
             
             <div className="w-24 h-24 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.1)] relative">
               <div className={`absolute inset-0 rounded-full border border-brand-indigo/30 opacity-20 ${isEvaluating ? 'animate-spin' : (isAiSpeaking ? 'animate-ping' : '')}`}></div>
               {isAiSpeaking && (
                 <motion.div 
                   className="absolute inset-0 rounded-full border-2 border-brand-indigo/60"
                   animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                 />
               )}
               {isEvaluating ? <Sparkles size={36} className="text-brand-cyan animate-pulse" /> : <Volume2 size={36} className={`text-brand-indigo ${isAiSpeaking ? 'animate-pulse' : ''}`} />}
             </div>
             
             <h3 className="font-heading font-bold text-xl mb-2 text-slate-100">
               {isEvaluating ? 'AI Evaluator' : 'AI Interviewer'}
             </h3>
             <p className="text-sm text-slate-400 max-w-[250px] leading-relaxed">
               {isEvaluating 
                 ? 'Analyzing your response for correctness, completeness, and clarity...' 
                 : (isAiSpeaking ? 'Speaking...' : 'Listening to your response. Explain your thought process clearly.')}
             </p>
             
             {!isEvaluating && !evaluation && isAiSpeaking && (
               <div className="mt-10 flex gap-1.5 items-end h-10">
                 {[1, 2, 3, 4, 5, 6, 7].map(i => (
                   <motion.div 
                     key={i}
                     className="w-2 bg-brand-indigo/80 rounded-full"
                     animate={{ height: ['20%', `${40 + Math.random() * 60}%`, '20%'] }}
                     transition={{ duration: 0.3 + Math.random() * 0.3, repeat: Infinity, ease: "easeInOut" }}
                   />
                 ))}
               </div>
             )}
             {!isEvaluating && !evaluation && !isAiSpeaking && (
               <div className="mt-10 flex gap-1.5 items-end h-10 opacity-30">
                 {[1, 2, 3, 4, 5, 6, 7].map(i => (
                   <div key={i} className="w-2 h-2 bg-brand-indigo/80 rounded-full" />
                 ))}
               </div>
             )}
          </Card>
        </div>

      </div>
    </div>
  );
};
