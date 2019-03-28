const cities = document.getElementById('cities');
const forecast_ids = ['1625822', '1621177', '1880252', '1835848', '879431', '361058']

function append(parent, child) {
	return parent.appendChild(child);
}

function getData() {
	for (var i in forecast_ids) {
		url = 'https://api.openweathermap.org/data/2.5/forecast?id=' + forecast_ids[i] + '&appid=c9ea18920466ec948b4f3ef1fd7e5cf6&units=metric'
		fetch(url).then((resp) => resp.json())
		.then(handleResponse).catch(error);	
	}
}

function handleResponse(data) {
	let div_baru = document.createElement('div');

	// CITY's IDENTITY
	let h_name = document.createElement('h1');
	h_name.class = 'cust-text';
	h_name.innerHTML = data.city.name;
	append(div_baru, h_name);

	let img_flag = document.createElement('img');
	if (data.city.country == 'ID') {
		img_flag.src = 'http://flags.fmcdn.net/data/flags/h80/id.png';
	}
	else if (data.city.country == 'SG') {
		img_flag.src = 'http://flags.fmcdn.net/data/flags/h80/sg.png';
	}
	else if (data.city.country == 'KR') {
		img_flag.src = 'http://flags.fmcdn.net/data/flags/h80/kr.png';
	}
	else if (data.city.country == 'EG') {
		img_flag.src = 'http://flags.fmcdn.net/data/flags/h80/eg.png';	
	}
	else if (data.city.country == 'ZW') {
		img_flag.src = 'http://flags.fmcdn.net/data/flags/h80/zw.png';	
	}
	append(div_baru, img_flag);

	// FORECAST
	let h_forecast = document.createElement('h3');
	h_forecast.innerHTML = 'Forecast';
	append(div_baru, h_forecast);

	// icon url: http://openweathermap.org/img/w/...png
	for (var i in data['list']) {
		let img = document.createElement('img');
		img.src = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
		img.class = ('weather-icon');
		append(div_baru, img);

		if (i == 5) 
			break;
	}
	append(cities, div_baru);
}

function error(e) {
	console.log(e);
}

getData();