import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import { Search, Loader2, Check, ExternalLink, ArrowRight, School, History, X, FileText, Play, Lock, Shirt, PaintBucket, User, Image, Video } from 'lucide-react';

const Initialization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setSchoolInfo = useAppStore(state => state.setSchoolInfo);
  const setAssets = useAppStore(state => state.setAssets);
  const setCreativeConcepts = useAppStore(state => state.setCreativeConcepts);
  const researchHistory = useAppStore(state => state.researchHistory);
  
  const [formData, setFormData] = useState({
    schoolName: '',
    productCount: 1,
    campaignTemplate: 'neo-chinese'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [schools, setSchools] = useState([]); // Mock empty school list
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  useEffect(() => {
    if (location.state?.openHistoryFor && researchHistory.length > 0) {
      const targetSchool = location.state.openHistoryFor;
      const historyItem = researchHistory.find(
        item => item.basicInfo?.name === targetSchool || item.schoolName === targetSchool
      );
      
      if (historyItem) {
        setSelectedHistoryItem(historyItem);
        // Clear state to prevent reopening on refresh
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location.state, researchHistory, navigate, location.pathname]);

  const campaignTemplates = [
    {
      id: 'neo-chinese',
      title: '新中式国风',
      subtitle: 'Neo-Chinese',
      visualStyle: '水墨晕染、青绿配色、宋体字',
      productionPreset: '侧重生成带有传统建筑背景的实拍图，视频运镜缓慢悠长。',
      image: 'https://images.unsplash.com/photo-1591123120675-6f7f4a542b7c?auto=format&fit=crop&q=80&w=800', // Red/Traditional
      caseSchool: '北京大学'
    },
    {
      id: 'classic',
      title: '经典学院风',
      subtitle: 'Classic Academic',
      visualStyle: '深蓝徽章、衬线体、庄重边框',
      productionPreset: '侧重生成图书馆/礼堂背景，视频强调仪式感。',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800', // Purple/Floral hint
      caseSchool: '清华大学'
    },
    {
      id: 'modern',
      title: '现代简约风',
      subtitle: 'Modern Minimalist',
      visualStyle: '大留白、几何色块、无衬线体',
      productionPreset: '侧重生成极简光影背景，视频节奏轻快。',
      image: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&q=80&w=800', // Blue/Modern
      caseSchool: '复旦大学'
    }
  ];

  const handleHistoryClick = (item) => {
    setSelectedHistoryItem(item);
    setShowHistory(false);
  };

  const getTemplateName = (id) => {
    return campaignTemplates.find(t => t.id === id)?.title || id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setSchoolInfo(formData.schoolName, formData.productCount, formData.campaignTemplate);

    // Mock API processing
    setTimeout(() => {
      // Mock Assets based on template selection
      // In a real app, this would use the template to filter/generate assets
      setAssets(
        [
          'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=800', // University Gate/Arch
          'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800', // Academic Building
          'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800'  // Clock Tower/Library
        ],
        ['厚德载物', '自强不息', '百年名校', '创新卓越']
      );

      // Mock Creative Concepts
      setCreativeConcepts([
        { id: 1, title: '薪火相传', slogan: '承前启后，继往开来', value: '融合传统与现代，展现学术传承。', color: 'bg-red-50' },
        { id: 2, title: '青云直上', slogan: '扶摇直上九万里', value: '寓意学子前程似锦，展翅高飞。', color: 'bg-blue-50' },
        { id: 3, title: '翰墨书香', slogan: '腹有诗书气自华', value: '提取图书馆元素，彰显人文气息。', color: 'bg-amber-50' },
        { id: 4, title: '时代先锋', slogan: '敢为人先，追求卓越', value: '现代简约风格，体现创新精神。', color: 'bg-slate-50' },
        { id: 5, title: '紫气东来', slogan: '祥云瑞气，荣耀时刻', value: '尊贵典雅，强调毕业典礼的庄重感。', color: 'bg-purple-50' },
        { id: 6, title: '大地之子', slogan: '脚踏实地，仰望星空', value: '自然色系，回归本真，稳重可靠。', color: 'bg-green-50' },
      ]);

      setIsProcessing(false);
      navigate('/concepts');
    }, 1500); // Increased slightly to show the "locking style" message
  };

  return (
    <div className="max-w-5xl mx-auto relative">
      {/* History Button */}
      <div className="absolute top-0 right-0 z-10">
        <button 
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm"
          >
            <History className="h-4 w-4" />
            <span>历史记录</span>
          </button>
          
          {showHistory && (
            <div className="absolute top-12 right-0 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">历史记录</h3>
                <span className="text-xs text-slate-500">{researchHistory.filter(i => i.proposalData).length} 条记录</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {researchHistory.filter(i => i.proposalData).length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    暂无历史记录
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                  {researchHistory.filter(i => i.proposalData).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryClick(item)}
                      className="w-full text-left p-4 hover:bg-indigo-50 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-slate-800 group-hover:text-indigo-700">{item.basicInfo.name}</span>
                        <span className="text-xs text-slate-400">{new Date(item.proposalData?.completedAt || item.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {getTemplateName(item.proposalData?.campaignTemplate)} · {item.proposalData?.seriesData?.length || 0} 个系列
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* History Detail Modal */}
      {selectedHistoryItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedHistoryItem.basicInfo.name}</h3>
                <p className="text-sm text-slate-500 mt-1">提案生成于 {new Date(selectedHistoryItem.proposalData?.completedAt).toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setSelectedHistoryItem(null)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Visual Style */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                  <div className="w-1 h-4 bg-indigo-600 rounded-full mr-2"></div>
                  视觉风格模版
                </h4>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center space-x-4">
                   <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                      <img 
                        src={campaignTemplates.find(t => t.id === selectedHistoryItem.proposalData?.campaignTemplate)?.image} 
                        alt="Template" 
                        className="w-full h-full object-cover"
                      />
                   </div>
                   <div>
                      <div className="font-bold text-slate-900">{getTemplateName(selectedHistoryItem.proposalData?.campaignTemplate)}</div>
                      <div className="text-sm text-slate-500 mt-1">{campaignTemplates.find(t => t.id === selectedHistoryItem.proposalData?.campaignTemplate)?.visualStyle}</div>
                   </div>
                </div>
              </div>

              {/* Product Series */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                  <div className="w-1 h-4 bg-indigo-600 rounded-full mr-2"></div>
                  生成产品系列
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {selectedHistoryItem.proposalData?.seriesData?.map((series, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
                            {idx + 1}
                          </span>
                          <h5 className="font-bold text-slate-900">{series.concept?.title || `系列 ${idx + 1}`}</h5>
                        </div>
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">生产完成</span>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{series.rationale || series.concept?.value}</p>
                      
                      <div className="border-t border-slate-100 pt-4 space-y-4">
                        <h6 className="text-xs font-bold text-slate-500 uppercase tracking-wider">生成产物详情</h6>
                        
                        {/* Style */}
                        {series.style && (
                          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                             <div className="flex items-center gap-2 mb-2 text-indigo-700 font-medium text-sm">
                               <Shirt className="w-4 h-4" />
                               <span>款式定型</span>
                             </div>
                             <div className="flex gap-3">
                               <div className="w-20 h-20 bg-white rounded border border-slate-200 overflow-hidden flex-shrink-0">
                                 <img src={series.style.image} alt={series.style.name} className="w-full h-full object-cover" />
                               </div>
                               <div className="flex-1">
                                 <div className="font-bold text-slate-800 text-sm">{series.style.name}</div>
                                 <div className="text-xs text-slate-500 mt-1">{series.style.shortName}</div>
                               </div>
                             </div>
                          </div>
                        )}

                        {/* Patterns */}
                        {(series.patternDetails || series.patterns) && (
                          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                             <div className="flex items-center gap-2 mb-2 text-indigo-700 font-medium text-sm">
                               <PaintBucket className="w-4 h-4" />
                               <span>纹样设计</span>
                             </div>
                             <div className="grid grid-cols-3 gap-2">
                               {['placket', 'cuff', 'hood'].map(part => {
                                   const detail = series.patternDetails?.[part];
                                   const name = detail?.name || series.patterns?.[part];
                                   const image = detail?.image;
                                   const labels = { placket: '门襟', cuff: '袖口', hood: '帽兜' };
                                   return (
                                     <div key={part} className="flex flex-col items-center">
                                       <div className="w-full aspect-square bg-white rounded border border-slate-200 overflow-hidden mb-1 relative group">
                                          {image ? (
                                              <img src={image} alt={name} className="w-full h-full object-cover" />
                                          ) : (
                                              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">无图</div>
                                          )}
                                          <div className="absolute inset-0 bg-black/50 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            {labels[part]}
                                          </div>
                                       </div>
                                       <span className="text-[10px] text-slate-600 truncate w-full text-center">{name}</span>
                                     </div>
                                   );
                               })}
                             </div>
                          </div>
                        )}

                        {/* Try On */}
                        {series.tryOnImage && (
                          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                             <div className="flex items-center gap-2 mb-2 text-indigo-700 font-medium text-sm">
                               <User className="w-4 h-4" />
                               <span>上身效果</span>
                             </div>
                             <div className="w-full aspect-[3/4] bg-white rounded border border-slate-200 overflow-hidden">
                                <img src={series.tryOnImage} alt="Try On" className="w-full h-full object-cover" />
                             </div>
                          </div>
                        )}
                        
                        {/* Campaign Photos */}
                        {series.selectedPhotos && series.selectedPhotos.length > 0 && (
                          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                             <div className="flex items-center gap-2 mb-2 text-indigo-700 font-medium text-sm">
                               <Image className="w-4 h-4" />
                               <span>场景实拍 ({series.selectedPhotos.length})</span>
                             </div>
                             <div className="grid grid-cols-4 gap-2">
                                {series.selectedPhotos.slice(0, 4).map((photo, i) => (
                                   <div key={i} className="aspect-[3/2] bg-white rounded border border-slate-200 overflow-hidden">
                                      <img src={photo} alt="Campaign" className="w-full h-full object-cover" />
                                   </div>
                                ))}
                             </div>
                          </div>
                        )}

                        {/* Video */}
                        {series.videoPreset && (
                          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                             <div className="flex items-center gap-2 mb-2 text-indigo-700 font-medium text-sm">
                               <Video className="w-4 h-4" />
                               <span>视频动态</span>
                             </div>
                             <div className="bg-white rounded border border-slate-200 p-2 flex gap-3">
                                <div className="w-24 aspect-video bg-black rounded overflow-hidden flex-shrink-0 relative">
                                   <img 
                                      src={series.videoPreset.url || 'https://via.placeholder.com/150'} 
                                      alt="Video" 
                                      className="w-full h-full object-cover opacity-80"
                                   />
                                   <div className="absolute inset-0 flex items-center justify-center text-white">
                                      <Play className="w-4 h-4 fill-current" />
                                   </div>
                                </div>
                                <div className="flex-1">
                                   <div className="text-sm font-medium text-slate-800">{series.videoPreset.name || '默认视频'}</div>
                                   <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                                      {typeof series.videoPreset === 'object' ? '高质量渲染' : `ID: ${series.videoPreset}`}
                                   </div>
                                </div>
                             </div>
                          </div>
                        )}

                        {/* Rationale */}
                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                           <div className="flex items-center gap-2 mb-2 text-indigo-700 font-medium text-sm">
                             <FileText className="w-4 h-4" />
                             <span>理念阐述</span>
                           </div>
                           <p className="text-xs text-slate-600 leading-relaxed p-2 bg-white rounded border border-slate-200">
                             {series.rationale || series.concept?.value || "暂无理念阐述"}
                           </p>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Delivery */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                  <div className="w-1 h-4 bg-indigo-600 rounded-full mr-2"></div>
                  交付物与访问凭证
                </h4>
                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm">
                          <ExternalLink className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-indigo-900">网页访问链接</div>
                          <a href={selectedHistoryItem.proposalData?.finalVideoUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline text-sm font-bold break-all">
                            {selectedHistoryItem.proposalData?.finalVideoUrl || 'https://degree-gown.example.com/share/v/' + selectedHistoryItem.proposalData?.accessPassword}
                          </a>
                        </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center space-x-3 pt-4 border-t border-indigo-100">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-indigo-900">访问密码</div>
                        <div className="font-mono text-lg font-bold text-indigo-700 tracking-wider">
                          {selectedHistoryItem.proposalData?.accessPassword || '******'}
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
              <button 
                onClick={() => setSelectedHistoryItem(null)}
                className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900">开始您的专属设计</h1>
        <p className="mt-2 text-slate-600">输入学校信息并选择视觉风格，我们将为您自动检索地标与文化元素，生成定制化创意方案。</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-16 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Top Section: School & Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="schoolName" className="block text-sm font-medium text-slate-700 mb-2">
                学校名称 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="schoolName"
                  required
                  className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors appearance-none bg-white text-slate-900"
                  value={formData.schoolName}
                  onChange={(e) => {
                    if (e.target.value === 'GO_TO_COLLECT') {
                      navigate('/school-research');
                    } else {
                      setFormData({...formData, schoolName: e.target.value});
                    }
                  }}
                >
                  <option value="" disabled>请选择学校</option>
                  {researchHistory.map((item, index) => (
                    <option key={index} value={item.basicInfo.name}>{item.basicInfo.name}</option>
                  ))}
                  <option value="GO_TO_COLLECT" className="text-indigo-600 font-medium">去收集院校数据</option>
                </select>
                <School className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                <div className="absolute right-3 top-3.5 pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                设计产品系列数量 (1-3)
              </label>
              <div className="flex space-x-4">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFormData({...formData, productCount: num})}
                    className={`flex-1 py-3 border rounded-lg text-sm font-medium transition-all ${
                      formData.productCount === num
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    {num} 个系列
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Template Selection Section */}
          <div>
            <div className="flex items-end justify-between mb-6">
              <label className="block text-xl font-bold text-slate-900">
                选择提案模版
              </label>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {campaignTemplates.map((template) => (
                <div 
                  key={template.id} 
                  onClick={() => setFormData({...formData, campaignTemplate: template.id})}
                  className={`group relative flex flex-col bg-white rounded-2xl transition-all duration-300 cursor-pointer ${
                    formData.campaignTemplate === template.id
                      ? 'ring-2 ring-indigo-600 shadow-xl scale-[1.01]'
                      : 'border border-slate-200 hover:shadow-lg hover:border-indigo-200'
                  }`}
                >
                  {/* Selection Indicator */}
                  {formData.campaignTemplate === template.id && (
                    <div className="absolute top-4 right-4 z-20 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg transform transition-transform scale-100">
                      <Check className="w-5 h-5" />
                    </div>
                  )}

                  {/* Image Preview */}
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                    <img 
                      src={template.image} 
                      alt={template.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Floating Case Tag */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-white/50">
                      案例：{template.caseSchool}
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1 shadow-black/10 drop-shadow-md">{template.title}</h3>
                      <p className="text-xs font-medium opacity-90 tracking-wider uppercase">{template.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="space-y-4 flex-1">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">视觉调性</span>
                        <div className="flex flex-wrap gap-2">
                          {template.visualStyle.split('、').map((tag, i) => (
                            <span key={i} className="inline-block px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded border border-slate-100">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">风格特点</span>
                        <p className="text-sm text-slate-600 leading-relaxed">{template.productionPreset}</p>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className={`text-sm font-medium transition-colors ${
                        formData.campaignTemplate === template.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'
                      }`}>
                        {formData.campaignTemplate === template.id ? '已选择此模版' : '点击选择'}
                      </span>
                      
                      <a
                        href={`/case-detail/${template.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center space-x-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-50"
                      >
                        <span>查看案例详情</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isProcessing || !formData.schoolName}
              className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
            >
              {isProcessing ? (
                <div className="flex flex-col items-center">
                   <div className="flex items-center mb-1">
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      <span>系统正在处理...</span>
                   </div>
                </div>
              ) : (
                '确认并生成创意方案'
              )}
            </button>
          </div>
        </form>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-100">
            <div className="text-center mb-6">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900">正在构建自动化资产库</h3>
              <p className="text-slate-500 mt-2">基于 {campaignTemplates.find(t => t.id === formData.campaignTemplate)?.title} 模版</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span>锁定“风格因子”与 Prompt 预设</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                </div>
                <span>检索 {formData.schoolName} 标志性建筑高清图...</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                </div>
                <span>提取校训与办学历史关键词...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Initialization;