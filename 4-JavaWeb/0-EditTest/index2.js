function printf(str) {
    //var hint =  document.getElementById("hint2");  //根据id获取元素，document是一个文件节点，因此document可以替换成某个节点，
    //var hint =  document.getElementsByName("tity")[2];  //getElementsByName根据name获取元素集合，通过[]获取元素
    //var hint = document.body.children[0].children[2]; //获取body的第一个子节点的第三个子节点。有时注释也会被当成一个节点
    //document.anchors包含带name的所有a，document.forms所有form，document.images所有img，document.links所有带href的a
    //var hint =  document.getElementsByTagName("label")[2];  //getElementsByTagName根据元素类型获取元素集合，通过[]获取元素。参数可以为"*"表示全部元素，[]内可以是元素name。因为返回的是hash集合
    var hint = document.getElementsByClassName("hintclass")[0]; //可以添加多个类名
    hint.innerText += str.toString() + "\n"; //设置label显示的文字，也可以自动调用其他js文件中的hint变量
}

printf("===========DOM文档信息===========");
var docinf = {};
docinf["html"] = document.documentElement; //document表示对文件的引用。
docinf["title"] = document.title; //获取标题节点，可设置标题
docinf["body"] = document.body; //获取body节点
docinf["url"] = document.URL; //网址
docinf["domain"] = document.domain; //域名，可设置
docinf["referrer"] = document.referrer; //来源页面的url
printf(JSON.stringify(docinf));
//writeln写入h5代码并添加换行。document.write在文件加载期间写入内容，在文件加载后写入会重写全部文件。
document.write("<script type='text/javascript' src='index3.js'>" + "</script>"); //write写入h5代码(动态加载js代码index3.js，若在<script>添加内部<script><\/script>)

printf("===========DOM元素节点信息===========");
var elementinfo = {};
var hint = document.getElementById("hint2");
elementinfo["tagName"] = hint.tagName; //元素标签名，nodename也是获取节点标签名
elementinfo["id"] = hint.id; //唯一标识符，可修改，修改透明
elementinfo["className"] = hint.className; //特性名称，可修改，修改立即可见
elementinfo["title"] = hint.title; //元素说明，可修改，鼠标经过可见
elementinfo["lang"] = hint.lang; //语言，可修改，修改透明
elementinfo["dir"] = hint.dir; //方向，可修改，属性重写可见
hint.setAttribute("myname", hint.dataset.myname); //setAttribute设置或创建属性。自带属性也可以直接赋值hint.id="xxxx"。dataset元素的数据属性
elementinfo["myname"] = hint.getAttribute("myname"); //getAttribute获取自定义属性，也可以获取自带属性
printf(JSON.stringify(elementinfo));
hint.removeAttribute("myatt"); //删除属性

printf("===========DOM元素节点操作==========="); //元素是一种节点。注意区分
//动态创建布局元素
hint3 = document.createElement("label"); //创建元素，传入标签名，元素节点类型值为1
//label = document.createElement("<label class='hintclass' style='background-color: #123456;' id='hint3' name='tity'></label>");  //创建元素，传入h5代码
//label = document.getElementById("hint2").cloneNode("true");//也可以使用cloneNode复制节点，参数为true表示深层复制，即复制节点内部子节点，false表示浅复制
hint3.id = "hint3";
hint3.className = "hintclass";
hint3.setAttribute("name", "tity");
hint3.style.background = "#123456"; //
var computedstyle = document.defaultView.getComputedStyle(hint3, null); //获取元素计算后样式，只读对象，不能通过此对象进行设置
printf(JSON.stringify(computedstyle)); //包含了所有样式属性
printf(hint3.style.cssText); //style是通过style设置的，cssText样式的字符串表示，length样式属性的长度，[index]或者item(index)给定位置的样式属性名，getPropertyValue(propertyName)给定属性名的属性值，removeProperty删除属性
//appendChild在父元素内部末尾添加子元素，insertBefore在指定子元素前添加子元素，replaceChild替换子元素
if (!hintdiv.contains(hint3)) //contains判断元素是否包含子元素
    hintdiv.appendChild(hint3); //在末尾添加子节点
