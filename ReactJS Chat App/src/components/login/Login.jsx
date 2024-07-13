import './login.css';

import { toast } from 'react-toastify';

export const Login = () => {
    const onLoginSubmit = (e) => {
        e.preventDefault();

        toast.success("Logged in successfully!");
    }

    return (
        <div className="login">
            <h2 className="login-title">Welcome back,</h2>
            
            <form onSubmit={onLoginSubmit}>
                <input type="text" placeholder='Email' className='email'/>
                <input type="password" placeholder='Password' className='password'/>
                <button className="sign-in">Sign In</button>
            </form>
        </div>
    )
} 