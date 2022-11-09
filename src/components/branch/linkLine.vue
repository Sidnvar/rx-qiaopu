<template>
    <svg :class="`${type} ${transform}`" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> 
      <line v-for="(item, key) in set" :key="key" :x1="fontSize * item[0]" :y1="fontSize * item[1]" :x2="fontSize * item[2]" :y2="fontSize * item[3]" style="stroke:#000000;"></line> 
    </svg> 
</template>

<script>
export default {
    props:{
        set: Array,
        type: {
            type: String,
            default: () => 'link'
        },
        transform: {
            type: String,
            default: () => ''
        }
    },
    data(){
        return{
            fontSize: Number(document.getElementsByTagName('html')[0].style.fontSize.replace('px', ''))
        }
    },
    methods:{
        draw(){
            // let canvasEle = document.getElementById('canvas')
            // let ctx = canvasEle.getContext('2d')
            // // const x = 60 * 1.5;
            // ctx.moveTo(75, 20)
            // ctx.lineTo(225, 20)
            // ctx.stroke()
        }
    },
    mounted(){
        // this.draw();
        // console.log(this.transform)
    }
}
</script>

<style lang="less" scoped>
    .link{
        width: 100%;
    }
    .transform{
        transform: scale(-1,1);
    }
</style>