import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import DashboardPage from './views/DashboardPage';
import CreatePage from './views/CreatePage';
import UpdateJobPage from './views/UpdateJobPage';



function App() {
  return (
    <div className="container mt-5">
      <Routes>
        <Route path="/authors" element={<DashboardPage/>} />
        <Route path="/authors/new" element={<CreatePage/>} />
        <Route path="/authors/:id/edit" element={<UpdateJobPage/>} />
      </Routes>
    </div>
  );
}

export default App;
