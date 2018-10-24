//logs.js
const util = require('../../utils/util.js')
const calendar = require('../../utils/calendar.js')


Page({
  data: {
    arr: [],
    lastDay: null,
    firstDay: null,
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    year: null,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    month: null,
    nowDay: null,
    today:{
      flag:false,
      num:null
    }
  },
  // 获取当前的日期，或者获取指定日期
  dataTime: function (year, month, day) {
    this.data.arr = [];
    // 获取当前单位日期
    var date = new Date();
    var year = year ? year : date.getFullYear();
    var nowMonth = month ? month : date.getMonth() + 1;
    //赋值
    this.data.year = year;
    this.data.month = this.data.months[nowMonth - 1];
    this.data.nowDay = day ? day : date.getDate();
    this.data.lastDay = new Date(year, nowMonth, 0).getDate();
    this.data.firstDay = new Date(year, nowMonth - 1, 1).getDay();
    this.data.today.num = date.getDate();
    //根据得到今月的最后一天日期遍历 得到所有日期
    for (var i = 1; i < this.data.lastDay + 1; i++) {
      this.data.arr.push({
        num: i,
        currentMonth: true,
        calendar: calendar.calendar.solar2lunar(this.data.year, this.data.month, i)
      });
    }
    // 得到上个月的最后一天
    var lastMonthDayNum = new Date(2018, this.data.month - 1, 0).getDate();
    for (var i = lastMonthDayNum; i > lastMonthDayNum - this.data.firstDay; i--) {
      this.data.arr.unshift({
        num: i,
        currentMonth: false
      });
    }
    // 算出下个月的其实天数
    var arr = this.data.arr.length;
    for (var w = 1; w <= (Math.ceil(arr / 7) * 7 - arr); w++) {
      this.data.arr.push({
        num: w,
        currentMonth: false
      });
    }
  },
  onLoad: function () {
    this.dataTime();

    this.setDataChange();
  },
  // 渲染参数
  setDataChange: function () {
    this.setData({
      ...this.data
    });
  },
  leftDate: function () {
    this.data.month--;
    if (this.data.month < 1) {
      this.data.year--;
      this.data.month = this.data.months[11]
    };
    this.data.today.flag=false;
    this.dataTime(this.data.year, this.data.month);
    this.setDataChange();
  },
  rightDate: function () {
    this.data.month++;
    if (this.data.month > 12) {
      this.data.year++;
      this.data.month = this.data.months[0]
    };
    this.data.today.flag=false;
    this.dataTime(this.data.year, this.data.month);
    this.setDataChange();
  },
  chooseDay: function (event) {
    var item = event.currentTarget.dataset.item;
    var now = new Date().getDate();
    console.log(now);
    if (item.currentMonth) {
      if (item.num != now) {
        this.data.today.flag=true;
      }else{
        this.data.today.flag=false;
      }
      this.data.nowDay = item.num;
      this.setDataChange();
      console.log(calendar.calendar.solar2lunar(this.data.year, this.data.month, item.num));
    }
  }
})
