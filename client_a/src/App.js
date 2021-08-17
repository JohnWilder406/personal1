import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import UserMain from "./views/users/main";
import UserList from "./components/admin/userlist";
import AddClimb from "./components/users/addclimb";
import AddWall from "./components/users/addwall";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/userMain">
            <UserMain />
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
