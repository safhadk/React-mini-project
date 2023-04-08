import { Routes, Route} from "react-router-dom";
import { useSelector } from 'react-redux';
import SignupPage from '../Pages/User/SignupPage';
import LoginPage from '../Pages/User/LoginPage';
import HomePage from '../Pages/User/HomePage';
import Myaccount from '../Pages/User/Myaccount';
import EditprofilePage from '../Pages/User/EditprofilePage';

function User() {

    let user = useSelector((state) => state.user)
    return (
        <div>
            <Routes>
                <Route exact path='/' element={user.userToken ? <HomePage /> : <LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={user.userToken ?  <HomePage />  : <LoginPage />} />
                <Route path='/myaccount' element={user.userToken ? <Myaccount /> : <LoginPage />} />
                <Route path='/editaccount' element={user.userToken ? <EditprofilePage /> : <LoginPage />} />
            </Routes>
        </div>
    )
}







export default User

