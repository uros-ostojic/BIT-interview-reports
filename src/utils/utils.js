export const formattedDate = (dateString, separator = "-") => {
	const today = new Date(dateString).toISOString().split("T")[0];

	return today.split("-").reverse().join(separator);
};

export const parseJwt = (token) => {
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
};

export const validateEmail = (email) => {
	var mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

	if (email.match(mailFormat)) return true;

	return false; 
};
