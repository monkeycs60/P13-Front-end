export type userSliceProps = {
	email: string;
	firstName: string;
	lastName: string;
	id: string;
	createdAt: string;
	updatedAt: string;
	rememberMe: boolean;
};

export type userSliceState = {
	userDatas: userSliceProps;
	userApiSlice: any;
};
