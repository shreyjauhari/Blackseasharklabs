import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layout';

import Home from '@/pages/Home';
import Research from '@/pages/Research';
import Researchers from '@/pages/Researchers';
import Publications from '@/pages/Publications';
import Projects from '@/pages/Projects';
import News from '@/pages/News';
import About from '@/pages/About';
import Login from '@/pages/Login';

import Admin from '@/pages/admin/Admin';
import ManageNews from '@/pages/admin/ManageNews';
import ManageProjects from '@/pages/admin/ManageProjects';
import ManagePublications from '@/pages/admin/ManagePublications';
import ManageResearchers from '@/pages/admin/ManageResearchers';
import ManageDivisions from '@/pages/admin/ManageDivisions';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public website */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/researchers" element={<Researchers />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/news" element={<ManageNews />} />
        <Route path="/admin/projects" element={<ManageProjects />} />
        <Route
          path="/admin/publications"
          element={<ManagePublications />}
        />
        <Route
          path="/admin/researchers"
          element={<ManageResearchers />}
        />
        <Route
          path="/admin/divisions"
          element={<ManageDivisions />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;