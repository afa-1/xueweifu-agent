import React from 'react';
import { useParams, useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import { Shirt, PaintBucket, User, Image as ImageIcon, Video, FileText } from 'lucide-react';

import StyleSelection from './design/StyleSelection';
import PatternDesign from './design/PatternDesign';
import StandardTryOn from './design/StandardTryOn';
import CampaignPhotoshoot from './design/CampaignPhotoshoot';
import VideoMotion from './design/VideoMotion';
import DesignSummary from './design/DesignSummary';

const DesignLoop = () => {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const seriesData = useAppStore(state => state.seriesData);
  const currentSeries = seriesData[parseInt(seriesId)];

  if (!currentSeries) {
    return <Navigate to="/" replace />;
  }

  const steps = [
    { id: 'style', label: '款式定型', icon: Shirt, path: 'style' },
    { id: 'pattern', label: '纹样设计', icon: PaintBucket, path: 'pattern' },
    { id: 'tryon', label: '上身效果', icon: User, path: 'tryon' },
    { id: 'photos', label: '场景实拍', icon: ImageIcon, path: 'photos' },
    { id: 'video', label: '视频动态', icon: Video, path: 'video' },
    { id: 'summary', label: '理念阐述', icon: FileText, path: 'summary' },
  ];

  const currentPath = location.pathname.split('/').pop();
  const currentStepIndex = steps.findIndex(s => s.path === currentPath);

  return (
    <div className="flex gap-8">
      {/* Sidebar Navigation */}
      <div className="w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">系列 {parseInt(seriesId) + 1} 配置</h2>
            <p className="text-sm text-slate-500 mt-1">主题：{currentSeries.concept.title}</p>
          </div>
          
          <nav className="space-y-1">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentPath === step.path;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div
                  key={step.id}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : isCompleted
                      ? 'text-slate-900'
                      : 'text-slate-400'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${
                    isActive ? 'text-indigo-600' : isCompleted ? 'text-green-500' : 'text-slate-400'
                  }`} />
                  {step.label}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route path="style" element={<StyleSelection />} />
          <Route path="pattern" element={<PatternDesign />} />
          <Route path="tryon" element={<StandardTryOn />} />
          <Route path="photos" element={<CampaignPhotoshoot />} />
          <Route path="video" element={<VideoMotion />} />
          <Route path="summary" element={<DesignSummary />} />
          <Route path="*" element={<Navigate to="style" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default DesignLoop;
