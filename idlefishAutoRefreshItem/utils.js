let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 解锁设备，适用于手机处于锁屏状态，且解锁方式为指定的手势解锁方案 */
function unlockDevice() {
  /* 手机屏幕开着且不处于解锁页面，则手机没有锁屏，直接返回 */
  while (true) {
    if (device.isScreenOn() && currentPackage() !== 'com.android.systemui') {
      if (confirm('设定的程序即将执行')) return
      else exit()
    } else {
      device.wakeUpIfNeeded()
      sleep(500)

      /* 执行唤醒操作后查看是否真正唤醒了，如果没有则继续执行唤醒动作 */
      if (device.isScreenOn()) break
    }
  }

  /* 阻塞等待手机被唤醒 */
  /* 1.充电时不显示上滑解锁而显示当前正在快速充电，无法进行后面的步骤 */
  /* 2.等到一秒应该换成等到当前活动应用 */
  waitForPackage('com.android.systemui')

  /* 下滑手势呼出状态栏 */
  swipe(deviceWidth / 2, 10, deviceWidth / 2, deviceHeight * 2 / 3, 250)

  /* 点击设置按钮，呼出解锁页面 */
  desc('设置').findOne().click()

  /* 阻塞等待解锁页面出现 */
  text('返回').findOne()
  sleep(250)
  /* 复杂手势解锁，与设置的具体手势有关，具体的坐标位置信息依赖于手机分辨率 */

  gesture(750, [541, 1329], [253, 1612], [832, 1616], [536, 1900])
  waitForActivity('com.android.settings.MiuiSettings')

  /* 从设置页面返回到主页，直到发现锁屏快捷按键，并在此之后统一等待 500 毫秒，让页面缓冲好 */
  home()
  waitForPackage('com.miui.home')
  sleep(250)
}

/* 锁定设备，适用于手机处于正常开启状态，且桌面首页要有锁屏快捷方式 */
function lockDevice() {
  home()
  waitForPackage('com.miui.home')

  className('android.widget.TextView')
    .text('锁屏')
    .depth(3)
    .findOne()
    .parent()
    .click()
}

module.exports = {
  lockDevice: lockDevice,
  unlockDevice: unlockDevice,
}
