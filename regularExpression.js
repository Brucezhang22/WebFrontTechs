/*
	\		:将某些普通字符转义为特殊字符，或者将特殊字符转义为普通字符
	^		:匹配字符串的开始，如果多行标志被设置为true，也会匹配换行符后面的字符
	$		:匹配字符串的结尾，如果多行标志被设置为true，也会匹配换行符前面的字符
	* 		:匹配前一个表达式0次或多次
	+		:匹配前一个表达式1次或多次
	？		:匹配前一个表达式0次或1次
			 如果跟在*, +, ?, {}后面则变为非贪婪模式，以匹配尽量少的字符
		 	 用于先行断言：x(?=y), x(?!y)
	.		:匹配除了换行符之外的单个字符
	(x)		:捕获括号，匹配x并记住匹配项，用\1, \2...来引用匹配项
	(?:x)	:非捕获括号，匹配x但不记住匹配项，
	x(?=y)	:只匹配后面跟着y的x
	x(?!y)	:只匹配后面不跟着y的x
	x|y		:匹配x或者y
	{n}		:匹配前面重复出现了n次的字符
	{n,m}	:匹配前面最少出现n次，最多出现m次的字符
	[xyz]	:匹配括号中的任意字符，'.', '*'这样的字符在括号中就是普通字符
	[^xyz]	:匹配任何未出现在括号中的字符
	[\b]	:匹配一个退格
	\b  	:匹配一个词的边界
	\B 		:匹配一个非单词边界
	\cX		:当X处于A到Z之间的时候，匹配字符串中的一个控制符
	\d		:匹配一个数字，等价于[0-9]
	\D 		:匹配一个非数字字符，等价于[^0-9]
	\f 		:匹配一个换页符
	\n 		:匹配一个换行符
	\r		:匹配一个回车符
	\s		:匹配一个空白字符，包括空格、制表符、换页符、换行符
	\S 		:匹配一个非空白字符
	\w		:匹配一个单字字符，等价于[a-zA-Z0-9]
	\W 		:匹配一个非单字字符，等价于[^a-zA-Z0-9]
	\n 		:当n是正整数，表示引用第n个被捕获的匹配项的匹配式
	\0		:匹配 NULL (U+0000) 字符
	\xhh	:与代码 hh 匹配字符（两个十六进制数字）
	\uhhhh	:与代码 hhhh 匹配字符（四个十六进制数字)
	\u{hhhh}:(仅当设置了u标志时) 使用Unicode值hhhh匹配字符 (十六进制数字).
*/

/*
	RegExp.prototype.exec()
	# 在指定的字符串中执行一个搜索匹配，返回一个结果对象或null
	# 语法：regexObj.exec(str)
	# 当使用全局查找'g'标志时，会多次执行exec方法来查找同一字符串中的所有匹配，每次查找将会从正则表达式的lastIndex指定的位置开始
*/
//示例
(function(){

	function example1(){
		var pattern = /quick\s(brown).+(jumps)/ig;
		var result = pattern.exec("The Quick Brown Fox Jumps Over The Lazy Dog");
		console.log(result);
	}

	function example2(){
		var pattern = /ab*/g;
		var str = 'abbcdefabh';
		var myArray;
		while((myArray = pattern.exec(str)) !== null){
			var msg = 'Found ' + myArray[0] + '. ';
			msg += 'Next match starts at ' + pattern.lastIndex;
			console.log(msg);
		}
	}

	function example3(){
		var matches = /(hello \S+)/.exec("This ia a hello world!");
		console.log(matches);
	}

})();

/*
	RegExp.prototype.test()
	# 用于判断指定的字符串与正则表达式是否匹配，返回true或false
	# 语法：regexObj.test(str)
*/
(function(){

	function example1(){
		var str = 'Hello World';
		var pattern = /^hello.*/i;
		console.log(pattern.test(str));
	}

	function testInput(pattern, str){
		var midStr;
		if (pattern.test(str)) {
			midStr = "contains";
		}else{
			midStr = "does not contain";
		}
		console.log(str + midStr + pattern.source);
	}

	// testInput(/#([0-9a-fA-F]){6}/, 'the color is #ff0000');

})();

/*
	String.prototype.match()
	# 用于检索一个字符串中和正则表达式匹配的项
	# 语法：str.match(regexp)
	# 返回一个包含整个匹配结果和任何括号捕获的匹配结果的对象
*/
(function(){

	function example1(){
		var str = "For more information, see Chapter 3.4.5.1";
		var pattern = /chapter\s\d+(\.\d)*/i;
		console.log(str.match(pattern));
	}

	function example2(){
		var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		var regexp = /[A-E]/gi;
		console.log(str.match(regexp));
	}

})();

/*
	String.prototype.search()
	# 用于执行正则表达式和一个字符串之间的搜索匹配
	# 语法：str.search(regexp)
	# 如果有匹配返回字符串中首次匹配的索引，没有匹配返回-1
*/
(function(){

	function testInput(pattern, str){
		var midStr;
		if (str.search(pattern) != -1) {
			midStr = ' contains '
		}else{
			midStr = ' does not contain ';
		}
		console.log(str + midStr + pattern);
	}

	// testInput(/#[0-9a-fA-F]{6}/, 'the background color is #ff8300');

})();

/*
	String.prototype.replace()
	# 用于替换字符串中符合匹配模式的字符串，并返回一个新的字符串
	# 语法：str.replace(regexp|substr, newSubStr|function)
	# 当第一个参数为字符串的时候，只有第一个匹配会被替换掉
	# 当第一个参数为正则表达式的时候，如果要全局搜索替换要加上'g'标志
	# 当第二个参数为function的时候，该function需要返回一个字符串
*/
(function(){

	//第二个参数为function
	function example1(){
		function replacer(match, p1, p2, p3, offset, str){
			console.log(match);
			console.log(offset);
			console.log(str);
			return [p1, p2, p3].join("-");
		}

		var str = "abc12345#$*%";
		console.log(str.replace(/(\D*)(\d*)(\W*)/, replacer));
	}

	//交换字符串中两个单词的位置
	function example2(){
		var pattern = /(\w+)(\s)(\w+)/;
		var str = "Bruce Lee";
		console.log(str.replace(pattern,'$3$2$1'));
	}

	//将驼峰命名改为连字符命名
	function example3(){
		function upperToHyphenLower(str){
			return "-"+str.toLowerCase();
		}

		var str = "bruceLee and tonyStark";
		console.log(str.replace(/[A-Z]/g, upperToHyphenLower));
	}

	//将华氏温度转换为摄氏温度
	function example4(){
		function converter(str, p1, offset, s){
			console.log(p1);
			return ((p1-32) * 5/9).toFixed(2) + "C";
		}
		var pattern = /(\d+(?:\.\d+)?)F\b/g;
		var str = "It's 78.87F today";
		console.log(str.replace(pattern, converter));
	}

})();

/*
	String.prototype.split()
	# 使用指定的分割字符串将一段字符串分割成一个字符串数组
	# 语法：str.splite([separator[, limit]])
	# separator可以是一个字符串或正则表达式
	# limit是一个整数，表示限定返回的分割片段的数量
*/
(function(){

	function example1(){
		var myString = "Hello World. How are you doing?";
		var splits = myString.split(/[\W]/);
		console.log(splits);
	}

	example1();

})();






