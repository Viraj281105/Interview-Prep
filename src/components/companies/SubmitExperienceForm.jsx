import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Send, CheckCircle2 } from 'lucide-react';

export const SubmitExperienceForm = ({ companyId }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 1000);
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center flex flex-col items-center bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4 shadow-sm shadow-emerald-500/20">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Experience Submitted!</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
          Thank you for giving back to the community. Your experience will be visible after a quick moderation check.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another</Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl font-bold mb-6">Share Your Interview Experience</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Role Applied For</label>
            <Input required placeholder="e.g. SDE 1, Frontend Intern" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Offer Status</label>
            <select required className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:text-slate-50 [&>option]:text-slate-900">
              <option value="" disabled selected>Select status...</option>
              <option value="accepted">Offer Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Questions Asked & Round Details</label>
          <textarea 
            required 
            rows={5} 
            className="flex w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:text-slate-50 placeholder:text-slate-400"
            placeholder="Describe the rounds, technical questions asked, and your overall experience..."
          ></textarea>
        </div>

        <Button type="submit" className="w-full sm:w-auto gap-2">
          <Send size={16} /> Submit Experience
        </Button>
      </form>
    </Card>
  );
};
