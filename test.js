// const meBottomButten = className("android.support.v7.widget.RecyclerView").findOne()

// meBottomButten.children().forEach((item) => {
//   console.log(item.boundsInScreen)
// })

// toastLog(app.autojs.versionName)
// toastLog(app.getPackageName('闲鱼'))
// app.openAppSetting('com.taobao.idlefish')
// app.viewFile("/sdcard/1.txt")
// toastLog(currentPackage())
// toastLog(currentActivity())
// app.startActivity("com.taobao.fleamarket.home.activity.MainActivity")
// waitForPackage("com.tencent.mm")
// waitForActivity("com.taobao.fleamarket.home.activity.MainActivity")
// toastLog(123456)
// console.show()
// console.log(2131313)
// console.log(device.width)
// console.log(device.height)
// console.log(device.device)
// console.log(device.model)
// toast(device.setBrightness(200))
// toastLog(device.getMusicVolume())
// toastLog(device.getNotificationVolume())
// toastLog(device.getAlarmVolume())
// toastLog(device.getBattery())
// toastLog(device.getTotalMem())
// toastLog(device.getAvailMem())
// toastLog(device.wakeUp())
// device.vibrate(100) // 使设备振动
// alert(123456)
// toastLog(confirm("要清除所有缓存吗?"))
// alert("出现错误~", "出现未知错误，请联系脚本作者")
// var name = rawInput("请输入您的名字", "小明");
// alert("您的名字是" + name);
// var options = ["选项A", "选项B", "选项C", "选项D"]
// var i = dialogs.singleChoice("请选择一个选项", options);
// if(i >= 0){
//     toast("您选择的是" + options[i]);
// }else{
//     toast("您取消了选择");
// }
// dialogs.build({
//   //对话框标题
//   title: "发现新版本",
//   //对话框内容
//   content: "更新日志: 新增了若干了BUG",
//   //确定键内容
//   positive: "下载",
//   //取消键内容
//   negative: "取消",
//   //中性键内容
//   neutral: "到浏览器下载",
//   //勾选框内容
//   checkBoxPrompt: "不再提示"
// }).on("positive", ()=>{
//   //监听确定键
//   toast("开始下载....");
// }).on("neutral", ()=>{
//   //监听中性键
//   app.openUrl("https://www.autojs.org");
// }).on("check", (checked)=>{
//   //监听勾选框
//   log(checked);
// }).show();

// var d = dialogs.build({
//   title: "下载中...",
//   progress: {
//       max: -1
//   },
//   cancelable: false
// }).show();

// setTimeout(()=>{
//   d.dismiss();
// }, 3000);
//请求截图
// if(!requestScreenCapture()){
//   toast("请求截图失败");
//   exit();
// }

// files.ensureDir('/sdcard/000/')
// captureScreen("/sdcard/000/1.png");

// powerDialog()
// notifications()
// quickSettings()
// recents()
// Power()
// Text("aaa")
// scrollUp()
// scrollDown(1)

// log(textMatches(/微信\(\d+\)/).findOne())
log(className('android.widget.ListView').depth(3).findOne().children())



/* 等待确认启动无障碍服务 */
// auto.waitFor()

/* 启动闲鱼APP */
// app.launch('com.taobao.idlefish')

