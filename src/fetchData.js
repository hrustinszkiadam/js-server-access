const fetchData = async (url) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err);
	}
};

const isValidIPv4 = (octet1, octet2, octet3, octet4) => {
	const isValidOctet = (octet) => {
		return Number.isInteger(octet) && octet >= 0 && octet <= 255;
	};

	if (
		isValidOctet(octet1) &&
		isValidOctet(octet2) &&
		isValidOctet(octet3) &&
		isValidOctet(octet4)
	)
		return true;
	return false;
};

const postData = async (url, data) => {
	try {
		await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	} catch (err) {
		console.error(err);
	}
};

export { fetchData, isValidIPv4, postData };
