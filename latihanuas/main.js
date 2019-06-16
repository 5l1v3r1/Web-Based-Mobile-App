if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('./service-worker.js')
            .then((reg) => {
                console.log('Service worker registered. scope: ', reg.scope);
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

const beratElement 			= document.getElementById('berat')
const jenisElement 			= document.getElementById('jenis')
const hasilElement 			= document.getElementById('hasil')
const lokasiAsalElement 	= document.getElementById('lokasi-asal')
const lokasiTujuanElement 	= document.getElementById('lokasi-tujuan')

const worker = new Worker('worker.js');

function saveToLocal(e) {
	localStorage.setItem('hasil', e.data.hasil);
	localStorage.setItem('berat', e.data.berat);
	localStorage.setItem('jenis', e.data.jenis);
	localStorage.setItem('lokasiAsal', e.data.lokasiAsal);
	localStorage.setItem('lokasiTujuan', e.data.lokasiTujuan);
	console.log(localStorage.getItem('hasil'), 
				localStorage.getItem('berat'), 
				localStorage.getItem('jenis'),
				localStorage.getItem('lokasiAsal'),
				localStorage.getItem('lokasiTujuan'),);
}

worker.onmessage = function(e) {
	hasilElement.value = e.data.hasil;
	saveToLocal(e);
}

function submitOnChange() {
	var data = {
		'berat': beratElement.value,
		'jenis': jenisElement.options[jenis.selectedIndex].value,
		'hasil': hasilElement.value,
		'lokasiAsal': lokasiAsalElement.options[lokasiAsalElement.selectedIndex].value,
		'lokasiTujuan': lokasiTujuanElement.options[lokasiTujuanElement.selectedIndex].value
	}
	worker.postMessage(data);
}

lokasiAsalElement.onchange 	 = submitOnChange;
lokasiTujuanElement.onchange = submitOnChange;
jenisElement.onchange 		 = submitOnChange;
beratElement.onchange 		 = submitOnChange;

