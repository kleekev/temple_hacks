import { useState, useEffect } from 'react'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className='form-styles'>
            <h1 className='text-2xl font-bold'>
                Login
            </h1>
            <div className='input-styles'> 
                <label>Username</label>
                <input
                    type='username'    
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <label>Password</label>
                <input
                    type='password'    
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            
            <button onClick={loginBtn} className='btn-login-styles'>Login</button>
        </form>
    )
}
export default Login