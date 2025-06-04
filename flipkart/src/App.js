import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://your-backend-url.onrender.com'; // replace with actual backend URL

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? `${API_BASE}/login` : `${API_BASE}/register`;
    try {
      const res = await axios.post(url, { username, password });
      alert(res.data);
    } catch (err) {
      alert('Error: ' + err.response.data);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>{isLogin ? "Login" : "Register"} Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username}
          onChange={e => setUsername(e.target.value)} required />
        <br /><br />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required />
        <br /><br />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <br />
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Go to Register" : "Go to Login"}
      </button>
    </div>
  );
}

export default App;
