import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/token',
        qs.stringify({ username: username, password: password }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/users/me', {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        setUser((prevUser) => ({
          ...prevUser,
          details: res.data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div>
      <h1>FastAPI Authentication</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      {user && (
        <div>
          <h3>User Details:</h3>
          {user.details ? (
            <pre>{JSON.stringify(user.details, null, 2)}</pre>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
