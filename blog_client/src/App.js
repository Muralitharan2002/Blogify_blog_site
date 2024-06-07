// import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import Blog from "./pages/Blogs";
import CreateBlog from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import BlogPage from "./components/BlogPage";
import SecureAuth from "./components/SecureAuth";
import ProfileCards from "./components/ProfileCards";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <>
      <div className="font-mainfont scroll-smooth">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="create" element={<CreateBlog />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<SecureAuth><Profile><ProfileCards /></Profile></SecureAuth>} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/edit/:id" element={<SecureAuth><EditBlog /></SecureAuth>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
