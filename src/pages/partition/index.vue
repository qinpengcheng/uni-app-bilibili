<template>
  <view class="partition">
    <view
      class="partition-item"
      v-for="(item, index) in partitionData"
      :key="index"
    >
      <img
        class="icon"
        :src="`../../static/partitionIcon/${item.imgName}.png`"
      />
      <text class="title">{{ item.name }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "partition",
      partitionData: [
        {
          name: "番剧",
          imgName: "fanju",
          type: 0
        },
        {
          name: "国创",
          imgName: "guochuang",
          type: 0
        },
        {
          name: "纪录片",
          imgName: "jilupian",
          type: 0
        },
        {
          name: "动画",
          imgName: "donghua",
          type: 0
        },
        {
          name: "音乐",
          imgName: "yinyue",
          type: 0
        },
        {
          name: "舞蹈",
          imgName: "wudao",
          type: 0
        },
        {
          name: "游戏",
          imgName: "youxi",
          type: 0
        },
        {
          name: "知识",
          imgName: "zhishi",
          type: 0
        },
        {
          name: "数码",
          imgName: "shuma",
          type: 0
        },
        {
          name: "汽车",
          imgName: "qiche",
          type: 0
        },
        {
          name: "生活",
          imgName: "shenghuo",
          type: 0
        },
        {
          name: "美食",
          imgName: "meishi",
          type: 0
        },
        {
          name: "动物圈",
          imgName: "dongwuquan",
          type: 0
        },
        {
          name: "鬼畜",
          imgName: "guichu",
          type: 0
        },
        {
          name: "时尚",
          imgName: "shishang",
          type: 0
        },
        {
          name: "娱乐",
          imgName: "yule",
          type: 0
        },
        {
          name: "影视",
          imgName: "yingshi",
          type: 0
        },
        {
          name: "电影",
          imgName: "dianying",
          type: 0
        },
        {
          name: "电视剧",
          imgName: "dianshiju",
          type: 0
        },
        {
          name: "游戏赛事",
          imgName: "youxisaishi",
          type: 0
        }
      ]
    };
  },
  onLoad() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.partition {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 14rpx;
  &-item {
    width: (100% / 4);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36rpx 0;
    img {
      width: 74rpx;
      height: 74rpx;
    }
    title {
      color: #505050;
    }
  }
}
</style>
