const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		cid:'',
    students:[],
		title: ['学号','姓名','操作']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
		let that = this;
		console.log(res);
		if(res){
			this.setData({
				cid: res.cid
			})
		};
		wx.request({
			url: app.globalData.url+'stuInfo',
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				cid:that.data.cid 
			},
			success(e) {
        that.setData({
          students:e.data
        })
      }
    })
  },
	delete(res){
		console.log(res.currentTarget.dataset.stuid);
		let that = this;
		wx.showModal({
			title: '提示',
			content: '是否确认删除',
			success: function (e) {
				console.log(e);
				if (e.confirm) {
					wx.request({
						url: app.globalData.url+'deleteStu',
						method: "POST",
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							stuid: res.currentTarget.dataset.stuid
						},
						success(res){
							console.log("删除成功");
							that.onLoad();
						}
					});
				} else if (e.cancel) {
					console.log('用户点击取消');
				}
			}
		})
	},
	edit(res){
		console.log(res);
		wx.request({
			url: app.globalData.url+'getStuInfo',
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				stuid: res.currentTarget.dataset.stuid
			},
			success(res) {
				console.log(res);
				wx.navigateTo({
					url: '../editStu/editStu?stuid='+res.data.stuid+'&cid='+res.data.cid
				})
			}
		});
	},
	back(){
		wx.switchTab({
			url: '../index/index',
		})
	},
	add(){
		console.log(this.data.cid);
		wx.navigateTo({
			url: '../add/add?cid=' + this.data.cid
		})
	}
})