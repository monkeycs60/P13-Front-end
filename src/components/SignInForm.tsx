import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostUserMutation, usePostProfileMutation } from '../redux/apiSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setUserInfos } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';

export const SignInForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useAuth();

	// gestion de l'échec de connexion
	const [errorMessage, setErrorMessage] = useState('');

	//If the token is present, redirect to the user dashboard
	useEffect(() => {
		const token = Cookies.get('JSONWebToken');
		if (token) {
			navigate('/profile');
		}
	}, []);

	const passwordValidator = z
		.string()
		.min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
		.max(20, { message: 'Le mot de passe doit contenir au plus 20 caractères.' })
		.regex(/^[a-zA-Z0-9]+$/, {
			message:
				'Le mot de passe ne doit contenir que des lettres et/ou des chiffres.',
		});

	const schema = z.object({
		username: z.string().email(),
		password: passwordValidator,
		rememberMe: z.boolean(),
	});

	type SignInForm = z.infer<typeof schema>;

	const userProfileSchema = z.object({
		body: z.object({
			id: z.string(),
			firstName: z.string(),
			lastName: z.string(),
			email: z.string().email(),
			createdAt: z.string().refine((value) => !isNaN(Date.parse(value))),
			updatedAt: z.string().refine((value) => !isNaN(Date.parse(value))),
		}),
	});

	type UserProfile = z.infer<typeof userProfileSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<SignInForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			rememberMe: false,
		},
	});

	const [emailValue, setEmailValue] = useState('');
	useEffect(() => {
		//if user have already been connected, the email is stored in a cookie, then we can prefill the email input
		const userMail = Cookies.get('userMail');
		if (userMail) {
			setEmailValue(userMail);
			setValue('username', userMail);
		}
	}, [setValue]);

	const [postUser, { isLoading }] = usePostUserMutation();
	const [postProfile, { isLoading: isLoadingProfile }] =
		usePostProfileMutation();

	const onValid = async (data: SignInForm) => {
		try {
			const response = await postUser({
				email: data.username,
				password: data.password,
			}).unwrap();
			console.log(response);
			// Save the token, navigate to another page, etc.
			Cookies.set('JSONWebToken', response.body.token);
			// save the token in cookies
			const token = Cookies.get('JSONWebToken');
			setErrorMessage('');
			if (token) {
				const responseProfile: UserProfile = await postProfile({
					token: token,
				}).unwrap();

				const parsedProfile = userProfileSchema.safeParse(responseProfile);
				if (parsedProfile.success) {
					console.log(parsedProfile.data.body);
					if (data.rememberMe) {
						Cookies.set('userMail', parsedProfile.data.body.email);
						//set remember me checkbox checked by default
					}
					const { firstName, lastName, email, id } =
						parsedProfile.data.body;
					dispatch(
						setUserInfos({
							firstName,
							lastName,
							email,
							id,
							rememberMe: data.rememberMe,
						})
					);
				} else {
					console.log(parsedProfile.error);
				}
				navigate('/profile');
			}
		} catch (error) {
			console.error('Login error:', error);
			// Handle login error, show a message to the user, etc.
		}
	};

	const onInvalid = (errors: any) => {
		console.log(errors);
		setErrorMessage(
			'La connexion a échoué. Veuillez vérifier vos identifiants.'
		);
	};

	return (
		<section className="sign-in-content">
			<i className="fa fa-user-circle sign-in-icon"></i>
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit(onValid, onInvalid)}>
				<div className="input-wrapper">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						{...register('username')}
						defaultValue={emailValue}
					/>
					{errors.username && (
						<p className="input-error-message">
							{errors.username.message}
						</p>
					)}
				</div>
				<div className="input-wrapper">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" {...register('password')} />
					{errors.password && (
						<p className="input-error-message">
							{errors.password.message}
						</p>
					)}
				</div>
				<div className="input-remember">
					<input
						type="checkbox"
						id="remember-me"
						{...register('rememberMe')}
						defaultChecked={user.rememberMe}
					/>
					<label htmlFor="remember-me">Remember me</label>
				</div>
				<button className="sign-in-button" disabled={isLoading}>
					Sign In
				</button>
			</form>
			{errorMessage && <p className="input-error-message">{errorMessage}</p>}
		</section>
	);
};
