
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ProcessingState from './components/ProcessingState';
import { processTranscript } from './services/geminiService';
import { AppState, ProcessingResult } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    inputTranscript: '',
    isProcessing: false,
    result: null,
    error: null,
    options: {
      addHeadings: true,
      seoFocus: true,
    }
  });

  const handleProcess = async () => {
    if (!state.inputTranscript.trim()) return;

    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    try {
      const result = await processTranscript(state.inputTranscript, state.options);
      setState(prev => ({ ...prev, result, isProcessing: false }));
    } catch (err) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        isProcessing: false, 
        error: 'Failed to process transcript. Please check your API key and try again.' 
      }));
    }
  };

  const copyToClipboard = () => {
    if (state.result?.cleanedText) {
      navigator.clipboard.writeText(state.result.cleanedText);
      alert('Copied to clipboard!');
    }
  };

  const handleOptionChange = (key: keyof AppState['options']) => {
    setState(prev => ({
      ...prev,
      options: { ...prev.options, [key]: !prev.options[key] }
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ProcessingState isProcessing={state.isProcessing} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Input Side */}
          <section className="space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-extrabold text-slate-900">Transform your Transcripts</h1>
              <p className="text-slate-500">Paste your raw YouTube transcript below. We'll handle the rest.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <textarea
                value={state.inputTranscript}
                onChange={(e) => setState(prev => ({ ...prev, inputTranscript: e.target.value }))}
                placeholder="00:01 So today uh we're gonna talk about...&#10;00:05 like how to basically do this thing..."
                className="w-full h-[500px] p-6 text-slate-700 bg-transparent focus:outline-none resize-none font-mono text-sm leading-relaxed"
              />
              <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={state.options.addHeadings}
                      onChange={() => handleOptionChange('addHeadings')}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-slate-300"
                    />
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Add Headings</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={state.options.seoFocus}
                      onChange={() => handleOptionChange('seoFocus')}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-slate-300"
                    />
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">SEO Focus</span>
                  </label>
                </div>
                <button
                  onClick={handleProcess}
                  disabled={!state.inputTranscript.trim() || state.isProcessing}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white px-8 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-200"
                >
                  Refine Script
                </button>
              </div>
            </div>
          </section>

          {/* Output Side */}
          <section className="space-y-6">
            <div className="flex items-center justify-between h-14 lg:mt-11">
              <div className="flex items-center gap-2 text-slate-500">
                <i className="fa-solid fa-wand-magic-sparkles text-red-500"></i>
                <span className="text-sm font-semibold uppercase tracking-widest">Polished Result</span>
              </div>
              {state.result && (
                <div className="flex gap-2">
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <i className="fa-regular fa-copy"></i>
                  </button>
                  <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="Download">
                    <i className="fa-solid fa-download"></i>
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[500px] overflow-hidden flex flex-col">
              {!state.result && !state.error ? (
                <div className="flex-grow flex flex-col items-center justify-center p-12 text-center opacity-40">
                  <i className="fa-solid fa-file-lines text-6xl mb-4 text-slate-200"></i>
                  <p className="text-slate-500 font-medium">Your refined script will appear here</p>
                </div>
              ) : state.error ? (
                <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
                  <div className="bg-red-50 p-4 rounded-full mb-4">
                    <i className="fa-solid fa-triangle-exclamation text-red-500 text-2xl"></i>
                  </div>
                  <p className="text-red-600 font-semibold mb-2">Processing Error</p>
                  <p className="text-slate-500 text-sm max-w-xs">{state.error}</p>
                </div>
              ) : (
                <>
                  <div className="flex-grow overflow-y-auto p-8 prose prose-slate max-w-none">
                    <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-sans">
                      {state.result?.cleanedText}
                    </div>
                  </div>
                  <div className="bg-slate-50 border-t border-slate-200 p-4 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Readability</p>
                      <p className="text-sm font-bold text-slate-700">{state.result?.readabilityScore}</p>
                    </div>
                    <div className="text-center border-x border-slate-200">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Words</p>
                      <p className="text-sm font-bold text-slate-700">{state.result?.wordCount}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">SEO Score</p>
                      <p className="text-sm font-bold text-green-600">High</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {state.result?.seoKeywords && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-tags text-red-500"></i>
                  Extracted Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {state.result.seoKeywords.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 ScriptRefine Pro. Powered by Gemini 3 Flash.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
