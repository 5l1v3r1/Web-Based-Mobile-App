function startup() {
	document.getElementById('para1').addEventListener('touchstart', handle_touchstart);
	document.getElementById('para1').addEventListener('touchmove', handle_touchmove);
	document.getElementById('para1').addEventListener('touchend', handle_release);
	document.getElementById('canvas').addEventListener('touchstart', handle_touchstart);
	document.getElementById('canvas').addEventListener('touchend', handle_release);
	console.log('initialized')
}

function handle_touchstart(ev) {
	console.log(ev.touches, ev.type);
}

function handle_touchmove(ev) {
	console.log(ev.touches, ev.type);
}

function handle_release(ev) {
	console.log(ev.touches, ev.type);
}