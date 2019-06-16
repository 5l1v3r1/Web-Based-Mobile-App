self.onmessage = handleMessage

function handleMessage(e) {
	console.log(e.data);
	var hasil = 0;

	var jarak = parseInt(e.data.lokasiAsal) - parseInt(e.data.lokasiTujuan);
	if (jarak < 0) {
		jarak *= -1;
	}	

	var jenis_value = 0;
	if (e.data.jenis == 'regular'){
		jenis_value = 1;
	}
	else if (e.data.jenis == 'cepat') {
		jenis_value = 1.5;
	}
	else {
		jenis_value = 2.5;
	}

	hasil = jarak * 10000 * jenis_value * parseFloat(e.data.berat);
	console.log(hasil, jarak, jenis_value, parseFloat(e.data.berat));
	e.data.hasil = hasil;
	postMessage(e.data);
}