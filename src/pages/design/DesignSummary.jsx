import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import { Edit2, CheckCircle } from 'lucide-react';

const DesignSummary = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams();
  const seriesIndex = parseInt(seriesId);
  const updateSeriesData = useAppStore(state => state.updateSeriesData);
  const seriesData = useAppStore(state => state.seriesData);
  const currentSeries = seriesData[seriesIndex];
  const productCount = useAppStore(state => state.productCount);

  const [rationale, setRationale] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentSeries.rationale) {
      setRationale(currentSeries.rationale);
    } else {
      // Mock rationale generation based on concept
      const generatedText = `本系列以“${currentSeries.concept.title}”为核心主题，选用经典的双襟款式，呼应学校严谨的治学风范。纹样设计灵感源自${currentSeries.patterns.hood || '校园文化'}，寓意求知之窗。整体设计既保留了传统礼仪感，又兼具现代审美，完美诠释了“${currentSeries.concept.slogan}”的精神内涵。`;
      setRationale(generatedText);
    }
  }, [currentSeries]);

  const handleConfirm = () => {
    updateSeriesData(seriesIndex, { 
      rationale, 
      status: 'ready_to_render' 
    });

    if (seriesIndex + 1 < productCount) {
      // Go to next series
      navigate(`/design/${seriesIndex + 1}/style`);
    } else {
      // Finish design loop
      navigate('/production');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">2.6 设计理念阐述与系列小结</h2>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">设计阐述 (Design Rationale)</h3>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            {isEditing ? '完成编辑' : '润色/修改'}
          </button>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              className="w-full h-40 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          ) : (
            <p className="text-slate-700 leading-relaxed text-lg">
              {rationale}
            </p>
          )}
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8">
        <h3 className="font-bold text-slate-800 mb-4">系列配置清单</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex justify-between">
            <span>款式模型：</span>
            <span className="font-medium text-slate-900">{currentSeries.style?.name || '未选择'}</span>
          </li>
          <li className="flex justify-between">
            <span>纹样方案：</span>
            <span className="font-medium text-slate-900">
              {currentSeries.patterns?.placket} / {currentSeries.patterns?.cuff}
            </span>
          </li>
          <li className="flex justify-between">
            <span>选中照片：</span>
            <span className="font-medium text-slate-900">{currentSeries.selectedPhotos?.length || 0} 张</span>
          </li>
          <li className="flex justify-between">
            <span>视频动态：</span>
            <span className="font-medium text-slate-900">{currentSeries.videoPreset}</span>
          </li>
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleConfirm}
          className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-sm flex items-center"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          {seriesIndex + 1 < productCount ? '确认本系列，继续下一个' : '确认所有系列，进入生产'}
        </button>
      </div>
    </div>
  );
};

export default DesignSummary;
