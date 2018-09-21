//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },
  onLoad: function () {
    // wx.request({
    //   url: 'http://v.juhe.cn/laohuangli/d', //仅为示例，并非真实的接口地址
    //   data: {
    //     date: '2018-09-19',
    //     key: 'f8b40fe7e6530c4702480d187a970355'
    //   },
    //   method:"GET",
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })
  },
  showDialog() {
    this.dialog.showDialog();
  },
  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  },
})
