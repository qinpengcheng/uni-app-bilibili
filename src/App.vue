<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style>
@import "./font/iconfont.css";
@import "./wxcomponents/dist/common/index.wxss";
/*每个页面公共css */
.ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.ellipsis--1 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
view {
  font-size: 24rpx;
}
</style>
