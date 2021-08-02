const monthHandler = i => {
	return [
		'jan',
		'feb',
		'mar',
		'apr',
		'may',
		'jun',
		'jul',
		'aug',
		'sep',
		'oct',
		'nov',
		'dec',
	][i];
};

export const timeHandler = t => {
	// const years = Math.floor(t / (1000 * 60 * 60 * 24 * 30 * 12));
	// const months = Math.floor((t / (1000 * 60 * 60 * 24 * 30)) % 12);
	// const days = Math.floor((t / (1000 * 60 * 60 * 24)) % 30);
	// const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	// const minutes = Math.floor((t / (1000 * 60)) % 60);
	// return `${days} ${monthHandler(months)} ${years}, ${hours} h ${minutes} min`;
	const isoDate = new Date(t).toISOString();
	return isoDate.substr(0, 10);
};
