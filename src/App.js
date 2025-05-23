import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserAuthProvider } from "./context/authcontext";
import UserLogin from "./Components/UserLoginPage";
import UserDashboardLayout from "./pages/UserDashboard/UserDashboardLayout.jsx";
import UserSignup from "./Components/UserSignup";
import CharityLoginPage from "./Components/CharityLoginPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute";
import About from "./pages/About.jsx";
import CharityDashboardLayout from "./pages/CharityDashboard/CharityDashboardLayout";
import CharityDashboardHome from "./pages/CharityDashboard/CharityDashboardHome";
import VolunteerOpportunities from "./pages/CharityDashboard/VolunteerOpportunities.jsx";
import CharityProjects from "./pages/CharityDashboard/CharityProjects.jsx";
import Opportunities from "./pages/UserDashboard/Opportunities.jsx";
import Projects from "./pages/UserDashboard/Projects.jsx";
import Volunteers from "./pages/CharityDashboard/Volunteers.jsx";

function App() {
  return (
    <UserAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/charity-login" element={<CharityLoginPage />} />

          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Opportunities />} />
            <Route path="projects" element={<Projects />} />
          </Route>

          <Route
            path="/charity-dashboard"
            element={
              <ProtectedRoute allowedRoles={["charity"]}>
                <CharityDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CharityDashboardHome />} />
            <Route path="opportunities" element={<VolunteerOpportunities />} />
            <Route path="projects" element={<CharityProjects />} />
            <Route path="volunteers" element={<Volunteers />} />
          </Route>
        </Routes>
      </Router>
    </UserAuthProvider>
  );
}
export default App;
