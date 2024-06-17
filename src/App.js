import './App.scss';
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <Nav />
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/news">
            News
          </Route>
          <Route path="/about">
            About
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/contact">
            Contact
          </Route>
          <Route path="*">
            404 not found
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
