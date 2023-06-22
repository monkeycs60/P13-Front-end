import '../index.css';
import 'font-awesome/css/font-awesome.min.css';
import { Navbar } from '../components/Layout/Navbar/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features/Features';
import { Footer } from '../components/Layout/Footer';

export const Index = () => {
	return (
		<>
			<Navbar />
			<Hero />
			<Features />
			<Footer />
		</>
	);
};
