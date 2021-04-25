import request from "@/utils/request";
const baseUrl = "http://192.168.1.103:3011";
// 获取热门数据
export function getHotList(data) {
  return request({
    url: `${baseUrl}/hot`,
    data
  });
}
// 获取分类数据
export function getRegionList(data) {
  return request({
    url: `${baseUrl}/ranking/region`,
    data
  });
}
// 获取热门搜索
export function getHotwordList(data) {
  return request({
    url: `${baseUrl}/search/hotword`,
    data
  });
}
// 搜索时的提示
export function searchSuggest(data) {
  return request({
    url: `${baseUrl}/search/suggest`,
    data
  });
}
// 搜索
export function getSearchData(data) {
  return request({
    url: `${baseUrl}/search`,
    method: "post",
    data
  });
}
// 获取视频详情
export function getVideoInfo(aId) {
  return request({
    url: `${baseUrl}/av/${aId}`
  });
}
// 获取播放地址
export function getPlayUrl(aId, cId) {
  return request({
    url: `${baseUrl}/av/play_url?aId=${aId}&cId=${cId}`
  });
}
// 视频url拼接
export function getVideoUrl(url) {
  url = encodeURIComponent(url);
  return `${baseUrl}/transfer/mp4?video=${url}`;
}
// 获取视频评论
export function getVideoComments(aId, cId) {
  return request({
    url: `https://api.bilibili.com/x/v2/reply?&type=1&pn=1&oid=375194759`
  });
}
//获取视频弹幕
export function getBarrageData(aId) {
  return request({
    url: `${baseUrl}/av/barrage/${aId}`
  });
}
// 相关推荐
export function getRecommendList(aId) {
  return request({
    url: `${baseUrl}/av/recommend/${aId}`
  });
}
