import { useState } from 'react'

const SignUp = () => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username !== '') {
            localStorage.setItem('username', username); 
            window.location.replace('http://localhost:3000')    
        }
    }
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <form onSubmit={handleSubmit} className='form-styles'>
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
            </div>
            
            <button className='btn-signup-styles'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp