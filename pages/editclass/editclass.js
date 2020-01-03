const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: {},
    classIndex: 0,
    class: ['大一', '大二', '大三', '大四'],
    selectClass: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: app.globalData.url+'selectClass',
      data: {
        cid: options.cid
      },
      method: 'POST',
      success: (res) => {
        console.log(res);
        this.setData({
          currentData: res.data
        });
        this.getCurrentNews();
      }
    })
  },
  bindClassChange: function(e) {
    this.setData({
      change: true,
      classIndex: e.detail.value
    })
  },
  formSubmit: function(res) {
    let that = this;
    console.log(res);
    wx.request({
      url: app.globalData.url+'updateClass',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: wx.getStorageSync("uid"),
        class: res.detail.value.class,
        className: res.detail.value.className,
        cid: that.data.currentData.cid
      },
      success(res) {
        console.log(res);
        if (res.data.status) {
          wx.showToast({
            title: '修改班级成功',
            duration: 2000,
            success() {
              setTimeout(function() {
                wx.switchTab({
                  url: '../index/index',
                })
              }, 1000)
            }
          })
        } else {
          let title = '班级不能为空'
          if (res.data.code == 4003) {
            title = "班级名不能超过8个字符串"
          }
          wx.showToast({
            title: title,
            duration: 2000,
            icon: "none",
            success() {}
          })
        }
      }
    })
  },
  getCurrentNews: function() {
    let currentClass = this.data.currentData.class;
    switch (currentClass) {
      case "大一":
        this.setData({
          classIndex: 0
        });
        break;
      case "大二":
        this.setData({
          classIndex: 1
        });
        break;
      case "大三":
        this.setData({
          classIndex: 2
        });
        break;
      case "大四":
        this.setData({
          classIndex: 3
        });
        break;
      default:
        break;
    }
  }
})