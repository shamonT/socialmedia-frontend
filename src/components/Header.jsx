import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout,reset } from 'state/auth/adminIndex'
import {  BsBellFill, BsSearch } from 'react-icons/bs'
function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { admin } = useSelector((state) => state.adminAuth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    console.log('header first console');
    navigate('/admin')
    console.log('header second console');
  }

  return (
    
    <div className='admin-navmain'>
    <div className='admin-logo'>
        <h2 className='admin-navlogo text-center '>SOCIOGRAM ADMIN PANEL</h2>
    </div>
    <div className='admin-icons'>
        <div className='admin-nav-search'>
            <BsSearch />
        </div>
        <div className='admin-nav-notification'>
            <BsBellFill />
        </div>
        <div className='admin-nav-profile'>

        <ul>
        {admin ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/admin'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            {/* <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li> */}
          </>
        )}
      </ul>
        </div>
    </div>
</div>
  )
}

export default Header