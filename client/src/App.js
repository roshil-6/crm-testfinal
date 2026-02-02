import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Clients from './pages/Clients';
import Attendance from './pages/Attendance';
import UserManagement from './pages/UserManagement';
import BulkImport from './pages/BulkImport';
import EmailTemplates from './pages/EmailTemplates';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

// Determine basename for GitHub Pages deployment
// In production (GitHub Pages), use the repository name as basename
// In development (localhost), use empty string
const getBasename = () => {
  // Check the current URL path first
  // This allows the app to work if accessed via /crm-testfinal in any environment
  const pathname = window.location.pathname;
  if (pathname.startsWith('/crm-testfinal')) {
    return '/crm-testfinal';
  }

  // In development, if not using the repo path, default to root
  if (process.env.NODE_ENV === 'development') {
    return '';
  }

  // In production (GitHub Pages), fallback to other detections
  // Fallback: use PUBLIC_URL or default
  const publicUrl = process.env.PUBLIC_URL || '';
  if (publicUrl) {
    return publicUrl.startsWith('http') ? new URL(publicUrl).pathname : publicUrl;
  }

  // Default fallback
  return '/crm-testfinal';
};

function App() {
  const basename = getBasename();

  // Log basename for debugging
  console.log('🔍 Router Configuration:', {
    basename,
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_URL: process.env.PUBLIC_URL,
    windowLocation: window.location.pathname,
  });

  return (
    <AuthProvider>
      <Router
        basename={basename}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/staff/:staffId"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/leads"
            element={
              <PrivateRoute>
                <Layout>
                  <Leads />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/leads/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <LeadDetail />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <Layout>
                  <Clients />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/clients/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <Clients />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <PrivateRoute>
                <Layout>
                  <Attendance />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Layout>
                  <UserManagement />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/leads/import"
            element={
              <PrivateRoute>
                <Layout>
                  <BulkImport />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/email-templates"
            element={
              <PrivateRoute>
                <Layout>
                  <EmailTemplates />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
