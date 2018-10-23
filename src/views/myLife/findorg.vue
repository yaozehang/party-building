<template>
  <div>
    <Header></Header>
    <div id="container"></div> 
  </div>
</template>

<script>
  export default {
    methods:{
      map(){
        var map = new BMap.Map("container");// 创建地图实例  
        const Bpoint = new BMap.Point(116.404,39.915)
        const Zpoint = new BMap.Point(114.16,33.24)// 创建点坐标  
        map.centerAndZoom(Bpoint,5);// 初始化地图，设置中心点坐标和地图级别  
        map.addControl(new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT}));    
        var marker1 = new BMap.Marker(Bpoint);        // 创建标注    
        var marker2 = new BMap.Marker(Zpoint)
        map.addOverlay(marker1);                     // 将标注添加到地图中 
        map.addOverlay(marker2); 
        var opts1 = {
          position : Bpoint,    // 指定文本标注所在的地理位置
          offset   : new BMap.Size(10, -40)    //设置文本偏移量
        }
        var label1 = new BMap.Label("信息工程学院学生流动党支部支部书记：高洋 电话：13526395586", opts1);  // 创建文本标注对象
          label1.setStyle({
            color : "black",
            fontSize : "12px",
            height : "20px",
            lineHeight : "20px",
            fontFamily:"微软雅黑"
          });
        map.addOverlay(label1); 
        var opts2 = {
          position : Zpoint,    // 指定文本标注所在的地理位置
          offset   : new BMap.Size(10, -65)    //设置文本偏移量
        }
        var label2 = new BMap.Label("信息工程学院学生党支部支部书记：杨鑫 电话：0396-2853187", opts2);  // 创建文本标注对象
          label2.setStyle({
            color : "black",
            fontSize : "12px",
            height : "20px",
            lineHeight : "20px",
            fontFamily:"微软雅黑"
          });
        map.addOverlay(label2); 
        var opts3 = {
          position : Zpoint,    // 指定文本标注所在的地理位置
          offset   : new BMap.Size(10, -40)    //设置文本偏移量
        }
        var label3 = new BMap.Label("信息工程学院党总支 总支书记：柳晓阳 电话：0396-285032", opts3);  // 创建文本标注对象
          label3.setStyle({
            color : "black",
            fontSize : "12px",
            height : "20px",
            lineHeight : "20px",
            fontFamily:"微软雅黑"
          });
        map.addOverlay(label3); 
      }
    },
    mounted(){
      this.map()
    }
  }
</script>

<style scoped>
#container{
  height:calc(100vh - .86rem);
  width: 7.5rem;
  margin-top: .86rem;
  }  
</style>