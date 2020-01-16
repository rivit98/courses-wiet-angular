export interface User{
	id: string,
	username: string,
	role:{
		admin: boolean,
		reader: boolean
	}
}