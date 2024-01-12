import { FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom'



function Nav({page}) {

  return (
    <div>
    <nav>
        <ol>
            <li className={page === 'home' ? 'navIcon active':'navIcon'}>
                <Link className='Link' to={"/"}>
                    <FaHome />
                </Link>
            </li>
            <li className={page === "add" ? 'active navIcon': 'navIcon'}>
                <Link className='Link' to={"/AddFlight"}>
                    <IoMdAdd />
                </Link>
            </li>
            <li className={page === 'history' ? 'navIcon active' : 'navIcon'}>
                <Link className='Link' to={"/FlightHistory"}>
                    <CgProfile />
                </Link>
            </li>
        </ol>
    </nav>
</div>  )
}

export default Nav