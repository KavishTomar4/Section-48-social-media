import Navbar from './Components/Navbar';
import Login from './Components/Login';
import './App.css';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Register from './Components/Register';
import Home from './Components/Home';
import Yourprofile from './Components/Yourprofile';
import Createserver from './Components/Createserver';
import Room from './Components/Room';
import Otherprofile from './Components/Otherprofile';
import Editprofile from './Components/Editprofile';
import Logout from './Components/Logout';

function App() {

 
  return (
    <>
    <Navbar/>
    <BrowserRouter>
      <Switch>
        <Route exact path = "/">
          <Login/>  
        </Route>
        <Route exact path = "/register">
          <Register/>
        </Route>
        <Route exact path = "/home">
          <Home/>
        </Route>
        <Route exact path = "/profile">
            <Yourprofile/>
        </Route>
        <Route exact path = "/createserver">
            <Createserver/>
        </Route>
        <Route exact path = "/room/:roomname">
            <Room />
        </Route>
        <Route exact path = "/profile/:profilename">
            <Otherprofile/>
          </Route>
        <Route exact path = "/edit">
            <Editprofile/>
        </Route>
        <Route exact path = "/logout">
            <Logout/>
        </Route>
      </Switch>
    </BrowserRouter>
    
    </>   
    );
}

export default App;
