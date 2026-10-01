import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeePortal from "./EmployeePortal";
import AdminDashboard from "./AdminDashboard";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
        <nav style={{ background: '#000', borderBottom: '4px solid #a100ff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', color: 'white' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Accenture AI Helpdesk</h2>
          <div>
            <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>Employee Portal</Link>
            <Link to="/admin" style={{ color: '#ccc', textDecoration: 'none', fontWeight: 'bold' }}>IT Admin</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<EmployeePortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;