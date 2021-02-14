import http from "./httpServices";

const URL = "/bloodtypes";

export const getBloodTypes = (page = 0, size = 10) => {
	const bloodtypes = http.get(`${URL}/?page=${page}&size=${size}`);
	return bloodtypes;
};

export const postBloodTypes = (data: any) => {
	const bloodtypes = http.post(URL, data);
	return bloodtypes;
};

export const deleteBloodtypes = (id: number) => {
	const bloodtypes = http.delete(`${URL}/${id}`);
	return bloodtypes;
};

export const updateBloodtypes = (data: any) => {
	const bloodtypes = http.put(`${URL}/${data.id}`, data.row);
	return bloodtypes;
};
