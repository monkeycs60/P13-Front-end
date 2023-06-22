import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const userApiSlice = createApi({
	reducerPath: 'userApiSlice',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3001/api/v1/user',
		prepareHeaders: (headers) => {
			const token = Cookies.get('JSONWebToken');
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => '/user',
		}),
		postUser: builder.mutation({
			query: (body) => ({
				url: '/login',
				method: 'POST',
				body,
			}),
		}),
		postProfile: builder.mutation({
			query: (body) => ({
				url: '/profile',
				method: 'POST',
				body,
			}),
		}),
		putProfile: builder.mutation({
			query: (body) => ({
				url: '/profile',
				method: 'PUT',
				body,
			}),
		}),
	}),
});

export const {
	useGetUserQuery,
	usePostUserMutation,
	usePostProfileMutation,
	usePutProfileMutation,
} = userApiSlice;
