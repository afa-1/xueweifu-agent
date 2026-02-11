import React, { useState } from 'react';
import { BookOpen, Search, Loader2, Save, Upload, Trash2, Plus, RefreshCw, PenTool, Image as ImageIcon, MapPin, Calendar, Globe, Award, Leaf, MessageSquare, History, Clock } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const SchoolResearch = () => {
  const { researchData, setResearchData, updateResearchData, researchHistory, addToHistory } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Mock scraping function
  const handleSearch = () => {
    if (!searchTerm) return;
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResearchData({
        // 1. 院校基本面
        basicInfo: { 
          name: searchTerm, 
          abbreviation: searchTerm.includes('大学') ? searchTerm.replace('大学', '') : searchTerm, 
          foundYear: '1898', 
          location: '中国·北京' 
        },
        // 2. 学校文化灵魂
        cultureSoul: { 
          motto: '博学笃行，厚德载物', 
          lyrics: '巍巍学府，气象万千...', 
          vision: '建设世界一流大学', 
          spirit: '爱国、进步、民主、科学' 
        },
        // 3. 符号语义块
        symbolSemantics: { 
          badgeDesc: '圆形构图，中间为篆书“北大”二字...', 
          flagDesc: '红底白字，象征革命传统...', 
          colorDesc: '北大红（#820010）与校色蓝' 
        },
        // 4. 历史时间轴
        history: [
          { year: '1902', event: '建校，初名京师大学堂仕学馆' },
          { year: '1952', event: '院系调整，成为多科性工业大学' },
          { year: '2000', event: '合并多所院校，组建新的综合性大学' }
        ],
        alumni: '屠呦呦、邓稼先、于敏',
        // 5. 核心地标语义
        landmarkSemantics: '博雅塔、未名湖、西校门、图书馆', 
        // 6. 生态环境语义
        ecoSemantics: '银杏、玉兰、垂柳',
        // 7. 荣誉与学科
        achievements: { 
          strongSubjects: '哲学、中文、物理、化学', 
          keyResults: '国家最高科学技术奖、诺贝尔奖（校友）' 
        },
        // 8. 营销话术
        marketing: { 
          principalMessage: '希望同学们志存高远，脚踏实地...', 
          catchphrases: '眼底未名水，胸中黄河月', 
          nicknames: '圆明园职业技术学院' 
        },
        
        visuals: {
          landmarks: [
            'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400'
          ],
          vi: [
            'https://via.placeholder.com/300x200?text=Logo+Guide'
          ]
        }
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleSave = () => {
    if (researchData.basicInfo?.name) {
      addToHistory(researchData);
      alert('院校数据已保存至资产库！');
    }
  };

  const handleLoadHistory = (data) => {
    setResearchData(data);
    setShowHistory(false);
    setSearchTerm(data.basicInfo.name);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
          <p className="text-slate-600">正在全网采集院校数据...</p>
          <p className="text-sm text-slate-400 mt-2">正在检索：百度百科、官网新闻、官方微博...</p>
        </div>
      );
    }

    if (!researchData.basicInfo?.name) {
      return (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">请输入学校名称开始调研</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Text Collection Area (8 Sections) */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="flex items-center space-x-2 mb-2">
             <PenTool className="h-5 w-5 text-indigo-600" />
             <h2 className="text-xl font-bold text-slate-900">文字采集区</h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-10 divide-y divide-slate-100">
            {/* 1. 院校基本面 */}
            <div className="pt-2 first:pt-0">
              <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-1 h-4 bg-indigo-500 rounded-full mr-2"></span>
                1. 院校基本面
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">校名全称</label>
                  <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                    value={researchData.basicInfo.name} onChange={(e) => updateResearchData('basicInfo', { name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">简称</label>
                  <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                    value={researchData.basicInfo.abbreviation} onChange={(e) => updateResearchData('basicInfo', { abbreviation: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">创办年份</label>
                  <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                    value={researchData.basicInfo.foundYear} onChange={(e) => updateResearchData('basicInfo', { foundYear: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">地理位置</label>
                  <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                    value={researchData.basicInfo.location} onChange={(e) => updateResearchData('basicInfo', { location: e.target.value })} />
                </div>
              </div>
            </div>

            {/* 2. 学校文化灵魂 */}
            <div className="pt-8">
              <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-1 h-4 bg-indigo-500 rounded-full mr-2"></span>
                2. 学校文化灵魂
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">校训</label>
                  <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                    value={researchData.cultureSoul.motto} onChange={(e) => updateResearchData('cultureSoul', { motto: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">校歌歌词</label>
                  <textarea className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none h-24 transition-all" 
                    value={researchData.cultureSoul.lyrics} onChange={(e) => updateResearchData('cultureSoul', { lyrics: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1.5">办学愿景</label>
                        <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                            value={researchData.cultureSoul.vision} onChange={(e) => updateResearchData('cultureSoul', { vision: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1.5">核心精神</label>
                        <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                            value={researchData.cultureSoul.spirit} onChange={(e) => updateResearchData('cultureSoul', { spirit: e.target.value })} />
                    </div>
                </div>
              </div>
            </div>

            {/* 3. 符号语义块 */}
            <div className="pt-8">
              <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-1 h-4 bg-indigo-500 rounded-full mr-2"></span>
                3. 符号语义块
              </h3>
              <div className="space-y-6">
                 <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">校徽官方释义</label>
                  <textarea className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none h-24 transition-all" 
                    value={researchData.symbolSemantics.badgeDesc} onChange={(e) => updateResearchData('symbolSemantics', { badgeDesc: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1.5">校旗说明</label>
                        <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                            value={researchData.symbolSemantics.flagDesc} onChange={(e) => updateResearchData('symbolSemantics', { flagDesc: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1.5">标准校色文字描述</label>
                        <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                            value={researchData.symbolSemantics.colorDesc} onChange={(e) => updateResearchData('symbolSemantics', { colorDesc: e.target.value })} />
                    </div>
                </div>
              </div>
            </div>

            {/* 4. 历史时间轴 */}
            <div className="pt-8">
              <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-1 h-4 bg-indigo-500 rounded-full mr-2"></span>
                4. 历史时间轴
              </h3>
              <div className="space-y-6">
                <div className="space-y-4">
                    {researchData.history.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 text-sm">
                            <span className="font-bold text-indigo-600 w-16 pt-2 text-right">{item.year}</span>
                            <div className="flex-1 relative">
                                <span className="absolute left-[-23px] top-2.5 w-2 h-2 rounded-full bg-indigo-200 border border-indigo-500"></span>
                                <input 
                                    type="text" 
                                    className="w-full border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors text-slate-700"
                                    value={item.event}
                                    onChange={(e) => {
                                        const newHistory = [...researchData.history];
                                        newHistory[index].event = e.target.value;
                                        setResearchData({ ...researchData, history: newHistory });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                     <button className="flex items-center text-xs text-indigo-600 font-medium hover:text-indigo-700 mt-2 ml-20">
                        <Plus className="h-3 w-3 mr-1" />
                        添加历史节点
                    </button>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">代表性校友</label>
                  <textarea className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none h-20 transition-all" 
                    placeholder="请输入代表性校友姓名..."
                    value={researchData.alumni || ''} onChange={(e) => updateResearchData('alumni', e.target.value)} />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-8">
                {/* 5. 核心地标语义 */}
                <div>
                    <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center">
                        <span className="w-1 h-4 bg-indigo-500 rounded-full mr-2"></span>
                        5. 核心地标语义
                    </h3>
                    <textarea className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none h-32 transition-all" 
                        placeholder="标志性建筑名称、非遗石刻、著名雕塑..."
                        value={researchData.landmarkSemantics} onChange={(e) => updateResearchData('landmarkSemantics', e.target.value)}
                    />
                </div>

                {/* 6. 生态环境语义 */}
                <div>
                    <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center">
                        <span className="w-1 h-4 bg-indigo-500 rounded-full mr-2"></span>
                        6. 生态环境语义
                    </h3>
                    <textarea className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none h-32 transition-all" 
                        placeholder="校园代表性植被（校花/校树）、湖泊山峦名称..."
                        value={researchData.ecoSemantics} onChange={(e) => updateResearchData('ecoSemantics', e.target.value)}
                    />
                </div>
            </div>

            {/* 7. 荣誉与学科 */}
            <div className="pt-8">
              <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-1 h-4 bg-indigo-500 rounded-full mr-2"></span>
                7. 荣誉与学科
              </h3>
              <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">强势学科</label>
                    <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                        value={researchData.achievements.strongSubjects} onChange={(e) => updateResearchData('achievements', { strongSubjects: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">重大科技成果</label>
                    <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                        value={researchData.achievements.keyResults} onChange={(e) => updateResearchData('achievements', { keyResults: e.target.value })} />
                  </div>
              </div>
            </div>

             {/* 8. 营销话术采集 */}
             <div className="pt-8 pb-4">
              <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-1 h-4 bg-indigo-500 rounded-full mr-2"></span>
                8. 营销话术采集
              </h3>
              <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">校长寄语</label>
                    <textarea className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none h-24 transition-all" 
                        value={researchData.marketing.principalMessage} onChange={(e) => updateResearchData('marketing', { principalMessage: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1.5">校园流行语</label>
                        <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                            value={researchData.marketing.catchphrases} onChange={(e) => updateResearchData('marketing', { catchphrases: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1.5">学生对母校的昵称</label>
                        <input type="text" className="w-full text-sm border-b border-slate-200 focus:border-indigo-500 outline-none py-2 transition-colors" 
                            value={researchData.marketing.nicknames} onChange={(e) => updateResearchData('marketing', { nicknames: e.target.value })} />
                    </div>
                  </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Visual Collection Area (Sticky) */}
        <div className="col-span-12 lg:col-span-5">
           <div className="sticky top-8 space-y-8">
             <div className="flex items-center space-x-2 mb-2">
                 <ImageIcon className="h-5 w-5 text-indigo-600" />
                 <h2 className="text-xl font-bold text-slate-900">视觉采集区</h2>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-10 divide-y divide-slate-100">
                {/* 地标实拍 */}
                <div className="pt-2 first:pt-0">
                    <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="w-1 h-4 bg-indigo-500 rounded-full mr-2"></span>
                            地标实拍
                        </div>
                        <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 flex items-center px-3 py-1.5 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors">
                            <Upload className="h-3 w-3 mr-1.5" />
                            上传照片
                        </button>
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {researchData.visuals.landmarks.map((url, index) => (
                        <div key={index} className="group relative aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                            <img src={url} alt={`Landmark ${index + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                            <button className="p-1.5 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors">
                                <Trash2 className="h-4 w-4" />
                            </button>
                            </div>
                        </div>
                        ))}
                        <div className="aspect-video border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30">
                        <Plus className="h-6 w-6 mb-2" />
                        <span className="text-xs font-medium">添加图片</span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                        用于后续合成背景。建议包含：校门、主楼、图书馆等标志性建筑。
                    </p>
                </div>

                {/* VI/CI 原件 */}
                <div className="pt-8 pb-4">
                    <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="w-1 h-4 bg-indigo-500 rounded-full mr-2"></span>
                            VI/CI 原件
                        </div>
                        <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 flex items-center px-3 py-1.5 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors">
                            <Upload className="h-3 w-3 mr-1.5" />
                            上传文件
                        </button>
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        {researchData.visuals.vi.map((url, index) => (
                        <div key={index} className="group relative aspect-square bg-white border border-slate-200 rounded-lg p-2 flex items-center justify-center shadow-sm">
                            <img src={url} alt={`VI ${index + 1}`} className="max-w-full max-h-full object-contain" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <button className="p-1.5 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors">
                                <Trash2 className="h-4 w-4" />
                            </button>
                            </div>
                        </div>
                        ))}
                        <div className="aspect-square border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30">
                        <Plus className="h-6 w-6 mb-2" />
                        <span className="text-xs font-medium">添加</span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                        请上传校徽 PNG/SVG 原始文件、标准校色卡等。
                    </p>
                </div>
             </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4">
      <div className="text-center mb-10 relative">
        <h1 className="text-3xl font-bold text-slate-900">院校调研助手</h1>
        <p className="mt-2 text-slate-600">输入学校名称，自动采集并清洗全网数据，生成标准院校数据包。</p>
        
        {/* History Button */}
        <div className="absolute top-0 right-0">
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
                <span className="text-xs text-slate-500">{researchHistory.length} 条记录</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {researchHistory.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    暂无历史记录
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {researchHistory.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleLoadHistory(item)}
                        className="w-full text-left p-4 hover:bg-indigo-50 transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-slate-800 group-hover:text-indigo-700">{item.basicInfo.name}</span>
                          <span className="text-xs text-slate-400">{new Date(item.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {item.basicInfo.location || '未知位置'} · {item.basicInfo.foundYear || '未知年份'}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12 relative">
        <input
          type="text"
          className="w-full pl-6 pr-32 py-4 text-lg border-2 border-slate-200 rounded-full focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm"
          placeholder="请输入目标院校全称，如：北京大学"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !searchTerm}
          className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : '开始调研'}
        </button>
      </div>

      {renderContent()}

      {/* Floating Save Bar */}
      {researchData.basicInfo?.name && (
        <div className="fixed bottom-0 left-64 right-0 p-4 bg-white border-t border-slate-200 shadow-lg flex items-center justify-between z-10">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>数据已自动保存</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium">
              导出原始包
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm shadow-indigo-200 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>保存</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolResearch;
