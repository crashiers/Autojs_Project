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
let utils = require('utils.js')

/* 解锁设备 */
utils.unlockDevice()

let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 进入到微信 APP 中 */
app.startActivity({
  packageName: 'com.tencent.mm',
  className: 'com.tencent.mm.ui.LauncherUI'
})

/* 等待进入微信中 */
depth(0)
  .packageName('com.tencent.mm')
  .waitFor()

let meSelectedImage = images.read('./assets/me-selected.jpg') || images.read('wexinAutoLikeSport/assets//me-selected.jpg')
let meUnselectedImage = images.read('./assets/me-unselected.jpg') || images.read('wexinAutoLikeSport/assets//me-unselected.jpg')

/* 如果打开的微信不是主页面，则返回到主页面 */
let isFoundHomePage = currentActivity() === 'com.tencent.mm.ui.LauncherUI'
while (!isFoundHomePage) {
  for (let i = 0; !isFoundHomePage && i < 2; i++) {
    let temp_screenCapture = images.captureScreen()
    if (
      images.matchTemplate(temp_screenCapture, meSelectedImage).best() ||
      images.matchTemplate(temp_screenCapture, meUnselectedImage).best()
    ) {
      isFoundHomePage = true
    } else {
      sleep(50)
    }
  }

  if (!isFoundHomePage) back()
}

/* 确认选择到微信最近对话页面 */
while (true) {
  try {
    className('android.widget.RelativeLayout')
      .depth(2) 
      .findOne()
      .findOne(
        className('android.widget.TextView')
          .depth(3)
          .text('微信'))
      .parent()
      .click()
    break
  } catch (e) {
    sleep(250)
  }
}

/* 阻塞等待切换到微信最近对话框页面，并点击右上角搜索按钮 */
while (true) {
  try {
    className('android.view.ViewGroup')
      .depth(2)
      .findOne()
      .child(0)
      .child(0)
      .findOne(textContains('微信('))
      .parent()
      .parent()
      .child(1)
      .findOne(desc('搜索'))
      .click()
    break
  } catch (e) {
    sleep(250)
  }
}

/* 在搜索栏中填入微信运动 */
className('android.widget.TextView')
  .depth(2)
  .text('取消')
  .findOne()
/* 这里暂停一下是为了等待输入框准备好 */
sleep(250)
className('android.widget.TextView')
  .depth(2)
  .text('取消')
  .findOne()
  .parent()
  .child(0)
  .setText('微信运动')

/* 在搜索框中输入微信运动并点击出现的微信运动的搜索结果 */
while (true) {
  try {
    className('android.widget.ListView')
      .depth(1)
      .findOne()
      .findOne(
        className('android.widget.TextView')
          .depth(3)
          .text('微信运动'))
      .parent()
      .click()
    break
  } catch (e) {
    sleep(250)
  }
}

/* 进入到微信运动对话框页面后点击步数排行榜 */
className('android.widget.TextView')
  .depth(4)
  .text('步数排行榜')
  .findOne()
  .parent()
  .click()

/* 阻塞等到步数排行榜页面准备好 */
className('android.widget.TextView')
  .depth(2)
  .textContains('占领了封面')
  .findOne()

let isFoundEnd = false
while (!isFoundEnd) {
  className('android.widget.ListView')
    .depth(2)
    .findOne()
    .find(
      className('android.widget.RelativeLayout')
        .depth(4)
        .drawingOrder(3))
    .slice(1) // 跳过处于列表最前面的我的运动步数
    .forEach((item) => {
      if (isFoundEnd || item.parent().child(0).child(0).text()) {
        isFoundEnd = true
      } else {
        item.click()
        sleep(100)
      }
    })

  swipe(deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 0, 250)
  sleep(250)
}

meSelectedImage.recycle()
meUnselectedImage.recycle()

/* 执行完毕退出程序返回到最开始的桌面 */
for (let i = 0; i < 3; i++) {
  back()
  sleep(500)
}

/* 锁定设备 */
utils.lockDevice()
