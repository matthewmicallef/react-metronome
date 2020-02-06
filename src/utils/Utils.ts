export function getHash(hashName: string): string {
	return window.location.hash
		.substring(1)
		.split("&")
		.reduce((initial, item) => {
			if (item) {
				var parts = item.split("=");

				if (parts[0] === hashName)
					return decodeURIComponent(parts[1]);
			}
			return initial;
		}, "");
}

export default getHash;