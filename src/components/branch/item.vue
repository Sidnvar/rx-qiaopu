<template>
    <div class="box" :class="customClass">
        <div class="box-item">
            <div class="name" @click="handleClick">
                {{name}}
                <img @click="change" v-if="!customClass && id" class="change" src="../../assets/change.png" />
            </div>
            <div class="title">
                {{title[titleIndex]}}
            </div>
        </div>
    </div>

</template>

<script>
    import Bus from "@/lib/bus.js"
    export default {
        props: {
            name: String,
            title: Array,
            titleIndex: Number,
            id: [String, Number],
            customClass: String,
            show: true
        },
        methods: {
            change() {
                Bus.$emit('change', {
                    id: this.id,
                    name: this.name
                })
            },
            handleClick() {
                this.$emit('handleClick', {
                    id: this.id,
                    name: this.name,
                    title: this.title
                })
            }
        }
    }
</script>