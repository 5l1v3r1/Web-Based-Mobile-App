var _BASE_URL_ = "http://data.fixer.io/api/";
var access_key = "?access_key=d075bbebec6569d866a570a7ab152f2d";
var mata_uang_tujuan_default = ['JPY', 'IDR', 'MYR', 'TWD', 'EUR', 'USD', 'ZMW', 'ZWL', 'KHR', 'CZK', 'LSL', 'SYP'];

function fetchData() {
	var url = _BASE_URL_;

	var date = document.getElementById('tanggal').value;
	var currencies = document.getElementById('mata-uang-tujuan');
	var symbols = "&symbols=";	
	var base = "&base=" + document.getElementById('mata-uang-awal').value;

	// symbols
	for (var i in currencies.options) {
		if (currencies.options[i].value == null) {
			continue;
		}
		symbols += currencies.options[i].value;
		if (i < currencies.options.length - 1) {
			symbols += ',';
		} else {
			break;
		}
	}

	url += date + access_key + symbols + base;
	console.log(url);
	fetch(url)
		.then((resp) => resp.json())
		.then(handleResponse)
		.catch(error);
}

function handleResponse(data) {
	console.log(data);

	var div_parent = document.getElementById('parent');

	while (div_parent.firstChild) {
		div_parent.removeChild(div_parent.firstChild);
	}

	var amount = document.getElementById('total-amount').value;

	var index = 0;
	for (var i in data.rates) {
		console.log(data.rates[i]);

		var div_child = document.createElement('div');
		div_child.className += 'box';

		var h_title = document.createElement('h1');
		h_title.innerHTML = data.base + " to " + Object.keys(data.rates)[index];

		console.log(amount);
		var value = document.createElement('h2');
		value.innerHTML = data.rates[i] * amount;

		div_child.appendChild(h_title);
		div_child.appendChild(value);
		div_parent.appendChild(div_child);

		index++;
	}

}

function error (e) {
	console.log(e);
}

function handleAmountChanges(value) {
	var jumlah_mata_uang = value;

	var parent = document.getElementById('mata-uang-tujuan');
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}

	for (var i = 0; i < value; i++) {
		var option = document.createElement('option');
		option.innerHTML = mata_uang_tujuan_default[i];
		parent.appendChild(option);
	}
	// fetchData()
}
