/*
	interpreted and compiled
	# javascript是一种解释性语言
	# 代码从上到下执行，执行的结果立即返回，不需要把js转换成另外一种可执行语言
	# c/c++是一种编译性语言，代码必须转换成另外一种可执行语言（汇编）才能执行
*/

/*
	server-side code and cliend-side code
	# client-side code指在用户的终端设备上运行的代码
	# server-side code指在服务器上运行的代码
	# 
*/

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
	how 'this' works
	# this的指向取决于一个方法如何被调用
	# new一个对象时，构造函数中的this指向被new出来的对象
	# 一个独立的function中，this指向global object
	# 调用一个对象的method，this指向这个对象
	# 当用call或apply调用一个function时，this指向通过参数传入的对象
*/

/*
	prototype
	# 原型是javascript实现继承的方法，这种继承更类似于代理
	# 每个对象都有一个原型的私有属性
	# 当访问一个对象的属性或方法是，如果该对象自己未定义该属性或方法，则会去它的原型中找，沿着原型链一直往上寻找，直到找到为止
	# 原型链的最上级是一个Object对象
*/

/*
	AMD and CommonJs
	# 都是常见的模块系统
	# AMD是异步加载的，而CommonJs是同步的
	# AMD比较适合浏览器环境，RequireJS实现了AMD
	# CommonJs更适合服务器环境， NodeJs实现了CommonJS
	# CommonJs语法更加简洁易用
	# ES2015自带模块系统
*/

/*
	null, undefined, undeclared
	# null是一个确定的值
	# undefind是变量被定义但是没呀被初始化
	# undeclared是变量未被定义
*/

/*
	closure
	# 一个function内部定义的一个function就是closure
	# 内部的function可以访问外部function的变量和参数，并保存起来，就算外部function return后也不会被GC回收
	# closure可以用来构建私有变量和方法
*/

/*
	anonymous functions
	# 匿名function可以用于IIFE
	# 可以作为一个callback参数
*/

/*
	Function.prototype.bind
	# 返回一个新的function
	# 新function的this会指向传入的第一个参数
*/

/*
	UA string
	# navigator.userAgent
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

/*
	event capturing and event bubbling
	# event capturing: 父元素先响应事件
	# event bubbling: 子元素先响应事件
	# w3c model两种机制都实现了，先capture再bubble
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

	// main();
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

/*
	HEX color to RGB
*/
(function(){
	function toRGB(colorInput){
		var pattern1 = /^#[0-9a-zA-Z]{3}$/;
		var pattern2 = /^#[0-9a-fA-F]{6}$/;
		if(pattern1.test(colorInput)){
			return colorInput;
		}else if(pattern2.test(colorInput)){
			var result = "rgb(num, num, num)";
			for(var i = 1; i < colorInput.length; i+=2){
				var subStr = colorInput.slice(i,i+2);
				console.log(subStr);
				var num = parseInt(subStr, 16);
				result = result.replace("num", num);
			}
			return result;
		}else{
			return "invalid";
		}
	}

	// console.log(toRGB("#ff0000"));
	// console.log(toRGB("#ggg"));
	// console.log(toRGB("#98798z"));

})();

(function(){
	var Obj = function(msg){
	    this.msg = msg;
	    this.shout = function(){
	        alert(this.msg);
	    }  
	    this.waitAndShout = function(){
	    	var that = this;
	        //隔五秒钟后执行上面的shout方法
	        setTimeout(function(){
	        	that.shout();
	        }, 5000);
	    }
	}
	// var obj = new Obj("hahaha");
	// obj.waitAndShout();
})();

(function(){
	function isValidEmail(email){
		var pattern = /^(\w+([\.-_]?\w+))*@(\w+([\.-_]?\w+))(\.w{2,3})$/;
		if (pattern.test(email)) {
			return true;
		}else{
			return false;
		}
	}
})();

(function(){
	/*用js生成：
		<div id=”example”>  
	    	<p class=”slogan”>京东商城</p>
		</div>
	*/
	function generateElement(){
		var divExample = document.createElement("div");
		divExample.id = "example";
		var pSlogan = document.createElement("p");
		pSlogan.className = "pSlogan";
		// pSlogan.appendChild(document.createTextNode("京东商城"));
		pSlogan.innerHTML = "京东商城";
		divExample.appendChild(pSlogan);
		document.body.appendChild(divExample);
	}

	// window.onload = generateElement;

})();

(function(){

	//编写一个通用的事件注册函数
	function addEvent(element, eventType, handler){
		if(element.addEventListener){
			element.addEventListener(eventType, handler, false);
		}else if(element.attachEvent){
			element.attachEvent("on"+eventType, handler);
		}else{
			element["on"+eventType] = handler;
		}
	}

})();

(function(){

	//给string增加一个trim方法
	String.prototype.trim = function(){
		return this.replace(/^\s*|\s*$/, '');
	}

	var str = "  水电费水电费       ";

})();

(function(){

	//把url中的参数解析并生成一个object
	//http://www.example.com?key1=val1&key2=val2&key3=val3...&keyN=valN
	function parseQueryString(url){
		if (url.indexOf("?") !== -1) {
			var queryPart = (url.split("?"))[1];
			var queryPairs = queryPart.split("&");
			console.log(queryPairs);
			var queryObj = {};
			queryPairs.forEach(function(item, index, haha){
				var keyValue = item.split("=");
				var key = keyValue[0];
				var val = keyValue[1];
				queryObj[key] = val;
			});
			return queryObj;
		}else{
			return {};
		}
	}

	var url = "http://www.example.com?key1=val1&key2=val2&key3=val3&keyN=valN"

})();

(function(){

	//删除数组中的重复元素并返回新数组
	if (!Array.prototype.distinct) {
		Array.prototype.distinct = function(){
			var arr = this;
		 	var result = arr.filter(function(item, index){
				return arr.indexOf(item)===index;
			});
			console.log(result);
			return result;
		}
	}

	var arr = [1,2,3,4,2,1,3,4];
	// arr.distinct();
})();
