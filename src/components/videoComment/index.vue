<template>
  <view class="video-comment">
    <view class="comment-item" v-for="item in data" :key="item.rpid">
      <image
        :src="item.member.avatar | filterImg('@60w_60h.png')"
        class="user-img"
      />
      <!-- 有回复的 -->
      <view v-if="item.rcount" class="comment-info">
        <view>
          <view class="user-name  ellipsis--1">{{ item.member.uname }}</view>
          <view class="user-comment">{{ item.content.message }}</view>
        </view>
        <view class="comment-reply" v-for="rp in item.replies" :key="rp.rpid">
          <view class="user-name  ellipsis--1">{{ rp.member.uname }}</view>
          <view class="user-comment">{{ rp.content.message }}</view>
        </view>
      </view>
      <!-- 无回复的 -->
      <view v-else class="comment-info">
        <view class="user-name  ellipsis--1">{{ item.member.uname }}</view>
        <view class="user-comment">{{ item.content.message }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "VideoComment",
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="less" scoped>
.video-comment {
  .comment-item {
    display: flex;
    border-bottom: 1px solid #f2f2f2;
    padding: 26rpx 20rpx 0;
    .user-img {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      margin-right: 32rpx;
      flex-shrink: 0;
    }
    .user-name {
      color: #fd7299;
      margin-bottom: 20rpx;
    }
    .comment-info {
      flex: 1;
    }
    .user-comment {
      margin-bottom: 26rpx;
    }
    .comment-reply {
      padding-top: 26rpx;
      border-top: 1px solid #f2f2f2;
      .user-name {
        color: #585858;
        margin-bottom: 20rpx;
      }
    }
  }
}
</style>
