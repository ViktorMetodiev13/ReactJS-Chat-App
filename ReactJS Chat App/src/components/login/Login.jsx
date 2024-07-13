import './login.css';

export const Login = () => {
    return (
        <div className="login">
            <h2 className="login-title">Welcome back,</h2>
            
            <form action="POST" >
                <input type="text" placeholder='Email' className='email'/>
                <input type="password" placeholder='Password' className='password'/>
                <button className="sign-in">Sign In</button>
            </form>
        </div>
    )
} 