import { useState } from 'react';
import './login.css';

import { toast } from 'react-toastify';

export const Login = () => {
    const [loading, setLoading] = useState(false);

    const onLoginSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        toast.success("Logged in successfully!");
    }

    return (
        <div className="login">
            <h2 className="login-title">Welcome back,</h2>
            
            <form className="login-form" onSubmit={onLoginSubmit}>
                <input type="text" placeholder='Email' className='email'/>
                <input type="password" placeholder='Password' className='password'/>
                <button className="sign-in" disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
            </form>
        </div>
    )
} 