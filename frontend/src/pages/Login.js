import { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='flex items-center justify-center w-full h-full'>
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
            <button className='btn-login-styles'>Login</button>
            </form>
        </div>
    )
}
export default Login