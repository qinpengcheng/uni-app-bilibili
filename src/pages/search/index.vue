<template>
  <view class="search">
    <view class="search-header">
      <van-search
        :value="searchValue"
        @search="handleSearch"
        @change="handleSearchChange"
        class="search-header-input"
        shape="round"
      />
      <text class="search-header-btn" @click="goBack">取消</text>
    </view>
    <view class="search-content" v-if="!isShowList">
      <view class="search-hot-tags" v-show="!searchValue">
        <text>大家都在搜</text>
        <view class="tag-list">
          <view
            class="tag-item"
            @click="handleTagClick(tag.keyword)"
            v-for="tag in hotWordData"
            :key="tag.id"
            >{{ tag.keyword }}</view
          >
        </view>
      </view>
      <view class="search-hot-tags" v-show="searchValue">
        <view class="tag-list">
          <view
            @click="handleTagClick(tag.value)"
            class="tag-item"
            v-for="tag in searchSuggestData"
            :key="tag.spid"
            v-html="formatText(tag.value)"
          ></view>
        </view>
      </view>
      <view class="search-history" v-if="isShowHitory">
        <text class="title">搜索历史</text>
        <view class="history-list">
          <view
            class="list-item"
            v-for="(item, index) in historyList"
            :key="index"
          >
            <view class="list-item-left" @click="handleTagClick(item)">
              <text class="iconfont">&#xe602;</text>
              <text class="content">{{ item }}</text>
            </view>
            <text
              class="iconfont icon-delete"
              @click="handleDeleteHistory(index)"
              >&#xe62f;</text
            >
          </view>
        </view>
        <view class="clear-history" @click="handleClearHistory"
          >清除历史记录</view
        >
      </view>
    </view>
    <van-tabs
      v-if="isShowList"
      color="#fd7299"
      title-active-color="#fd7299"
      title-inactive-color="#565656"
      :active="activeName"
      animated
      swipeable
      line-height="2"
      @change="handleToggle"
    >
      <van-tab title="默认排序" name="totalrank">
        <scroll-view scroll-y class="search-list">
          <VideoCard
            isLink
            type="3"
            v-for="item in searchListMap.totalrank"
            :key="item.aid"
            :data="item"
          />
        </scroll-view>
      </van-tab>
      <van-tab title="播放多" name="click">
        <scroll-view scroll-y class="search-list">
          <VideoCard
            isLink
            type="3"
            v-for="item in searchListMap.click"
            :key="item.aid"
            :data="item"
          />
        </scroll-view>
      </van-tab>
      <van-tab title="新发布" name="pubdate">
        <scroll-view scroll-y class="search-list">
          <VideoCard
            isLink
            type="3"
            v-for="item in searchListMap.pubdate"
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
import { getHotwordList, searchSuggest, getSearchData } from "@/api/index";
export default {
  components: {
    VideoCard
  },
  data() {
    return {
      hotWordData: [],
      searchValue: "",
      searchSuggestData: [],
      activeName: "totalrank",
      //totalrank:默认 click：播放多 pubdate：新发
      searchListMap: {
        totalrank: [],
        click: [],
        pubdate: []
      },
      isShowList: false,
      historyList: []
    };
  },
  onLoad() {
    this.getHotwordList();
    this.getHistorySearch();
  },
  onUnload() {
    this.setHistorySearch();
  },
  computed: {
    isShowHitory() {
      return this.historyList.length > 0;
    }
  },
  methods: {
    // tab切换时
    handleToggle(e) {
      this.activeName = e.detail.name;
      if (!this.searchListMap[this.activeName].length) {
        this.getSearchData();
      }
    },
    handleTagClick(value) {
      this.searchValue = value;
      this.handleSearch();
    },
    // 清空历史记录
    handleClearHistory() {
      this.historyList = [];
    },
    // 删除历史记录
    handleDeleteHistory(index) {
      this.historyList.splice(index, 1);
    },
    // 获取历史记录
    getHistorySearch() {
      uni.getStorage({
        key: "historySearch",
        success: (res) => {
          this.historyList = res.data.historyList || [];
        }
      });
    },
    // 设置历史记录
    setHistorySearch() {
      uni.setStorage({
        key: "historySearch",
        data: {
          historyList: this.historyList
        }
      });
    },
    // 搜索
    handleSearch() {
      this.isShowList = true;
      this.activeName !== "totalrank" && (this.activeName = "totalrank");
      this.getSearchData("totalrank");
      !this.historyList.includes(this.searchValue) &&
        this.historyList.push(this.searchValue);
    },
    async getSearchData() {
      // order=> totalrank:默认 click：播放多 pubdate：新发布 dm：弹幕多
      const data = {
        keyword: this.searchValue,
        order: this.activeName,
        page: 1,
        searchType: "video",
        size: 20
      };
      const res = await getSearchData(data);
      if (res.code === "1") {
        this.searchListMap[this.activeName] = res.data.result.map((item) => ({
          pic: item.pic,
          duration: item.duration,
          title: item.tag,
          ctime: item.pubdate,
          play: item.review,
          author: item.author,
          aid: item.aid
        }));
      }
    },
    // 搜索框change
    handleSearchChange(e) {
      const value = e.detail;
      this.searchValue = value;
      !this.isShowList && this.searchSuggest(value);
    },
    async searchSuggest(w) {
      const data = {
        w
      };
      const res = await searchSuggest(data);
      this.searchSuggestData = res.data.tag;
    },
    // 大家都在搜
    async getHotwordList() {
      const res = await getHotwordList();
      this.hotWordData = res.data;
    },

    goBack() {
      wx.navigateBack({
        //返回
        delta: 1
      });
    },
    // 格式搜索提示
    formatText(val) {
      return val.replace(
        new RegExp(this.searchValue, "g"),
        `<span class="text-active">${this.searchValue}</span>`
      );
    }
  }
};
</script>

<style lang="less">
.search {
  &-header {
    width: 100%;
    display: flex;
    align-items: center;
    &-input {
      flex: 1;
    }
    &-btn {
      margin: 0 40rpx 0 16rpx;
    }
  }
  &-content {
    padding: 20rpx;
    .search-history {
      margin-top: 32rpx;
      .title {
        margin-bottom: 20rpx;
      }
      .history-list {
        .list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20rpx 0;
          border-bottom: 1rpx solid #eee;
          color: #323232;
          &-left {
            flex: 1;
            margin-right: 40rpx;
          }
          .icon-delete {
            font-size: 30rpx;
          }
          .content {
            margin-left: 10rpx;
          }
          .iconfont {
            color: #323232;
          }
        }
      }
      .clear-history {
        color: #999;
        padding: 20rpx 0;
        text-align: center;
      }
    }
    .search-list {
      height: 84vh;
    }
  }
  &-hot-tags {
    text {
      display: inline-block;
      font-size: 28rpx;
      margin-bottom: 20rpx;
    }
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .tag-item {
        padding: 10rpx 16rpx;
        background-color: #f6f6f6;
        border-radius: 10rpx;
        margin: 0 20rpx 20rpx 0;
      }
      .text-active {
        color: #fd7299;
      }
    }
  }
}
</style>
