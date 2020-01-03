const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
	data: {
		startDate:'2016-09-01',
		endDate:'',
		date:'',
		cid: '',
		title: ["姓名", "学号", "时间", "情况"],
		record: [],
		haveRecord:false
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		console.log(options);
		this.getDate();
		this.setData({
			cid : options.cid
		})
		this.getRecord();
	},
	back() {
		wx.switchTab({
			url: '../index/index',
		})
	},
	bindDateChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
		this.getRecord();
	},
	getDate(){
		let date = new Date();
		let year = date.getFullYear(); //获取完整的年份(4位)
		let month = date.getMonth(); //获取当前月份(0-11,0代表1月)
		let day = date.getDate(); //获取当前日(1-31)
		this.setData({
			endDate: year + "-" + (month + 1) + "-" + day,	//确定今天年月日
			date: year + "-" + (month + 1) + "-" + day
		})
	},
	getRecord(){
		wx.request({
			url: app.globalData.url + 'getRecord',
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				cid: this.data.cid,
				date: this.data.date
			},
			success:res=>{
				console.log(res);
				let haveRecord = true;
				this.setData({
					record: res.data
				})
				if(this.data.record.length>0){
					haveRecord = true
				}else{
					haveRecord = false;
				}
				this.setData({
					haveRecord:haveRecord
				})
			}
		})
	}
})