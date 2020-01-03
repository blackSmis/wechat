var app = getApp();
Component({
  data: {
    myInfo: null,
    formDataTec: {},
    myCid: [],
    myClass: [],
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
    }]
  },
  methods: {
    onLoad: function(e) {
      console.log(e);
      this.showClass();
    },
    onShow: function(e) {

    },
    showClass: function() {
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
    switch (e) {
      this.setData({
        stuTec: e.detail.value
      })
      console.log(e.detail.value);
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