<template>
  <view class="home">
    <navigator class="home-search" url="/pages/search/index">
      <van-search readonly shape="round" />
    </navigator>
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
      <van-tab title="热门" name="1">
        <scroll-view scroll-y class="scroll-list">
          <VideoCard
            isLink
            v-for="item in hotData"
            :key="item.aid"
            :data="item"
          />
        </scroll-view>
      </van-tab>
      <van-tab title="追番" name="2">
        <scroll-view scroll-y class="scroll-list">
          <VideoCard
            isLink
            v-for="item in otherData"
            :key="item.aid"
            :data="item"
          />
        </scroll-view>
      </van-tab>
    </van-tabs>
  </view>
</template>

<script>
import VideoCard from "@/components/videoCard/index";
import { getHotList, getRegionList } from "@/api/index";
export default {
  components: {
    VideoCard
  },
  data() {
    return {
      hotData: [],
      otherData: [],
      active: "1"
    };
  },
  onLoad() {
    this.getHotList();
  },
  methods: {
    onChange(e) {
      !this.otherData.length && this.getRegionList();
    },
    // 获取其他
    async getRegionList() {
      const data = {
        rId: 129 // 舞蹈
      };
      const res = await getRegionList(data);
      this.otherData = res.data;
    },
    // 获取热门
    async getHotList() {
      const data = {
        ps: 100
      };
      const res = await getHotList(data);
      this.hotData = res.data.map((item) => ({
        pic: item.pic,
        duration: item.duration,
        title: item.title,
        ctime: item.ctime,
        play: item.stat.view,
        author: item.author.name,
        aid: item.aid,
        hotDesc: item.hot_desc
      }));
    }
  }
};
</script>

<style lang="less">
.home {
  .home-search {
    height: 100rpx;
  }
  .scroll-list {
    height: calc(100vh - 190rpx);
  }
  .van-tabs__wrap {
    border-bottom: 1px solid #eaeaea;
  }
}
</style>
