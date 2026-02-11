import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import { Check, ArrowRight } from 'lucide-react';

const StyleSelection = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams();
  const updateSeriesData = useAppStore(state => state.updateSeriesData);
  const seriesData = useAppStore(state => state.seriesData);
  const currentSeries = seriesData[parseInt(seriesId)];

  const [selectedStyle, setSelectedStyle] = useState(currentSeries?.style || null);

  // Sync state if store updates (e.g. going back)
  useEffect(() => {
    if (currentSeries?.style) {
      setSelectedStyle(currentSeries.style);
    }
  }, [currentSeries?.style]);

  const styles = [
    { id: 'hood', name: '半标品帽兜款式1——帽兜款', shortName: '帽兜款', image: 'https://images.pexels.com/photos/7942547/pexels-photo-7942547.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'cape', name: '半标品帽兜款式2——披肩款', shortName: '披肩款', image: 'https://images.pexels.com/photos/7942612/pexels-photo-7942612.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ];

  const handleSelect = (style) => {
    setSelectedStyle(style);
  };

  const handleConfirm = () => {
    if (selectedStyle) {
      updateSeriesData(parseInt(seriesId), { style: selectedStyle });
      navigate(`../pattern`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">2.1 款式定型</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {styles.map((style) => (
            <div
              key={style.id}
              onClick={() => handleSelect(style)}
              className={`group relative cursor-pointer rounded-xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                selectedStyle?.id === style.id 
                  ? 'border-indigo-600 ring-4 ring-indigo-50 shadow-lg scale-[1.02]' 
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              {/* Selection Indicator */}
              {selectedStyle?.id === style.id && (
                <div className="absolute top-4 right-4 z-10 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg animate-in fade-in zoom-in duration-200">
                  <Check className="w-5 h-5" />
                </div>
              )}

              <div className="aspect-[3/4] bg-slate-50 relative p-6 flex items-center justify-center">
                <img 
                  src={style.image} 
                  alt={style.name} 
                  className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              
              <div className="p-5 bg-white border-t border-slate-100">
                <h3 className="font-bold text-lg text-slate-900 mb-1">{style.name}</h3>
                <p className={`text-sm font-medium transition-colors ${
                  selectedStyle?.id === style.id ? 'text-indigo-600' : 'text-slate-500'
                }`}>
                  {style.shortName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-10 pt-6 border-t border-slate-200 flex justify-end">
        <button
          onClick={handleConfirm}
          disabled={!selectedStyle}
          className={`
            flex items-center space-x-2 px-8 py-3 rounded-xl font-bold text-lg transition-all transform
            ${selectedStyle 
              ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-xl' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          <span>确认款式并继续</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StyleSelection;
