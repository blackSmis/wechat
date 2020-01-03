const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval: "",
    cid: "",
    imagePath: "../../icons/code.jpg",
    title: ["学生", "学号", "打卡"],
    students: [],
    stop: true,
    courseTime: "",
    timestamp: (new Date()).getTime(),
    random: app.rand(1000, 9999),
    haveCourse: false,
		haveRand: true,
		stuid:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    this.setData({
      interval: setInterval(function() {
        console.log("刷新页面");
        // wx.setStorageSync("cid", options.cid)
        that.getCourse();
        wx.request({
          url: app.globalData.url+'getStuCard',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            cid: wx.getStorageSync("cid")
          },
          success(res) {
            console.log(res.data);
            if (that.data.haveCourse) {
              //实现验证码更新
              wx.request({
                url: app.globalData.url+'getCode',
                method: "POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  cid: wx.getStorageSync("cid")
                },
                success(res) {
                  that.setData({
                    random: res.data.random
                  })
                }
              })
            }
            that.setData({
							cid: wx.getStorageSync("cid")
            })
            for (var i = 0; i < res.data.length; i++) {
              let temp = true;
              if (that.data.stop) {
                that.data.students.forEach(item => {
                  if (item.stuid == res.data[i].stuid) {
                    temp = false;
                  }
                })
                if (temp) {
                  that.setData({
                    students: that.data.students.concat({
                      username: res.data[i].username,
                      stuid: res.data[i].stuid,
                      msg: "未打卡"
                    })
                  })
                }
                if (i == res.data.length - 1) {
                  that.setData({
                    stop: false
                  })
                }
              }
							let arr = that.data.stuid;
							for (let j = 0; j < arr.length;j++){
								if (that.data.students[i].stuid == that.data.stuid[j].stuid && that.data.students[i].msg != "已打卡") {
									let arr = that.data.students;
									let username = arr[i].username;
									let stuid = arr[i].stuid;
									arr.splice(i, 1);
									arr.unshift({
										username: username,
										stuid: stuid,
										msg: "已打卡"
									})
									that.setData({
										students: arr
									})
								}
							}
              
            }
          }
        })
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.interval);
  },
  getCourse: function() {
    let that = this;
    wx.request({
      url: app.globalData.url+'getCourseTime',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
				cid: that.data.cid,
        week: app.globalData.nowweek,
        sunday: app.globalData.weekday
      },
      success(res) {
        console.log(res.data);
        if (res.data.length != 0) {
          that.setData({
            courseTime: res.data,
            haveCourse: true
          })
					if(that.data.haveRand){
						//将打卡信息插入到表内
						wx.request({
							url: app.globalData.url+'addCourseTime',
							method: "POST",
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: {
								cid: wx.getStorageSync("cid"),
								courseId: that.data.courseTime[0].id,
								time: that.data.courseTime[0].time,
								timestamp: that.data.timestamp,
								random: that.data.random,
								status:0
							},
							success(res) {
								that.setData({
									haveRand: false
								})
							}
						})
					}
          //获取打卡最新的信息
          wx.request({
            url: app.globalData.url+'getRecordLastId',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              courseId: that.data.courseTime[0].id,
							week: app.globalData.nowweek
            },
            success(res) {
              console.log(res)
              if (res.data[0]) {
                that.setData({
                  stuid: res.data
                })
              }
            }
          })
        }
      }
    })
  },
	navigate(){
		clearInterval(this.data.interval);
		wx.navigateTo({
			url: '../bdcard/bdcard',
		})
	}
})