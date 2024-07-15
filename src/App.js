import './App.scss';
import Nav from './components/Navigation/Nav';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useContext } from 'react';
import AppRoutes from './routes/AppRoutes';
import { TailSpin } from 'react-loader-spinner';
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  // const [account, setAccount] = useState({});

  // useEffect(() => {
  //   let session = sessionStorage.getItem('account');
  //   if (session) {
  //     setAccount(JSON.parse(session));
  //   }
  // }, []);

  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>
            <TailSpin
              heigth="100"
              width="100"
              color='#1877f2'
              ariaLabel='loading'
            />
            <div>Loading data...</div>
          </div>
          :
          <>
            <div className='app-header'>
              <Nav />
            </div>
            <div className='app-container'>
              <AppRoutes />
            </div>
          </>
        }
      </Router >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </>
  );
}

export default App;
