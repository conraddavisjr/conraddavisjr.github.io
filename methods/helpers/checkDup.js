export default function checkDup(items) {
	let collection = [];
	items.forEach((item) => {
		if (collection.indexOf(item) == -1) {
			collection.push(item);
		}
		else {
			console.warn("There's a dup! - Number: ", item)
		}
	});
}