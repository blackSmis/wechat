var app = getApp();
Component({
  data: {
    stuTec: false,
    myInfo: null,
    formData: {},
    rules: [{
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
    },
    onShow: function(e) {
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
            myInfo: res.data,
            formData: res.data
          })
        }
      });
    },
    switch (e) {
      this.setData({
        stuTec: e.detail.value
      })
      console.log(e.detail.value);
    },
    formInputChange(e) {
      const {
        field
      } = e.currentTarget.dataset;
      this.setData({
        [`formData.${field}`]: e.detail.value
      })
    },
    submitForm() {
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
          app.globalData.userInfo = that.data.formData
          wx.showToast({
            title: '信息编辑成功',
            icon: "none",
            success() {
              setTimeout(function() {
                wx.switchTab({
                  url: '../personal/personal'
                });
                wx.request({
                  url: app.globalData.url+'updateInfo',
                  method: "POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    username: that.data.formData.username,
                    college: that.data.formData.college,
                    system: that.data.formData.system,
                    email: that.data.formData.email,
                    uid: wx.getStorageSync("uid")
                  },
                  success(res) {
                    console.log(res);
                  }
                })
              }, 2000)
            }
          })
        }
      })
      console.log(app.globalData);
    },
    cancel() {
      wx.switchTab({
        url: '../index/index'
      })
    }
  }
});