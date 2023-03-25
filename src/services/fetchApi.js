import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const fetchApi = (url, callbackData, callbackError, options) => {
	const defaultOptions = {
		Accept: "application/json",
		"Content-Type": "application/json",
	};

	const headerOptions = {
		...defaultOptions,
		...options,
	};

	return fetch(
		process.env.REACT_APP_API_URL +
			process.env.REACT_APP_API_URL_PREFIX +
			"/" +
			url,
		{
			headers: headerOptions,
		}
	)
		.then((response) => {
			// proveravamo da li je uspesan nas api poziv
			if (response.ok) return response.json();

			// ako je status od 400 do 500 (znaci nesto na frontendu nije dobro token , ruta itd )
			if (response.status < 500)
				return Promise.reject("Wrong credentials!");

			// ako je status veci od 500 (znaci greska je na backendu)
			return Promise.reject(
				"Oops something went wrong, please try later!"
			);
		})
		.then((res) => callbackData(res))
		.catch((error) => {
			MySwal.fire({
				title: "Your session expired",
				text: "Please sign in again!",
				icon: "error",
				confirmButtonText: "ok",
			}).then((result) => {
				callbackError();
			});
		});
};

export default fetchApi;
