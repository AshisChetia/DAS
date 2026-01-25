import react, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from "axios";
import { toast } from "react-toastify";
import './Login.css';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if( state === 'Admin' ) {
                console.log("Backend URL is:", backendUrl);
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

                if (data.success) {
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                    toast.success("Login Successful!");
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={onSubmitHandler} className="login-form">
                <div className="form-header">
                    <p className="form-title">
                        <span style={{color: '#5f6fff'}}>{state}</span> Login
                    </p>
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        required
                    />
                </div>

                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    )
}

export default Login;