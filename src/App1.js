import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';


const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const login = async () => {
      try {
        const res = await axios.post('http://localhost:8000/token', 
          qs.stringify({username: username, password: password}),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    
  
  

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
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
