'use client';

import React, { useState } from 'react';
import { ShieldAlert, Image as ImageIcon, Send } from 'lucide-react';

export default function StudentComplaints() {
  const [complaint, setComplaint] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaint.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setComplaint('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full mb-4">
          <ShieldAlert className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Food Quality & Complaints</h1>
        <p className="text-muted-foreground mt-2">We take your health seriously. Report any issues below.</p>
      </header>

      <div className="glass-panel p-8 rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Issue Description</label>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Please describe the issue in detail..."
              className="w-full bg-background border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none h-40"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Attach Evidence (Optional)</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
              <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm">Click to upload or drag and drop</span>
              <span className="text-xs opacity-70 mt-1">PNG, JPG up to 5MB</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitted}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              submitted ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {submitted ? 'Complaint Lodged Successfully' : <><Send className="w-5 h-5" /> Submit Complaint</>}
          </button>
        </form>
      </div>
    </div>
  );
}
