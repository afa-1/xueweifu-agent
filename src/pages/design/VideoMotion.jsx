import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import { Play, ArrowRight, Check, Sparkles, Loader2, RotateCw } from 'lucide-react';

const VideoMotion = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams();
  const updateSeriesData = useAppStore(state => state.updateSeriesData);
  const currentSeries = useAppStore(state => state.seriesData[parseInt(seriesId)]);
  
  const [loading, setLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [videos, setVideos] = useState([]);
  const [prompt, setPrompt] = useState('Cinematic slow motion of graduates throwing caps, golden hour lighting, 4k');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Mock initial generation
    const timer = setTimeout(() => {
        setVideos([
            { id: 1, url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800", name: "生成视频 1" },
            { id: 2, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800", name: "生成视频 2" }
        ]);
        setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleRegenerate = () => {
    if (!prompt.trim()) return;
    setIsRegenerating(true);
    
    // Simulate API call for new videos
    setTimeout(() => {
        // Just shuffling/updating mock data for demo
        setVideos([
            { id: 3, url: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=800", name: "新生成视频 1" },
            { id: 4, url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800", name: "新生成视频 2" }
        ]);
        setSelectedVideo(null);
        setIsRegenerating(false);
    }, 2500);
  };

  const handleNext = () => {
    // In a real app, we'd save the selected video or both
    updateSeriesData(parseInt(seriesId), { videoPreset: selectedVideo || 'video-1' });
    navigate('../summary');
  };

  if (loading) {
    return (
      <div className="h-96 flex