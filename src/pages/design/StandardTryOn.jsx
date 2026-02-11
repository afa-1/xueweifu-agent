import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, Camera, Move, RotateCw, ZoomIn, RefreshCcw, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const StandardTryOn = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('front'); // 'front' or 'back'
  
  // Pattern transformation state
  const [transform, setTransform] = useState({
    scale: 1,
    rotate: 0,
    x: 0,
    y: 0
  });

  const containerRef = useRef(null);

  // Mock data for gown images - In a real app these would come from the style selection
  const gownImages = {
    front: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&q=80&w=800",
    back: "https://images.unsplash.com/photo-1623942062534-1925b4105436?auto=format&fit=crop&q=80&w=800" // Placeholder for back view
  };

  // Mock pattern image - In a real app this comes from the previous step
  const patternImage = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400";

  useEffect(() => {
    // Mock rendering time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleReset = () => {
    setTransform({ scale: 1, rotate: 0, x: 0, y: 0 });
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-600">正在进行纹样映射与3D渲染...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">2.3 上身效果验证</h2>
        <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
                onClick={() => setCurrentView('front')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    currentView === 'front' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                }`}
            >
                正面视图
            </button>
            <button
                onClick={() => setCurrentView('back')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    currentView === 'back' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                }`}
            >
                背面视图
            </button>
        </div>
      </div>
      
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Main Preview Area */}
        <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden relative flex items-center justify-center" ref={containerRef}>
           {/* Background Gown Image */}
           <img 
              src={gownImages[currentView]} 
              alt={`Gown ${currentView}`} 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none opacity-90"
            />
            
            {/* Interactive Pattern Overlay */}
            <motion.div
                drag
                dragMomentum={false}
                dragConstraints={containerRef}
                style={{
                    scale: transform.scale,
                    rotate: transform.rotate,
                    x: transform.x,
                    y: transform.y,
                }}
                onDragEnd={(_, info) => {
                    setTransform(prev => ({
                        ...prev,
                        x: prev.x + info.offset.x,
                        y: prev.y + info.offset.y
                    }));
                }}
                className="cursor-move absolute w-48 h-48 mix-blend-multiply opacity-90"
            >
                <div className="w-full h-full border-2 border-indigo-500/50 rounded-lg overflow-hidden relative group">
                    <img 
                        src={patternImage} 
                        alt="Pattern" 
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                    {/* Drag Handle Indicator */}
                    <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Move className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                </div>
            </motion.div>
            
            <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
                支持拖拽移动纹样位置
            </div>
        </div>

        {/* Sidebar Controls */}
        <div className="w-80 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
            <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-slate-100">
                <Layers className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800">纹样调整</h3>
            </div>

            <div className="space-y-6 flex-1">
                {/* Scale Control */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center">
                            <ZoomIn className="w-4 h-4 mr-2 text-slate-400" />
                            缩放大小
                        </label>
                        <span className="text-xs text-slate-500">{Math.round(transform.scale * 100)}%</span>
                    </div>
                    <input
                        type="range"
                        min="0.2"
                        max="2"
                        step="0.1"
                        value={transform.scale}
                        onChange={(e) => setTransform(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>

                {/* Rotate Control */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center">
                            <RotateCw className="w-4 h-4 mr-2 text-slate-400" />
                            旋转角度
                        </label>
                        <span className="text-xs text-slate-500">{transform.rotate}°</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="360"
                        step="15"
                        value={transform.rotate}
                        onChange={(e) => setTransform(prev => ({ ...prev, rotate: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>

                <button
                    onClick={handleReset}
                    className="w-full py-2 flex items-center justify-center text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    重置所有调整
                </button>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100 space-y-3">
                 <button
                    onClick={() => navigate('../photos')}
                    className="w-full py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 flex items-center justify-center transition-all hover:scale-[1.02]"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    确认效果并生成大片
                  </button>
                  
                  <button
                    onClick={() => navigate('../pattern')}
                    className="w-full py-3 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    返回修改纹样
                  </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StandardTryOn;
