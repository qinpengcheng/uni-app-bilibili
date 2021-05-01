<template>
  <view class="partition-detail">
    <scroll-view
      scroll-x
      scroll-with-animation
      :scroll-into-view="`to-${activeIndex}`"
    >
      <view class="scroll-bar">
        <view
          :id="`to-${index}`"
          :class="{
            'bar-item': true,
            'bar-item--active': activeIndex === index
          }"
          @click="handleBarClick(index)"
          v-for="(item, index) in typeMaps[type]"
          :key="item.rId"
          >{{ item.name }}</view
        >
      </view>
    </scroll-view>
    <swiper
      class="swiper"
      :current="activeIndex"
      duration="300"
      @change="handleSwiperChange"
    >
      <block v-for="(item, index) in typeMaps[type]" :key="item.rId">
        <swiper-item class="swiper-item">
          <scroll-view scroll-y class="swiper-item-scroll">
            <VideoCard
              isLink
              type="2"
              v-for="item in typeMaps[type][index].list"
              :key="item.aid"
              :data="item"
            />
          </scroll-view>
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>

<script>
import VideoCard from "@/components/videoCard/index";
import { getRegionList, getGameEventsList } from "@/api/index";
import typeMaps from "./options";
export default {
  components: {
    VideoCard
  },
  data() {
    return {
      title: "partition",
      type: 1,
      typeMaps,
      activeIndex: 0,
      scrollLeft: 0
    };
  },
  onLoad(options) {
    const { title, type } = options;
    this.type = type;
    this.getRegionList();
    uni.setNavigationBarTitle({
      title
    });
  },
  methods: {
    handleSwiperChange(e) {
      this.activeIndex = e.detail.current;
      !this.typeMaps[this.type][this.activeIndex].list.length &&
        this.getRegionList();
    },
    handleBarClick(index) {
      this.activeIndex = index;
    },
    async getRegionList() {
      const data = this.typeMaps[this.type][this.activeIndex].params;
      const api = this.type === "20" ? getGameEventsList : getRegionList;
      const res = await api(data);
      if (res.code === "1") {
        const data = this.type === "20" ? res.data.list : res.data;
        this.typeMaps[this.type][this.activeIndex].list = data.map((item) => {
          if (this.type === "20") {
            return {
              pic: item.pic,
              duration: item.duration,
              title: item.title,
              ctime: item.ctime,
              play: item.stat.view,
              author: item.owner.name,
              aid: item.aid,
              danmaku: item.stat.danmaku
            };
          }
          return {
            pic: item.pic,
            duration: item.duration,
            title: item.title,
            play: item.play,
            author: item.author,
            aid: item.aid,
            danmaku: item.video_review
          };
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.partition-detail {
  .scroll-bar {
    padding: 0 20rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    .bar-item {
      padding: 8rpx 24rpx;
      border-radius: 10rpx;
      flex-shrink: 0;
      transition: all 0.3s;
      &--active {
        background-color: #f4f4f4;
        color: #fd7299;
      }
    }
  }
  .swiper {
    height: calc(100vh - 80rpx);
    .swiper-item-scroll {
      height: 100%;
    }
  }
}
</style>
