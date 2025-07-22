import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Home from "./pages/home"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import LogoutButton from "./pages/Logout"
import CreatePost from "./pages/createPost"
import OrgForm from "./components/orgRegistrationForm"
import SetLocation from "./components/setLocation"
import Protected from "./components/ProtectRoute"
import Profile from "./pages/profilePage"
import Feed from "./pages/feed"
import { SignUp } from "./components/SignUp"
import Plant from "./pages/treePlant"




function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plant" element={<Plant />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/addOrg" element={<Protected><OrgForm /></Protected>} />
          <Route path="/Hello" element={<SetLocation />} />
          <Route path="/posts" element={<Protected><Feed currentUserId={"yourCurrentUserId"} /></Protected>} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="/signup" element={<SignUp logo={{
            url: "",
            src: "",
            alt: "",
            title: ""
          }} />} />

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
