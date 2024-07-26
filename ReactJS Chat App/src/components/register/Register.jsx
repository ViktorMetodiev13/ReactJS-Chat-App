import "./register.css";

import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../configs/firebase";
import { upload } from "../../configs/upload";

import { toast } from 'react-toastify';

import { useState } from "react";

export const Register = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: "",
    });

    const [loading, setLoading] = useState(false);

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        };
    };

    const onRegisterSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            let imgUrl = "";

            if (avatar.file) {
                imgUrl = await upload(avatar.file);
            }

            await setDoc(doc(db, "users", res.user.uid), {
                id: res.user.uid,
                username,
                email,
                avatar: imgUrl,
                blocked: [],
                status: '',
            });

            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            });

            toast.success("Account created!");

            if (avatar.file) {
                window.location.href = '/';
            };
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error("This email is already in use.");
            } else if (error.code === 'auth/weak-password') {
                toast.error("Password should be at least 6 characters.");
            } else if (error.code === 'auth/invalid-email') {
                toast.error("Your email should include @ and .com at the end.");
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register">
            <h2 className="login-title">Create an Account</h2>

            <form className="register-form" onSubmit={onRegisterSubmit}>
                <label htmlFor="file" className="register-upload-avatar-label">
                    <img
                        src={avatar.url || "./avatar.png"}
                        alt="avatar png"
                        className="register-avatar-png"
                    />
                    <span className="upload-avatar-text">Upload an avatar</span>
                </label>
                <input type="file" id="file" className="register-upload-avatar-field" onChange={handleAvatar} />
                <input type="text" placeholder='Username' className='register-username' name="username" required />
                <input type="text" placeholder='Email' className='email' name="email" required />
                <input type="password" placeholder='Password' className='password' name="password" required />
                <button className="sign-up" disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
            </form>
        </div>
    )
}