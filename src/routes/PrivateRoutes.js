import { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);
    // let history = useHistory();
    useEffect(() => {
        // let session = sessionStorage.getItem('account');
        // if (!session) {
        //     history.push("/login");
        //     window.location.reload();
        // }

    }, []);

    if (user && user.isAuthen === true) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        );
    } else {
        return <Redirect to='/login'></Redirect>
    }


}

export default PrivateRoutes;