//子节点可能是元素，文本节点，注释或者处理指令，不同的浏览器看待不同
hint3 = hintdiv.removeChild(hintdiv.lastChild); //removeChild删除子节点，lastChild最后一个子节点，firstChild第一个子节点
var hint1 = hintdiv.children[1]; //childNodes父节点的子节点集合,parentNode获取节点的父节点。children表示子元素集合
var hint2 = hint1.nextElementSibling; //nextSibling获取下一个兄弟节点，previousSBiling获得上一个兄弟节点,nextElementSibling下一个同辈元素,previousElementSibling前一个同辈元素
label = hintdiv.insertBefore(hint3, hint2.nextElementSibling); //hint2.nextSibling为空，因为最后一个子节点的下一个兄弟节点和第一个节点的上一个兄弟节点均为空。参数为空，表示在末尾插入节点。

//动态加载脚本文件和内嵌脚本
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "index4.js";
//script.text = "function sayHi(){printf('动态加载内嵌脚本';)}"
document.body.appendChild(script);


//动态创建样式文件
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "index.css";
//script.text = "function sayHi(){printf('动态加载内嵌脚本';)}"
document.head.appendChild(link); //样式文件是添加到head中，不是body中
//动态添加内嵌样式
var style = document.createElement("style");
style.type = "text/css";
try {
    style.appendChild(document.createTextNode("body{background:red}")); //非IE浏览器
} catch (err) {
    style.stylesheet.cssText = "body{background:red}"; //IE浏览器
}
document.head.appendChild(style); //document.head在chrome和safari5中包含。属于后添加的css样式，会覆盖重复样式

printf("===========DOM文本节点等==========="); //另外还有注释节点、属性节点、文档类型、CDATA区域和文档片段等一系列，不是只有元素才是节点
//文本节点(类型为3)父节点为元素，没有子节点。元素、文本都是节点的一种。文本节点的节点类型值为3
var textnode = document.createTextNode("<strong>hello</strong>world\r\n"); //可以是h5格式的文本，也可以直接为字符串
hint2 = document.getElementById("hint2");
hint2.appendChild(textnode); //将本文节点添加到元素中
textnode.appendData(textnode.nodeValue); //nodeValue文本节点所包含的文本，appendData添加文本。deleteData(offset,count)删除，insertData(offset,text)插入，replaceData(offset,count,text)替换，splitText分割文本节点



printf("===========DOM扩展===========");
var body = document.querySelector("body"); //取得标签类别获取元素
var mydiv = document.querySelector("#hintdiv"); //根据id获取元素
var hint2 = document.querySelector(".hintclass"); //根据类class获取匹配的第一个元素。通过文档document查询，在整个文档范围内查询。
hint2 = mydiv.querySelector("label.hintclass"); //根据元素类别和类名获取元素。通过元素Element查询，在元素之后查询。
var hintarr = document.querySelectorAll("div label"); //querySelectorAll查询匹配的全部元素。获得div中的label元素
if (hint2 == hintarr[2])
    printf("同一个元素");

hint2.classList.toggle("user"); //classList元素样式类控制，add添加样式，contain是否包含，remove去除，toggle添加或删除。也可以通过className设置类字符串
hint2.focus(); //focus使元素获取节点。document.actuveElement获取当前聚焦元素，文档加载完毕后，聚焦元素由null转为body，hasFocus判断元素是否聚焦。浏览器会自动滚动至聚焦元素
printf(hintdiv.outerHTML.replace(hintdiv.innerHTML, "")); //outerHTML获取和设置元素及其所有子元素字符串表示//innerHTML获取和设置元素的所有子元素字符串表示,innerText用于获取元素中的夹杂文本，outerText用于替换子元素成文本节点。不是标准的h5
hintdiv.insertAdjacentHTML("beforeend", "<strong>hello</strong> world"); //添加了三个节点，<strong>元素、hello、world两个文本节点。
//insertAdjacentHTML插入元素。beforebegin在元素前插入一个兄弟元素，afterbegin在元素下首部插入子元素，beforeend在元素下尾部插入子元素，afterend在元素后插入兄弟元素
hintdiv1.scrollIntoView(); //使元素滚动至视口中，不传参数或传入true，保持顶部对齐，传入false保持底部对齐。

