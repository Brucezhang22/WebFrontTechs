/*
	javascript data types
	# string
	# number
	# boolean
	# array
	# function
	# object
*/

/*
	the definition of 'first-class function':
	# a function is an instance of the Object type
	# a function can have properties and has a link back to its constructor
	# you can store a function in a variable
	# you can pass the funtion as a parameter to another function
	# you can return a function form a function 
*/

/*
	inmmutability and mutability in javascript
	# 基本数据类型中string和number是immutable的
	# TODO
*/

/*
	synchronous and asynchronous
	# sync是阻塞的，async不是
	# sync的执行顺序是由上到下，前一条语句执行完成才能执行下一条语句，async不是
	# async function一般会传入一个callback参数
	# callback在异步操作完成后，而且call stack为空的时候才会执行
	# async function主要用于I/O密集型的操作，比如加载文件、网络请求
*/

/*
	event loop
	# 用于监听call stack和task queue的一个单线程循环
	# 当call stack不满的时候，会从task queue中取出一个task并执行
	# 一个task完全执行完才能执行下一个task
	# 
*/

(function(){
	function main(){

		console.log("start main"); //1

		function a(aCallback){

			console.log("start a"); //2

			function aSubFun1(){
				console.log("start aSubFun1"); //3
				console.log("end aSubFun1"); //4
			}

			aSubFun1();

			setTimeout(aCallback, 1000);

			console.log("end a");
		}

		a(()=>{
			console.log("start aCallback"); //6
			// throw "aCallback failed";
			console.log("end aCallback"); //7
		});

		console.log("end main"); //5
	}

	main();
})();

/*
	Promise

	# Promise是一种优化异步任务执行的方法，可以避免callback hell
	# Promise可以类比C#里面的task，表示一个异步执行的任务
	# 执行一个async function即返回一个Promise对象，对应于C#里面执行一个async方法返回一个Task
	# 创建一个Promise需要传入一个方法(executor)
	# executor应该有两个参数：一个successCallback(resolve)、一个failureCallback(reject)
	# 创建一个Promise对象的时候，即开始执行executor
	# 
	# Promise有四种状态：pending, fulfilled, rejected, settled
	#
*/

"use strict";

//Promise常用用法示例
(function() {
	var promiseCount = 0;

	function CreatePromise(promiseIndex) {
		return new Promise((resolve, reject) => {
			log.insertAdjacentHTML(
				"beforeend",
				promiseIndex +
					") Promise started (<small>Async code started</small>)<br/>"
			);
			let condition = Math.random() > 0.5;
			if (condition) {
				setTimeout(function() {
					resolve(promiseIndex);
				}, Math.random() * 2000 + 1000);
			} else {
				reject({
					promiseIndex: promiseIndex,
					reason: "condition failed"
				});
			}
		});
	}

	function testPromise() {
		let promiseIndex = ++promiseCount;

		let log = document.getElementById("log");
		log.insertAdjacentHTML(
			"beforeend",
			promiseIndex + ") Started (<small>Sync code started</small>)<br/>"
		);

		let p1 = CreatePromise(promiseIndex);

		let resolve = val => {
			log.insertAdjacentHTML(
				"beforeend",
				val +
					") Promise fulfilled (<small>Async cide terminated</small>)</br>"
			);
			return CreatePromise(++val);
		};

		let reject = val => {
			log.insertAdjacentHTML(
				"beforeend",
				val.promiseIndex +
					") Handle rejected promise (" +
					val.reason +
					") here.<br/>"
			);
		};

		p1
			.then(resolve)
			.then(resolve)
			.then(resolve)
			.catch(reject);

		log.insertAdjacentHTML(
			"beforeend",
			promiseIndex +
				") Promise made (<small>Sync code terminated</small>)<br/>"
		);
	}

	// testPromise();
})();

(function() {
	/*	
		Promise.resolve()研究
		# resolve会返回一个promise
		# 
	*/

	//场景1，传入一个普通对象
	function resolveValue() {
		Promise.resolve("hahaha").then(val => {
			console.log(val);
		});
	}

	//场景2，传入一个thenable（具有then方法的对象）
	function resolveThenable() {
		var thenable = {
			then: function(resolve, reject) {
				throw "something wrong";
				resolve("I'm thenable");
			}
		};
		Promise.resolve(thenable)
			.then(val => {
				console.log(val);
			})
			.catch(err => {
				console.log(err);
			});
	}

	//场景3，传入一个promise
	function resolvePromise() {
		var pro = new Promise((resolve, reject) => {
			let condition = Math.random() > 0.5;
			if (true) {
				setTimeout(function() {
					resolve("job done");
				}, 1000);
			} else {
				throw { reason: "something wrong after resolve" };
				reject("something wrong");
			}
		});

		console.log(Promise.resolve(pro));

		// pro
		// 	.then(
		// 		val => {
		// 			console.log(val);
		// 		},
		// 		err => {
		// 			console.log("then error: " + err);
		// 		}
		// 	)
		// 	.catch(err => {
		// 		console.log("catch error: " + err);
		// 	});
		// Promise.resolve(pro).then(val=>{
		// 	console.log(val);
		// }).catch(err=>{
		// 	console.log(err);
		// });
	}

	// resolveValue();
	// resolveThenable();
	// resolvePromise();
})();
