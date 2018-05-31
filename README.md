# waterfall
# 原生js 瀑布流插件
# 引入插件
<script src="js/InfiniteLoad.js"></script>
# 调用插件
var opt = {
  parentBox:$("#conbox")[0],
  prevLoadHeight:0,
  childItem:'.item',
  loadDataFun:loadDataFun,
  itemWidth:300
}
实例化瀑布流
var waterfall = new waterFall(opt);
初始化瀑布流
waterfall.init();
