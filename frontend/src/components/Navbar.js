import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className="w-screen bg-slate-600 min-h-[10%] flex justify-between items-center px-5">
            <NavbarLink href='/' title='Home'/>
            <div>
                <NavbarLink href='signup' title='Sign Up'/>
                <NavbarLink href='login' title='Login'/>
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