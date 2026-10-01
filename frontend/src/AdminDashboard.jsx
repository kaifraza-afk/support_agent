import { useState } from "react";
import { ShieldAlert, CheckCircle, Clock } from "lucide-react";

export default function AdminDashboard() {
  // Mock data for tickets escalated by the AI
  const [escalatedTickets] = useState([
    { id: "TKT-8991", user: "Employee 405", issue: "Laptop blue screen on boot", status: "Requires Hardware", time: "10 mins ago" },
    { id: "TKT-8992", user: "Employee 212", issue: "Need access to Financial Server", status: "Pending Manager Approval", time: "22 mins ago" }
  ]);

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Top Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '4px solid #00ff00' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>AI Resolution Rate</h3>
          <h2 style={{ margin: 0, fontSize: '2rem' }}>78.4%</h2>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '4px solid #a100ff' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Avg. AI Resolution Time</h3>
          <h2 style={{ margin: 0, fontSize: '2rem' }}>1.2s</h2>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '4px solid #ff4444' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Escalated to Human</h3>
          <h2 style={{ margin: 0, fontSize: '2rem' }}>2 Tickets</h2>
        </div>
      </div>

      {/* Escalated Tickets Table */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldAlert color="#ff4444" /> Action Required (L2 Support)
        </h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Ticket ID</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>User</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>AI Analysis</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {escalatedTickets.map((ticket, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px 12px', fontWeight: 'bold' }}>{ticket.id}</td>
                <td style={{ padding: '15px 12px' }}>{ticket.user}</td>
                <td style={{ padding: '15px 12px', color: '#555' }}>{ticket.issue} <br/><span style={{ fontSize: '0.85rem', color: '#a100ff' }}>{ticket.status}</span></td>
                <td style={{ padding: '15px 12px' }}>
                  <button style={{ padding: '8px 16px', background: '#000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}