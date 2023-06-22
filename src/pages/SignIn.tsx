import { Navbar } from '../components/Layout/Navbar/Navbar';
import { Footer } from '../components/Layout/Footer';
import { SignInForm } from '../components/SignInForm';

export const SignIn = () => {
	return (
		<div className="flexContainer">
			<Navbar />
			<main className="main bg-dark">
				<SignInForm />
			</main>
			<Footer />
		</div>
	);
};
