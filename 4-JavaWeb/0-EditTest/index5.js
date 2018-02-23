function printf(str) {
    var hint = document.getElementById("hint3"); //根据id获取元素，document是一个文件节点，因此document可以替换成某个节点，
    hint.innerText += str.toString() + "\n"; //设置label显示的文字，也可以自动调用其他js文件中的hint变量
}
printf("===========XML,E4X===========");

printf("===========JSON===========");
var person0 = {
    name: "person0",
    age: 11
}; //定义js对象
var person1 = {
    "name": "person1",
    "age": 12,
    toJSON: function () {
        return this.name;
    }
}; //定义一个JSON数据结构下的对象，与js对象的对象字面量的区别在于属性必须加引号
var person2 = {
    "name": "person2",
    "age": 13,
    "school": {
        "name": "school1",
        "age": 122
    }
}; //JSON中对象可以嵌套。key和value内用:连接，不同key-value用,连接，最后一个value后不加符号。每个JSON对象使用{}包含
var persons = [person0, person1, person2]; //JSON中对象数组
persons[2].age = person0.age; //JSON中数组对象与js对象使用方法相同
var personstr = JSON.stringify(persons); //JSON.stringify将对象(正常的或JSON数据结构下的)转化为JSON字符串(称为序列化)。可以序列化对象或对象数组。会自动滤出值为underfined的属性
printf(personstr); //调用stringify，执行顺序：toJSON虚函数或对象本身，函数过滤器，存在属性进行序列化，缩进参数进行格式化
person2str = JSON.stringify(person2, ["name", "age"], "--"); //第二个参数是过滤器，表示只保留name和age两个属性。第三个参数是换行缩进，可为数字缩进空格数目，最大缩进为10，可为字符串，表示缩进字符串
printf(person2str);
/*personstr = JSON.stringify(person2,function(key,value){  //使用函数为过滤器
   if(key=="name"||key=="age")
        return value;
    else
        return undefined;  //返回undefined就不会再被序列化
},4);//由于在label元素中连续空格会被自动缩减成一个空格*/
persons = JSON.parse(personstr); //JSON.parse将字符串转化为js对象或数组
/*
person2 = JSON.parse(person2str,function(key,value){  //使用函数控制转化操作
  if(key=="name") return "family"+value;
    else return value;
});
*/



printf("===========AJAX请求与Comet推送===========");
//请求
var xhr = new XMLHttpRequest(); //创建XHR对象
xhr.onreadystatechange = function () { //onreadystatechange状态变化函数，
    printf("readstate=" + xhr.readyState.toString()); //readyState的取值0为未初始化，未调用open，1已open未send，2已send未回复，3回复部分，4全部回复
    if (xhr.readyState == 3) //在后台使用推送机制的话，前端会间断的收到推送数据，状态为3。
        printf(xhr.responseText); //responseText包含曾经的所有推送数据，所以每次读取应该根据旧数据长度查找最新的数据的位置。这里省略了
};
xhr.onload = function () {
    printf("接收响应完成");
}; //响应完成事件，无论什么响应，接收完成就触发
//xhr.onerror=function(){printf("响应出错");};  //响应出错事件
xhr.onprogress = function (event) { //进度事件
    if (event.lengthComputable) { //lengthComputable表示进度信息是否可用
        printf("进度" + event.position * 1.0 / event.totalSize); //position表示已接收数，totalSize表示预期接收数
    }
};
xhr.open("get", "example.php?qunid=12", false); //opet准备启动请求，参数：请求类型post或get，请求地址，是否异步发送。同步的话会等待程序返回方可继续
xhr.setRequestHeader("myheader", "myvalue"); //自定义头部信息，发送自定义信息
xhr.send(null); //发送请求，如果是同步，会直到响应完毕才会继续运行。参数：请求主体。xhr.abort()取消异步请求
if ((xhr.status > 200 && xhr.status < 300) || xhr.status == 304) {
    printf(xhr.responseText); //responseText返回数据，responseXML在响应类型为text/xml和application/xml时返回XML的响应数据
    printf(xhr.getResponseHeader("myback")); //读取服务器返回在自定义头部信息
    printf(xhr.getAllResponseHeaders()); //返回所有信息
} else printf("失败：" + xhr.status); //statusText表示HTTP状态描述，各浏览器不同

