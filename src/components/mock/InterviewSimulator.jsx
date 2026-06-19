import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Video, VideoOff, Mic, MicOff, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { InterviewFeedback } from './InterviewFeedback';

const MOCK_QUESTIONS = {
  behavioral: [
    "Tell me about a time you had a conflict with a coworker and how you resolved it.",
    "Describe a situation where you had to meet a tight deadline. How did you handle it?",
    "Tell me about a time you failed or made a significant mistake. What did you learn?"
  ],
  dsa: [
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    "Reverse a singly linked list.",
    "Find the longest substring without repeating characters."
  ],
  'system-design': [
    "Design a URL Shortening service like bit.ly.",
    "Design Twitter's timeline feed architecture.",
    "Design a scalable Chat Application like WhatsApp."
  ]
};

export const InterviewSimulator = ({ type, onEnd }) => {
  const [stream, setStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(type === 'behavioral' ? 30 * 60 : 45 * 60); // seconds
  const [isStarted, setIsStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const videoRef = useRef(null);
  const questions = MOCK_QUESTIONS[type] || MOCK_QUESTIONS.behavioral;

  useEffect(() => {
    let timer;
    if (isStarted && !showFeedback && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !showFeedback) {
      handleEnd();
    }
    return () => clearInterval(timer);
  }, [isStarted, showFeedback, timeLeft]);

  useEffect(() => {
    // Request webcam access
    const initWebcam = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setError("Camera/Microphone access denied or unavailable.");
      }
    };

    initWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const handleEnd = () => {
    setShowFeedback(true);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      handleEnd();
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (showFeedback) {
    return <InterviewFeedback type={type} onExit={onEnd} />;
  }

  if (!isStarted) {
    return (
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center py-12">
        <h2 className="text-3xl font-bold mb-8">Setup Your Environment</h2>
        <Card className="w-full max-w-2xl overflow-hidden bg-slate-900 border-slate-800">
          <div className="relative aspect-video bg-black flex items-center justify-center">
            {error ? (
              <div className="text-rose-500 flex flex-col items-center gap-4">
                <AlertCircle size={48} />
                <p>{error}</p>
              </div>
            ) : (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className={`w-full h-full object-cover ${!videoEnabled ? 'opacity-0' : 'opacity-100'}`}
              />
            )}
            
            {!videoEnabled && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                <VideoOff size={48} className="mb-4" />
                <p>Camera is disabled</p>
              </div>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
              <Button size="icon" variant={audioEnabled ? "default" : "destructive"} onClick={toggleAudio} className="rounded-full w-12 h-12 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-sm border border-slate-600">
                {audioEnabled ? <Mic size={20} className="text-white" /> : <MicOff size={20} />}
              </Button>
              <Button size="icon" variant={videoEnabled ? "default" : "destructive"} onClick={toggleVideo} className="rounded-full w-12 h-12 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-sm border border-slate-600">
                {videoEnabled ? <Video size={20} className="text-white" /> : <VideoOff size={20} />}
              </Button>
            </div>
          </div>
          <div className="p-6 bg-slate-950 text-white flex justify-between items-center border-t border-slate-800">
            <div>
              <p className="font-bold">Ready to begin?</p>
              <p className="text-sm text-slate-400">Ensure you are in a quiet room with good lighting.</p>
            </div>
            <Button onClick={() => setIsStarted(true)} className="bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 shadow-lg text-white font-bold px-8">
              Start Interview
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const isTechnical = type === 'dsa' || type === 'system-design';

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 flex flex-col h-screen">
      {/* Top Bar */}
      <div className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
          <span className="font-bold text-slate-800 dark:text-slate-200">Mock Interview: {type.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 font-mono font-bold text-lg ${timeLeft < 300 ? 'text-rose-500' : 'text-slate-700 dark:text-slate-300'}`}>
            <Clock size={20} /> {formatTime(timeLeft)}
          </div>
          <Button variant="outline" size="sm" onClick={handleEnd} className="border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-900/20">
            End Interview
          </Button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-4 gap-4">
        
        {/* Left Column (Question + Code Editor) */}
        <div className={`flex flex-col gap-4 ${isTechnical ? 'lg:w-2/3' : 'lg:w-1/2 mx-auto'}`}>
          <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
            <div className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-2">
              Question {currentQuestionIdx + 1} of {questions.length}
            </div>
            <h2 className="text-xl md:text-2xl font-bold leading-snug">
              {questions[currentQuestionIdx]}
            </h2>
          </Card>

          {isTechnical && (
            <Card className="flex-1 flex flex-col bg-[#1e1e1e] border-slate-800 overflow-hidden">
              <div className="h-10 bg-[#2d2d2d] flex items-center px-4 border-b border-black">
                <span className="text-xs font-mono text-slate-300">solution.js</span>
              </div>
              <textarea 
                className="flex-1 bg-transparent w-full resize-none outline-none p-4 font-mono text-sm text-slate-300 placeholder:text-slate-600"
                placeholder="// Write your code here..."
                spellCheck="false"
              ></textarea>
            </Card>
          )}

          <div className="flex justify-end gap-4 shrink-0">
            <Button onClick={handleNext} className="shadow-lg shadow-blue-500/20">
              {currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
            </Button>
          </div>
        </div>

        {/* Right Column (Webcam / Interviewer feed) */}
        <div className={`${isTechnical ? 'lg:w-1/3' : 'hidden lg:flex lg:w-1/2'} flex-col gap-4`}>
          <Card className="w-full aspect-video bg-slate-900 overflow-hidden relative border-slate-800 p-0 flex items-center justify-center shadow-lg">
            {/* The actual video element isn't easily movable in React without state re-renders, 
                so in a real app we'd portal it or keep the ref stable. 
                For MVP, we'll re-attach the stream. */}
            <video 
              ref={(el) => {
                if (el && stream) el.srcObject = stream;
              }}
              autoPlay 
              playsInline 
              muted 
              className={`w-full h-full object-cover ${!videoEnabled ? 'opacity-0' : 'opacity-100'}`}
            />
            {!videoEnabled && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-950">
                <VideoOff size={48} className="mb-4" />
                <p>Camera Off</p>
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-xs text-white backdrop-blur-sm">
              You
            </div>
          </Card>

          <Card className="w-full flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center mb-4">
               <Users size={32} className="text-slate-400" />
             </div>
             <h3 className="font-bold text-lg mb-1">AI Interviewer</h3>
             <p className="text-sm text-slate-500 max-w-xs">Listening to your response. Speak clearly and explain your thought process.</p>
             
             <div className="mt-8 flex gap-1 items-center h-8">
               {[1, 2, 3, 4, 5].map(i => (
                 <motion.div 
                   key={i}
                   className="w-1.5 bg-blue-500 rounded-full"
                   animate={{ height: ['20%', '80%', '20%'] }}
                   transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                 />
               ))}
             </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