printf("===========DOM2  DOM3===========");
style = document.getElementsByTagName("style")[0]; //获取第一个style元素
var sheet = style.sheet || style.styleSheet; //通过link或style元素获取样式对象。IE浏览器支持styleSheet获取样式表，其他浏览器支持sheet获取样式表CSSStyleSheet对象
if (document.styleSheets[document.styleSheets.length - 2] == sheet); //document.styleSheets应用到文档的所有样式表，css文件中每个样式算一个样式表，h5中每个style元素算一个样式表。
printf(JSON.stringify(sheet));

var rules = sheet.cssRules || sheet.rules; //根据样式表，获取规则列表。因为一个样式表可能有多个规则。
var rule = rules[1]; //获取第2个规则。即hint1的样式，每个规则有多个样式属性
printf(rule.style.cssText); //与元素的style.cssText类似，不过规则cssText不能重写
rule.style.color = "black"; //修改样式规则，添加样式属性
sheet.insertRule("#hint{color: #883456}", 0); //动态添加样式规则，第一个参数为规则为字符串，第二个参数为规则数组索引,IE使用addRule。删除规则使用deleteRule或removeRule
printf(hint2.scrollWidth); //即html的包含滚动内容的大小，元素属性//scrollHeight、scrollWidth包含滚动内容的大小,scrollTop滚动高度，scrollLeft滚动左偏移，属性可读取和设置
printf(hint2.clientHeight); //clientWidth和clientHeight包括内边距，但不包括边框
printf(hint2.offsetHeight); //offsetLeft、offsetTop、offsetHeight(包括边框，内边距)、offsetWidth、offsetParent
printf(JSON.stringify(hint2.getBoundingClientRect())); //返回元素的位置矩阵，包含left、top、right、bottom属性

printf("===========遍历===========");
if (document.implementation.hasFeature("Traversal", "2.0")) //检查浏览器某项功能能力
{
    var filter = function (node) { //设置查询过滤器
        return node.tagName.toLowerCase() == "label" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP; //在TreeWalker中还有NodeFilter.FILTER_REJECT表示跳过该节点及该节点的子节点
    };
    var iterator = document.createNodeIterator(hintdiv, NodeFilter.SHOW_ELEMENT, filter, false); //创建NodeIterator迭代器。参数：查询根节点，查询节点，过滤器。NodeFilter.SHOW_ELEMENT为查询节点类型为元素节点，可以使用|包含多种查询节点类型，
    var node = iterator.nextNode(); //第一个节点，
    while (node != null) { //最后一个节点的后续节点为null，第一个节点的前序节点为null
        printf(node.id);
        node = iterator.nextNode(); //向后迭代，previousNode向前迭代
    }
    iterator = document.createTreeWalker(hintdiv, NodeFilter.SHOW_ELEMENT, filter, false); //创建TreeWalker迭代器，迭代器包含nextNode、previousNode、parentNode、firstChild、lastChild、nextSibling、previousSibling等方法
}
//范围
var range = document.createRange(); //创建一个节点范围
range.selectNodeContents(hintdiv); //selectNode方法包含节点和子节点，selectNodeContents只包含子节点
printf(range.startContainer.id); //startContainer范围中首节点的父节点，startOffset首节点在父节点中的偏移，endContainer尾节点的父节点，endOffset尾节点在父节点中的偏移。
range.setStart(hintdiv, 0); //也可以通过setStart和setEnd设置范围。setStart的参数为startContainer和startOffset
range.setStartBefore(hintdiv.lastChild); //也可以通过setStartBefore，setStartAfter，setEndBefore、setEndAfter设置。这里获取hintdiv的最后一个节点，即上面代码添加的world文本节点
printf(range.toString()); //打印范围的字符串表示 world
var fragment = range.extractContents(); //提取范围成文档片段，range.deleteContents删除文档，range.cloneContents复制文档
hintdiv.appendChild(fragment); //添加文档片段。
range.detach();
range = null; //清理DOM范围，var newRange = range.cloneRange可以复制DOM范围