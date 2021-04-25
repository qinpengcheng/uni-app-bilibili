<template>
  <view class="search">
    <view class="search-header">
      <van-search
        @change="handleSearchChange"
        class="search-header-input"
        shape="round"
      />
      <text class="search-header-btn" @click="goBack">取消</text>
    </view>
    <view class="search-content">
      <view class="search-hot-tags" v-show="!searchValue">
        <text>大家都在搜</text>
        <view class="tag-list">
          <view class="tag-item" v-for="tag in hotWordData" :key="tag.id">{{
            tag.keyword
          }}</view>
        </view>
      </view>
      <view class="search-hot-tags" v-show="searchValue">
        <view class="tag-list">
          <view class="tag-item" v-for="tag in searchList" :key="tag.spid">{{
            tag.value
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getHotwordList, searchData } from "@/api/index";
export default {
  data() {
    return {
      hotWordData: [],
      searchValue: "",
      searchList: []
    };
  },
  onLoad() {
    this.getHotwordList();
  },
  methods: {
    goBack() {
      wx.navigateBack({
        //返回
        delta: 1
      });
    },
    // 搜索
    handleSearchChange(e) {
      const value = e.detail;
      this.searchValue = value;
      this.searchData(value);
    },
    async searchData(w) {
      const data = {
        w
      };
      const res = await searchData(data);
      this.searchList = res.data.tag;
    },
    // 大家都在搜
    async getHotwordList() {
      const res = await getHotwordList();
      this.hotWordData = res.data;
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
    }
  }
}
</style>
