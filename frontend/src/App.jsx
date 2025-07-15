import { useEffect, useState } from 'react';

function App() {
  const [tickets, setTickets] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    passengerName: '',
    address: '',
    destinationAddress: '',
    kickoffAddress: '',
    companyId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Search states
  const [searchAddress, setSearchAddress] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [searchKickoff, setSearchKickoff] = useState('');
  const [addressResults, setAddressResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);
  const [kickoffResults, setKickoffResults] = useState([]);

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

  // Fetch companies from backend
  const fetchCompanies = () => {
    fetch('http://10.251.172.118:30080/api/companies')
      .then(res => res.json())
      .then(data => setCompanies(data))
      .catch(() => setCompanies([]));
  };

  useEffect(() => {
    fetchTickets();
    fetchCompanies();
  }, []);

  // Handle form input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    // Prepare ticket object with company
    const ticketPayload = {
      passengerName: form.passengerName,
      address: form.address,
      destinationAddress: form.destinationAddress,
      kickoffAddress: form.kickoffAddress,
      company: form.companyId ? { id: Number(form.companyId) } : null
    };
    fetch('http://10.251.172.118:30080/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketPayload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create ticket');
        return res.json();
      })
      .then(() => {
        setForm({ passengerName: '', address: '', destinationAddress: '', kickoffAddress: '', companyId: '' });
        fetchTickets();
      })
      .catch(() => setError('Failed to create ticket'));
  };

  // Search handlers
  const handleSearchAddress = e => {
    e.preventDefault();
    setAddressResults([]);
    if (!searchAddress) return;
    fetch(`http://10.251.172.118:30080/api/tickets/search/address?address=${encodeURIComponent(searchAddress)}`)
      .then(res => res.json())
      .then(data => setAddressResults(data))
      .catch(() => setAddressResults([]));
  };
  const handleSearchDestination = e => {
    e.preventDefault();
    setDestinationResults([]);
    if (!searchDestination) return;
    fetch(`http://10.251.172.118:30080/api/tickets/search/destination?destination=${encodeURIComponent(searchDestination)}`)
      .then(res => res.json())
      .then(data => setDestinationResults(data))
      .catch(() => setDestinationResults([]));
  };
  const handleSearchKickoff = e => {
    e.preventDefault();
    setKickoffResults([]);
    if (!searchKickoff) return;
    fetch(`http://10.251.172.118:30080/api/tickets/search/kickoff?kickoff=${encodeURIComponent(searchKickoff)}`)
      .then(res => res.json())
      .then(data => setKickoffResults(data))
      .catch(() => setKickoffResults([]));
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
        <div style={{ marginBottom: 8 }}>
          <select name="companyId" value={form.companyId} onChange={handleChange} required style={{ width: '100%', padding: 8 }}>
            <option value="">Select Company</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Create Ticket</button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </form>

      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: 8 }}>
        <h2>Search Tickets</h2>
        <form onSubmit={handleSearchAddress} style={{ marginBottom: 12 }}>
          <input value={searchAddress} onChange={e => setSearchAddress(e.target.value)} placeholder="Search by Address" style={{ width: '70%', padding: 8 }} />
          <button type="submit" style={{ marginLeft: 8, padding: '8px 16px' }}>Search</button>
        </form>
        {addressResults.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
            {addressResults.map(ticket => (
              <li key={ticket.id} style={{ marginBottom: 8, padding: 8, border: '1px solid #eee', borderRadius: 6 }}>
                <strong>{ticket.passengerName}</strong><br />
                {ticket.address} → {ticket.destinationAddress}<br />
                <small>Kickoff: {ticket.kickoffAddress}</small>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSearchDestination} style={{ marginBottom: 12 }}>
          <input value={searchDestination} onChange={e => setSearchDestination(e.target.value)} placeholder="Search by Destination" style={{ width: '70%', padding: 8 }} />
          <button type="submit" style={{ marginLeft: 8, padding: '8px 16px' }}>Search</button>
        </form>
        {destinationResults.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
            {destinationResults.map(ticket => (
              <li key={ticket.id} style={{ marginBottom: 8, padding: 8, border: '1px solid #eee', borderRadius: 6 }}>
                <strong>{ticket.passengerName}</strong><br />
                {ticket.address} → {ticket.destinationAddress}<br />
                <small>Kickoff: {ticket.kickoffAddress}</small>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSearchKickoff}>
          <input value={searchKickoff} onChange={e => setSearchKickoff(e.target.value)} placeholder="Search by Kickoff" style={{ width: '70%', padding: 8 }} />
          <button type="submit" style={{ marginLeft: 8, padding: '8px 16px' }}>Search</button>
        </form>
        {kickoffResults.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {kickoffResults.map(ticket => (
              <li key={ticket.id} style={{ marginBottom: 8, padding: 8, border: '1px solid #eee', borderRadius: 6 }}>
                <strong>{ticket.passengerName}</strong><br />
                {ticket.address} → {ticket.destinationAddress}<br />
                <small>Kickoff: {ticket.kickoffAddress}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

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
