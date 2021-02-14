import http from "./httpServices";

const URL = "/donors";

export const getDonors = (page = 0, size = 10) => {
	const donors = http.get(`${URL}/?page=${page}&size=${size}`);
	return donors;
};

export const postDonors = (data: any) => {
	const donor = http.post(URL, data);
	return donor;
};

export const deleteDonor = (id: number) => {
	const donor = http.delete(`${URL}/${id}`);
	return donor;
};

export const updateDonor = (data: any) => {
	const donor = http.put(`${URL}/${data.id}`, data.row);
	return donor;
};
