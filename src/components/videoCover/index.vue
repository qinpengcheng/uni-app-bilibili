<template>
  <view class="video-cover">
    <image :src="src | filterImg" />
    <text class="video-duration">{{ duration | filterDuration }}</text>
  </view>
</template>

<script>
export default {
  name: "VideoCover",
  props: {
    src: {
      type: String,
      default: ""
    },
    duration: {
      type: [String, Number],
      default: ""
    }
  }
};
</script>

<style lang="less">
.video-cover {
  position: relative;
  width: 100%;
  height: 100%;
  image {
    width: 100%;
    height: 100%;
    border-radius: 8rpx;
  }
  .video-duration {
    position: absolute;
    bottom: 10rpx;
    right: 10rpx;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    padding: 0 8rpx;
    border-radius: 8rpx;
    font-size: 20rpx;
  }
}
</style>
