import { useState } from 'react'

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className='form-styles'>
            <h1 className='text-2xl font-bold'>
                Sign Up
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
            
            <button className='btn-signup-styles'>Sign Up</button>
        </form>
    )
}

export default SignUp