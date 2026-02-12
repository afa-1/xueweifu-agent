import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import { Loader2, Check, ArrowRight, Sparkles, RotateCw, Image as ImageIcon, X } from 'lucide-react';

const CampaignPhotoshoot = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams();
  const updateSeriesData = useAppStore(state => state.updateSeriesData);
  const currentSeries = useAppStore(state => state.seriesData[parseInt(seriesId)]);
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState(currentSeries.selectedPhotos || []);
  const [prompt, setPrompt] = useState('Happy graduates celebrating on campus lawn, high quality, photorealistic, 4k');
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    // Mock generation
    const timer = setTimeout(() => {
      setPhotos([
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1535982330050-f1c2fb970583?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=600',
      ]);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  const handleRegenerate = () => {
    if (!prompt.trim() && !uploadedImage) return;
    setIsRegenerating(true);
    
    // Simulate API call for new photos
    setTimeout(() => {
        // Just shuffling existing photos for demo purposes
        const shuffled = [...photos].sort(() => 0.5 - Math.random());
        setPhotos(shuffled);
        setIsRegenerating(false);
    }, 2000);
  };

  const togglePhoto = (photo) => {
    if (selectedPhotos.includes(photo)) {
      setSelectedPhotos(selectedPhotos.filter(p => p !== photo));
    } else {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  const handleNext = () => {
    updateSeriesData(parseInt(seriesId), { selectedPhotos });
    navigate('../video');
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-600">正在融合学校地标背景与高精度渲染...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">2.4 场景实拍图生成</h2>
          <p className="text-sm text-slate-500 mt-1">请选择满意的照片用于图册排版（已选 {selectedPhotos.length} 张）</p>
        </div>
        <button
          onClick={handleNext}
          disabled={selectedPhotos.length === 0}
          className="flex items-center px-4 py-2 bg-indigo-600 text白色 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          确认并生成视频
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      <div className="flex flex-col gap-6 flex-1 min-h-0 overflow-hidden">
         {/* Photo Grid */}
         <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                <div
                    key={index}
                    onClick={() => togglePhoto(photo)}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all aspect-[3/2] ${
                    selectedPhotos.includes(photo) ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-transparent hover:border-indigo-300'
                    }`}
                >
                    <img src={photo} alt={`Generated ${index}`} className="w-full h-full object-cover" />
                    {selectedPhotos.includes(photo) && (
                    <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1 rounded-full shadow-md">
                        <Check className="w-3 h-3" />
                    </div>
                    )}
                    <div className={`absolute inset-0 bg-black/10 transition-opacity ${selectedPhotos.includes(photo) ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'}`} />
                </div>
                ))}
            </div>
         </div>

         {/* Prompt Area - Magic Bar Style */}
         <div className="w-full shrink-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3 px-1">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-indigo-900">AI 场景生成指令</span>
                <span className="text-xs text-indigo-400 ml-auto hidden md:inline-block">* 修改提示词可改变生成图片的场景、光影和人物动态。支持中英文输入。</span>
            </div>
            
            <div className="relative group">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-14 min-h-[3.5rem] bg白色 rounded-xl border border-indigo-100 shadow-sm pl-12 pr-36 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                    placeholder="描述您想要的场景风格，例如：'阳光明媚的校园草坪，学生们欢笑着抛起学士帽'..."
                    disabled={isRegenerating}
                />
                
                {/* Image Upload Button (Inside Left) */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <button
                      onClick={triggerFileInput}
                      disabled={isRegenerating}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="上传参考图"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Uploaded Image Preview */}
                {uploadedImage && (
                    <div className="absolute bottom-full left-0 mb-2 z-10">
                        <div className="relative group">
                            <img 
                            src={uploadedImage} 
                            alt="Reference" 
                            className="h-16 w-16 rounded-lg object-cover border-2 border-indigo-200 shadow-lg bg-white" 
                            />
                            <button 
                            onClick={removeUploadedImage}
                            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-slate-200 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                            >
                            <X className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                )}
                
                <button
                    onClick={handleRegenerate}
                    disabled={isRegenerating || (!prompt.trim() && !uploadedImage)}
                    className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-95"
                >
                    {isRegenerating ? (
                        <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>生成中...</span>
                        </>
                    ) : (
                        <>
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>重新生成</span>
                        </>
                    )}
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CampaignPhotoshoot;
