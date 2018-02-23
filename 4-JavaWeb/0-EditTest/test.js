var konggestr="&nbsp; &nbsp; &nbsp; &nbsp; ";   //空格
printf(konggestr+"===========数组===========")
//变量是松散型的，可以指向任意类型的数据
var name = "student",age=12;   //underfined、null、boolean、string、number为基本数值类型。逗号一并定义初始化多个变量。基本包装类型String、Boolean、Number通过valueOf()可以获取基本数值类型，可以实现自动装箱和拆箱操作。
var names=[];//定义数组并初始化为空
names = ["小明","小红","小刚"];  //赋值，可以在定义时赋值
names=new Array(names.length);   //数组基类为Array，属性length为数组长度
names = new Array('小明','小红','小刚');   //字符串不区分单双引号，只要配对使用就行
names[4]="小胡";   //通过设置，直接添加了两项null和“小胡”
printf(names.join(","));   //使用间隔字符串连接数组
names.unshift("小李","小兰");   //首部添加
names.push("小李","小兰");   //末尾添加
var item = names.pop();//删除获取最后一项
item=names.shift();//删除获取第一项
names.reverse();  //数组取反
printf(names);
names = names.slice(-4,6);  //读取数组段，不修改源数组，复数表示从右向左数，-1表示末尾第一个元素，0表示首部第一个元素。只有一个参数时表示直到末尾。读取包含第一个参数不包含第二个参数
printf(names);
names.splice(2,1,"小季","小明");  //删除添加数据，修改源数组，删除添加参数第一个参数表示开始删除的位(包含),第二个参数表示要删除的位数目，后面参数表示在删除位置处添加元素
printf(names);
names=names.concat("小王",["小明","小黑"]); //不修改源数组，所以要赋值
names.sort();  //数组排序sort(compare)，参数可为排序函数,空元素将排到最后
printf(names);
names.indexOf("小明");  //查找匹配元素的位置，没有返回-1，lastindexof表示匹配的最后位置。
var boolresult = names.every(function(item,index,array){   //对数组中元素每一项进行布尔运算，返回false和true。every函数，全部元素返回true时返回true。some函数某一元素返回true时返回true
    return (index>2);
});
var nameresult = names.filter(function(item,index,array){   //返回数组，filter函数获取满足条件的项，map获取每一项计算值的集合，不改变原数组，forEach函数等价于for语句，对每项处理
    return (index>2);
});
printf(nameresult);
nameresult = names.reduce(function(prev,cur,index,array){   //reduce从前向后迭代，reduceRight从后向前迭代。
    return prev+"+"+cur;   //迭代从第二项开始，prev初始值为第一项，cur初始值为第二项。计算值自动传给下一函数的prev，返回最后一次迭代产生的值
});
printf(nameresult);
function compare(student1,student2){   //比较函数，返回-1,0,1
    //return student1.age<student2.age?-1:(student1.age==student2.age?0:1);   //-1表示前对象小，1表示后对象小，0表示相等
    return student2.age-student1.age;  //正数自动转化为1，负数转化为-1
}
ages=[];
for(var i=0;i<7;i++){   //js没有块级作用域，for  if块内定义的变量，在块外可以访问，函数内定义的局部变量外部不可以访问。可以使用let i定义临时作用域，定义的变量和对外部变量的修改均不保留，
  ages.push(Math.floor(Math.random()*10+1));  //floor向下取整，random()生成0-1之间的随机数
}
printf(i);
printf(Math.max.apply(Math,ages));  //max取最大值，min取最小值。还有很多数学运算



printf("===========对象===========")
var student1 = new Object();   //定义对象引用，或者var student1 = {},new Object()。所有的包装类都派生于Object。Object基类包含hasOwnProperty、isPrototypeOf、propertyIsEnumerable、toLocaleString、toString、valueOf方法
student1.name = "student1";   //直接设置同时添加对象属性
student1["age"]=12;  //直接设置同时添加对象属性
student1.getname = function(){   //设置添加对象方法。函数表达式，只有在执行到本行才解析
   return this.name;  //this表示作用对象，这里为student1
};
//var {name:personname, age:personage} = student1;  //解构赋值，对应项使用副本赋值，如[value1,value2]=[value2,value1];可实现两个基本数据交换
printf(JSON.stringify(student1));   //JSON.stringify把对象转化为JSON字符串表示

