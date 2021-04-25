<template>
  <view class="video-wrap">
    <video class="video" :src="src" autoplay></video>
  </view>
</template>
<script>
export default {
  name: "VideoPlayer",
  props: {
    src: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="less">
.video-wrap {
  .video {
    width: 100vw;
    height: 33vh;
  }
}
</style>
