/*
  1、done 获取地图；
  2、done 从地图上利用鼠标点击获取经纬度；
  3、done 提取出经纬度；
  4、done 将经纬度拼接入 AQI 请求地址；
  5、done 利用 getJSON 进行 AQI 数据请求；
  6、done 处理请求得到的数据，将数据写入要显示的地方（可考虑根据鼠标位置显示）；
  7、done 对显示的元素样式进行色彩渲染；
*/

var geoData = {
    "lng": null,
    "lat": null,
}
var address = ''

// 地图对象
var map = new AMap.Map("container", {
    resizeEnable: true
});
//为地图注册click事件获取鼠标点击出的经纬度坐标
var clickEventListener = map.on('click', function(e) {
    // setPosition()
    geoData.lng = e.lnglat.getLng()
    geoData.lat = e.lnglat.getLat()

    address = `https://api.waqi.info/feed/geo:${geoData.lat};${geoData.lng}/?token=7f0180a3bb3163f3e6ec1d201a436a759192a92c`

    var request = {
        url: address,
        data: '',
        datatype: 'json',
        success: function (r) {
            console.log(r)
            dealAQIData(r)
        }
    }
    var AQIData = $.getJSON(request)
})

var dealAQIData = function(r) {
    var aqi = r.data.aqi
    console.log('aqi: ', aqi)
    var color = ''
    if(aqi < 100) {
        color = 'green'
    } else if(aqi > 100 && aqi < 250) {
        color = 'gray'
    } else {
        color = 'red'
    }

    document.getElementById("aqi-h1").innerHTML = ` 此处的AQI指数是： <span id="aqi-value">${aqi}</span>`
    document.getElementById("aqi-value").classList.add(color)

}

var setPosition = function() {
    var div = document.querySelector('#aqi')
    var body = document.querySelector('body')
    body.addEventListener('click', function(e){
        // 得到鼠标点击坐标
        var x = e.clientX
        var y = e.clientY
        console.log(x, y)
        div.style.cssText = `top:${y};left:${x};`

    })
}

// var __main = function() {
//
// }
