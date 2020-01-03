const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
	data: {
		cid: '',
		title: ["姓名", "学号", "科目","成绩"],
		result: []
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		console.log(options);
		let cid = this.data.cid;
		if (options) {
			cid = options.cid
		}
		let that = this;
		wx.request({
			url: app.globalData.url+'stuAllResult',
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				cid: cid
			},
			success(res1) {
				console.log(res1.data);
				wx.request({
					url: app.globalData.url+'stuResult',
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						cid: cid
					},
					success(res) {
						for (var key in res.data) {
							for (var key1 in res1.data) {
								if (res1.data[key1].stuid == res.data[key].stuid){
									res.data[key].result += res1.data[key1].result
								}
							}
						} 
						for (var key in res.data) {
							res.data[key].result = Math.ceil(res.data[key].result);
						} 
						that.setData({
							result: res.data,
							cid: cid
						})
						console.log(res.data);
					}
				});
				
			}
		})
	},
	back() {
		wx.switchTab({
			url: '../index/index',
		})
	}
})