student1 = {
    name:"student1",
    _age:12,  //前面有下滑线是一种常用的标记，用于表示只能通过对象方法访问的属性,只是对开发者的一种标记习惯，并不是真的私有变量
    getname:function(){
        return this.name;
    }
};
Object.defineProperty(student1,"name1",{  //可以用于定义新数据属性，也可以修改原有数据属性。也可以不使用defineProperty可以直接定义数据属性。也可以使用defineProperties同时定义多个数据或访问器属性
    writable:true,  //对象属性的数据属性，是否可修改
    enumerable:true,//对象属性的数据属性，通过for-in遍历到
    configurable:true,  //对象属性的数据属性，能否通过delete删除属性，configurable属性在定义为false以后，就不能再被设置
    value:"sst"  //对象属性的值属性，默认为underfined
});
Object.defineProperty(student1,"age",{   //访问器属性，不能直接定义，必须通过defineProperty定义，不包含数据值，设置时调用set函数，读取时调用get函数。访问器属性名称不要和数据属性名称相同
     get:function(){return this._age},
    set:function(newvalue){this._age=newvalue;this.name="xxt";}
});
student1.age=22;   //age不是数据属性，而是访问属性。这里是调用了set函数，
Object.preventExtensions(student1);  //设置对象不可被扩展，以后再添加属性都是underfined，防止被篡改
Object.seal(student1);  //密封对象，对象不能添加删除属性。
Object.freeze(student1);  //冻结对象，属性不可修改。只能通过set访问器修改
printf(JSON.stringify(student1));   //将JSON格式转化为字符串。JSON格式即KEY-VALUE格式
for(var myproperty in student1){   //for in遍历对象属性
    console.log(myproperty,":",student1[myproperty]);
}




function Student(name,age){   //自定义函数，构造函数，等同于java中的自定义类。所有的类型派生于Object
    var sex="男";   //函数内部为私有属性
    this.name=name;  //通过this创建的是可以被实例对象访问的
    this.age=age;
    this.getName=function(){
        return this.name;  //函数内部this表示此函数引用的拥有者，不是传入参数。当作为全局函数时，this表示window
    };
    this.setName= function(name){  //函数不关心传入或者定义的参数数量和类型，因此所有函数没有重载
        if(typeof name=="string")   //基本数据类型，做类型检验，避免参数传递错误
            this.name = name;      //没有指定返回值，实际返回的是undefined
    };
    this.getAge =function (){
        if(this.age.toFixed(2)<<2)  //转化为false的值："",0,NaN,null,underfined。其他转化为true，类型首字母大写，变量首字母小写，<<按位移动，<<<无符号按位移动,toFixed(2)表示保留2位小数
            return -~this.age;  //~按位取非，&按位取与，|按位取或 ^按位取异或，一元减号，表示取负
        return this.age;  //保证所有路径都有返回值，虽然不加也不会出错，因为有默认返回值undefined
    };
    this.setAge= function(age){  //函数参数总是按值传递，无论基本类型还是引用类型，引用类型传递引用的值，不传递指向对象的值
        if(age instanceof Number){  //包装类型，做类型检验，避免参数传递错误
            this.age = parseInt(age.toString(16),16);//parseInt将字符串化为整数，支持识别多进制和转化为多进制，toString()转化为字符串，支持多进制转化
        }
        //typeof判断基本类型，underfined声明未定义(underfined类型只有一个值)，boolean布尔型，string字符串，number数值，object对象或null(null类也只有一个值)，function函数
        //instanceof判断包装类型，基本类型对象的包装类型为Underfined,Boolean,String,Number,Object,
        typestr = typeof("getAge");  //省略var的变量为全局变量
    }
}
student1=new Student("小明",12);  //new是创建了一个新对象，构造函数将属性和方法绑定到这个新对象上
Student("小红",13);  //作为全局函数。通过构造函数将属性绑定到window上
var student2 = new Object();
Student.call(student2,"小刚",14);//call和apply通过构造函数，将属性绑定到以存在对象student2上
if(student2 instanceof Student)  //instanceof判断变量是否是某个类型或其派生类型实例的，student1是Student类，同时也是Object
     printf(student2.name);


