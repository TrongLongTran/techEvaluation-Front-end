import {Link, useNavigate} from 'react-router-dom';
export default function NavBar(){
    const navigate = useNavigate();
    return(
        <nav className = 'navbar'>
            <>
            <Link to="/" className='nav-link'>Home</Link>
            <br/>
            <Link to='/findHist' className='nav-link'>History</Link>
            {/* <br/>
            <Link to='/newUser' className='nav-link'>Signup</Link> */}
            </>
        </nav>
    )
}