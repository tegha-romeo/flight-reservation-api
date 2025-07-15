import { useEffect, useState } from 'react';

function App() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    passengerName: '',
    address: '',
    destinationAddress: '',
    kickoffAddress: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch tickets from backend
  const fetchTickets = () => {
    setLoading(true);
    fetch('http://10.251.172.118:30080/api/tickets')
      .then(res => res.json())
      .then(data => {
        setTickets(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch tickets');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Handle form input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    fetch('http://10.251.172.118:30080/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create ticket');
        return res.json();
      })
      .then(() => {
        setForm({ passengerName: '', address: '', destinationAddress: '', kickoffAddress: '' });
        fetchTickets();
      })
      .catch(() => setError('Failed to create ticket'));
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Flight Tickets</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2>Create Ticket</h2>
        <div style={{ marginBottom: 8 }}>
          <input name="passengerName" value={form.passengerName} onChange={handleChange} placeholder="Passenger Name" required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input name="destinationAddress" value={form.destinationAddress} onChange={handleChange} placeholder="Destination Address" required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input name="kickoffAddress" value={form.kickoffAddress} onChange={handleChange} placeholder="Kickoff Address" required style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Create Ticket</button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </form>
      <h2>All Tickets</h2>
      {loading ? <div>Loading...</div> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tickets.map(ticket => (
            <li key={ticket.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
              <strong>{ticket.passengerName}</strong><br />
              {ticket.address} → {ticket.destinationAddress}<br />
              <small>Kickoff: {ticket.kickoffAddress}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
