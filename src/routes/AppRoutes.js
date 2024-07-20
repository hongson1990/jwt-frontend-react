import { Switch, Route } from "react-router-dom";
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
import About from "../components/About/About";
import Home from "../components/Home/Home";

const AppRoutes = (props) => {

    const Projects = () => {
        return (
            <div className="container mt-3">
                <h4>Todo...</h4>
            </div>
        )
    }

    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/projects" component={Projects} />
                <PrivateRoutes path="/roles" component={Role} />
                <PrivateRoutes path="/group-role" component={GroupRole} />
                <Route exact path="/">
                    <Home></Home>
                </Route>
                <Route path="/register">
                    <Register></Register>
                </Route>
                <Route path="/about">
                    <About></About>
                </Route>
                <Route path="/login">
                    <Login></Login>
                </Route>
                <Route path="*">
                    <div className="container">404 not found...</div>
                </Route>
            </Switch >
        </>
    );
}

export default AppRoutes;