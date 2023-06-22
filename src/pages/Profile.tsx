import { Navbar } from '../components/Layout/Navbar/Navbar';
import { Footer } from '../components/Layout/Footer';
import SignInTop from '../components/Layout/SignInTop';
import Account from '../components/Account';
import { useAuth } from '../hooks/useAuth';
import { redirect, Navigate } from 'react-router-dom';

export const User = () => {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) return <Navigate to="/" />;

	return (
		<div className="flexContainer">
			<Navbar />
			<main className="main bg-dark">
				<SignInTop />
				<h2 className="sr-only">Accounts</h2>
				<Account
					title="Argent Bank Checking (x8349)"
					amount="$2,082.79"
					description="Available Balance"
				/>
				<Account
					title="Argent Bank Savings (x6712)"
					amount="$10,928.42"
					description="Available Balance"
				/>
				<Account
					title="Argent Bank Credit Card (x8349)"
					amount="$184.30"
					description="Current Balance"
				/>
			</main>
			<Footer />
		</div>
	);
};
