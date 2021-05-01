<template>
  <view
    :class="{
      'video-card': true,
      'video-card__2': type === '2' || type === '3'
    }"
    @click="linkTo(data.aid)"
  >
    <VideoCover
      :src="data.pic"
      :duration="data.duration"
      class="video-card-img"
    />
    <view class="video-card-content">
      <view class="video-title ellipsis">{{ data.title }}</view>
      <view class="video-info">
        <view class="video-info-desc" v-if="data.hotDesc">
          <text>{{ data.hotDesc }}</text>
        </view>
        <view class="video-info-auth"
          ><text class="iconfont">&#xe665;</text> {{ data.author }}</view
        >
        <view class="video-info-action">
          <view>
            <text class="iconfont">&#xe60c;</text
            >{{ data.play | filterPlay }}</view
          >
          <view v-if="type === '1' || type === '3'">{{
            data.ctime | filterTime(type === "3" ? "yyyy-MM-dd" : "MM-dd")
          }}</view>
          <view v-if="type === '2'">
            <text class="iconfont">&#xe666;</text>
            {{ data.danmaku | filterPlay }}
          </view>
          <!-- 占位用 -->
          <text v-if="type === '2' || type === '3'"></text>
          <text v-if="type === '1'" class="iconfont">&#xe6e6;</text>
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
    type: {
      type: String,
      default: "1"
    },
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
    width: 40vw;
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
      &-desc {
        text {
          font-size: 20rpx;
          border-radius: 5rpx;
          padding: 0 4rpx;
          color: #eea26b;
          border: 2rpx solid #eea26b;
        }
      }
      .video-info-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  &__2 {
    .video-card-img {
      width: 30vw;
      height: 140rpx;
      flex-shrink: 0;
    }
  }
}
</style>
