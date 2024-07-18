import { Switch, Route } from "react-router-dom";
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";

const AppRoutes = (props) => {

    const Projects = () => {
        return (
            <span>Projects</span>
        )
    }

    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/projects" component={Projects} />
                <PrivateRoutes path="/roles" component={Role} />
                <Route exact path="/">
                    Home
                </Route>
                <Route path="/register">
                    <Register></Register>
                </Route>
                <Route path="/login">
                    <Login></Login>
                </Route>
                <Route path="*">
                    404 not found
                </Route>
            </Switch >
        </>
    );
}

export default AppRoutes;