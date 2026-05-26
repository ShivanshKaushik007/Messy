'use client';

import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { QrCode, CheckCircle, Camera } from 'lucide-react';

export default function QRScannerPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScan = (result: string) => {
    if (result) {
      setScanResult(result);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-sky-500/10 rounded-full mb-4">
          <QrCode className="h-10 w-10 text-sky-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Scan Attendance QR</h1>
        <p className="text-muted-foreground mt-2">Point your camera at the admin's screen to mark your attendance.</p>
      </header>

      <div className="glass-panel p-6 rounded-2xl overflow-hidden relative">
        {scanResult ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <CheckCircle className="h-20 w-20 text-emerald-500 mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-emerald-500 mb-2">Attendance Marked!</h2>
            <p className="text-muted-foreground mb-6">Meal ID: {scanResult}</p>
            <button
              onClick={() => setScanResult(null)}
              className="px-6 py-2 bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors"
            >
              Scan Another
            </button>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden border-2 border-primary/20 aspect-square max-w-sm mx-auto relative group">
            <Scanner 
              onScan={(result) => handleScan(result[0]?.rawValue || '')} 
              formats={['qr_code']}
            />
            <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary/50 transition-colors pointer-events-none rounded-xl"></div>
            <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
              <div className="w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
              <div className="w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
              <div className="w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
              <div className="w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
