import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import MainLayot from "../src/Components/Layouts/MainLayout"

import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayot />}>
            <Route path='/' element={ <Dashboard /> } />
            <Route path='/mahcines' element={ <Dashboard /> } />
            <Route path='/' element={ <Dashboard /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
