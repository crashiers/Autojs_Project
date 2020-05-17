/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast('请求截图权限失败')
  exit()
} else {
  sleep(250)
}

/* 引入工具箱 */
let utils = require('utils.js') || require('alipayForestAutoCollect/utils.js')

/* 解锁设备 */
utils.unlockDevice()

let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 进入到支付宝 APP 中 */
app.startActivity({
  packageName: 'com.eg.android.AlipayGphone',
  className: 'com.alipay.mobile.quinox.LauncherActivity'
})

/* 等待进入支付宝中 */
depth(0)
  .packageName('com.eg.android.AlipayGphone')
  .waitFor()

idContains('search_button')
  .findOne()
  .click()

idContains('search_input_box')
  .findOne()
  .setText('蚂蚁森林')
sleep(250)

className('android.widget.FrameLayout')
  .depth(1)
  .desc('搜索')
  .findOne()
  .click()
sleep(250)

className('android.widget.TextView')
  .depth(4)
  .text('蚂蚁森林')
  .findOne()
  .parent()
  .click()

className('android.view.View')
  .depth(6)
  .textContains('总排行榜')
  .findOne()
  .click()

className('android.view.View')
  .depth(6)
  .textContains('查看更多好友')
  .findOne()
  .click()
sleep(250)

/* 向下滑动寻找可以获取的能量 */
let pickableIcon = images.read('assets/pickable-icon.jpg') || images.read('alipayForestAutoCollect/assets/pickable-icon.jpg')
let isFoundEnd = false
while (!isFoundEnd) {
  images.matchTemplate(images.captureScreen(), pickableIcon).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
    click(point.x + 34, point.y + 34) // 这里的偏移是手动测量后设置的


    className('android.widget.Button')
      .depth(7)
      .textContains('收集能量')
      .find()
      .forEach(function ((item) => {
        
      }))
  })
}

className('android.view.View')
  .depth(6)
  .drawingOrder(0)
  .findOne()
  .children()
  .forEach((item) => {

  })

pickableIcon.recycle()