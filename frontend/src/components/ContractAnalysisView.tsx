import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, ShieldCheck, Scale, FileWarning, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

interface ClauseItem {
  id: string;
  number?: string;
  title: string;
  category: string;
}

interface ClauseAnalysisItem {
  clause_id: string;
  plain_english: string;
  risk_level: 'GREEN' | 'YELLOW' | 'RED';
  risk_reason: string;
  key_concern: string;
  suggested_alternative?: string;
  recommended_user_action: string;
}

interface ContractAnalysisResponse {
  session_id: string;
  filename: string;
  file_type: string;
  contract_type: string;
  fairness: {
    score: number;
    grade: string;
    verdict: string;
  };
  clauses: ClauseItem[];
  analysis: ClauseAnalysisItem[];
  missing_protections: any[];
  executive_summary: string;
}

export function ContractAnalysisView() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ContractAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    try {
      setIsUploading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/contract/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadRes.ok) throw new Error("Failed to upload document");
      const uploadData = await uploadRes.json();
      
      setIsUploading(false);
      setIsAnalyzing(true);
      
      const analyzeRes = await fetch('/api/contract/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: uploadData.session_id })
      });
      
      if (!analyzeRes.ok) throw new Error("Analysis failed");
      const analyzeData = await analyzeRes.json();
      
      setResult(analyzeData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
          <Scale className="w-8 h-8 text-amber-600" />
          AI Contract Intelligence
        </h1>
        <p className="mt-2 text-slate-600">Deep semantic parsing, risk badges, and fairness evaluation.</p>
      </div>

      {!result && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300">
              <Upload className="w-8 h-8 text-slate-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload Contract Document</h3>
          <p className="text-sm text-slate-500 mb-6">Upload a PDF or Word document for instant legal analysis.</p>
          
          <input 
            type="file" 
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden" 
            id="file-upload" 
          />
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors border border-slate-300 mb-4"
          >
            {file ? file.name : 'Select Document'}
          </label>
          
          {file && (
            <div className="mt-4">
              <button 
                onClick={handleProcess}
                disabled={isUploading || isAnalyzing}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors w-full disabled:opacity-50"
              >
                {(isUploading || isAnalyzing) ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> {isUploading ? 'Uploading...' : 'Analyzing...'}</>
                ) : (
                  <><Sparkles className="w-5 h-5 mr-2" /> Start Analysis</>
                )}
              </button>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm flex items-start gap-2">
              <FileWarning className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* Executive Summary & Fairness */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Executive Summary
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                {result.executive_summary}
              </p>
            </div>
            
            <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 text-white flex flex-col items-center justify-center">
              <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">Fairness Score</h3>
              <div className="text-6xl font-bold font-serif mb-2">{result.fairness.score}</div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                result.fairness.score >= 80 ? 'bg-green-500/20 text-green-300' :
                result.fairness.score >= 60 ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-300'
              }`}>
                Grade: {result.fairness.grade}
              </div>
              <p className="text-center text-sm text-slate-300">{result.fairness.verdict}</p>
            </div>
          </div>

          {/* Clause Analysis */}
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Clause-by-Clause Risk Analysis</h3>
          <div className="grid grid-cols-1 gap-4">
            {result.analysis.map((item, idx) => {
              const clause = result.clauses.find(c => c.id === item.clause_id);
              
              const isRed = item.risk_level === 'RED';
              const isYellow = item.risk_level === 'YELLOW';
              const isGreen = item.risk_level === 'GREEN';
              
              return (
                <div key={idx} className={`bg-white rounded-xl shadow-sm border p-6 flex flex-col md:flex-row gap-6 ${
                  isRed ? 'border-red-200' : isYellow ? 'border-amber-200' : 'border-green-200'
                }`}>
                  <div className="md:w-1/4 shrink-0 border-r border-slate-100 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                      {isRed ? <AlertTriangle className="w-5 h-5 text-red-500" /> :
                       isYellow ? <AlertTriangle className="w-5 h-5 text-amber-500" /> :
                       <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                        isRed ? 'bg-red-50 text-red-700' :
                        isYellow ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                      }`}>
                        {item.risk_level}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">{clause?.title || item.clause_id}</h4>
                    <span className="text-xs text-slate-500 capitalize">{clause?.category.replace('_', ' ')}</span>
                  </div>
                  
                  <div className="md:w-3/4">
                    <div className="mb-4">
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Plain English</h5>
                      <p className="text-sm text-slate-800">{item.plain_english}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Risk Reason</h5>
                      <p className="text-sm text-slate-700">{item.risk_reason}</p>
                    </div>
                    
                    {item.suggested_alternative && (
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-4">
                        <h5 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <ArrowRight className="w-3 h-3" /> Suggested Alternative
                        </h5>
                        <p className="text-sm text-slate-700 italic">"{item.suggested_alternative}"</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => setResult(null)}
              className="text-slate-500 hover:text-slate-800 text-sm font-medium underline"
            >
              Analyze Another Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const Sparkles = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);
