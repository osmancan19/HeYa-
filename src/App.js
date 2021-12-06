import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Login from './components/Login'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useStateValue } from './components/StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className="app_body">
          <Router>
            <Routes>
              <Route
                path="/rooms/:roomId"
                caseSensitive={false}
                element={[<Sidebar/>,<Chat/>]}
              />

              <Route
                path="/"
                caseSensitive={false}
                element={<Sidebar/>}
              />
            </Routes>

          </Router>
        </div>
      )}

    </div>
  );
}

export default App;
