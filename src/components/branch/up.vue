// 分支向上 长辈组件
<template>
    <div class="" id="branch-up" v-if="index < 2">
        <div class="box-flex center" v-if="brand_male">
            <div class="relative">

                <Pup v-if="brand_male.parent.length != 0" :data="brand_male.parent" :title="grand[0]"></Pup>

                <linkLine :set='[
                    [1.6, 0.6, 4.8, 0.6],
                    [1.6, 0.6, 1.6, 0],
                    [4.8, 0, 4.8, 0.6],
                    [3.2, 0.6, 3.2, 1.2]]'></linkLine>

                <item v-if="brand_male.name" :id="brand_male.id" :name="brand_male.name" :title="title[0]"></item>
                <branch-add v-else :title="[title[0]]" @add="revice"></branch-add>

            </div>

            <div class="relative">
                <!-- <branch-up v-if="brand_famale.parent" :data="brand_famale.parent" :index="index+1" :title="grand[1]"
                    ref="spouseParent">
                </branch-up> -->

                <Pup v-if="brand_famale.parent" :data="brand_famale.parent" :title="grand[1]"></Pup>

                <linkLine :set='[
                    [1.6, 0.6, 4.8, 0.6],
                    [1.6, 0.6, 1.6, 0],
                    [4.8, 0, 4.8, 0.6],
                    [3.2, 0.6, 3.2, 1.2]]'></linkLine>

                <item v-if="brand_famale.name" :id="brand_famale.id" :name="brand_famale.name" :title="title[1]"></item>
                <branch-add v-else :title="[title[1]]" @add="reviceF"></branch-add>

            </div>

            <!-- <div v-else>
                <branch-add :title="[title[1]]"></branch-add>
            </div> -->


        </div>

    </div>
</template>

<script>
    import branchAdd from "./add.vue"
    import item from "./item.vue"
    import linkLine from "@/components/branch/linkLine";
    import Pup from "@/components/branch/_up";
    import Bus from "@/lib/bus"
    export default {
        name: 'branch-up',
        components: {
            branchAdd,
            item,
            linkLine,
            Pup
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

                // console.log(data)
                // if(data.)

                // data.push(e);
                // Bus.$emit('treeChange', e)
            },
            inifData() {
                this.brand_male = this.data[0];
                this.brand_famale = this.brand_male.spouse[0] || {
                    id: null,
                    name: null,
                    parent: [{
                        id: null,
                        name: null,
                        parent: [],
                        spouse: []
                    }],
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