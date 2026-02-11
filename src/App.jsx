import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Initialization from './pages/Initialization';
import ConceptSelection from './pages/ConceptSelection';
import CaseDetail from './pages/CaseDetail';
import DesignLoop from './pages/DesignLoop';
import Production from './pages/Production';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
