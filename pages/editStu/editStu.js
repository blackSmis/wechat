const app = getApp();
Component({
  data: {
		oldStuid:'',
		stu:{},
    formData: {},
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
    onLoad: function (e) {
			let that = this;
      console.log(e);
      that.setData({
        oldStuid: e.stuid
      });
			wx.request({
				url: app.globalData.url+'getStuInfo',
				method: "POST",
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					stuid: e.stuid
				},
				success(res) {
					that.setData({
						stu:res.data,
						formData:res.data
					})
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
            url: app.globalData.url+'updateStu',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
							oldStuid:this.data.oldStuid,
							// cid:this.data.cid,
              username: this.data.formData.username,
              stuid: this.data.formData.stuid
            },
            success(res) {
              console.log(res);
              if (res.data.status) {
                wx.showToast({
                  title: '修改成功',
                  success() {
                    setTimeout(function () {
                      wx.navigateTo({
                        url: '../students/students?cid='+that.data.formData.cid,
                      })
                    }, 1000)
                  }
                })
              } else {
                  that.setData({
                    error: "学号格式不正确，请输入学号(4~16位数字)"
                  })
              }
            }
          });
        }
      })
    }
  }
});