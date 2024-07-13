import "./register.css";

import { toast } from 'react-toastify';

import { useState } from "react";

export const Register = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: "",
    });

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    };

    const onRegisterSubmit = (e) => {
        e.preventDefault();

        console.log('clicked!');

        toast.success("Registered Successfully!");
    };

    return (
        <div className="register">
            <h2 className="login-title">Create an Account</h2>

            <form onSubmit={onRegisterSubmit}>
                <label htmlFor="file">
                    <img
                        src={avatar.url || "./avatar.png"}
                        alt="avatar png"
                        className="register-avatar-png"
                    />
                    <span className="upload-avatar-text">Upload an avatar</span>
                </label>
                <input type="file" id="file" className="register-upload-avatar-field" onChange={handleAvatar} />
                <input type="text" placeholder='username' className='register-username' />
                <input type="text" placeholder='Email' className='email' />
                <input type="password" placeholder='Password' className='password' />
                <button className="sign-up">Sign Up</button>
            </form>
        </div>
    )
}