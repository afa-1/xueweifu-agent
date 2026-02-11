import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import { Search, Loader2, Check, ExternalLink, ArrowRight } from 'lucide-react';

const Initialization = () => {
  const navigate = useNavigate();
  const setSchoolInfo = useAppStore(state => state.setSchoolInfo);
  const setAssets = useAppStore(state => state.setAssets);
  const setCreativeConcepts = useAppStore(state => state.setCreativeConcepts);
  
  const [formData, setFormData] = useState({
    schoolName: '',
    productCount: 1,
    campaignTemplate: 'neo-chinese'
  });
  const [isProcessing, setIsProcessing] = useState(false);

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
    <div className="max-w-5xl mx-auto">
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
                <input
                  type="text"
                  id="schoolName"
                  required
                  className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  placeholder="例如：北京大学"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
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
                选择视觉风格全案模版
              </label>
              <span className="text-sm text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                已预设标准交付规格：高清实拍图 + 动态视频
              </span>
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
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">生产预设</span>
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
              className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg textBaseWidget font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
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
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span className="text-sm">检索学校地标与文化关键词...</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span className="text-sm">生成创意灵感方向与故事线...</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span className="text-sm">匹配适配的版式与视觉风格模板...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Initialization;
