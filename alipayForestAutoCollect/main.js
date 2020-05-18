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

/* 能量球识别颜色 */
const ENERGY_BALL_IDENTIFY_COLOR = '#CFFF5E'

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

className('android.widget.TextView')
  .depth(1)
  .text('蚂蚁森林')
  .waitFor()
sleep(250)

// let energyIcon = images.read('assets/energy-icon.jpg') || images.read('alipayForestAutoCollect/assets/energy-icon.jpg')
// images.matchTemplate(images.captureScreen(), energyIcon, { region: [0, 430, 1080, 630] }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
//   click(point.x + 60, point.y - 40)
//   sleep(250)
// })

/* 找到能量球颜色位置，即找到能量球的位置 */
let point
while (point = images.findColor(images.captureScreen(), ENERGY_BALL_IDENTIFY_COLOR, { region: [0, 430, 1080, 630] })) {
  click(point.x, point.y)
  sleep(250)
}

/* 蚂蚁森林刚进入时能量球还不能被正确识别为控件 */
// className('android.widget.Button')
//   .depth(7)
//   .textContains('收集能量')
//   .find()
//   .forEach((item) => {
//     let bounds = item.bounds()
//     click(bounds.centerX, bounds.centerY())
//     sleep(250)
//   })

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
  // let pickableUserPoint
  // while (pickableUserPoint = images.findColor(images.captureScreen(), PICKABLE_IDENTIFY_COLOR, { region: [950, 0] })) {
  //   click(pickableUserPoint.x, pickableUserPoint.y)

  //   className('android.widget.TextView')
  //     .depth(1)
  //     .textContains('的蚂蚁森林')
  //     .waitFor()
  //   sleep(250)
    
  //   let point
  //   while (point = images.findColor(images.captureScreen(), ENERGY_BALL_IDENTIFY_COLOR, { region: [0, 430, 1080, 630] })) {
  //     click(point.x, point.y)
  //     sleep(250)
  //   }

  //   back()
  //   className('android.widget.TextView')
  //     .depth(1)
  //     .text('蚂蚁森林')
  //     .waitFor()
  //   sleep(250)
  // }
  
  images.matchTemplate(images.captureScreen(), pickableIcon, { region: [950, 0] }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
    click(point.x - 100, point.y + 80) // 这里的偏移是手动测量后设置的
  
    className('android.widget.Button')
      .depth(7)
      .text('浇水')
      .waitFor()
    sleep(500)
    
    let energyPoint
    while (energyPoint = images.findColor(images.captureScreen(), ENERGY_BALL_IDENTIFY_COLOR, { region: [0, 430, 1080, 630] })) {
      click(energyPoint.x, energyPoint.y)
      sleep(250)
    }
  
    back()
    className('android.widget.TextView')
      .depth(1)
      .text('蚂蚁森林')
      .waitFor()
    sleep(250)
  })

  if (className('android.view.View')
    .depth(7)
    .text('没有更多了')
    .findOne(100)) isFoundEnd = true

  if (!isFoundEnd) {
    swipe(deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 0, 250)
    sleep(250)
  }
}

pickableIcon.recycle()

/* 执行完毕退出程序返回到最开始的桌面 */
for (let i = 0; i < 5; i++) {
  back()
  sleep(500)
}

/* 锁定设备 */
utils.lockDevice()