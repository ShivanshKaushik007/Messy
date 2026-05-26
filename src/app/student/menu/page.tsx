'use client';

import React, { useState } from 'react';
import { Utensils, Send, MessageSquare } from 'lucide-react';

const weeklyMenu = [
  { day: 'Monday', breakfast: 'Poha, Jalebi', lunch: 'Rajma Chawal', dinner: 'Dal Makhani, Roti' },
  { day: 'Tuesday', breakfast: 'Aloo Paratha', lunch: 'Kadi Pakora', dinner: 'Paneer Butter Masala' },
  { day: 'Wednesday', breakfast: 'Idli Sambar', lunch: 'Chole Bhature', dinner: 'Mix Veg, Roti' },
];

export default function StudentMenu() {
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSuggestion('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Utensils className="h-8 w-8 text-primary" /> Mess Menu
        </h1>
        <p className="text-muted-foreground mt-2">View this week's menu and drop your suggestions.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {weeklyMenu.map((day) => (
            <div key={day.day} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 hover:border-primary/50 transition-colors">
              <div className="font-bold text-xl w-32 shrink-0 text-primary">{day.day}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Breakfast</div>
                  <div>{day.breakfast}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Lunch</div>
                  <div>{day.lunch}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Dinner</div>
                  <div>{day.dinner}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="glass-panel p-6 rounded-2xl sticky top-24">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" /> Suggestion Box
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="What would you like to see on the menu?"
                className="w-full bg-background border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-32"
                required
              />
              <button
                type="submit"
                disabled={submitted}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  submitted ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {submitted ? 'Submitted!' : <><Send className="w-4 h-4" /> Submit Suggestion</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
