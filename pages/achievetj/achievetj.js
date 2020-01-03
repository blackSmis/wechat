const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		hidden:false,
		show : true,
    test: [{
      name: "考试",
      percent: "比例"
    }],
    cid: '',
    title: ["姓名", "学号", "科目", "成绩"],
    result: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let cid = this.data.cid;
    if (options) {
      cid = options.cid
    }
    let that = this;
    wx.request({
      url: app.globalData.url+'getTest',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        cid: cid
      },
      success(res) {
        console.log(res.data);
        that.setData({
          test: res.data
        })
        wx.request({
          url: app.globalData.url+'getTestRes',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            cid: cid,
						test: JSON.stringify(that.data.test)
          },
          success(res) {
            console.log(res.data);
            if (res.data.length == 0) {
              wx.request({
                url: app.globalData.url+'stuResult',
                method: "POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  cid: cid
                },
                success(res) {
                  console.log(res.data.length);
                  that.setData({
                    result: res.data,
                    cid: cid,
										show:false
                  })
                }
              });
            } else {
              that.setData({
                result: res.data,
                cid: cid,
								show:true
              })
            }
          }
        });
      }
    })
  },
  back() {
		wx.showModal({
			title: '提示',
			content: '是否已提交修改信息',
			success: function (e) {
				console.log(e);
				if (e.confirm) {
					wx.switchTab({
						url: '../index/index',
					})
				} 
			}
		})
  },
  edit() {
    wx.navigateTo({
      url: '../achievegl/achievegl?cid=' + this.data.cid,
    })
  },
  inputChange(e) {
    console.log(e.detail.value);
  },
  formSubmit(e) {
    console.log(e.detail.value);
    wx.request({
      url: app.globalData.url+'addTestRes',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
				cid: this.data.cid,
        data: JSON.stringify(e.detail.value)
      },
      success(res) {
				wx.showToast({
					title: '数据修改成功',
				})
        console.log(res.data);
      }
    });
  },
	hidden(res){
		let that = this
		let index = 0;
		let array = this.data.test;//获取循环数组对象
		for (let item of array) {
			//如果当前点击的对象id和循环对象里的id一致
			if (item.testName == res.currentTarget.dataset.testname) {
				//判断当前对象中的show是否为true（true为显示，其他为隐藏） show是新增的一个值然后进行判断
				if (array[index].show == "" || array[index].show == undefined) {
					array[index].show = "true"
				} else {
					array[index].show = ""
				}
			}
			index++;
		}
		//将数据动态绑定 
		that.setData({
			test : array
		})
		console.log(res);
	}
})