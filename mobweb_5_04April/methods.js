document.getElementById("myTextInput").focus();

function handle_button1() {
	document.getElementById('another_element').focus();
}

function handle_click_img() {
	alert('image clicked');
}

function handle_contrast() {
	var contrast_button = document.getElementById('contrast_button');

	if (document.body.style.background == 'gray') {
		document.body.style.background = 'white';
		contrast_button.innerHTML = 'Dark mode';
	}
	else {
		document.body.style.background = 'gray';
		contrast_button.innerHTML = 'Light mode';
	}
}