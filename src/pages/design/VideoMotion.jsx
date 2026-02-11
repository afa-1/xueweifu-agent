import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import { Play, ArrowRight, Check, Sparkles, Loader2, RotateCw } from 'lucide-react';

const VideoMotion = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams();
  const updateSeriesData = useAppStore(state => state.updateSeriesData);
  const currentSeries = useAppStore(state => state.seriesData[parseInt(seriesId)]);
  
  const [loading, setLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [videos, setVideos] = useState([]);
  const [prompt, setPrompt] = useState('Cinematic slow motion of graduates throwing caps, golden hour lighting, 4k');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Mock initial generation
    const timer = setTimeout(() => {
        setVideos([
            { id: 1, url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800", name: "生成视频 1" },
            { id: 2, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800", name: "生成视频 2" }
        ]);
        setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleRegenerate = () => {
    if (!prompt.trim()) return;
    setIsRegenerating(true);
    
    // Simulate API call for new videos
    setTimeout(() => {
        // Just shuffling/updating mock data for demo
        setVideos([
            { id: 3, url: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=800", name: "新生成视频 1" },
            { id: 4, url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800", name: "新生成视频 2" }
        ]);
        setSelectedVideo(null);
        setIsRegenerating(false);
    }, 2500);
  };

  const handleNext = () => {
    // In a real app, we'd save the selected video or both
    updateSeriesData(parseInt(seriesId), { videoPreset: selectedVideo || 'video-1' });
    navigate('../summary');
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-600">正在渲染视频动态效果...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h2 className="text-2xl font-bold text-slate-900">2.5 视频动态预设</h2>
        <button
          onClick={handleNext}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          确认动态效果
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      <div className="flex flex-col gap-6 flex-1 min-h-0 overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video) => (
                    <div 
                        key={video.id}
                        onClick={() => setSelectedVideo(video.id)}
                        className={`group relative bg-black rounded-xl overflow-hidden aspect-video cursor-pointer border-4 transition-all ${
                            selectedVideo === video.id ? 'border-indigo-600 ring-4 ring-indigo-100/50' : 'border-transparent hover:border-indigo-300'
                        }`}
                    >
                        <img src={video.url} alt={video.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                                selectedVideo === video.id ? 'bg-indigo-600 text-white scale-110' : 'bg-white/20 backdrop-blur-sm text-white group-hover:scale-110'
                            }`}>
                                {selectedVideo === video.id ? <Check className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current" />}
                            </div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white font-medium">{video.name}</p>
                            <p className="text-xs text-white/70">预览模式 (低保真)</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Prompt Area - Magic Bar Style */}
        <div className="w-full shrink-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3 px-1">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-indigo-900">AI 视频生成指令</span>
                <span className="text-xs text-indigo-400 ml-auto hidden md:inline-block">* 修改提示词可改变视频的运镜方式、光影氛围和动态节奏</span>
            </div>
            
            <div className="relative group">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-14 min-h-[3.5rem] bg-white rounded-xl border border-indigo-100 shadow-sm pl-4 pr-36 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                    placeholder="描述您想要的视频运镜和动态风格..."
                    disabled={isRegenerating}
                />
                
                <button
                    onClick={handleRegenerate}
                    disabled={isRegenerating || !prompt.trim()}
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

export default VideoMotion;
