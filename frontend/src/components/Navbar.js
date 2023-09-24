import { Link } from 'react-router-dom'

const Navbar = () => {
    const username = localStorage.getItem('username') !== null ? localStorage.getItem('username'): null;
    console.log(username);
    return (
        <header className="w-screen bg-slate-600 min-h-[10%] flex justify-between items-center px-5">
            <NavbarLink href='/' title='Home'/>
            <div>
                {!username ? <NavbarLink href='signup' title='Sign Up'/> :
                <div>
                    <NavbarLink href='/carpool/create' title='Create a Pool'/>
                    <NavbarLink href='/carpool/request' title='Request a Pool'/>
                </div>
                }
            </div>
        </header>
    )
}

const NavbarLink = (props) => {
    return (
        <Link className="text-lg text-white m-2" to={props.href}>
            {props.title}
        </Link>
    )
}
export default Navbar