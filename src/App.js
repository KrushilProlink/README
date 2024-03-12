// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     try {
//       await axios.post(
//         'http://localhost:5201/register',
//         { username, password },
//         { withCredentials: true }
//       );
//       console.log('User registered successfully');
//     } catch (error) {
//       console.error('Error registering user:', error.response?.data || error.message);
//     }
//   };

//   // Assuming this is inside the component where the login logic is handled
//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(
//         'http://localhost:5201/login',
//         { username, password },
//         { withCredentials: true }
//       );

//       console.log('User logged in successfully');

//       // Assuming the server sends a new access token in the response
//       const newAccessToken = response.data.accessToken;

//       // Use the new access token for subsequent requests
//       axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

//       // setIsLoggedIn(true);
//     } catch (error) {
//       console.error('Error logging in:', error.response?.data || error.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5201/logout', {}, { withCredentials: true });
//       console.log('User logged out successfully');
//     } catch (error) {
//       console.error('Error logging out:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Authentication Frontend</h1>

//       <div>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
//         <button onClick={handleLogin}>Login</button>
//         <button onClick={handleRegister}>Register</button>
//         <button onClick={handleLogout}>Logout</button> {/* Add a logout button */}
//       </div>
//     </div>
//   );
// };

// export default App;

// ######################   



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5201');

// const App = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Listen for login event
//     socket.on('login', (data) => {
//       console.log(`${data.username} logged in on another device`);
//       // You may want to handle this event, for example, show a notification
//     });

//     // Listen for logout event
//     socket.on('logout', (data) => {
//       console.log(`${data.username} logged out on another device`);
//       // Handle logout, for example, redirect to the login page
//       setIsLoggedIn(false);
//     });

//     // Clean up on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleRegister = async () => {
//     try {
//       await axios.post(
//         'http://localhost:5201/register',
//         { username, password },
//         { withCredentials: true }
//       );
//       console.log('User registered successfully');
//     } catch (error) {
//       console.error('Error registering user:', error.response?.data || error.message);
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(
//         'http://localhost:5201/login',
//         { username, password },
//         { withCredentials: true }
//       );

//       console.log('User logged in successfully');
//       const newAccessToken = response.data.accessToken;

//       axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

//       // Emit login event
//       socket.emit('login', { username });

//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error('Error logging in:', error.response?.data || error.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5201/logout', {}, { withCredentials: true });
//       console.log('User logged out successfully');

//       // Emit logout event
//       socket.emit('logout', { username });

//       setIsLoggedIn(false);
//     } catch (error) {
//       console.error('Error logging out:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Authentication Frontend</h1>

//       <div>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
//         <button onClick={handleLogin}>Login</button>
//         <button onClick={handleRegister}>Register</button>
//         <button onClick={handleLogout}>Logout</button> {/* Add a logout button */}
//       </div>
//     </div>
//   );
// };

// export default App;



// ########################################## 


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('https://app-1-voux.onrender.com');

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socket.on('login', (data) => {
      console.log(`${data.username} logged in on another device`);
    });

    socket.on('logout', (data) => {
      console.log(`${data.username} logged out on another device`);
      setIsLoggedIn(false);
    });

    socket.on('force-logout', (data) => {
      console.log('Force logout:', data.message);
      alert("forec logout");
      setIsLoggedIn(false);
      handleLogout();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleRegister = async () => {
    try {
      await axios.post(
        'https://app-1-voux.onrender.com/register',
        { username, password },
        { withCredentials: true }
      );
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://app-1-voux.onrender.com/login',
        { username, password },
        { withCredentials: true }
      );

      console.log('User logged in successfully');
      const newAccessToken = response.data.accessToken;

      axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

      // Access the io object from the global socket
      socket.emit('login', { username });

      // Handle login, for example, set user as logged in
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     await axios.post('https://app-1-voux.onrender.com/logout', { username }, { withCredentials: true });
  //     console.log('User logged out successfully');

  //     // Emit logout event
  //     socket.emit('logout', { username });

  //     // Handle logout, for example, set user as logged out
  //   } catch (error) {
  //     console.error('Error logging out:', error.response?.data || error.message);
  //   }
  // };
  const handleLogout = async () => {
    try {
      // await axios.post('http://localhost:5201/logout', {}, { withCredentials: true });
      await axios.post('https://app-1-voux.onrender.com/logout', { username: username }, { withCredentials: true });
      console.log('User logged out successfully');

      // Emit logout event
      socket.emit('logout', { username });

      // Handle logout, for example, set user as logged out
    } catch (error) {
      console.error('Error logging out:', error.response?.data || error.message);
    }
  };
  return (
    <div>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;