//请求数据序列化
var data = new FormData(); //序列化表单new FormData(myform)，参数可以为空，即空的对象
data.append("qunid", "21"); //添加键值对
//data.append("file1",files[0]);  //可以在包含file的表单中直接添加文件
//xhr.timeout=1000;  //响应超时，仅IE8+支持
xhr.ontimeout = function () {
    printf("响应超时")
};
xhr.open("post", "example.php", true);
xhr.send(data); //发送序列化数据

//推送（SSE）：长轮训，短轮训，http流(响应事件的MIME类型为text/event-stream)，
// 在接收推送数据时可以使用onreadystatechange函数中readyState=3时读取responseText
var source = new EventSource("myevent.php"); //参数：入口点。必须与创建对象的页面同源(url模式，域、端口)。连接断开会自动建立,或者使用source.close()强制断开
source.onmessage = function (event) { //open在连接建立时触发，message在接收到新数据时触发，error在无法建立连接时触发
    printf(event.data); //推送数据保存在event.data中
};
source.onerror = function () {
    printf("连接失败");
    printf("连接状态" + source.readyState)
}; //readyState属性0表示正在连接，1表示打开了链接，2表示关闭了链接

//web sockets使用自定义协议，需要专门服务器支持。
/*var socket = new WebSocket("ws://www.example.com/server.php");  //未加密的链接不使用http，而是ws，加密的使用wss
socket.send("hello world");  //发送数据
socket.onmessage=function(event){  //web socket有open、error、close事件
    printf(event.data);
    printf(socket.readyState);  //0表示正在建立，1已经建立，2正在关闭，3已经关闭
};*/




printf("===========离线应用与客户端存储===========");
if (navigator.onLine) //检测离线还是在线。也可以通过window事件online和offline设置离线或在线。chrome11-即之前的版本始终为true
    printf("当前处于在线状态");
else printf("当前处于离线状态");

//cookie集成自定义类。cookie会在每次请求绑定网址的时候添加到http头部。
var CookieUtil = {
    get: function (name) {
        var cookiename = encodeURIComponent(name) + "=",
            cookiestart = document.cookie.indexOf(cookiename),
            cookievalue = null;
        if (cookiestart > -1) {
            var cookieend = document.cookie.indexOf(";", cookiestart);
            if (cookieend == -1) cookieend = document.cookie.length;
            cookievalue = decodeURIComponent(document.cookie.substring(cookiestart + cookiename.length, cookieend));
        }
        return cookievalue;
    },
    set: function (name, value, expires, path, domain, sexure) {
        var cookietext = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) cookietext += "; expires=" + expires.toGMTString();
        if (path) cookietext += "; path=" + path;
        if (domain) cookietext += "; domain=" + domain;
        if (sexure) cookietext += "; secure";
        document.cookie = cookietext;
    },
    unset: function (name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
};
CookieUtil.set("name", "luanpeng", "/books/projs/", "www.example.com", new Date("January 1,2020")); //添加设置
CookieUtil.get("name"); //读取
CookieUtil.unset("name", "/books/projs/", "www.example.com"); //删除

printf("===========storage存储===========")
//sessionstorage保存到浏览器关闭
sessionStorage.setItem("name", "luanpeng"); //添加设置存储key-value
sessionStorage.age = 12; //读取设置数据
for (var key in sessionStorage) //key函数迭代属性
    printf(sessionStorage.getItem(key)); //getItem读取属性值
delete sessionStorage.name;
sessionStorage.removeItem("age");


//localstorage同一个对象访问必须域名相同。数据保留至用户删除或清除缓存
localStorage.setItem("name", "luanpeng"); //添加设置属性
localStorage.age = 12; //添加设置
printf(localStorage.getItem("age")); //读取
printf(localStorage.name); //读取