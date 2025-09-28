import {Link, useNavigate} from 'react-router-dom';
export default function NavBar(){
    const navigate = useNavigate();
    return(
        <nav className = 'navbar'>
            <>
            <Link to="/" className='nav-link'>Result</Link>
            <br/>
            <Link to='/findHist' className='nav-link'>History</Link>
            <br/>
            <Link to='/summary' className='nav-link'>Summary</Link>
            <br/>
            <Link to='/voting' className='nav-link'>Vote here!!</Link>
            </>
        </nav>
    )
}