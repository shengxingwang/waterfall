/**
 * javascript waterfall
 * @author Mr sheng
 * @update 2018-05-31
 * @version 1.0
 * @parameters
 *     parentBox: parentNode
 *     childItem: the childNode className add "."
 *     prevLoadHeight: preload height  int
 *     loadDataFun: load more data
 *     noData: when ajax get data is null
 *     itemWidth: item width
 */

function waterFall(config){
	if(!config.childItem){
		console.error('please input childNode className!');
		return false;
	}
	if(!config.loadDataFun){
		console.error('please input loadData Funcion!');
		return false;
	}
	if(!config.itemWidth){
		console.error('please input itemWidth!');
		return false;
	}
	this.parentBox = config.parentBox||document.body;
	this.childItem = config.childItem;
	this.prevLoadHeight = config.prevLoadHeight||"";//提前加载高度
	this.loadDataFun = config.loadDataFun;
	this.noData = config.noData||function(){console.log('end');};
	this.itemWidth = config.itemWidth;
	this.viewHeght = document.documentElement.clientHeight;
	this.scrollHeight = document.documentElement.scrollTop||document.body.scrollTop;
	this.lastOffetTop = 0;
}
waterFall.prototype.init=function(){
	this.loadMore();
	this.scrollFun();
}
waterFall.prototype.isArray=function(o){
	return Object.prototype.toString.call(o)=='[object Array]';
}
waterFall.prototype.scrollFun = function(){
	var self = this;
	window.onscroll = function(){
		self.scrollHeight = document.documentElement.scrollTop||document.body.scrollTop;
		var childItem = document.querySelectorAll(self.childItem);
		var len = childItem.length;
		var lastItemHeight = childItem[len-1].offsetHeight;
		var prevHeight = Math.floor(lastItemHeight/2);
		if(self.prevLoadHeight!=""&&self.prevLoadHeight>0){
			prevHeight = self.prevLoadHeight;
		}
		self.lastOffetTop = (childItem[len-1].offsetTop+self.parentBox.offsetTop+lastItemHeight)-prevHeight;
//		console.log(self.lastOffetTop+"---"+(self.scrollHeight+self.viewHeght));
		if(self.lastOffetTop<=(self.scrollHeight+self.viewHeght)){
			self.loadMore();
		}else{
			return ;
		}
	}
}
waterFall.prototype.loadMore = function(){
	var self = this;
	var data = self.loadDataFun();
	if(data.length<1){
		self.noData();
	}else{
		if(self.isArray(data)){
			self.createDom(data);
		}else{
			console.error('dataType error,data is not array!');
		}
	}
}
waterFall.prototype.createDom = function(data){
	var self = this;
	var len = data.length;
	var htmlStr = "";
	for(var i = 0;i<len;i++){
		var d = data[i];
		var item = document.createElement("div");
		item.className="item";
		if(d.id){
			item.id=d.id;
		}
		var img = document.createElement("img");
		img.src = d.imgUrl;
		img.className = "itemImg";
		item.appendChild(img);
		self.parentBox.appendChild(item);
	}
	setTimeout(function(){
		self.layoutDom();
	},0)
}
waterFall.prototype.layoutDom = function(){
	var self = this;
	var colNum = Math.floor(self.parentBox.offsetWidth/self.itemWidth);
	var childItem = document.querySelectorAll(self.childItem);
	var len = childItem.length;
	var heightArr = [];
	for(var i = 0;i<len;i++){
		if(i<colNum){
			childItem[i].style.top=0;
			childItem[i].style.left=i*self.itemWidth+"px";
			heightArr[i] = childItem[i].offsetHeight;
			console.log(heightArr[i]);
		}else{
			var minHeight = Math.min.apply(Math,heightArr);
			minIdx = heightArr.indexOf(minHeight);
			childItem[i].style.top=minHeight+"px";
			childItem[i].style.left=(minIdx*self.itemWidth)+"px";
			heightArr[minIdx] += childItem[i].offsetHeight;
		}
	}
	var maxHeight = Math.max.apply(Math,heightArr);
	self.parentBox.style.height = maxHeight+"px";
	self.parentBox.style.width = (colNum*self.itemWidth)+"px";
}
