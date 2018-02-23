function printf(str) {
    var hint = document.getElementById("hint2"); //根据id获取元素，document是一个文件节点，因此document可以替换成某个节点，
    hint.innerText += str.toString() + "\n"; //设置label显示的文字，也可以自动调用其他js文件中的hint变量
}
printf("===========表单脚本===========");
myform = document.getElementById("myform");
//acceptCharset服务器能够处理的字符集，action请求地址，elements表单字段input集合，enctype请求的编码类型，length表单控件数量，method请求方式，name名称，reset()表单恢复默认值，submit()表单提交，提交前触发，target请求发送和接收相应的窗口名称
//表单字段共有属性：disabled是否可用，form字段所属表单，name字段名称，readOnly是否只读，tabIndex字段切换序号，type字段类型(控件类型)，value字段的值，checkValidity字段是否有效
//表单字段共有方法：focus聚焦，blur失去焦点函数，
text1.onkeyup = function (event) {
    var target = event.target; //获取事件目标元素，也就是this
    if (target.value.length == target.maxLength) { //value字段的值，maxLength属性
        var form = target.form; //form目标所属表单
        if (form.elements[1] && !form.elements[1].readOnly) { //elements表单元素集合，readOnly字段属性
            form.elements[1].focus(); //focus字段函数-聚焦
            form.reset(); //表单函数-恢复默认
        }
    }
};
//文件脚本
myfile = document.getElementById("myfile");
myfile.onchange = function (event) {
    var files = event.target.files;
    var reader = new FileReader(); //异步读取文件
    var type = "default";
    if (/image/.test(files[0].type)) { //test判断是否匹配，"名称"：files[0].name，"类型"：files[0].type，"大小"：files[0].size
        type = "image";
        reader.readAsDataURL(files[0]); //readAsdataURL读取文件已数据URL的形式保存，readAsText以纯文本形式读取指定编码形式文件，readAsBinaryString读取文件成字符串，readAsArrayBuffer读取文件成数组
    } else {
        reader.readAsText(files[0]);
        type = "text";
    }
    reader.onerror = function () {
        alert("读取文件出错" + reader.error.code);
    };
    reader.onprogress = function (event) { //每50ms更新一次进度
        if (event.lengthComputable)
            var rate = event.loaded / event.total;
        alert("加载比例" + rate);
    };
    reader.onload = function () {
        switch (type) {
            case "image":
                hintdiv.insertAdjacentHTML("beforeend", "<img src='" + reader.result + "'>");
                break;
            case "text":
                hintdiv.insertAdjacentHTML("beforeend", reader.result);
                break;
        }
    };
};

//文本框脚本
text1 = document.getElementById("text1");
text1.select(); //text和textarea文本内容被全部选择，会自动聚焦
text1.setSelectionRange(1, 4); //选择部分文本，参数为起点和终点索引，会选中包含起点，但不包含终点的文本
printf(text1.value.substring(text1.selectionStart, text1.selectionEnd - 1)); //selectionStart选择的文本的起点，selectionEnd选择的文本的终点


//选择框脚本
//选择框属性：add(newoption,reloption)，multiple是否允许多选,options选项元素合集，remove(index)删除选项，selectedIndex选中项索引，size选中框可见行数
//选项属性：index选项索引，label选项标签，selected是否被选中，text选项的文本，value选项的value值，
var myselect = document.getElementById("myselect");
var newoption = document.createElement("option"); //创建选项元素
newoption.appendChild(document.createTextNode("第3个选项")); //选项添加文本
newoption.setAttribute("value", "myoption3"); //选项添加value
myselect.appendChild(newoption); //添加选项
newoption = new Option("第4个选项", "myoption4"); //创建选项元素
myselect.appendChild(newoption); //插入新选项
newoption = new Option("第5个选项", "myoption5"); //创建选项元素
myselect.add(newoption, undefined); //插入新选项
myselect.removeChild(myselect.options[0]); //options选项合集，removeChild删除子元素
myselect.remove(0); //删除第一个选项，
myselect.options[0] = null; //删除第一个选项，
myselect.insertBefore(myselect.options[1], myselect.options[0]); //调换选项位置
myselect.options[1].selected = true; //设置第二个选项被选中
var selectoption = myselect.options[myselect.selectedIndex]; //selectedIndex当前选中项索引
printf(selectoption.text + selectoption.value);




printf("===========canvas绘图===========");
var mycanvas = document.getElementById("mycanvas");
if (mycanvas.getContext) { //判断浏览器是否支持
    var context = mycanvas.getContext("2d"); //context是画布，getContext获取绘图上下文对象，也有名为WebGL的3d上下文
    //绘制矩形
    context.fillStyle = "#0000ff"; //填充颜色
    context.fillRect(10, 10, 70, 70); //填充矩形，xy宽高(像素)
    context.lineWidth = 20; //边框宽度
    context.lineCap = "round"; //线条末端形状，butt平头，round圆头，square方头，
    context.lineJoin = "round"; //线条交叉方式，round圆交，bevel斜交，miter斜接
    context.strokeStyle = "red"; //描边颜色
    context.strokeRect(50, 50, 50, 50); //描边矩形
    context.clearRect(50, 50, 20, 20); //清除一块矩形区域
    //绘制路径
    context.beginPath(); //创建路径
    context.arc(200, 100, 20, 0, 2 * Math.PI, false); //绘制圆参数：圆心坐标，半径，起始角度，是否顺时针。 arcTo绘制圆弧
    context.moveTo(200, 100); //移动绘图游标
    context.lineTo(200, 15); //绘制直线，从游标位置惠子直线到参数，bezierCurveTo绘制曲线，quadraticCurveTo绘制二次曲线，reac绘制矩形，
    context.fillStyle = "rgba(0,0,0,1)"
    context.stroke(); //用strokeStyle描边
    context.fill(); //用fillStyle填充

    //绘制文本
    context.font = "bold 14px Arial"; //设置文本样式，大小，字体
    context.textAlign = "center"; //文本对齐方式，start、end
    context.textBaseline = "middle"; //上下对齐方式，top、middle、bottom
    context.fillText("文本", 200, 15); //fillText使用fillStyle，strokeText使用strokeStyle
    context.globalAlpha = 0.5; //设置全局透明度
    //context.save();  //保存当前状态
    context.translate(10, 10); //坐标平移，transform矩阵变换，setTransform先恢复默认再矩阵变换
    context.rotate(1); //旋转角度，scale缩放比例，

    //drawImage绘制图像
    //shadowColor、shadowOffsetX、shadowOffsetY、shadowBlur阴影
    //createLinearGradient渐变
    //createPattern填充描边模式
    //getImageData获取图像数据
    var imgurl = mycanvas.toDataURL("image/png");
    var image = document.createElement("img");
    image.src = imgurl;
    hintdiv1.appendChild(image);

    //WebGL绘图3D
}