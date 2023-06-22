import { useSelector } from 'react-redux';
import { userSliceState } from '../redux/types';
import Cookies from 'js-cookie';

export const useAuth = () => {
	const user = useSelector((state: userSliceState) => state.userDatas);
	const isAuthenticated = !!Cookies.get('JSONWebToken');
	console.log('isAuthenticated', isAuthenticated);
	console.log('user', user);
	

	return { user, isAuthenticated };
};
