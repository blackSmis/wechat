var app = getApp();
Component({
  data: {
    value: "",
    cid: '',
    formData: {},
    rules: [{
      name: 'course',
      rules: {
        required: true,
        message: '科目是必须的'
      }
    }]
  },
  methods: {
    onLoad: function(e) {
      let that = this;
      console.log(e);
      this.setData({
        cid: e.cid
      })
      wx.request({
        url: app.globalData.url+'stuResult',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          cid: e.cid
        },
        success(res) {
          console.log(res.data);
        }
      })
    },
    onShow: function(e) {},
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
          wx.showToast({
            title: '信息编辑成功',
            icon: "none",
            success() {
              wx.request({
                url: app.globalData.url+'updateCourse',
                method: "POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  cid: that.data.cid,
                  course: that.data.formData.course
                },
                success(res) {
                  app.globalData.course = that.data.formData.course;
                  console.log(res);
                  wx.showToast({
                    title: '编辑成功',
                    success() {
                      setTimeout(function() {
                        wx.navigateTo({
                          url: '../achievetj/achievetj?cid=' + that.data.cid
                        })
                      }, 1000)
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
    cancel() {
      wx.navigateTo({
        url: '../achievetj/achievetj?cid=' + this.data.cid
      })
    }
  }
});