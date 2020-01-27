export interface User{
	id: string,
	email: string,
	role: Role
}

export enum Role{
	User = 0,
	Admin = 1
}