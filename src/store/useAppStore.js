import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set) => ({
      // Phase 1: Initialization
      schoolName: '',
  productCount: 1,
  campaignTemplate: 'classic', // 'neo-chinese' | 'classic' | 'modern'
  landmarks: [],
  cultureKeywords: [],
  
  // School Research Data
  researchHistory: [],
  researchData: {
    // 1. 院校基本面
    basicInfo: { name: '', abbreviation: '', foundYear: '', location: '' },
    // 2. 学校文化灵魂
    cultureSoul: { motto: '', lyrics: '', vision: '', spirit: '' },
    // 3. 符号语义块
    symbolSemantics: { badgeDesc: '', flagDesc: '', colorDesc: '' },
    // 4. 历史时间轴
    history: [], // { year: '1902', event: 'Founded' }
    alumni: '', // Representative alumni
    // 5. 核心地标语义
    landmarkSemantics: '', 
    // 6. 生态环境语义
    ecoSemantics: '',
    // 7. 荣誉与学科
    achievements: { strongSubjects: '', keyResults: '' },
    // 8. 营销话术
    marketing: { principalMessage: '', catchphrases: '', nicknames: '' },
    
    // Visuals
    visuals: {
      landmarks: [], // Image URLs
      vi: [] // VI files
    }
  },

  creativeConcepts: [],
  selectedConcepts: [],
  
  // Phase 2: Design Loop
  currentSeriesIndex: 0,
  seriesData: [], // Array of objects { id, conceptId, style, patterns, tryOnImage, selectedPhotos, videoPreset, rationale, status }

  // Phase 3: Production
  deliveryFormat: 'ppt', // 'ppt' | 'web' | 'both'
  isRendering: false,
  renderingProgress: 0,
  finalVideoUrl: null,

  // Actions
  setSchoolInfo: (name, count, template) => set({ schoolName: name, productCount: count, campaignTemplate: template }),
  
  setAssets: (landmarks, keywords) => set({ landmarks, cultureKeywords: keywords }),
  
  setResearchData: (data) => set({ researchData: data }),
  
  addToHistory: (data) => set((state) => {
    // Check if school already exists in history, if so update it, otherwise add it
    const existingIndex = state.researchHistory.findIndex(
      item => item.basicInfo?.name === data.basicInfo?.name
    );
    
    let newHistory;
    if (existingIndex >= 0) {
      newHistory = [...state.researchHistory];
      newHistory[existingIndex] = { ...newHistory[existingIndex], ...data, updatedAt: new Date().toISOString() };
    } else {
      newHistory = [{ ...data, updatedAt: new Date().toISOString() }, ...state.researchHistory];
    }
    
    return { researchHistory: newHistory };
  }),

  saveProposalToHistory: (finalUrl) => set((state) => {
    if (!state.schoolName) return {};

    const proposalData = {
      campaignTemplate: state.campaignTemplate,
      seriesData: state.seriesData,
      deliveryFormat: state.deliveryFormat,
      finalVideoUrl: finalUrl || state.finalVideoUrl,
      accessPassword: Math.random().toString(36).slice(-6).toUpperCase(), // Generate random password
      completedAt: new Date().toISOString()
    };

    const existingIndex = state.researchHistory.findIndex(
      item => item.basicInfo?.name === state.schoolName || item.schoolName === state.schoolName
    );

    let newHistory;
    if (existingIndex >= 0) {
      newHistory = [...state.researchHistory];
      newHistory[existingIndex] = { 
        ...newHistory[existingIndex], 
        proposalData,
        updatedAt: new Date().toISOString() 
      };
    } else {
      // If school not in research history, create a new entry
      newHistory = [{ 
        schoolName: state.schoolName,
        basicInfo: { name: state.schoolName },
        proposalData, 
        updatedAt: new Date().toISOString() 
      }, ...state.researchHistory];
    }

    return { researchHistory: newHistory };
  }),

  updateResearchData: (section, data) => set((state) => ({
    researchData: {
      ...state.researchData,
      [section]: { ...state.researchData[section], ...data }
    }
  })),

  setCreativeConcepts: (concepts) => set({ creativeConcepts: concepts }),

  updateCreativeConcept: (id, data) => set((state) => ({
    creativeConcepts: state.creativeConcepts.map(c => 
      c.id === id ? { ...c, ...data } : c
    )
  })),
  
  selectConcepts: (selectedIndices) => set((state) => {
    // Initialize series data based on selected concepts
    const initialSeriesData = selectedIndices.map((index, i) => ({
      id: i,
      concept: state.creativeConcepts[index],
      style: null,
      patterns: { placket: null, cuff: null, hood: null },
      tryOnImage: null,
      selectedPhotos: [],
      videoPreset: null,
      rationale: '',
      status: 'pending' // pending, designing, ready_to_render, completed
    }));
    return { selectedConcepts: selectedIndices, seriesData: initialSeriesData };
  }),

  updateSeriesData: (index, data) => set((state) => {
    const newSeriesData = [...state.seriesData];
    newSeriesData[index] = { ...newSeriesData[index], ...data };
    return { seriesData: newSeriesData };
  }),

  nextSeries: () => set((state) => ({ currentSeriesIndex: state.currentSeriesIndex + 1 })),
  
  setDeliveryFormat: (format) => set({ deliveryFormat: format }),
  
  startRendering: () => set({ isRendering: true, renderingProgress: 0 }),
  
  updateRenderingProgress: (progress) => set((state) => ({ 
    renderingProgress: typeof progress === 'function' ? progress(state.renderingProgress) : progress 
  })),
  
  finishRendering: (videoUrl) => set({ isRendering: false, renderingProgress: 100, finalVideoUrl: videoUrl }),

  resetStore: () => set({
    schoolName: '',
    productCount: 1,
    landmarks: [],
    cultureKeywords: [],
    creativeConcepts: [],
    selectedConcepts: [],
    currentSeriesIndex: 0,
    seriesData: [],
    deliveryFormat: 'ppt',
    isRendering: false,
    renderingProgress: 0,
    finalVideoUrl: null,
  })
    }),
    {
      name: 'degree-gown-storage', // unique name
      partialize: (state) => ({ 
        researchHistory: state.researchHistory,
        researchData: state.researchData,
        schoolName: state.schoolName,
        landmarks: state.landmarks,
        cultureKeywords: state.cultureKeywords,
        creativeConcepts: state.creativeConcepts,
        selectedConcepts: state.selectedConcepts,
        seriesData: state.seriesData
      }),
    }
  )
);

export default useAppStore;
