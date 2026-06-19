import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { UploadCloud, File, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
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
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Upload Section */}
      <Card className="flex-1 p-8 flex flex-col items-center justify-center border-dashed border-2 border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30">
        {!file ? (
          <>
            <div className="w-20 h-20 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <UploadCloud size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Upload your Resume</h3>
            <p className="text-sm text-slate-500 mb-8 text-center max-w-sm leading-relaxed">
              Upload your PDF resume to receive an AI-powered ATS compatibility score and actionable feedback.
            </p>
            <label className="cursor-pointer">
              <div className="inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all h-10 px-8 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-lg shadow-blue-500/20">
                Select PDF File
              </div>
              <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} />
            </label>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
               <File size={32} />
             </div>
             <h3 className="font-bold text-lg mb-1 truncate max-w-[200px]">{file.name}</h3>
             <p className="text-xs text-slate-500 mb-8 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
             
             {isAnalyzing ? (
               <div className="flex flex-col items-center text-blue-600 dark:text-blue-400">
                 <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                 <span className="font-bold animate-pulse text-sm">AI is parsing ATS data...</span>
               </div>
             ) : report ? (
               <Button variant="outline" onClick={() => { setFile(null); setReport(null); }}>Upload Different File</Button>
             ) : (
               <Button onClick={runAnalysis} className="px-8 shadow-blue-500/20 shadow-lg">Run Analysis</Button>
             )}
          </div>
        )}
      </Card>

      {/* Report Section */}
      <Card className="flex-1 p-0 overflow-hidden flex flex-col border-slate-200 dark:border-slate-800">
        <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 font-bold flex items-center gap-2">
          <ShieldCheck className="text-emerald-500" /> ATS Compatibility Report
        </div>
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          {!report && !isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm text-center">
              <ShieldCheck size={48} className="mb-4 opacity-20" />
              <p>Upload a resume and run analysis to see results here.</p>
            </div>
          )}
          {isAnalyzing && (
            <div className="h-full flex flex-col gap-4">
              <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
              <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
              <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
            </div>
          )}
          {report && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 flex flex-col items-center justify-center">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Overall Score</h4>
                  <div className="text-4xl font-black text-blue-600 dark:text-blue-400">{report.score}<span className="text-lg text-blue-300">/100</span></div>
                </div>
                <div className="flex-1 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30 flex flex-col items-center justify-center">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ATS Match</h4>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{report.atsMatch}</div>
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
