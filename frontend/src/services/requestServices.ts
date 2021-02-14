import http from "./httpServices";

const URL = "/requests";

export const getRequests = (page = 0, size = 10) => {
	const requests = http.get(`${URL}/?page=${page}&size=${size}`);
	return requests;
};

export const postRequests = (data: any) => {
	const requests = http.post(URL, data);
	return requests;
};

export const deleteRequest = (id: number) => {
	const request = http.delete(`${URL}/${id}`);
	return request;
};

export const updateRequest = (data: any) => {
	const request = http.put(`${URL}/${data.id}`, data.row);
	return request;
};
