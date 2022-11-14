// 分支向上 长辈组件
<template>
    <div class="" id="branch-up" v-if="index < 2">
        <div class="box-flex center" v-if="data[0]">
            <div class="relative" v-for="(item, key) in data" :key="key" v-if="key < 2">

                <Pup ref="pup" v-if="item.Parent.length != 0" :data="item.Parent" :index="key" :title="grand[key]" :sourceId="data.Id" @addParent="addParent"></Pup>

                <linkLine :set='[
                    [1.6, 0.6, 4.8, 0.6],
                    [1.6, 0.6, 1.6, 0],
                    [4.8, 0, 4.8, 0.6],
                    [3.2, 0.6, 3.2, 1.2]]'></linkLine>

                <item v-if="item.Name" @updateEvent="updateEvent" :sourceId="sourceId" :item="item" :id="item.Id" :name="item.Name" :title="title" :isDel="isDel[key]"
                    @del="handleDelete" :titleIndex="item.Sex == '男' ? 0 : 1"></item>
                <branch-add v-else :index="key" :title="title" @add="revice"></branch-add>

            </div>

            <!-- <div class="relative">


                <Pup v-if="data[1].Parent" :data="data[1].Parent" :title="grand[1]"></Pup>

                <linkLine :set='[
                    [1.6, 0.6, 4.8, 0.6],
                    [1.6, 0.6, 1.6, 0],
                    [4.8, 0, 4.8, 0.6],
                    [3.2, 0.6, 3.2, 1.2]]'></linkLine>

                <item 
                v-if="data[1].Name" 
                :item="data[1]"  
                :id="data[1].Id" 
                :name="data[1].Name" 
                :title="title" 
                :titleIndex="data[1].Sex == '男' ? 0 : 1"></item>
                <branch-add v-else :title="[title[1]]" @add="reviceF"></branch-add>

            </div> -->

            <!-- <div v-else>
                <branch-add :title="[title[1]]"></branch-add>
            </div> -->


        </div>
        <!-- <edit :show="editShow" :title="title" :data="editData" @close="editShow = false" @submit="editPost"></edit> -->
    </div>
</template>

<script>
    const module = {
        Id: null,
        Name: null,
        Parent: [{
            Id: null,
            Name: null,
            Parent: [],
            Spouse: []
        },{
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
    import branchAdd from "./add.vue"
    import Bus from "@/lib/bus.js"
    import item from "./item.vue"
    import linkLine from "@/components/branch/linkLine";
    import Pup from "@/components/branch/_up";
    import {
        treeChange
    } from "@/lib/common"
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
            index: [String, Number],
            sourceId: [String, Number]
        },
        data() {
            return {
                grand: [
                    ['祖父', '祖母'],
                    ['外祖父', '外祖母']
                ],
                checkId: 0,
                editShow: false,
                editData: null,
                isDel: [false, false]
            }
        },
        methods: {
            updateEvent(){
                // debugger
                this.$forceUpdate();
                console.log(this.$refs.pup)
            },
            addParent(e){
                this.data[e.pIndex].Parent[e.index] = e.data;
                this.$forceUpdate();
                Bus.$emit('save', true)
            },
            handleDelete(item) {
                const index = this.data.findIndex(_item => _item.Id == item.Id)
                this.data[index] = module
                this.initData();
                this.$forceUpdate();
            },
            async revice(e) {
                const {
                    data
                } = this;

                const params = await treeChange(e.data, this.sourceId)
                if(params){
                    const _parent = data[e.index].Parent
                    params.Parent = _parent
                    data[e.index] = params;
                    Bus.$emit('save', true)
                }

                // this.initData();
                this.$forceUpdate();
            },
            initData() {


                this.data || (this.data = [module, module])
                this.data[0] || (this.data[0] = module);
                this.data[1] || (this.data[1] = module);
                if (this.data[0].Parent.length == 0) {
                    this.data[0].Parent = [module, module];
                    this.isDel[0] = true;
                }

                if (this.data[1].Parent.length == 0) {
                    this.data[1].Parent = [module, module];
                    this.isDel[1] = true;
                }

                console.log(this.data)
            },
            handleClick(e) {
                this.editData = e;
                this.editShow = true
            },
            editPost(e) {

            }
        },
        mounted() {
            this.initData();
        },
        watch: {
            data: {
                handler() {
                    this.initData();
                },
                deep: true
            }
        }
    }
</script>

<style>

</style>