//js的继承有多重方式。每种方式的内存操作都是不同。下面展示其中一种。
// js的类型继承原理和java、c#相同。派生类继承基类时，会实例化(浅复制)一个基类对象和保留引用在派生类空间。派生类内的实例的基类和派生类自定义的函数分别操控各自的属性。在函数和属性操作中时，会自动先派生后基类的顺序查找，不用手动查找
//关于实例化：只复制且全部复制在构造函数中开辟了内存的变量，包括引用变量。派生类实例化时基类对象进行浅复制。
function Monitor(){   //自定义函数，相当于自定义一个类，类名Monitor。在文件中多称为构造函数，相当于c++和java中的自定义类。每个函数类，都有基类Object
    this.task=["学习"];
}
Monitor.prototype.data = "原型数据";  //prototype获取派生类的基类对象引用，通过基类对象引用直接为基类添加属性。系统会为派生类提供默认原型，也可以通过继承自定义原型
person1 = new Monitor();//通过函数类实例化对象
person2 = new Monitor();  //实例化对象
Object.getPrototypeOf(person1).data="原型数据1";  //通过实例修改原型。Object.getPrototypeOf()获取对象原型。实例对象包含对原型的引用，但需要使用getPrototypeOf函数获取
person1.data="派生数据";  //修改派生类属性，这样当查找data数据会先自动搜索派生类，再自动搜素基类。

printf(person1.hasOwnProperty("data")); //是否拥有指定属性(不算基类属性)。true因为自定义了该属性
printf(person1.data);//读取自定义属性

var keys = Object.keys(Monitor.prototype);  //获取对象所拥有(不包括继承的)的可枚举实例，Monitor是类，Monitor.prototype是基类实例。如果换成person1，则只能获取派生类的自定义属性。getOwnPropertyNames可获取对象拥有的所有属性
printf(keys);
delete person1.data;//删除派生类自定义的属性
printf(person1.hasOwnProperty("data"));     //是否拥有指定属性。false，因为该属性在派生类中被删除了，只有基类中存在，虽然可以访问，但是是继承过来的，不是自己拥有的
printf("data" in person1);     //是否包含指定属性。true包含，只是不拥有
printf(person1.data);//基类属性
Monitor.prototype.sex=["男"];  //通过派生类向基类添加数组引用变量
person1.sex.push("女");  //在实例对象中保留了基类的引用和浅复制了基类对象。这里的sex是经过了一次从派生类到基类的向上查询。
printf("基类中的引用:"+person2.sex);  //实例对象连带更新。所以构造函数用于指定专属属性，原型用于存放共享属性
person1.task.push("工作");  //修改构造函数中引用指向的对象
printf("派生类中的引用:"+person2.task);  //实例对象不连带更新构造函数中的数据。因为实例化时会深复制构造函数中的所有数据，在实例化时为每个对象都创建

Monitor.prototype=new Student("组长",12);  //继承，派生类Person设置基类为Student。在继承中会为浅复制一个基类实例放在派生类空间中，同时将引用存储为prototype，放在派生类Person中


//student1=null;   //通过设置引用的值为空，切断引用于对象之间的关联，便于垃圾回收器收回内存
//constructor构造函数
//isprototypeof(object)   检测传入对象是否是当前对象的原型




printf("===========字符串、正则表达式===========");
name = " Muaneng Tuanpeng ".trim().toLowerCase().replace("eng","ing");  //trim()删除字符串前后空格。toLowerCase转化为小写。replace替换第一个eng，
name1 = name.substring(name.indexOf("t",3),name.lastIndexOf("g",0));//slice、substring参数为首尾下标，substr为起点下标和长度。都不改变源字符串。indexOf和lastindexOf查询子字符串的位置,第二个参数表示从哪个字符开始向对面搜索
name1 = name.substr(-4);//传入负值时，slice将负值加上字符串长度，substr将第一个负值加上字符串长度，第二个负值转为0，substring将负值都转为0
name1="muaneng tuanpeng".replace(/eng/g,"ing").split(" ",2)[0];   //replace接收正则表达式，/g替换全部，split分割字符串，并限定返回的数组个数。[0]读取返回数组的第一个元素。
//正则表达式 = /pattern/flags    其中flags中g表示匹配全部，i表示不区分大小写，m表示匹配多行
//pattern包含 ([{\^$|)?*+.]}元字符，若匹配的字符串中包含元字符，使用\转义。     .表示任一字符，()表示捕捉字符
var patter1 = /(.)u/gi;   //正则表达式，标志没有可为空，也可以使用var patter1 = new RegExp("pattern","flags");使用new是创建对象
if(patter1.test(name)){   //test查找符合要求的子串是否存在,返回true
    printf(RegExp.input);  //原始字符串
    printf(RegExp.leftContext);//捕捉到的位置的左边字符串
    printf(RegExp.rightContext);//捕捉到的位置的右边字符串
    printf(RegExp.lastMatch);//返回最近一次与整个正则表达式匹配的字符串 mu
    printf(RegExp.lastParen);  //返回最近一次捕捉的字符
    printf(patter1.global);//返回正则是否包含全局标志g
}
var matches = patter1.exec(name);  //查找符合要求的子串。matches.index表示查找到的起始下标，matches.input表示输入字符串。patter1.lastIndex表示查找到的结束下标，matches[0]表示查找到的第一个匹配项，若匹配项为全局模式，则每次调用返回下一个匹配项。
printf(matches.index);printf(patter1.lastIndex);printf(matches[0]);
String.prototype.startwith = function(text){  //设置字符串引用的原型，为String、Object、Array等添加方法
    return this.indexOf(text)==0;
};
printf(name.startwith("mu"));





