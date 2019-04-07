var _BASE_URL_ = 'https://randomuser.me/api/?results=';

function append(parent, element) {
	return parent.appendChild(element);
}

function fetchData(response_count) {
	var request_url = _BASE_URL_ + response_count;
	fetch(request_url)
		.then((resp) => resp.json())
		.then(handleResponse)
		.catch(error);
}

function handleResponse(data) {
	var parent_div = document.getElementById('user-container');
	var users = data.results;
	
	for (var i in users) {
		var child_div 		= document.createElement('div');
		var img_tag 		= document.createElement('img');
		var fullname_tag 	= document.createElement('div');
		var email_tag 		= document.createElement('div');
		var phone_tag 		= document.createElement('div');

		var user = users[i];
		img_tag.src = user.picture.large;
		fullname_tag.innerHTML = user.name.title + ". " + user.name.first + " " + user.name.last;
		email_tag.innerHTML = user.email;
		phone_tag.innerHTML = user.phone;

		addEventListener(child_div);
		child_div.className += 'card';
		img_tag.className += 'cust-img';

		append(child_div, img_tag);
		append(child_div, fullname_tag);
		append(child_div, email_tag);
		append(child_div, phone_tag);
		append(parent_div, child_div);
	}
}

function error(e) { console.log(e); }

function addEventListener(element) {
	element.addEventListener('touchstart', function(){handleTouchStart(element)});
}

function handleTouchStart(element) {
	if (element.style.backgroundColor == 'white') {
		element.style.backgroundColor = 'red';
	} 
	else {
		element.style.backgroundColor = 'white';
	}
}


fetchData(10);