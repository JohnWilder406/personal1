import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import UserMain from "./views/users/main.js";
import AddClimb from "./components/users/addclimb.js";
import AddWall from "./components/users/addwall.js";
import UserList from "./components/admin/userlist";
import UserClimbs from './views/users/climbs';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/userMain">
            <UserMain />
          </Route>
          <Route path="/:wallid/climbs">
            <UserClimbs />
          </Route>
          <Route path="/addwall">
            <AddWall />
          </Route>
          <Route path="/addclimb">
            <AddClimb />
          </Route>
          <Route path="/adminMain">
            <UserList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
