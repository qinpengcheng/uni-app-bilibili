import Vue from "vue";
const isMin = (val) => (val < 10 ? "0" + val : val);
const formatDuaction = (val) => {
  let s = val;
  let m = 0;
  let h = 0;
  if (s / 60 >= 1) {
    m = Math.ceil(s / 60);
    s = s % 60;
  }
  if (m / 60 >= 1) {
    h = Math.ceil(m / 60);
    m = m % 60;
    return `${isMin(h)}:${isMin(m)}:${isMin(s)}`;
  }
  return `${isMin(m)}:${isMin(s)}`;
};
const filters = {
  filterImg(url) {
    return url + "@200w_120h.png";
  },
  filterDuration(value) {
    if (typeof value === "number") {
      return formatDuaction(value);
    } else {
      const arr = value.split(":");
      let left = arr[0];
      let right = arr[1];
      if (right.length === 1) {
        right = "0" + right;
      }
      if (left.length === 1) {
        left = "0" + left;
      }
      return `${left}:${right}`;
    }
  },
  filterPlay(val) {
    let w = 0;
    if (val / 10000 >= 1) {
      w = (val / 10000).toFixed(1);
      return `${w}万`;
    }
    return val;
  },
  /***
   * 13位时间戳格式化
   * @param time 13位时间戳
   * @param fmt
   * @returns {string}
   */
  filterTime(time = 0, fmt = "MM-dd") {
    if (time === 0 || !time) {
      return "";
    }
    time = time * 1000;
    let date = new Date(time);
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + "";
        fmt = fmt.replace(
          RegExp.$1,
          str
          //   RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
        );
      }
    }
    return fmt;
  }
};

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
