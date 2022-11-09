// 分支向上 长辈组件
<template>
    <div id="branch-up">
        <div class="box-flex center" v-if="brand_male">
            <div class="relative">
                <item v-if="brand_male.name" :id="brand_male.id" :name="brand_male.name" :title="title[0]"></item>
                <branch-add v-else :title="[title[0]]" @add="revice"></branch-add>
            </div>

            <div class="relative">
                <item v-if="brand_famale.name" :id="brand_famale.id" :name="brand_famale.name" :title="title[1]"></item>
                <branch-add v-else :title="[title[1]]" @add="reviceF"></branch-add>
            </div>
        </div>

    </div>
</template>

<script>
    import branchAdd from "./add.vue"
    import item from "./item.vue"
    import linkLine from "@/components/branch/linkLine";
    import Bus from "@/lib/bus"
    export default {
        name: 'branch-up',
        components: {
            branchAdd,
            item,
            linkLine
        },
        props: {
            data: Array,
            title: {
                typeof: Object,
                default: () => ['父', '母']
            },
            index: [String, Number]
        },
        data() {
            return {
                grand: [
                    ['祖父', '祖母'],
                    ['外祖父', '外祖母']
                ],
                brand_male: null,
                brand_famale: null
            }
        },
        methods: {
            reviceF(e) {
                const {
                    data
                } = this;

                data[0].spouse = [e];
                this.inifData();
                this.$forceUpdate();
                Bus.$emit('treeChange', e)

            },
            revice(e) {
                const {
                    data
                } = this;
                data[0] = e;
                this.inifData();
                this.$forceUpdate();
                Bus.$emit('treeChange', e)

            },
            inifData() {
                this.brand_male = this.data[0];
                this.brand_famale = this.brand_male.spouse[0] || {
                    id: null,
                    name: null,
                    parent: [],
                    spouse: []
                };
            }
        },
        mounted() {
            if (this.data.length != 0) {
                this.inifData();
            }
        },
    }
</script>

<style>

</style>