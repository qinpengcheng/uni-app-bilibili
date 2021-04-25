<template>
  <view class="video-card" @click="linkTo(data.aid)">
    <VideoCover
      :src="data.pic"
      :duration="data.duration"
      class="video-card-img"
    />
    <view class="video-card-content">
      <view class="video-title">{{ data.title }}</view>
      <view class="video-info">
        <view class="videp-info-auth"
          ><text class="iconfont">&#xe665;</text> {{ data.author }}</view
        >
        <view class="videp-info-action">
          <view>
            <text class="iconfont">&#xe60c;</text
            >{{ data.play | filterPlay }}</view
          >
          <view>{{ data.ctime | filterTime }}</view>
          <text class="iconfont">&#xe6e6;</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import VideoCover from "@/components/videoCover/index";
import { formatPlay } from "@/utils/index";
export default {
  name: "VideoCard",
  components: {
    VideoCover
  },
  props: {
    isLink: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formatPlay
    };
  },
  mounted() {},
  methods: {
    linkTo(aId) {
      this.isLink &&
        wx.navigateTo({
          url: `/pages/play/index?aId=${aId}`
        });
      this.$emit("on-click", aId);
    }
  }
};
</script>

<style lang="less">
.video-card {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  border-bottom: 1px solid #f2f2f2;
  &-img {
    width: 44%;
    height: 180rpx;
    flex-shrink: 0;
  }
  &-content {
    flex: 1;
    margin-left: 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .iconfont {
      margin-right: 2rpx;
    }
    .video-info {
      color: #999999;
      .videp-info-action {
        margin-top: 10rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
