import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Layout from './layout/mainLeyout/layout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout children={<Home />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
