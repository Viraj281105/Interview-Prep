import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { UploadCloud, File, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI parsing and ATS scoring
    setTimeout(() => {
      setReport({
        score: 78,
        atsMatch: 'Medium',
        strengths: ['Action verbs used consistently.', 'Education section is well-formatted.', 'Contact information is easily parsable.'],
        weaknesses: ['Missing quantitative metrics in experience.', 'Keywords for "System Design" are missing.', 'File name is generic.'],
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-8">
      {/* Upload Section */}
      <Card glass className="flex-1 p-10 flex flex-col items-center justify-center border-dashed border-2 border-brand-indigo/30 bg-brand-indigo/5 dark:bg-brand-indigo/5 relative overflow-hidden group hover:border-brand-indigo/50 transition-colors">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        
        {!file ? (
          <>
            <div className="w-24 h-24 bg-white dark:bg-slate-900 border border-brand-indigo/20 text-brand-indigo rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(99,102,241,0.15)] group-hover:scale-105 transition-transform relative">
              <Sparkles size={24} className="absolute -top-2 -right-2 text-amber-400" />
              <UploadCloud size={48} />
            </div>
            <h3 className="text-2xl font-heading font-extrabold mb-3 text-slate-900 dark:text-slate-100 tracking-tight">Upload your Resume</h3>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-10 text-center max-w-sm leading-relaxed">
              Upload your PDF resume to receive an AI-powered ATS compatibility score and actionable feedback.
            </p>
            <label className="cursor-pointer z-10">
              <div className="inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all h-14 px-10 bg-brand-indigo text-white hover:bg-brand-purple shadow-lg shadow-brand-indigo/20">
                Select PDF File
              </div>
              <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} />
            </label>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center z-10">
             <div className="w-20 h-20 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
               <File size={40} />
             </div>
             <h3 className="font-heading font-bold text-xl mb-2 truncate max-w-[250px] text-slate-900 dark:text-slate-100">{file.name}</h3>
             <p className="text-sm text-slate-500 mb-10 font-bold uppercase tracking-wider">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
             
             {isAnalyzing ? (
               <div className="flex flex-col items-center text-brand-indigo">
                 <div className="w-10 h-10 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin mb-4"></div>
                 <span className="font-bold animate-pulse text-sm uppercase tracking-wide">AI is parsing ATS data...</span>
               </div>
             ) : report ? (
               <Button variant="outline" size="lg" className="border-slate-300 dark:border-slate-700" onClick={() => { setFile(null); setReport(null); }}>Upload Different File</Button>
             ) : (
               <Button onClick={runAnalysis} size="lg" className="px-10 shadow-brand-indigo/20 shadow-lg font-bold bg-brand-indigo hover:bg-brand-purple">Run Analysis</Button>
             )}
          </div>
        )}
      </Card>

      {/* Report Section */}
      <Card glass className="flex-1 p-0 overflow-hidden flex flex-col border-brand-indigo/10 dark:border-brand-indigo/20 shadow-xl">
        <div className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 font-heading font-bold flex items-center gap-3 text-lg text-slate-900 dark:text-slate-100">
          <ShieldCheck className="text-emerald-500" size={24} /> ATS Compatibility Report
        </div>
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar relative z-10">
          {!report && !isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm text-center">
              <ShieldCheck size={64} className="mb-6 opacity-20 text-brand-indigo" />
              <p className="text-base font-medium max-w-[250px] leading-relaxed">Upload a resume and run analysis to see your score here.</p>
            </div>
          )}
          {isAnalyzing && (
            <div className="h-full flex flex-col gap-6 w-full max-w-md mx-auto justify-center">
              <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
              <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
              <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
            </div>
          )}
          {report && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 p-6 bg-brand-indigo/5 dark:bg-brand-indigo/10 rounded-2xl border border-brand-indigo/20 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 z-10">Overall Score</h4>
                  <div className="text-6xl font-black text-brand-indigo tracking-tighter z-10">{report.score}<span className="text-2xl text-brand-indigo/50 tracking-normal">/100</span></div>
                </div>
                <div className="flex-1 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-200 dark:border-orange-900/50 flex flex-col items-center justify-center shadow-inner">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">ATS Match</h4>
                  <div className="text-3xl font-black text-orange-600 dark:text-orange-400">{report.atsMatch}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-3 text-sm uppercase tracking-wider">
                  <CheckCircle2 size={16} /> Strengths
                </h4>
                <ul className="space-y-2">
                  {report.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-slate-700 dark:text-slate-300 bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/20">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-3 text-sm uppercase tracking-wider">
                  <AlertTriangle size={16} /> Areas for Improvement
                </h4>
                <ul className="space-y-2">
                  {report.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-slate-700 dark:text-slate-300 bg-rose-50/50 dark:bg-rose-900/10 p-3 rounded-lg border border-rose-100 dark:border-rose-900/20">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
};
