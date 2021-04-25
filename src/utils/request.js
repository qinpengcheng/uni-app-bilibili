export default (params) => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: "加载中"
    });
    wx.request({
      ...params,
      success(res) {
        resolve(res.data);
      },
      fail(error) {
        reject(error);
      },
      complete() {
        uni.hideLoading();
      }
    });
  });
};
