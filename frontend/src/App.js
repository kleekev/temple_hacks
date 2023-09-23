import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='bg-slate-300 w-screen h-screen'>
      <BrowserRouter>
        <Navbar/>
        <div className='h-[90%]'>
          <Routes>
              <Route 
                path='/'
                element={<Home/>}
              />
              <Route
                path='/signup'
                element={<SignUp/>}
              />
              <Route
                path='/login'
                element={<Login/>}
              />
          </Routes>
        </div>
          
      </BrowserRouter>
    </div>
  );
}

export default App;
