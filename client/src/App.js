import { Route, Routes } from 'react-router';
import './App.css';
import Signup from './Pages/Signup';
import Dashboard from './Components/Dashboard';

function App() {
  return (
   <Routes>
      <Route exact="/" path='/' element={<Signup/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
   </Routes>
  );
}

export default App;
