import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import { FileText, Globe, Download, Share2, Play, CheckCircle } from 'lucide-react';

const Production = () => {
  const navigate = useNavigate();
  const deliveryFormat = useAppStore(state => state.deliveryFormat);
  const setDeliveryFormat = useAppStore(state => state.setDeliveryFormat);
  const isRendering = useAppStore(state => state.isRendering);
  const renderingProgress = useAppStore(state => state.renderingProgress);
  const startRendering = useAppStore(state => state.startRendering);
  const updateRenderingProgress = useAppStore(state => state.updateRenderingProgress);
  const finishRendering = useAppStore(state => state.finishRendering);
  const saveProposalToHistory = useAppStore(state => state.saveProposalToHistory);
  const seriesData = useAppStore(state => state.seriesData);
  const schoolName = useAppStore(state => state.schoolName);

  useEffect(() => {
    if (isRendering) {
      const interval = setInterval(() => {
        updateRenderingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            const videoUrl = 'https://example.com/video.mp4';
            finishRendering(videoUrl);
            saveProposalToHistory(videoUrl); // Save proposal to history
            // Navigate to Initialization page and open history
            navigate('/', { state: { openHistoryFor: schoolName } });
            return 100;
          }
          return prev + 5; // Faster progress
        });
      }, 50); // Faster interval
      return () => clearInterval(interval);
    }
  }, [isRendering, updateRenderingProgress, finishRendering, saveProposalToHistory, navigate, schoolName]);

  const handleStart = () => {
    startRendering();
  };

  if (isRendering) {
    return (
      <div className="max-w-2xl mx-auto text-center pt-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">正在批量渲染与排版...</h2>
        
        <div className="mb-2 flex justify-between text-sm font-medium text-slate-600">
          <span>Processing {seriesData.length} Series</span>
          <span>{Math.round(renderingProgress)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden mb-8">
          <div 
            className="bg-indigo-600 h-full rounded-full transition-all duration-200 ease-out"
            style={{ width: `${renderingProgress}%` }}
          />
        </div>

        <div className="space-y-4 text-left max-w-md mx-auto">
          <div className="flex items-center text-slate-500 text-sm">
            <div className={`w-2 h-2 rounded-full mr-3 ${renderingProgress > 10 ? 'bg-green-500' : 'bg-slate-300'}`} />
            启动 GPU 渲染实例...
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <div className={`w-2 h-2 rounded-full mr-3 ${renderingProgress > 30 ? 'bg-green-500' : 'bg-slate-300'}`} />
            生成高清实拍合成图...
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <div className={`w-2 h-2 rounded-full mr-3 ${renderingProgress > 60 ? 'bg-green-500' : 'bg-slate-300'}`} />
            渲染动态视频素材...
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <div className={`w-2 h-2 rounded-full mr-3 ${renderingProgress > 80 ? 'bg-green-500' : 'bg-slate-300'}`} />
            排版生成演示文档...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">3.1 交付物格式配置</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { id: 'ppt', label: '演示文稿 (PPT)', icon: FileText },
          { id: 'web', label: '在线网页', icon: Globe },
          { id: 'both', label: 'PPT + 网页', icon: Share2 },
        ].map((format) => {
          const Icon = format.icon;
          return (
            <div
              key={format.id}
              onClick={() => setDeliveryFormat(format.id)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all text-center ${
                deliveryFormat === format.id
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 hover:border-indigo-300 bg-white'
              }`}
            >
              <div className="flex justify-center mb-4">
                <Icon className="w-8 h-8" />
              </div>
              <span className="font-bold">{format.label}</span>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
        <h3 className="font-bold text-slate-900 mb-4">即将生成的资产清单</h3>
        <ul className="space-y-3">
          {seriesData.map((series, idx) => (
            <li key={idx} className="flex items-start">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold mr-3 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <span className="font-medium text-slate-900">系列 {idx + 1}: {series.concept?.title}</span>
                <p className="text-sm text-slate-500">
                  {series.selectedPhotos?.length} 张实拍图 + {series.videoPreset === 'cinematic' ? '电影级' : '动态'}视频 + 专属文案
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleStart}
          className="px-10 py-4 bg-indigo-600 text-white font-bold text-lg rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          开始批量生产
        </button>
      </div>
    </div>
  );
};

export default Production;
