var app = getApp();
Component({
  data: {
		cid:"",
    myInfo: null,
    formDataStu: {},
    classIndex: 0,
    myCid: [],
    myClass: [],
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
			this.setData({
				cid:e.cid
			})
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
    bindClassChange: function(e) {
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
              cid: that.data.cid,
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
              } else {
                if (res.data.code == 4010) {
                  that.setData({
                    error: "该学号已存在"
                  })
                } else {
                  that.setData({
                    error: "学号格式不正确，请输入学号(4~16位数字)"
                  })
                }
              }
            }
          })
        }
      })
      console.log(app.globalData);
    }
  }
});