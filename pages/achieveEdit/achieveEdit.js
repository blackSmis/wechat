var app = getApp();
Component({
  data: {
    able: true,
    show: false,
    value: "",
    canAdd: true,
    formData: {},
    formData1: {},
    listTest: [{
      prop: "final",
      title: "期末考试",
      value: "50"
    }, {
      prop: "middle",
      title: "期中考试",
      value: "30"
    }],
    list: [],
    cid: '',
    rules: [{
      name: 'final',
      rules: {
        required: true,
        message: '内容不能为空'
      }
    }]
  },
  methods: {
    onLoad: function(e) {
      this.setData({
        cid: e.cid
      })
    },
    add() {
      this.setData({
        list: this.data.list.concat({
          title: this.data.formData.title,
          prop: this.data.formData.title
        }),
        value: "",
        canAdd: true
      })
      if (this.data.list.length != 0) {
        this.setData({
          able: false
        })
      }
    },
    formInputChange1(e) {
      const {
        field
      } = e.currentTarget.dataset;
      this.setData({
        [`formData1.${field}`]: e.detail.value
      })
      console.log(this.data.formData1);
    },
    formInputChange(e) {
      const {
        field
      } = e.currentTarget.dataset;
      this.setData({
        [`formData.${field}`]: e.detail.value
      })
      console.log(this.data.formData)
      if (this.data.formData.title) {
        this.setData({
          canAdd: false
        })
      } else {
        this.setData({
          canAdd: true
        })
      }
    },
    submitForm() {
      let that = this;
      console.log(this.data.formData);
      wx.request({
        url: app.globalData.url+'testAdd',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          cid: that.data.cid,
          data: JSON.stringify(that.data.formData1)
        },
        success(res) {
          console.log(res);
          if (res.data.status) {
            wx.showToast({
              title: res.data.msg,
              success() {
                setTimeout(function() {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }, 3000)
              }
            })
          } else {
            console.log(res.data.msg);
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
          }
        }
      });
    },
    show() {
      this.setData({
        show: !this.data.show
      })
    }
  },
});