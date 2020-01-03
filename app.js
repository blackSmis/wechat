App({
	globalData: {
		url:"http://192.168.43.226/index.php/index/Info/",
		// url:"http://www.api.com/index.php/index/info/",
		cid:"",
		userInfo: null,
		course:"未定义",
		random: ""
	},
	onLaunch: function () {
		this.getTime();
	},
	getTime(){
		var t1 = new Date("2019/09/01 00:00:00");
		var t2 = new Date();
		//获取当前年月日
		this.globalData.year = t2.getFullYear();
		this.globalData.month = t2.getMonth() + 1;
		this.globalData.date = t2.getDate();
		var week = t2.getDay();
		if (week == 0) {
			this.globalData.week = '日'
		}
		if (week == 1) {
			this.globalData.week = '一'
		}
		if (week == 2) {
			this.globalData.week = '二'
		}
		if (week == 3) {
			this.globalData.week = '三'
		}
		if (week == 4) {
			this.globalData.week = '四'
		}
		if (week == 5) {
			this.globalData.week = '五'
		}
		if (week == 6) {
			this.globalData.week = '六'
		}

		var weekday1 = t1.getDay();  //储存开始时间的星期数
		var weekday2 = t2.getDay();  //储存结束时间的星期数
		if (weekday1 == 0) {
			weekday1 = 7
		}
		if (weekday2 == 0) {
			weekday2 = 7
		}

		this.globalData.weekday = weekday2;

		//日期格式化
		var start_date = new Date(t1.toString().replace(/-/g, "/"));
		var end_date = new Date(t2.toString().replace(/-/g, "/"));
		//转成毫秒数，两个日期相减
		var ms = end_date.getTime() - start_date.getTime();
		//转换成天数
		var day = parseInt(ms / (1000 * 60 * 60 * 24));

		//计算两个日期之间过了多少周
		var passweek = day / 7;
		passweek = parseInt(passweek);
		// console.log("过了"+passweek+"周")
		var rest = day % 7;
		var x = rest + weekday1;
		if (x > 7) {
			passweek = passweek + 1
		}
		//当前周要加1
		var nowweek = passweek + 1
		// console.log("本学期已过"+day+"天");
		this.globalData.nowweek = nowweek;
		// console.log("当前周次："+nowweek);
		// console.log("星期" + this.globalData.week);
		// console.log(t2);
	},
	rand: function (min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
})