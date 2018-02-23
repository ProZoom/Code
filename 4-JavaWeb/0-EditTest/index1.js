function printf(str) {
    var hint = document.getElementById("hint1"); //根据id获取元素
    hint.innerText += str.toString() + "\n"; //设置label显示的文字，也可以自动调用其他js文件中的hint变量
}

//=======================================BOM========================================
printf("===========BOM(window窗口信息)===========");
//window对象，窗口信息
var windowinfo = {};
windowinfo["screenLeft"] = (window.screenLeft);
windowinfo["screenTop"] = (window.screenTop); //浏览器位置
windowinfo["innerWidth"] = (window.innerWidth);
windowinfo["innerHeight"] = (window.innerHeight); //浏览器大小
windowinfo["clientWidth"] = (document.documentElement.clientWidth);
windowinfo["clientHeight"] = (document.documentElement.clientHeight); //浏览器大小
windowinfo["clientWidth"] = (document.body.clientWidth);
windowinfo["clientHeight"] = (document.body.clientHeight); //页面大小
printf(JSON.stringify(windowinfo));
window.moveTo(20, 20); //moveTo移动到绝对位置，moveBy移动相对距离。好像并没有效果
window.resizeTo(200, 200); //resizeTo调整大小到指定大小，resizeBy缩放窗口大小
var wroxwin = window.open("http://www.baidu.com", "_blank", "height=400,width=400"); //打开窗口,参数地址、窗口名或框架名、窗口属性。返回窗口引用，进而可控制窗口。window就是一个窗口引用。不过有可能弹窗会被屏蔽

//弹框和超时设置
if (wroxwin == null)
    alert("弹出窗口被屏蔽"); //弹出系统提示框，只有字符串和确定按钮
else
    var timeoutid = setTimeout(function () { //setTimeout设置超时调用。js是单线程语言。但可以设置超时调用和间歇调用
        wroxwin.close(); //关闭指定窗口
    }, 500); //设定延迟时间为500ms，这里相当于创建了新的线程，后面程序不会等待此函数执行完毕。若当前窗口关闭这此线程不会再执行
i = 0;

/*result = prompt("设定循环执行的毫秒数？","2000"); //prompt带有输入框的系统弹出框，第一个参数为提示字符串，第二个参数为默认输入内容。返回用户输入内容。
var intervalid=setInterval(function(){ //setInterval间歇执行，设置间隔时间
    printf("循环执行"+(i++).toString()+"    "+new Date().toTimeString());
    if(i==4) {
        if(!confirm("是否继续循环"))  //confirm带有确定和取消按钮的系统对话框。点击ok返回true，点击关闭或取消返回false
            clearInterval(intervalid);  //取消超时调用或间歇调用
    }
},parseInt(result));*/

printf("===========BOM(location网址信息)===========");
var locationinfo = {};
locationinfo["href"] = (location.href); //打开新网址。location包含关于网址的信息和操作。可以读取也可以设置，设置及代表操作。
locationinfo["hostname"] = (location.hostname); //hostname主机名
locationinfo["hash"] = (location.hash); //网址尾部的#后字符串
locationinfo["pathname"] = (location.pathname); //路径
locationinfo["port"] = (location.port); //端口
locationinfo["search"] = (location.search); //网址尾部？后字符串
printf(JSON.stringify(locationinfo));
printf("===========BOM(navigator浏览器信息)===========");
printf("浏览器名称:" + navigator.appName); //浏览器名称,很多属性，自己查询
printf("浏览器版本:" + navigator.appVersion); //浏览器版本


printf("===========BOM(history上网记录)===========");
try { //try尝试运行
    //history.go(-1);//后退或前进n页，
    //history.go("525heart");//跳转到最近的 网址包含指定字符号的网址上
    //history.back();  //后退一页
    //history.forward();  //前进一页
    throw "hello world"; //代码遇到异常会报错，停止运行，除非try，catch捕获异常
} catch (err) { //catch错误提示
    //if(err instanceof TypeError)     //异常类型，基类型Error，EvalError，RangeError，ReferenceError，SyntaxError，TypeError，URIError
    printf("异常：" + err);
    console.log("log将消息记录到控制台"); //将消息打印到控制台，在工具开发者选项中。Console菜单下。error打印错误消息，info打印信息消息，log打印一般消息，warn打印警告消息
} finally {
    printf("始终要运行的语句");
}