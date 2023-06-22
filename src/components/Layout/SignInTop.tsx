import { useAuth } from '../../hooks/useAuth';
import { usePutProfileMutation } from '../../redux/apiSlice';
import { useDispatch } from 'react-redux';
import { updateUserInfos } from '../../redux/userSlice';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const nameSchema = z.object({
	firstName: z
		.string()
		.min(2, 'Le prénom doit contenir au moins 2 caractères.')
		.max(20, 'Le prénom doit contenir au plus 20 caractères.')
		.nonempty('Le prénom ne peut pas être vide.')
		.regex(/^[a-zA-Z]+$/, {
			message: 'Le prénom ne doit contenir que des lettres.',
		}),
	lastName: z
		.string()
		.min(2, 'Le nom doit contenir au moins 2 caractères.')
		.max(20, 'Le nom doit contenir au plus 20 caractères.')
		.nonempty('Le nom ne peut pas être vide.')
		.regex(/^[a-zA-Z]+$/, {
			message: 'Le nom ne doit contenir que des lettres.',
		}),
});

const SignInTop = () => {
	const dispatch = useDispatch();
	const { user } = useAuth();
	const [putProfile, { isLoading }] = usePutProfileMutation();

	// Handle edition of first name and last name
	const [isEditing, setIsEditing] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(nameSchema),
		defaultValues: {
			firstName: user.firstName,
			lastName: user.lastName,
		},
	});

	const handleSave = async (data: { firstName: string; lastName: string }) => {
		try {
			const updatedUser = {
				...user,
				firstName: data.firstName,
				lastName: data.lastName,
			};

			await putProfile(updatedUser).unwrap();

			// Update the local user state
			dispatch(updateUserInfos(updatedUser));

			setIsEditing(false);
		} catch (error) {
			console.error('Failed to update user profile', error);
		}
	};

	return (
		<div className="header">
			<h2>Welcome back</h2>
			{!isEditing ? (
				<div className="edited-area">
					<h2>
						{user.firstName} {user.lastName}!
					</h2>
					<button
						className="edit-button"
						onClick={() => setIsEditing(true)}
					>
						Edit Name
					</button>
				</div>
			) : (
				<form
					action=""
					className="form-update"
					onSubmit={handleSubmit(handleSave)}
				>
					<div className="update-form-inputs">
						<input
							type="text"
							defaultValue={user.firstName}
							{...register('firstName')}
						/>
						<input
							type="text"
							defaultValue={user.lastName}
							{...register('lastName')}
						/>
					</div>
					<div className="update-form-buttons">
						<button className="" type="submit">
							Save
						</button>
						<button
							className=""
							onClick={(e) => {
								e.preventDefault();
								setIsEditing(false);
							}}
						>
							Cancel
						</button>
					</div>
					<div className="input-error-message-update">
						{errors.firstName && <p>{errors.firstName.message}</p>}
						{errors.lastName && <p>{errors.lastName.message}</p>}
					</div>
				</form>
			)}
		</div>
	);
};

export default SignInTop;
