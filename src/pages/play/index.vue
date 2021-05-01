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
          <scroll-view scroll-y class="recommend-list">
            <view class="title  ellipsis--1"> {{ videoInfo.title || "" }}</view>
            <view class="info">
              <text class="info-left ellipsis--1">{{
                videoInfo.owner.name || ""
              }}</text>
              <view class="info-right">
                <text>{{ videoInfo.stat.view | filterPlay }}次观看</text>
                <text>{{ videoInfo.stat.danmaku | filterPlay }}弹幕</text>
                <text>{{ videoInfo.ctime | filterTime("yyyy-MM-dd") }}</text>
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
            <VideoCard
              type="2"
              @on-click="handleVideoClick"
              v-for="item in recommendList"
              :key="item.aid"
              :data="item"
            />
          </scroll-view>
        </view>
      </van-tab>
      <van-tab :title="`评论${videoInfo.stat.reply}`" name="2">
        <scroll-view scroll-y class="scroll-comment" @scrolltolower="loadMore">
          <VideoComment :data="videoCommnetData" />
        </scroll-view>
      </van-tab>
    </van-tabs>
  </view>
</template>

<script>
import {
  getVideoInfo,
  getPlayUrl,
  getVideoUrl,
  getVideoComments,
  getRecommendList
} from "@/api/index";
import VideoCard from "@/components/videoCard/index";
import VideoComment from "@/components/videoComment/index";
import VideoPlayer from "@/components/videoPlayer/index";
export default {
  components: {
    VideoComment,
    VideoPlayer,
    VideoCard
  },
  data() {
    return {
      title: "playvideo",
      videoInfo: {
        owner: {},
        stat: {
          reply: 0
        }
      },
      videoUrl: "",
      recommendList: [],
      isOpen: false,
      videoCommnetData: [],
      videoCommnetPage: 1,
      isLoadMore: true
    };
  },
  onLoad({ aId }) {
    this.getVideoInfo(aId);
    this.getRecommendList(aId);
  },
  methods: {
    //上拉加载评论
    async loadMore() {
      if (this.isLoadMore) {
        this.videoCommnetPage++;
        this.isLoadMore = false;
        await this.getVideoComments();
        setTimeout(() => {
          this.isLoadMore = true;
        }, 500);
      }
    },
    // 重置评论
    resetComment() {
      this.isLoadMore = true;
      this.videoCommnetPage = 1;
      this.videoCommnetData = [];
    },
    // 点击推荐视频时
    handleVideoClick(aId) {
      this.resetComment();
      this.getVideoInfo(aId);
      this.getRecommendList(aId);
    },
    // 视频描述展开
    handleToggle() {
      this.isOpen = !this.isOpen;
    },
    // tab切换时
    onChange(e) {
      const index = e.detail.index;
      if (index === 1 && !this.videoCommnetData.length) {
        this.getVideoComments();
      }
    },
    // 视频评论
    async getVideoComments() {
      const data = {
        pn: this.videoCommnetPage,
        oId: this.videoId
      };
      const res = await getVideoComments(data);
      if (res.code === "1") {
        this.videoCommnetData.push(...res.data.replies);
      }
    },
    // 视频详情
    async getVideoInfo(aId) {
      const res = await getVideoInfo(aId);
      this.videoInfo = res.data;
      const cId = res.data.cid;
      this.videoId = aId;
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
        aid: item.aid,
        danmaku: item.stat.danmaku
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
      &-left {
        width: 190rpx;
      }
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
      height: 60vh;
    }
  }
  .scroll-comment {
    height: 60vh;
  }
}
</style>
