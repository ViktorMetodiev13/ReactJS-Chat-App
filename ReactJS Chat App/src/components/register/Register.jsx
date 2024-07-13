import "./register.css";

export const Register = () => {
    return (
        <div className="register">
            <h2 className="login-title">Create an Account</h2>

            <div className="register-avatar">
                <img src="./avatar.png" alt="" className="register-avatar-png" />
                <a href="#">Upload an avatar</a>
            </div>

            <form action="POST" >
                <input type="text" placeholder='username' className='username' />
                <input type="text" placeholder='Email' className='email' />
                <input type="password" placeholder='Password' className='password' />
                <button className="sign-in">Sign Up</button>
            </form>
        </div>
    )
}