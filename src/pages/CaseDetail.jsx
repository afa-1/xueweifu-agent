import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Download, Share2 } from 'lucide-react';

const CaseDetail = () => {
  const { id } = useParams();

  // Expanded data for the cases
  const cases = {
    'neo-chinese': {
      title: '新中式国风',
      subtitle: 'Neo-Chinese Style',
      school: '北京大学',
      description: '本项目旨在探索传统文化与现代学位服设计的完美融合。通过提取北大博雅塔的剪影与未名湖的波纹元素，结合传统宋锦纹样，打造出既有深厚文化底蕴又不失现代感的学位服系列。',
      tags: ['水墨晕染', '青绿配色', '宋体字', '传统纹样'],
      mainImage: 'https://images.unsplash.com/photo-1591123120675-6f7f4a542b7c?auto=format&fit=crop&q=80&w=1200',
      gallery: [
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600'
      ],
      palette: ['#8B0000', '#2F4F4F', '#F5F5DC'],
      mockupImage: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&q=80&w=800'
    },
    'classic': {
      title: '经典学院风',
      subtitle: 'Classic Academic Style',
      school: '清华大学',
      description: '致敬百年学府的厚重历史，采用经典的深蓝与紫罗兰配色。设计重点在于垂感面料的运用与徽章刺绣的精致工艺，强调仪式感与庄重感，体现“自强不息，厚德载物”的校训精神。',
      tags: ['深蓝徽章', '衬线体', '庄重边框', '英伦剪裁'],
      mainImage: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=1200',
      gallery: [
        'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600'
      ],
      palette: ['#191970', '#4B0082', '#FFFFFF'],
      mockupImage: 'https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&q=80&w=800'
    },
    'modern': {
      title: '现代简约风',
      subtitle: 'Modern Minimalist Style',
      school: '复旦大学',
      description: '面向未来的设计语言，大胆采用几何色块与不对称剪裁。去繁就简，用最纯粹的线条勾勒出当代青年的锋芒与锐气。适合追求创新、自由开放的学术氛围。',
      tags: ['大留白', '几何色块', '无衬线体', '极简主义'],
      mainImage: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&q=80&w=1200',
      gallery: [
        'https://images.unsplash.com/photo-1519452575417-564c140db392?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600'
      ],
      palette: ['#000000', '#808080', '#FFFFFF'],
      mockupImage: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&q=80&w=800'
    }
  };

  const data = cases[id];

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-slate-500">
        <h2 className="text-2xl font-bold mb-4">未找到该案例</h2>
        <Link to="/" className="text-indigo-600 hover:underline">返回首页</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img 
          src={data.mainImage} 
          alt={data.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {data.school}
              </span>
              <span className="text-white/80 text-sm tracking-wider uppercase">
                Visual Campaign Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{data.title}</h1>
            <p className="text-xl text-slate-200 font-light">{data.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <span className="w-1 h-8 bg-indigo-600 mr-3 rounded-full"></span>
                设计理念
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {data.description}
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">视觉图集</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 aspect-video rounded-xl overflow-hidden shadow-lg">
                  <img src={data.mockupImage} alt="Mockup" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                {data.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4">设计关键词</h4>
              <div className="flex flex-wrap gap-2">
                {data.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4">色彩规范</h4>
              <div className="flex space-x-3">
                {data.palette.map(color => (
                  <div key={color} className="group relative">
                    <div 
                      className="w-12 h-12 rounded-full shadow-sm border border-slate-200 ring-2 ring-white"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2">喜欢这个风格？</h4>
              <p className="text-sm text-indigo-700 mb-4">
                立即使用此模版为您生成专属的学位服创意方案。
              </p>
              {/* Note: This button effectively just closes this tab and lets them select it in the main tab, 
                  or we could try to handle navigation, but since it's a new tab, closing it is often best behavior 
                  or navigating back. */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
