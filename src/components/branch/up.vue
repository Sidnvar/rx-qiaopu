// 分支向上 长辈组件
<template>
    <div class="" id="branch-up" v-if="index < 2">
        <div class="box-flex center" v-if="brand_male">
            <div class="relative">

                <Pup v-if="brand_male.Parent.length != 0" :data="brand_male.Parent" :title="grand[0]"></Pup>

                <linkLine :set='[
                    [1.6, 0.6, 4.8, 0.6],
                    [1.6, 0.6, 1.6, 0],
                    [4.8, 0, 4.8, 0.6],
                    [3.2, 0.6, 3.2, 1.2]]'></linkLine>

                <item v-if="brand_male.Name" :id="brand_male.Id" :name="brand_male.Name" :title="title[0]" @handleClick="handleClick"></item>
                <branch-add v-else :title="[title[0]]" @add="revice"></branch-add>

            </div>

            <div class="relative">
                <!-- <branch-up v-if="brand_famale.Parent" :data="brand_famale.Parent" :index="index+1" :title="grand[1]"
                    ref="spouseParent">
                </branch-up> -->

                <Pup v-if="brand_famale.Parent" :data="brand_famale.Parent" :title="grand[1]"></Pup>

                <linkLine :set='[
                    [1.6, 0.6, 4.8, 0.6],
                    [1.6, 0.6, 1.6, 0],
                    [4.8, 0, 4.8, 0.6],
                    [3.2, 0.6, 3.2, 1.2]]'></linkLine>

                <item v-if="brand_famale.Name" :id="brand_famale.Id" :name="brand_famale.Name" :title="title[1]" @handleClick="handleClick"></item>
                <branch-add v-else :title="[title[1]]" @add="reviceF"></branch-add>

            </div>

            <!-- <div v-else>
                <branch-add :title="[title[1]]"></branch-add>
            </div> -->


        </div>
        <edit :show="editShow" :title="title"></edit>
    </div>
</template>

<script>
    import branchAdd from "./add.vue"
    import item from "./item.vue"
    import linkLine from "@/components/branch/linkLine";
    import Pup from "@/components/branch/_up";
    import edit from "@/components/branch/edit"
    import { treeChange } from "@/lib/common"
    export default {
        name: 'branch-up',
        components: {
            branchAdd,
            item,
            linkLine,
            Pup,
            edit
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
                brand_famale: null,
                editShow: false
            }
        },
        methods: {
            async reviceF(e) {
                const {
                    data
                } = this;

                const params = await treeChange(e)

                data[1] = params;
                this.inifData();
                this.$forceUpdate();
                // Bus.$emit('treeChange', params)

            },
            async revice(e) {
                const {
                    data
                } = this;

                const params = await treeChange(e)

                data[0] = params;
                this.inifData();
                this.$forceUpdate();
                // Bus.$emit('treeChange', params)

                // console.log(data)
                // if(data.)

                // data.push(e);
                // Bus.$emit('treeChange', e)
            },
            inifData() {
                const module = {
                        Id: null,
                        Name: null,
                        Parent: [{
                            Id: null,
                            Name: null,
                            Parent: [],
                            Spouse: []
                        }],
                        Spouse: [{
                            Id: null,
                            Name: null,
                            Parent: [],
                            Spouse: []
                        }]
                    }
                this.brand_male = this.data[0] || module;
                this.brand_famale = this.data[1] || module;

                if (this.brand_male.Parent.length == 0) {
                    this.brand_male.Parent = [module]
                }

                if (this.brand_famale.Parent.length == 0) {
                    this.brand_famale.Parent = [module]
                }
            },
            handleClick(){
                this.editShow = true
            }
        },
        mounted() {
            this.inifData();
        },
        watch:{
            data:{
                handler(){
                    this.inifData();
                },
                deep: true
            }
        }
    }
</script>

<style>

</style>