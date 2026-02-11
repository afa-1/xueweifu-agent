import { create } from 'zustand';

const useAppStore = create((set) => ({
  // Phase 1: Initialization
  schoolName: '',
  productCount: 1,
  campaignTemplate: 'classic', // 'neo-chinese' | 'classic' | 'modern'
  landmarks: [],
  cultureKeywords: [],
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
  
  updateRenderingProgress: (progress) => set({ renderingProgress: progress }),
  
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
}));

export default useAppStore;
