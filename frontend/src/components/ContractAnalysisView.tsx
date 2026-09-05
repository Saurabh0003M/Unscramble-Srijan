import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, Scale, FileWarning, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

interface ClauseAnalysisItem {
  clause_id: string;
  title: string;
  category: string;
  plain_english: string;
  risk_level: 'GREEN' | 'YELLOW' | 'RED';
  risk_reason: string;
  key_concern: string;
  suggested_alternative?: string;
  recommended_user_action: string;
}

interface AnalysisResult {
  contract_type: string;
  fairness: { score: number; grade: string; verdict: string };
  executive_summary: string;
  analysis: ClauseAnalysisItem[];
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]); // strip data:...;base64, prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function analyzeWithGemini(file: File): Promise<AnalysisResult> {
  const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });
  const base64Data = await fileToBase64(file);

  const systemPrompt = `You are ClauseClear, an expert AI legal contract analyzer built for the Indian legal system.

Analyze the uploaded contract document thoroughly. Return a single valid JSON object with this exact structure:
{
  "contract_type": "rental|employment|freelance|service|generic",
  "fairness": {
    "score": <number 0-100>,
    "grade": "A|B|C|D|F",
    "verdict": "<one sentence fairness verdict>"
  },
  "executive_summary": "<2-3 paragraph summary of the entire contract in plain English>",
  "analysis": [
    {
      "clause_id": "clause_1",
      "title": "<clause title>",
      "category": "<payment|termination|notice|confidentiality|liability|indemnity|dispute_resolution|deposit|intellectual_property|non_compete|working_hours|leave|renewal|rent|maintenance|penalties|obligations|miscellaneous>",
      "plain_english": "<8th-grade reading level explanation of what this clause means practically>",
      "risk_level": "GREEN|YELLOW|RED",
      "risk_reason": "<why this risk level was assigned>",
      "key_concern": "<the biggest practical hazard for the signing party>",
      "suggested_alternative": "<for RED/YELLOW clauses, provide balanced alternative wording. null for GREEN>",
      "recommended_user_action": "<concrete action the user should take>"
    }
  ]
}

Rules:
- GREEN = standard/balanced/safe clause
- YELLOW = caution/ambiguous/one-sided/needs attention  
- RED = high risk/harmful/punitive/financially dangerous
- Analyze EVERY clause in the document
- Be objective and educational
- Do not invent laws
- Return ONLY valid JSON, no markdown`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{
      role: 'user',
      parts: [
        { text: systemPrompt },
        { inlineData: { mimeType: file.type || 'application/pdf', data: base64Data } }
      ]
    }],
    config: {
      temperature: 0.2,
      responseMimeType: 'application/json',
    }
  });

  const text = response.text || '';
  return JSON.parse(text);
}

export function ContractAnalysisView() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    try {
      setIsAnalyzing(true);
      setError(null);
      const data = await analyzeWithGemini(file);
      setResult(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
          <Scale className="w-8 h-8 text-amber-600" />
          AI Contract Intelligence
        </h1>
        <p className="mt-2 text-slate-600">Deep semantic parsing, risk badges, and fairness evaluation powered by Google Gemini AI.</p>
      </div>

      {!result && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300">
              <Upload className="w-8 h-8 text-slate-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload Contract Document</h3>
          <p className="text-sm text-slate-500 mb-6">Upload a PDF, Word, or text document for instant AI-powered legal analysis.</p>
          
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
                disabled={isAnalyzing}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors w-full disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing with Gemini AI...</>
                ) : (
                  <><SparklesIcon className="w-5 h-5 mr-2" /> Start AI Analysis</>
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
              <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">
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
              const isRed = item.risk_level === 'RED';
              const isYellow = item.risk_level === 'YELLOW';
              
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
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h4>
                    <span className="text-xs text-slate-500 capitalize">{item.category?.replace('_', ' ')}</span>
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
              onClick={() => { setResult(null); setFile(null); }}
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

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);
