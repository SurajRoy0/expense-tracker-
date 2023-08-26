import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './Components/Pages/SignUp';
import Navbar from './Components/UI/Navbar';
import Home from './Components/Pages/Home';
import SignIn from './Components/Pages/SignIn';
import UserProfile from './Components/Pages/UserProfile';
import { useState } from 'react';
import Verify from './Components/UI/Verify';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const [VerifyModal, setVerifyModal] = useState(false)

  const verifyModalOpenHandler = () => {
    setVerifyModal(true);
  }

  const verifyModalCloseHandler = () => {
    setVerifyModal(false);
  }


  return (
    <>
      {VerifyModal && <Verify verifyModalCloseHandler={verifyModalCloseHandler} />}
      <Navbar />
      <Routes>
        {isLoggedIn && <Route path='/' element={<Home />} />}
        <Route path='/sign-in' element={<SignIn />} />
        {!isLoggedIn && <Route path='/sign-up' element={<SignUp />} />}
        {isLoggedIn && <Route path='/user-profile' element={<UserProfile verifyModalOpenHandler={verifyModalOpenHandler} />} />}
      </Routes>
    </>
  );
}

export default App;
