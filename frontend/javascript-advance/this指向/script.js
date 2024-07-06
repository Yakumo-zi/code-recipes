// 'use strict'
function foo() {
    console.log('foo:',this);
}

// let fn=foo.bind("aaa")

// new fn()

// fn.apply('bbb')

// foo.apply(undefined)
// foo.apply(null)
// foo.apply('aaa')

let obj1={
    name:'devil',
    foo:function(){
        console.log('foo:',this);
    }
}
let obj2={
    name:'devi2'
};

// obj2.foo=obj1.foo
// obj2.foo()
// (obj3.foo=obj1.foo)()

// let nums=[1,2,3,4,5]
// nums.forEach((item,index,arr)=>{
//     console.log(item,index,arr)
// })

// let fn=name=>{
//     console.log(name)
// }
// fn('devil')

var name='window'

let person={
	name:'person',
	sayName:function(){
		console.log(this.name)
	}
}

function sayName(){
	let sss = person.sayName;
	sss(); // 默认绑定
	person.sayName();     //隐式绑定
	(person.sayName)();   //隐式绑定
	(b=person.sayName)() //间接函数引用，默认绑定
}
sayName()