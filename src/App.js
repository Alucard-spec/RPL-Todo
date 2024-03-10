
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Auth from './authentication/Auth';
import Database from './components/Database';




function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route index element={<Auth/>}/>
        <Route path='/data' element={<Database/>}/>
      </Routes>
      
     
    </div>
  );
}

export default App;
