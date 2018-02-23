function printf(str) {
    var hint = document.getElementById("hint3"); //根据id获取元素，document是一个文件节点，因此document可以替换成某个节点，
    hint.innerText += str.toString() + "\n"; //设置label显示的文字，也可以自动调用其他js文件中的hint变量
}
printf("===========事件绑定===========");
//时间可以在h5代码中直接添加也可以在js代码中添加
var input1 = document.getElementById("input1");
input1.onclick = function (event) { //事件也是元素对象的方法属性，可以直接设置和调用input1.onclick(),删除input1.onclick=null;
    alert("又点击了" + event.type); //event事件对象，包含属性bubbles是否冒泡，currentTarget事件执行元素，等价于this，target事件的目标，触发事件的元素(引起事件的元素)。因为一个事件会向上冒泡
    event.stopPropagation(); //阻止事件传播，不会继续捕获或冒泡，但是本元素绑定的其他事件会继续执行，preventDefault取消事件默认行为。eventPhase表示事件的阶段，捕获阶段为1，目标对象上为2，冒泡阶段为3
};
input1.addEventListener("click", function (event) {
    alert("又又点击了" + event.target.id)
}, true); //参数：事件类型，函数引用，false表示冒泡段执行，true表示捕获段执行。addEventListener函数也可以为元素添加事件,不覆盖已有事件。removeEventListener删除事件，删除了必须和添加时是相同的函数引用。(本句中的匿名函数无法删除)
//IE浏览器使用attachEvent何detachEvent设置事件
//IE浏览器中event = window.event，

printf("===========事件类型===========");
//UI事件：load加载完成事件 unload卸载完成事件，abort取消事件，error错误事件，resize大小变化事件，select文本框选择事件，scroll元素滚动条滚动事件
//焦点事件：blur失去焦点，focus获得焦点(不冒泡)，focusin获得焦点(冒泡)，focusout失去焦点。（执行顺序：原元素失去焦点focusout，新元素获取焦点focusin，原元素失去焦点blur，新元素获得焦点focus）

//鼠标事件：click点击事件、dblclivk双击事件，mousedown按下鼠标事件，mouseenter鼠标进入事件(不冒泡，进入子元素不触发)，mouseleave鼠标离开事件(不冒泡，进入子元素不触发)，mousemove鼠标元素内移动事件，mouseout鼠标离开事件，mouseover鼠标经过事件，mouseup鼠标弹起事件。//双击的执行顺序：按下、弹起、点击、按下、弹起、点击、双击
//鼠标事件信息：event.button鼠标按钮信息。event.clientX表示点击点在视口的位置，event.pageX表示在页面中的位置(视口+滚轮)，event.screenX表示屏幕位置，event.shiftKey表示修改键shift是否按下(shift、ctrl、alt、meta键(windows键或cmd键))。event.relatedTarget相关元素，在鼠标跨元素移动时的关联元素
//滚轮事件：mousewheel冒泡到window对象，event.wheelDelta存储滚动量

//键盘与文本事件：keydown按任意键事件，长按重复触发，keypress按字符键事件(影响文本的键，删除键触发)，长按重复触发，keyup释放键事件。textInput文本输入事件(实际字符键，删除键不触发)，显示之前触发。触发顺序：keydown、keypress、textInput、keyup
//键盘事件信息：event.keyCode键盘码，event.charCode字符ASCII码，有些浏览器还支持key、keyIdentifier、char属性
//文本事件信息：event.data用户输入的字符，event.inputMethod文本输入方式(键盘，粘贴，拖放，语音...)


//DOM结构变化事件：DOMNodeRemoved事件，在removeChild和replaceChild删除节点前触发，会冒泡，event.target为被删除的节点，event.relatedNode为目标节点的父节点，
//DOM结构变化事件：DOMNodeInserted事件，在appendChild、replaceChild、insertBefore插入节点后触发，会冒泡，event.target为被插入的节点，event.relatedNode为目标节点的父节点，
//DOMNodeRemoved删除节点前触发，DOMNodeInserted在一个节点作为子节点插入到另一个节点时触发。DOMAttrModified元素属性被修改后触发，DOMNodeInsertedIntoDocument节点直接或间接被插入文档后触发(不冒泡)。DOMNodeRemovedFromDocument节点直接或间接被删除前触发(不冒泡)。DOMSubtreeModified结构改变均触发，最后执行
//删除插入节点执行顺序：目标节点执行DOMNodeRemoved(冒泡)，目标节点执行DOMNodeRemovedFromDocument(不冒泡)，目标节点在所有子节点执行DOMNodeRemovedFromDocument(不冒泡)，目标节点父节点执行DOMSubtreeModified(不冒泡)


//h5事件：contextmenu右键菜单事件(取消默认，获取位置，显示自定义菜单，左键单击隐藏菜单事件)。
//window事件beforeunload页面卸载前事件，DOMContentLoaded事件DOM树形成后触发，load事件资源文件全部下载完成后触发
//window事件hashchange，网址#后的所有字符串发生变化触发。触发后用location查询当前参数列表


//剪切板事件


//设备事件：orientationchange屏幕旋转事件，MozOrientation(deviceorientation)方向旋转事件，devicemotion移动事件，
//触摸事件，手势事件



//为节省内存，优化性能，对子元素含有较多冒泡事件的节点上，可以设置总事件，总事件中eventTarget获取目标子元素执行相应函数，进而取消子元素的事件节省内存。
//innerHTML删除子元素前要取消子元素绑定事件，节省内存


printf("===========事件模拟===========");


//window.addEventListener("beforunload",function(event){event.returnValue = "确认关闭么？";return "确认关闭么";});