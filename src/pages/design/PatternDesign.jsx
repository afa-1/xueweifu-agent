import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import { RotateCw, ArrowRight, Sparkles, Send, Bot, User, Loader2, Image as ImageIcon, X } from 'lucide-react';

const PatternDesign = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams();
  const updateSeriesData = useAppStore(state => state.updateSeriesData);
  const currentSeries = useAppStore(state => state.seriesData[parseInt(seriesId)]);
  const fileInputRef = useRef(null);

  const [patterns, setPatterns] = useState(currentSeries.patterns || { placket: null, cuff: null, hood: null });
  const [activeTab, setActiveTab] = useState('placket');
  
  // Pre-defined prompts for each section
  const defaultPrompts = {
    placket: 'Traditional auspicious cloud patterns, minimalist vector art style, indigo and white color scheme, symmetrical layout, cultural heritage elements.',
    cuff: 'Geometric water wave repetition, clean lines, academic aesthetic, continuous border pattern, subtle texture detail.',
    hood: 'Abstract starry night sky interpretation, gradient background, constellation elements, modern artistic style, soft illumination effect.'
  };

  const [currentPrompt, setCurrentPrompt] = useState(defaultPrompts['placket']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Update prompt when tab changes
  useEffect(() => {
    setCurrentPrompt(defaultPrompts[activeTab]);
    setUploadedImage(null); // Clear uploaded image on tab change
  }, [activeTab]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const options = {
    placket: ['云纹', '回纹', '校徽纹', '几何纹'],
    cuff: ['水波纹', '山形纹', '素色', '条纹'],
    hood: ['星空图', '校训字', '花卉纹', '抽象纹']
  };

  const patternImages = {
    '云纹': 'https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?auto=format&fit=crop&q=80&w=200',
    '回纹': 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=200',
    '校徽纹': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=200',
    '几何纹': 'https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&q=80&w=200',
    '水波纹': 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&q=80&w=200',
    '山形纹': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=200',
    '素色': 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200',
    '条纹': 'https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?auto=format&fit=crop&q=80&w=200',
    '星空图': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=200',
    '校训字': 'https://images.unsplash.com/photo-1555445054-7491f6e9e10e?auto=format&fit=crop&q=80&w=200',
    '花卉纹': 'https://images.unsplash.com/photo-1507608869274-2c33ee13db69?auto=format&fit=crop&q=80&w=200',
    '抽象纹': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200',
  };

  const handleSelect = (type, value) => {
    setPatterns(prev => ({ ...prev, [type]: value }));
  };

  const handleNext = () => {
    updateSeriesData(parseInt(seriesId), { patterns });
    navigate('../tryon');
  };
  
  const handleRegenerate = () => {
    if (!currentPrompt.trim() && !uploadedImage) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would fetch new patterns based on currentPrompt
    }, 2000);
  };

  const tabs = [
    { id: 'placket', label: '区域A：门襟' },
    { id: 'cuff', label: '区域B：袖口' },
    { id: 'hood', label: '区域C：帽兜' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <h2 className="text-2xl font-bold text-slate-900">2.2 纹样设计</h2>
        <button
          onClick={handleNext}
          disabled={!patterns.placket || !patterns.cuff || !patterns.hood}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          生成上身效果
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-shrink-0 mb-6">
        <div className="flex border-b border-slate-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {options[activeTab].map((opt, i) => (
              <div
                key={i}
                onClick={() => handleSelect(activeTab, opt)}
                className={`cursor-pointer rounded-lg p-4 border-2 text-center transition-all ${
                  patterns[activeTab] === opt
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="w-full aspect-square bg-slate-100 rounded mb-3 flex items-center justify-center text-slate-400 overflow-hidden">
                  <img 
                    src={patternImages[opt] || 'https://via.placeholder.com/200?text=Pattern'} 
                    alt={opt} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <span className="font-medium text-slate-700">{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Prompt Generation Interface */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-auto">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">纹样生成提示词</h3>
            <p className="text-xs text-slate-500">Pattern Generation Prompt</p>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
            className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-none text-slate-700 pr-32"
            placeholder="输入提示词以生成新的纹样设计..."
            disabled={isGenerating}
          />

          {/* Uploaded Image Preview */}
          {uploadedImage && (
            <div className="absolute bottom-16 left-4 z-10">
              <div className="relative group">
                <img 
                  src={uploadedImage} 
                  alt="Reference" 
                  className="h-12 w-12 rounded-lg object-cover border-2 border-indigo-200 shadow-sm" 
                />
                <button 
                  onClick={removeUploadedImage}
                  className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md border border-slate-200 text-slate-500 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            <button
              onClick={triggerFileInput}
              disabled={isGenerating}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="上传参考图"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleRegenerate}
              disabled={isGenerating || (!currentPrompt.trim() && !uploadedImage)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm shadow-sm"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <RotateCw className="w-4 h-4 mr-2" />
                  重新生成
                </>
              )}
            </button>
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          * 修改提示词或上传参考图并点击“重新生成”可尝试不同的设计风格。当前提示词展示了该区域纹样的生成逻辑。
        </p>
      </div>
    </div>
  );
};

export default PatternDesign;
