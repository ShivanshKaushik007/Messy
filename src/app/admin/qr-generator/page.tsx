'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, RefreshCcw, Maximize2 } from 'lucide-react';

export default function QRGenerator() {
  const [mealType, setMealType] = useState('lunch');
  const [qrValue, setQrValue] = useState(`meal-${mealType}-${new Date().toISOString().split('T')[0]}`);

  const handleGenerate = () => {
    setQrValue(`meal-${mealType}-${new Date().toISOString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR Generator</h1>
          <p className="text-muted-foreground mt-2">Display this QR code for students to scan upon entry.</p>
        </div>
        <button className="p-2 bg-muted hover:bg-muted/80 rounded-lg">
          <Maximize2 className="w-5 h-5" />
        </button>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center min-h-[400px]">
          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-primary/10 border-4 border-primary/20">
            <QRCodeSVG 
              value={qrValue} 
              size={256}
              level="H"
              includeMargin={false}
            />
          </div>
          <div className="mt-8 text-center">
            <p className="font-mono text-sm text-muted-foreground bg-muted px-4 py-2 rounded-lg inline-block">
              {qrValue}
            </p>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" /> Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Select Meal</label>
              <div className="grid grid-cols-3 gap-2">
                {['breakfast', 'lunch', 'dinner'].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMealType(m);
                      setQrValue(`meal-${m}-${new Date().toISOString().split('T')[0]}`);
                    }}
                    className={`py-3 rounded-xl text-sm font-semibold capitalize transition-all ${
                      mealType === m 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <button
                onClick={handleGenerate}
                className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" /> Regenerate QR Code
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Regenerating the QR code will invalidate previous scans for this session. Use this to prevent QR sharing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
