<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="less">
html,body{
    background: #f2f5fc;
}
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote,
th,
td {
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
}

ul,
ol {
    margin: 0;
    padding: 0;
    list-style: none;
}

img {
    vert-align: top;
}

//移动端图片边框   相当于  border:0a,
input,
button {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

//-webkit-tap-highlight-color:rgba(0,0,0,0);//透明度设置为0，去掉点击链接和文本框对象时默认的灰色半透明覆盖层(iOS)或者虚框(Android) input，textarea{outline:none}  //取消chrome下默认的文本框聚焦样式-webkit-appearance: none;//消除输入框和按钮的原生外观，在iOS上加上这个属性才能给按钮和输入框自定义样式 -webkit-user-select: none;// 禁止页面文字选择 ，此属性不继承，一般加在body上规定整个body的文字都不会自动调整input,
button {
    -webkit-appearance: none;
    border-radius: 0;
}

//去掉IOS移除原生控件样式-webkit-touch-callout:none; 
// 禁用长按页面时的弹出菜单
body {
margin: 0;
-webkit-user-select: none;
}


body {
    -webkit-text-size-adjust: 100%;
}

//移动端横竖屏字体乎大乎小-webkit-text-size-adjust: none; 
//禁止文字自动调整大小(默认情况下旋转设备的时候文字大小会发生变化)，此属性也不继承，一般加在body上规定整个body
</style>
