import { useState } from 'react';
import './login.css';

import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../configs/firebase';

export const Login = () => {
    const [loading, setLoading] = useState(false);

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        const { email, password } = Object.fromEntries(formData);

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);

            toast.success("Signed in!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className="login">
            <h2 className="login-title">Welcome back,</h2>
            
            <form className="login-form" onSubmit={onLoginSubmit}>
                <input type="text" placeholder='Email' className='email' name='email'/>
                <input type="password" placeholder='Password' className='password' name='password'/>
                <button className="sign-in" disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
            </form>
        </div>
    )
} 