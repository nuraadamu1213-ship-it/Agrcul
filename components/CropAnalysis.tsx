
import React, { useState, useRef } from 'react';
import { analyzeCropImage } from '../services/gemini';
import { CropAnalysisResult } from '../types';

const CropAnalysis: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<CropAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const base64Data = image.split(',')[1];
      const data = await analyzeCropImage(base64Data);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Crop Health Scanner</h3>
          <p className="text-gray-500">Upload a photo to detect diseases and get treatment advice.</p>
        </div>
        {image && (
          <button onClick={reset} className="text-red-500 hover:text-red-700 text-sm font-semibold">
            Clear
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div 
            onClick={() => !image && fileInputRef.current?.click()}
            className={`relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
              image ? 'border-transparent' : 'border-gray-300 hover:border-green-400 bg-gray-50'
            }`}
          >
            {image ? (
              <img src={image} alt="Crop preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="text-4xl mb-2">📸</div>
                <p className="text-gray-500 font-medium">Click to upload photo</p>
                <p className="text-xs text-gray-400">Supports JPG, PNG</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          
          <button
            onClick={startAnalysis}
            disabled={!image || isAnalyzing}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl disabled:bg-gray-300 shadow-lg transition-all"
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Field Data...
              </span>
            ) : 'Run AI Diagnosis'}
          </button>
        </div>

        <div className="flex flex-col">
          {result ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-full text-white text-sm font-bold ${
                  result.status.toLowerCase().includes('healthy') ? 'bg-green-500' : 'bg-amber-500'
                }`}>
                  {result.status}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">AI Diagnosis</h4>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-xl text-sm leading-relaxed border border-gray-100">
                  {result.diagnosis}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Recommended Actions</h4>
                <div className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-600">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
              <div className="text-5xl mb-4">🧬</div>
              <h4 className="text-gray-900 font-bold mb-2">No Results Yet</h4>
              <p className="text-sm text-gray-500 max-w-xs">
                Upload a crop photo and click "Run AI Diagnosis" to see health analysis and expert tips.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropAnalysis;
