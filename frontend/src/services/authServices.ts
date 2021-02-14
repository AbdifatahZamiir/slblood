import http from "./httpServices";
import jwtDecode from "jwt-decode";

const URL = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login({ email, password }: any) {
	const { data: jwt }: any = await http.post(URL, { email, password });
	localStorage.setItem(tokenKey, jwt);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt as string);
	} catch (ex) {
		return null;
	}
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

// export function loginWithJwt(jwt: string) {
// 	localStorage.setItem(tokenKey, jwt);
// }

const auth = {
	login,
	logout,
	getCurrentUser,
	getJwt,
};

export default auth;
