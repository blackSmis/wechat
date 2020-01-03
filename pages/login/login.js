const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // let uid = wx.getStorageSync("uid");
    // if (uid) {
    //   wx.request({
    //     url: app.globalData.url + 'getInfo',
    //     method: "POST",
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     data: {
    //       uid: wx.getStorageSync("uid")
    //     },
    //     success(res) {
    //       console.log(res);
    //       if (res.data.username && res.data.college && res.data.system && res.data.email) {
    //         if (res.data.stuid == null) {
    //           wx.switchTab({
    //             url: '/pages/index/index'
    //           });
    //         } else {
    //           wx.navigateTo({
    //             url: '/pages/check/check'
    //           });
    //         }
    //       } else {
    //         wx.navigateTo({
    //           url: '/pages/addStuTec/addStuTec'
    //         });
    //       }
    //     }
    //   });
    // }
  },
  login(res) {
    console.log(res.detail);
    if (res.detail.rawData) {
      wx.login({
        success: function(res) {
          console.log(res.code);
          if (res.code) {
            //发起网络请求
            wx.request({
              url: app.globalData.url + 'login',
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                code: res.code
              },
              success(res) {
                let that = this;
                console.log(res);
                if (res.data.status) {
                  wx.setStorageSync("uid", res.data.uid);
                };
                wx.showToast({
                  title: '用户授权成功',
                  duration: 1000
                });
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
                      wx.switchTab({
                        url: '/pages/index/index'
                      });
                    } else {
                      wx.navigateTo({
                        url: '/pages/addStuTec/addStuTec'
                      });
                    }
                  }
                });
              },
              fail() {
                console.log("网络异常");
                wx.showToast({
                  title: '网络异常',
                  duration: 1000,
                  icon: "none"
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    } else {
      wx.showToast({
        title: '用户拒绝授权',
        duration: 1000,
        icon: "none"
      })
    }
  }
})