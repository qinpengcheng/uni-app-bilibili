<template>
  <view class="partition">
    <view
      class="partition-item"
      v-for="item in partitionData"
      :key="item.type"
      @click="linkTo(item)"
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
          type: 1
        },
        {
          name: "国创",
          imgName: "guochuang",
          type: 2
        },
        {
          name: "纪录片",
          imgName: "jilupian",
          type: 3
        },
        {
          name: "动画",
          imgName: "donghua",
          type: 4
        },
        {
          name: "音乐",
          imgName: "yinyue",
          type: 5
        },
        {
          name: "舞蹈",
          imgName: "wudao",
          type: 6
        },
        {
          name: "游戏",
          imgName: "youxi",
          type: 7
        },
        {
          name: "知识",
          imgName: "zhishi",
          type: 8
        },
        {
          name: "数码",
          imgName: "shuma",
          type: 9
        },
        {
          name: "汽车",
          imgName: "qiche",
          type: 10
        },
        {
          name: "生活",
          imgName: "shenghuo",
          type: 11
        },
        {
          name: "美食",
          imgName: "meishi",
          type: 12
        },
        {
          name: "动物圈",
          imgName: "dongwuquan",
          type: 13
        },
        {
          name: "鬼畜",
          imgName: "guichu",
          type: 14
        },
        {
          name: "时尚",
          imgName: "shishang",
          type: 15
        },
        {
          name: "娱乐",
          imgName: "yule",
          type: 16
        },
        {
          name: "影视",
          imgName: "yingshi",
          type: 17
        },
        {
          name: "电影",
          imgName: "dianying",
          type: 18
        },
        {
          name: "电视剧",
          imgName: "dianshiju",
          type: 19
        },
        {
          name: "游戏赛事",
          imgName: "youxisaishi",
          type: 20
        }
      ]
    };
  },
  onLoad() {},
  methods: {
    linkTo(row) {
      console.log(row);
      uni.navigateTo({
        url: `../partitionDetail/index?title=${row.name}&type=${row.type}`
      });
    }
  }
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
