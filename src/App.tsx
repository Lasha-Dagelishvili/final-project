import { Routes, Route, Navigate, } from 'react-router-dom';
import LanguageRoutes from './routes/LanguageRoutes';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang/*" element={<LanguageRoutes />} />
    </Routes>
  );
};

export default App;
