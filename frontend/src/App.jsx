import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingBtn from './components/FloatingBtn';
import Home from './pages/Home';
import GioiThieu from './pages/GioiThieu';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import SchoolDetail from './pages/SchoolDetail';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gioi-thieu" element={<GioiThieu />} />
          <Route path="/du-hoc/:subcategory" element={<ArticleList section="du-hoc" />} />
          <Route path="/su-kien" element={<ArticleList section="su-kien" />} />
          <Route path="/tin-tuc" element={<ArticleList section="tin-tuc" />} />
          <Route path="/bai-viet/:id" element={<ArticleDetail />} />
          <Route path="/truong-lien-ket/:slug" element={<SchoolDetail />} />
          <Route path="/tu-van" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingBtn />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
