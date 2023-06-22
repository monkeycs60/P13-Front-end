import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../../../hooks/useAuth';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserInfos } from '../../../redux/userSlice';

export const Logout = () => {
	const { user } = useAuth();
	const dispatch = useDispatch();

	const disconnect = () => {
	//clean the cookie called JSONWebToken
	Cookies.remove('JSONWebToken');
	//clean the redux store
	dispatch(resetUserInfos());
	};

	return (
		<>
			<div className="nav-logout-container">
				<Link className="nav-user-info" to="/profile">
					<CgProfile size={30} className="icon-responsive" />
					<p className="nav-username">{user.firstName}</p>
				</Link>
				<Link className="main-nav-item" to="/" onClick={disconnect}>
					<MdLogout size={30} className="icon-responsive" />
					<p>Sign Out</p>
				</Link>
			</div>
		</>
	);
};
