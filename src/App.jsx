import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Initialization from './pages/Initialization';
import ConceptSelection from './pages/ConceptSelection';
import CaseDetail from './pages/CaseDetail';
import DesignLoop from './pages/DesignLoop';
import Production from './pages/Production';
import Layout from './components/Layout';

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get('p');

    if (redirectPath) {
      try {
        const url = new URL(redirectPath, window.location.origin);
        let path = url.pathname.replace(/^\/xueweifu-agent/, '') || '/';
        const search = url.search || '';
        const hash = url.hash || '';
        navigate(path + search + hash, { replace: true });
      } catch {
        // ignore invalid redirect path
      }
    }
  }, [location.search, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Initialization />} />
        <Route path="case-detail/:id" element={<CaseDetail />} />
        <Route path="concepts" element={<ConceptSelection />} />
        <Route path="design/:seriesId/*" element={<DesignLoop />} />
        <Route path="production" element={<Production />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router basename="/xueweifu-agent">
      <AppRoutes />
    </Router>
  );
}

export default App;
