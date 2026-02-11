import React from 'react';
import { Outlet } from 'react-router-dom';
import { PenTool } from 'lucide-react';

const Layout = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            <button className="w-full flex items-center space-x-3 px-3 py-3 bg-indigo-50 text-indigo-700 rounded-lg transition-colors font-medium">
              <PenTool className="h-5 w-5 text-indigo-600" />
              <span>学位服智能提案</span>
            </button>
          </div>
          
          <div className="p-4 border-t border-slate-100">
            <div className="text-xs text-slate-400 text-center">
              v1.0.0 Pro Plan
            </div>
          </div>
        </aside>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          <main className="flex-1 overflow-auto p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
