self.onmessage = function(e) {
	console.log('Message received from main script');
	var myResult = 'Result: ' + fibo_loop(e.data[0]);
	console.log('Posting message back to main script');
	postMessage(myResult);
}

function naive_fibo(n) {
	if (n == 1 || n == 2) {
		return 1;
	} 
	else {
		return naive_fibo(n-1) + naive_fibo(n-2);
	}
}

function fibo_with_memory(n) {
	memory = {
		1 : 1, 
		2 : 1
	};
	return fibo_memo(n , memory);
}

function fibo_memo(n, memory) {
	if (n in memory) {
		return memory[n];
	}
	else {
		var result = fibo_memo(n-1, memory) + fibo_memo(n-2, memory);
	}
	memory[n] = result;
	return result;
}

function fibo_loop (n) {
	memory = {};
	for (var i = 1; i <= n; i++) {
		if (i == 1 || i == 2) {
			memory[i] = 1;
			continue;
		}
		memory[i] = memory[i - 1] + memory[i - 2];
	}
	return memory[n];
}