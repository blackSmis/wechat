var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myinfo: null,
		show: false
  },
	onShow: function (options) {
		let that = this;
		wx.request({
			url: app.globalData.url+'getInfo',
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				uid: wx.getStorageSync("uid")
			},
			success(res) {
				console.log(res);
				that.setData({
					myinfo: res.data
				})
				if(res.data.status==0){
					that.setData({
						show : true
					})
				}else{
					that.setData({
						show: false
					})
				}
			}
		});
	},
  exit: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('uid');
          wx.redirectTo({
            url: '../login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
	edit:function(){
		wx.navigateTo({
			url: '../edit/edit',
		})
	}
})