import { useState } from "react";
import axios from "axios";

export default function EmployeePortal() {
  const [userId, setUserId] = useState("");
  const [issue, setIssue] = useState("");
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamically pull the API URL based on where it's hosted
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const submitTicket = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLogs(["> Initializing AI Agent...", `> Connecting to secure environment...`]);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/agent/resolve`, {
        user_id: parseInt(userId),
        issue_text: issue
      });

      setTimeout(() => {
        if (response.data.status === "error") {
          setLogs(prev => [...prev, `> ERROR: ${response.data.message}`]);
        } else {
          setLogs(prev => [...prev, `> User Verified: ${response.data.user}`, `> Executing automated fix...`, `> ACTION: ${response.data.action_taken}`]);
        }
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      setLogs(prev => [...prev, `> CRITICAL ERROR: API Connection failed at ${API_BASE_URL}`]);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2>Submit IT Support Ticket</h2>
      <p style={{ color: '#666' }}>Powered by Agentic AI</p>
      
      <form onSubmit={submitTicket} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="number" 
          placeholder="Employee ID (e.g., 101)" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea 
          placeholder="Describe issue (e.g., 'Reset my password')" 
          value={issue} 
          onChange={(e) => setIssue(e.target.value)}
          required
          rows="3"
          style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" disabled={isLoading} style={{ padding: '12px', background: isLoading ? '#ccc' : '#a100ff', color: '#fff', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: isLoading ? 'not-allowed' : 'pointer' }}>
          {isLoading ? "Processing..." : "Deploy Agent"}
        </button>
      </form>

      {logs.length > 0 && (
        <div style={{ marginTop: '30px', background: '#1e1e1e', color: '#00ff00', padding: '15px', borderRadius: '6px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          {logs.map((log, index) => (
            <div key={index} style={{ marginBottom: '8px', color: log.includes("ERROR") ? '#ff4444' : log.includes("ACTION") ? '#00ffff' : '#00ff00' }}>
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}