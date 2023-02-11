import {Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import VerifyUser from './pages/verifyUser';
// import Map from './pages/map';
// import Map1 from './pages/map/map';
// import Parking from './pages/parking';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/verifyUser" element={<VerifyUser />}></Route>
        {/*<Route exact path='/map' element={<Map/>}></Route>
        <Route exact path="/map1" element={<Map1 />}></Route>
        <Route exact path="/parking" element={<Parking />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
