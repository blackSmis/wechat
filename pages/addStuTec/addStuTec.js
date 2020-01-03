var app = getApp();
Component({
  data: {
    stuTec: false,
		myInfo: null,
		formDataStu: {},
		formDataTec: {},
		classIndex:0,
		myCid:[],
		myClass:[],
    rulesTec: [{
      name: 'username',
      rules: {
        required: true,
        message: '姓名是必须的'
      },
    }, {
      name: 'college',
      rules: {
        required: true,
        message: '学校是必须的'
      }
    }, {
      name: 'system',
      rules: {
        required: true,
        message: '院系是必须的'
      },
    }, {
      name: 'email',
      rules: [{
        required: true,
        message: '邮箱是必须的'
      }, {
        email: true,
        message: '邮箱格式不正确'
      }]
    }],
    rulesStu: [{
      name: 'username',
      rules: {
        required: true,
        message: '姓名是必须的'
      },
    }, {
      name: 'stuid',
      rules: {
        required: true,
        message: '学号是必须的'
      },
    }, {
      name: 'college',
      rules: {
        required: true,
        message: '学校是必须的'
      },
    }, {
      name: 'system',
      rules: {
        required: true,
        message: '院系是必须的'
      },
    }, {
      name: 'email',
      rules: [{
        required: true,
        message: '邮箱是必须的'
      }, {
        email: true,
        message: '邮箱格式不正确'
      }]
    }]
  },
  methods: {
    onLoad: function(e) {
      console.log(e);
			app.globalData.cid=this.data.myCid[0]
			this.showClass();
    },
    onShow: function(e) {

    },
		showClass: function () {
			let that = this;
			wx.request({
				url: app.globalData.url+'showClassName',
				method: "POST",
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					uid: wx.getStorageSync("uid")
				},
				success(res) {
					console.log(res.data)
					that.setData({
						myClass: res.data.myClass,
						myCid: res.data.myCid
					});
				},
				fail() {
					wx.showToast({
						title: '网络异常',
						duration: 1000,
						icon: "none"
					})
				}
			})
		},
		bindClassChange: function (e) {
			this.setData({
				classIndex: e.detail.value,
			})
		},
    switch (e) {
      this.setData({
        stuTec: e.detail.value
      })
      console.log(e.detail.value);
    },
    formInputChangeStu(e) {
      console.log(e.detail.value);
      const {
        field
      } = e.currentTarget.dataset;
      this.setData({
        [`formDataStu.${field}`]: e.detail.value
      })
    },
    formInputChangeTec(e) {
      console.log(e.detail.value);
      const {
        field
      } = e.currentTarget.dataset;
      this.setData({
        [`formDataTec.${field}`]: e.detail.value
      })
    },
    submitFormTec() {
      let that = this;
      this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors);
        if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
            this.setData({
              error: errors[firstError[0]].message
            })
          }
        } else {
          app.globalData.userInfo = that.data.formDataTec
          wx.showToast({
            title: '信息编辑成功',
            icon: "none",
            success() {
              setTimeout(function() {
                wx.request({
                  url: app.globalData.url+'addTecCode',
                  method: "POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    username: that.data.formDataTec.username,
                    college: that.data.formDataTec.college,
                    system: that.data.formDataTec.system,
                    email: that.data.formDataTec.email,
                    uid: wx.getStorageSync("uid")
                  },
                  success(res) {
                    console.log(res);
                    if (!res.data.status) {
                      wx.showToast({
                        title: '编辑成功',
                        success() {
                          setTimeout(function() {
                            wx.switchTab({
                              url: '../index/index',
                            })
                          }, 1000)
                        }
                      })
                    }
                  }
                })
              }, 2000)
            }
          })
        }
      })
      console.log(app.globalData);
    },
    submitFormStu() {
      let that = this;
      this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors);
        if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
            this.setData({
              error: errors[firstError[0]].message
            })
          }
        } else {
          app.globalData.userInfo = that.data.formDataStu
          wx.showToast({
            title: '信息编辑成功',
            icon: "none",
            success() {
              setTimeout(function() {
                wx.request({
                  url: app.globalData.url+'addStuCode',
                  method: "POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
										course: app.globalData.course,
                    username: that.data.formDataStu.username,
										stuid: that.data.formDataStu.stuid, 
										college: that.data.formDataStu.college,
										system: that.data.formDataStu.system,
                    email: that.data.formDataStu.email,
										cid: that.data.myCid[that.data.classIndex],
                    uid: wx.getStorageSync("uid")
                  },
                  success(res) {
                    console.log(res);
                    if (res.data.status) {
                      wx.showToast({
                        title: '编辑成功',
                        success() {
                          setTimeout(function() {
                            wx.switchTab({
                              url: '../index/index',
                            })
                          }, 1000)
                        }
                      })
                    }
                  }
                })
              }, 2000)
            }
          })
        }
      })
      console.log(app.globalData);
    }
  }
});