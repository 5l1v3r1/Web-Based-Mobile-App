class Tabungan {

	constructor(nama, id, uang) {
		this.nama = nama;
		this.id = id;
		this.uang = uang;
	}

	get Name() {
		return this.nama;
	}

	set Name(nama) {
		this.nama = nama;
	}

	get Id() {
		return this.id;
	}

	set Id(id) {
		this.id = id;
	}

	get Uang() {
		return this.uang;
	}

	set Uang(uang) {
		this.uang = uang;
	}

	bungaSetiapBulan(bulan) {
		var bungaTotal = this.uang;
		for (var i in bulan) {
			bungaTotal += ( bungaTotal * (1/100) );
		}
		return bungaTotal;
	}
}

tabunganBudi = new Tabungan('Budi', 1, 10000);

console.log("GET")
console.log(tabunganBudi.Uang)
console.log(tabunganBudi.Id)
console.log(tabunganBudi.Name)
console.log(tabunganBudi.bungaSetiapBulan())

console.log("SET !!!")
tabunganBudi.Name = "Badi"
tabunganBudi.Id = 2
tabunganBudi.Uang = 15000

console.log("GET")
console.log(tabunganBudi.Uang)
console.log(tabunganBudi.Id)
console.log(tabunganBudi.Name)
console.log(tabunganBudi.bungaSetiapBulan())