import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import Home from './components/Home';
import Customer from './components/Customer/Customer';
import Admin from './components/Admin/Admin';
import About from './components/About';
import Contact from './components/Contact';
import UpdateDetails from './components/Admin/UpdateDetails';
import AddPolicy from './components/Admin/AddPolicy';
import ViewPolicies from './components/Admin/ViewPolicies';
import ViewCustomers from './components/Admin/ViewCustomers';
import ViewDetails from './components/Admin/ViewDetails';
import ViewClaimsByStatus from './components/Admin/ViewClaimsByStatus';
import ViewPoliciesByAgentId from './components/Admin/ViewPoliciesByAgentId';
//import RegisterForm from './components/Login/RegisterForm';
//import LoginForm from './components/Login/LoginForm';
import AuthPage from './components/Login/AuthPage'; // Import AuthPage
import ApplyPolicy from './components/Customer/ApplyPolicy';
import CustomerProfile from './components/Customer/CustomerProfile';
import FileClaimPage from './components/Customer/FileClaimPage'; // Import FileClaim component
import ViewAppliedPolicy from './components/Customer/ViewAppliedPolicy';
import ViewClaims from './components/Customer/ViewClaims'; // Import ViewClaims component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    navigate(userData.role === 'ROLE_CUSTOMER' ? '/customer' : '/admin');
};

  const handleRegister = () => {
    navigate('/loginform');
};

  return (
    <UserProvider>
        <div className="app"> 
          {/* Define the routes */}
          <Routes>
          
            <Route path="/" element={!isLoggedIn ? <Home /> : <navigate to={user?.role === "ROLE_CUSTOMER" ? "/customer" : "/admin"} />} />
            <Route path="/loginform" element={<AuthPage showLogin={true} showRegister={false} onLoginSuccess={handleLogin} onRegisterSuccess={handleRegister} />} />
            <Route path="/registerform" element={<AuthPage showLogin={false} showRegister={true} onLoginSuccess={handleLogin} onRegisterSuccess={handleRegister} />} />
            <Route path="/customer" element={isLoggedIn && user?.role === 'ROLE_CUSTOMER' ? <Customer user={user} /> : <div>Unauthorized</div>} />
            <Route path="/admin" element={isLoggedIn && user?.role === 'ROLE_AGENT' ? <Admin user={user} /> : <div>Unauthorized</div>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/update-details" element={<UpdateDetails />} />
            <Route path="/customer/update-details" element={<UpdateDetails />} />
            <Route path="/admin/add-policy" element={<AddPolicy />} />
            <Route path="/admin/view-policies" element={<ViewPolicies />} />
            <Route path="/admin/view-customers" element={<ViewCustomers />} />
            <Route path="/admin/view-claims" element={<ViewClaims />} />
            <Route path="/admin/view-details" element={<ViewDetails />} />
            <Route path="/Customer/ViewPolicies" element={<ViewPolicies />} />
            <Route path="/Customer/CustomerProfile" element={<CustomerProfile />}/>
            <Route path="/customer/apply-policy" element={<ApplyPolicy />} />
            <Route path="/admin/view-claims-by-status" element={<ViewClaimsByStatus />} />
            <Route path="/admin/view-policies-by-agent" element={<ViewPoliciesByAgentId />} />
            <Route path="/file-claimpage" element={<FileClaimPage />} />
            <Route path="/customer/view-claims" element={<ViewClaims />} />
            <Route path="/customer/view-applied-policies" element={<ViewAppliedPolicy />} />
          </Routes>
        </div>
    </UserProvider>
  );
}
function RootApp() {
  return (
      <Router>
          <App />
      </Router>
  );
}

export default RootApp;