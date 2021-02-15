import http from "./httpServices";

const URL = "/users";

export const postUser = (data: any) => {
	const user = http.post(URL, data);
	return user;
};

