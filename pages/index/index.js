const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stuInfo: "",
    teacher: true,
    funcImageUrl: true,
    sign: 0,
    isshow: false,
    fctShow: false,
    myClass: null,
    functions: [{
      name: "学生管理",
      src: "xsgl.png",
      url: "students"
    }, {
      name: "分配分值",
      src: "achievegl.png",
      url: "achieveEdit"
    }, {
      name: "打卡签到",
      src: "card.png",
      url: "card"
    }, {
      name: "添加学生",
      src: "add3.png",
      url: "add"
    }],
    news: [{
      name: "打卡信息",
      src: "cardjl.png",
      url: "cardjl"
    }, {
      name: "成绩统计",
      src: "statis.png",
      url: "achievetj"
    }, {
      name: "总成绩",
      src: "zcj.png",
      url: "statistics"
    }, {
      name: "打卡记录",
      src: "record.png",
      url: "record"
			}],
			activeName: 0
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		let uid = wx.getStorageSync("uid");
		console.log(uid);
		if (!uid) {
			console.log("aa");
			wx.navigateTo({
				url: '/pages/login/login'
			});
		}else{
			wx.request({
				url: app.globalData.url + 'getInfo',
				method: "POST",
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					uid: wx.getStorageSync("uid")
				},
				success(res) {
					console.log(res);
					if (res.data.username && res.data.college && res.data.system && res.data.email) {
						if (res.data.stuid == null) {
							wx.switchTab({
								url: '/pages/index/index'
							});
						} else {
							wx.navigateTo({
								url: '/pages/check/check'
							});
						}
					} else {
						wx.navigateTo({
							url: '/pages/addStuTec/addStuTec'
						});
					}
				}
			});
		}
  },
	onShow:function(){
		let that = this;
		wx.request({
			url: app.globalData.url+'isTeacher',
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				uid: wx.getStorageSync("uid")
			},
			success(res) {
				console.log(res);
				if (res.data.status == false) {
					//用户为学生
					wx.request({
						url: app.globalData.url+'showStuInfo',
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
								stuInfo: res.data
							});
						}
					})
				}
			}
		});
		this.showClass();
	},
	onChange(event) {
		this.setData({
			activeName: event.detail
		});
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.showClass();
  },
  create: function() {
    wx.navigateTo({
      url: '../create/create',
    })
  },
  showClass: function() {
    let that = this;
    wx.request({
      url: app.globalData.url+'showClass',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: wx.getStorageSync("uid")
      },
      success(res) {
        if (res.data.teacher) {
          that.setData({
            teacher: res.data.teacher,
            myClass: res.data.data
          });
        } else {
          that.setData({
            teacher: res.data.teacher
          });
        }
        console.log(res);
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
  change: function() {
    this.setData({
      funcImageUrl: !this.data.funcImageUrl,
      fctShow: !this.data.fctShow
    })
  },
  delete: function(e) {
    console.log(e);
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      success: function(res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: app.globalData.url+'deleteClass',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              cid: e.currentTarget.dataset.cid
            },
            success(res) {
              console.log(res);
              that.onShow();
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  isshow(e) {
    let sign = this.data.sign;
    let id = e.currentTarget.dataset.id;
    // console.log(id);
    if (sign == id) {
      this.setData({
        sign: id,
        isshow: !this.data.isshow
      })
    } else {
      this.setData({
        sign: id,
        isshow: false
      })
    }
  },
  edit(res) {
    wx.navigateTo({
      url: '../editclass/editclass?cid=' + res.currentTarget.dataset.cid
    })
  },
  getCid(res) {
    app.globalData.cid = res.currentTarget.dataset.cid;
  }
})