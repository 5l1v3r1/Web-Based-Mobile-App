const ul = document.getElementById('authors');
const url = 'https://randomuser.me/api/?results=5';

function createNode(element) {
	return document.createElement(element);
}

function append(parent, element) {
	return parent.appendChild(element);
}

function getUsers() {
 	fetch(url).then((resp) => resp.json())
 		.then(handleReponse)
 		.catch(error);
}

function handleReponse(data) {
	let users = data.results;
	for (var i in users) {
		users_name = users[i].name;
		console.log(users_name['first'] + " " + users_name['last']);

		let li = createNode('li');
		let img = createNode('img');
		let span = createNode('span');

		img.src = users[i].picture.large;
		span.innerHTML = `${users_name.first} ${users_name.last}`;
		append(li, img);
		append(li, span);
		append(ul, li);
	}
}

function error(e) {
	console.log(e);
}