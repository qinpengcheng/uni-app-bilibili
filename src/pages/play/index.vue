<template>
  <view class="play">
    <VideoPlayer :src="videoUrl" />
    <van-tabs
      color="#fd7299"
      title-active-color="#fd7299"
      title-inactive-color="#565656"
      :active="active"
      animated
      swipeable
      line-height="2"
      @change="onChange"
    >
      <van-tab title="简介" name="1">
        <view class="video-introduction">
          <view class="title"> {{ videoInfo.title || "" }}</view>
          <view class="info">
            <text>{{ videoInfo.owner.name || "" }}</text>
            <view class="info-right">
              <text>{{ videoInfo.stat.view || 0 }}次观看</text>
              <text>{{ videoInfo.stat.danmaku || 0 }}弹幕</text>
              <text>{{ videoInfo.ctime }}</text>
              <text
                @click="handleToggle"
                :class="{ iconfont: true, up: isOpen }"
                >&#xe641;</text
              >
            </view>
          </view>
          <view :class="{ describe: true, 'is-open': isOpen }">{{
            videoInfo.desc
          }}</view>
          <scroll-view scroll-y class="recommend-list">
            <VideoCard
              @on-click="handleClick"
              v-for="item in recommendList"
              :key="item.aid"
              :data="item"
            />
          </scroll-view>
        </view>
      </van-tab>
      <van-tab title="评论" name="2"> </van-tab>
    </van-tabs>
  </view>
</template>

<script>
import {
  getVideoInfo,
  getPlayUrl,
  getVideoUrl,
  getRecommendList
} from "@/api/index";
import VideoCard from "@/components/videoCard/index";
import VideoPlayer from "@/components/videoPlayer/index";
export default {
  components: {
    VideoPlayer,
    VideoCard
  },
  data() {
    return {
      title: "playvideo",
      videoInfo: {
        owner: {},
        stat: {}
      },
      videoUrl: "",
      recommendList: [],
      isOpen: false
    };
  },
  onLoad({ aId }) {
    this.getVideoInfo(aId);
    this.getRecommendList(aId);
  },
  methods: {
    // 点击推荐时
    handleClick(aId) {
      this.getVideoInfo(aId);
      this.getRecommendList(aId);
    },
    handleToggle() {
      this.isOpen = !this.isOpen;
    },
    onChange(e) {
      console.log(e);
    },
    // 视频详情
    async getVideoInfo(aId) {
      const res = await getVideoInfo(aId);
      this.videoInfo = res.data;
      const cId = res.data.cid;
      this.getPlayUrl(aId, cId);
    },
    // 播放地址
    async getPlayUrl(aId, cId) {
      const res = await getPlayUrl(aId, cId);
      const palyUrl = res.data.durl[0].url;
      this.videoUrl = getVideoUrl(palyUrl);
    },
    // 推荐列表
    async getRecommendList(aId) {
      const res = await getRecommendList(aId);
      this.recommendList = res.data.map((item) => ({
        pic: item.pic,
        duration: item.duration,
        title: item.title,
        ctime: item.ctime,
        play: item.stat.view,
        author: item.owner.name,
        aid: item.aid
      }));
    }
  }
};
</script>

<style lang="less">
.play {
  .video-introduction {
    .title {
      font-size: 32rpx;
      padding: 0 32rpx;
    }
    .info {
      padding: 20rpx 32rpx 0 32rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-right {
        color: #999999;
        text {
          margin-left: 16rpx;
        }
        .iconfont {
          font-size: 32rpx;
          color: #212121;
          margin-left: 20rpx;
          &.up {
            display: inline-block;
            transform: rotate(180deg);
          }
        }
      }
    }
    .describe {
      color: #999999;
      padding: 0 32rpx 0 32rpx;
      height: 48rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.is-open {
        height: auto;
        overflow: auto;
        white-space: normal;
      }
    }
    .recommend-list {
      height: 48vh;
    }
  }
}
</style>
