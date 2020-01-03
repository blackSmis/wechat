const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
	data: {
		cid:'',
		title:["姓名","学号","打卡","迟到","成绩"],
		card: [],
		tid:''
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		console.log(options);
		let cid = this.data.cid;
		if(options){
			cid = options.cid
		}
		let that = this;
		wx.request({
			url: app.globalData.url+'stuCard',
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data:{
				cid : cid
			},
			success(res) {
				console.log(res.data);
				that.setData({
					card: res.data,
					cid : cid
				})
			}
		})
	},
	back() {
		wx.switchTab({
			url: '../index/index',
		})
	},
	inputChange(e) {
		console.log(e.detail.value);
	},
	formSubmit(e) {
		console.log(e.detail.value);
		wx.request({
			url: app.globalData.url+'addTestResCard',
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				cid: this.data.cid,
				data: JSON.stringify(e.detail.value)
			},
			success(res) {
				wx.showToast({
					title: '数据修改成功',
				})
				console.log(res.data);
			}
		});
	}
})