printf("===========函数===========");
//自定义函数，函数声明，会优先加载。调用函数时会先在本机活动对象中查询，即当前js文件中查询，如果没有才会向上查询，所以在两个js文件中定义相同函数名，js文件内调用各自的函数，其他文件中调用最后声明的函数
function printf(str){
    //var hint =  document.getElementById("hint");  //根据id获取元素
    hint.innerText += str.toString()+"\n";  //设置label显示的文字，也可以自动调用其他js文件中的hint变量。hint会先在当前文件中查询，然后向之前引用的js文件查询，再向之后引用的js文件查询
}

function callfunction(myfunction,myargument){    //向函数传输函数引用
    return myfunction(myargument);  //调用回调函数
}
callfunction(printf,new Date().toDateString());//Date无参数，表示获取当前时间。toDateString()显示星期年月日，toTimeString显示时分秒，toLocaleDateString以特定地区的格式显示星期年月日。还可以分别获取时间的各种参数。

function getproperty(propertyname){   //
    printf("外层函数");
    return function (object1){   //内部函数，返回函数引用，一个函数可以访问另一个函数的变量，叫做闭包。函数的this和arguments变量只搜索到活动对象中（活动上下文），不会一直向外层搜索
        printf("内层函数");
        var getnamefun = getproperty("name");   //执行外部函数，getnamefun是一个函数引用变量
        printf(getnamefun.length);  //函数希望的参数个数
        return object1[propertyname];   //内部函数返回值，内部函数可以读取外部函数的变量，包括外层函数的arguments对象
    }
}
var getnamefun = getproperty("name");//获取内部函数引用。外层函数的作用域链没有销毁，因为有内部函数的引用存在。有引用指向对象，所以对象不会被销毁，这也是垃圾回收的机制
printf(getnamefun(student1));   //执行内部函数

//函数参数
function printname() {   //定义参数和传入参数可以不一致，所以函数没有重载，为了使用明确，最好设定成一致模式。
    var name="内部变量"; //函数内定义变量为私有变量
    //arguments.callee.caller.toString();  //arguments.callee.caller、getname.caller表示调用当前函数的函数的引用
    if(arguments.length>0 && arguments[0]=="晓明")   //函数内部arguments表示参数数组
        printf(this.name);
        //arguments.callee("小明");  //函数内部arguments.callee表示arguments的拥有者函数的引用，也就是当前函数的引用。实现递归调用
}
printname("晓明");
printname.apply(this,["晓明"]);   //函数相当于一个类，函数名相当于类的一个引用，函数类拥有参数apply,传入调用者和参数数组。全局this相当于window
printname.call(student1,"晓明");  //call属性传入调用者和逐个参数。是将函数绑定到对象上，然后在通过对象调用此函数。
printname.bind(student1)("晓明");  //printname.bind(student1)返回函数绑定到对象上的函数引用，通过引用()调用此函数


//内置对象 Object，Array，String。。。Global(其他零散函数的合集)，Math
var url = "http://www.baidu.com";
printf(encodeURI(url));  //网址编码，对应decodeURL驿码，
var diftime = new Date()-new Date(Date.UTC(2005,4,5,17,55,55));   //UTC参数，年月日，小时分钟秒毫秒，其中月和小时从0开始，年月参数必须有。Date没有参数表示当前时间，时间相减获取时间相差时间毫秒数
eval("printf(diftime)");   //eval翻译执行js代码字符串



//===========================容器======================================
var map = new Map();  //映射，不重复的键，以键值对的形式存在
map.set("name","mapluanpeng");  //添加设置映射
if(map.has("name"))  //判断映射是否存在
    printf(map.get("name"));  //读取映射
map.delete("name");  //删除映射

var set = new Set(); //集合。不重复的元素集合，不存在键值对
set.add("name"); //添加集合
if(set.has("name")){  //检测集合是否存在指定元素
    set.delete("name");  //删除集合元素
    printf("删除集合元素name");
}