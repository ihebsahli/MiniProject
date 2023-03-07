import React from "react";
import './App.css';
import Login from './components/auth/login'
import SignUp from './components/auth/signup'
import Navbar from "./components/auth/navbar"
import Reservation from "./pages/Reservation/reservation"
import Addreservation from "./pages/Reservation/addreservation" 
import Users from "./pages/Users/users"
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
// import Users from "./pages/Users/users"


function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

  return (
    <div className="App">

      
      <Router>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/signup" element={<SignUp/>} />
      <Route exact path="/Users" element={<Users/>} />

      <Route exact path="/addreservation" element={<Addreservation/>} />
      <Route  path="/reservation" element={<Reservation/>} />
      {/* <Route  path="/users" element={<Users/>} /> */}


      </Routes>
      
      </Router>
    </div>
  );
}
export default App