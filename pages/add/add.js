var app = getApp();
Component({
  data: {
    formData: {},
    cid: '',
    rules: [{
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
      }
    }]
  },
  methods: {
    onLoad: function(e) {
      console.log(e);
      this.setData({
        cid: e.cid
      })
      wx.request({
        url: app.globalData.url + 'getCourse',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          cid: e.cid
        },
        success(res) {
          if (res.data == null) {
            app.globalData.course = "未定义";
          } else {
            app.globalData.course = res.data;
          }
        }
      })
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
          console.log(this.data);
          wx.request({
            url: app.globalData.url + 'stuAdd',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              course: app.globalData.course,
              username: this.data.formData.username,
              stuid: this.data.formData.stuid,
              cid: this.data.cid
            },
            success(res) {
              console.log(res);
              if (res.data.status) {
                wx.showToast({
                  title: '添加成功',
                  success() {
                    setTimeout(function() {
                      wx.navigateTo({
                        url: '../students/students?cid=' + that.data.cid,
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
          });
        }
      })
    }
  }
});