const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputLen: 4,
    iptValue: "",
    isFocus: false,
  },
  onFocus: function(e) {
    var that = this;
    that.setData({
      isFocus: true
    });
  },
  setValue: function(e) {
    var that = this;
    that.setData({
      iptValue: e.detail.value
    });
  },
  check() {
    wx.request({
      url: app.globalData.url+'check',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        random: this.data.iptValue,
        uid: wx.getStorageSync("uid")
      },
      success(res1) {
        console.log(res1);
				// 验证码正确
        if (res1.data.code == 200) {
						// 显示打卡状态
						wx.showToast({
							title: res1.data.msg,
							success() {
								// 打卡次数变化
								wx.request({
									url: app.globalData.url+'cardAdd',
									method: "POST",
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									data: {
										uid: wx.getStorageSync("uid"),
										week: app.globalData.nowweek
									},
									success(res2) {
										console.log(res2);
										if (res2.data.status) {
											if (res2.data.code == 401){
												wx.showToast({
													title: res2.data.msg,
													icon: "none",
													success(res) {
														console.log(res);	
													}
												})
											} else if (res2.data.code == 201){
												//将打卡信息插入到表内
												wx.request({
													url: app.globalData.url+'addCourseTime',
													method: "POST",
													header: {
														'content-type': 'application/x-www-form-urlencoded'
													},
													data: {
														cid: res1.data.data.cid,
														courseId: res1.data.data.courseId,
														time: res1.data.data.time,
														random: app.rand(1000, 9999)
													},
													success(res) {
														console.log(res);
														wx.showToast({
															title: res2.data.msg,
															icon: "none",
															success(res) {
																console.log(res);
																setTimeout(function () {
																	wx.switchTab({
																		// url: '../index/index',
																	})
																}, 1000)
															}
														})
													}
												})
											}
											
										}
									}
								})
							}
						})	
        } else {
					// 验证码错误
          wx.showToast({
            title: res1.data.msg,
            icon: "none",
            success() {}
          })
        }
      }
    })
  },
  navigate() {
    wx.switchTab({
      url: '../index/index',
    })
  }
})