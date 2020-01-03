const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    true: 'true',
    select: 'select',
    display: 'display',
    classIndex: 0,
    class: ['大一', '大二', '大三', '大四'],
    selectClass: []
  },
  bindClassChange: function (e) {
    this.setData({
      classIndex: e.detail.value,
      display: ''
    })
  },
  formSubmit: function (res) {
    console.log(res);
    wx.request({
      url: app.globalData.url+'createClass',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: wx.getStorageSync("uid"),
        class: res.detail.value.class,
        className: res.detail.value.className,
        timeStamp: res.timeStamp
      },
      success(res) {
        console.log(res.data);
        if (res.data.status) {
          wx.showToast({
            title: '创建班级成功',
            duration: 2000,
            success() {
              setTimeout(function () {
                wx.switchTab({
                  url: '../index/index',
                })
              }, 1000)
            }
          })
        } else {
          let title = '班级不能为空'
          if (res.data.code == 4001) {
            title = "班级已存在"
          }else if(res.data.code == 4003) {
            title = "班级名不能超过8个字符串"
          }
          wx.showToast({
            title: title,
            duration: 2000,
            icon: "none",
            success() {
            }
          })
        }

      }
    })
  }
})