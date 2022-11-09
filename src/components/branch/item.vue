<template>
    <div class="box" :class="customClass">
        <div class="box-item">
            <div class="name">
                {{name}}
                <img  @click="change" v-if="!customClass && id" class="change" src="../../assets/change.png" />
            </div>
            <div class="title">
                {{title}}
            </div>
        </div>
    </div>
</template>

<script>
import Bus from "@/lib/bus.js"
export default {
    props:{
        name: String,
        title: String,
        id: String,
        customClass: String
    },
    methods:{
        change(){
            Bus.$emit('change', this.id)
        }
    }
}
</script>