// 分支向上 长辈组件
<template>
    <div id="branch-up">
        <div class="box-flex center">
            <div class="relative" v-for="(item, key) in data" :key="key">
                <item 
                v-if="item.Name"  
                :item="item" 
                :id="item.Id" 
                :name="item.Name" 
                :title="title" 
                :titleIndex="item.Sex == '男' ? 0 : 1"
                :isDel="true"
                @del="handleDelete"></item>

                <branch-add v-else :index="key" :title="[title[key]]" @add="revice"></branch-add>
            </div>

            <!-- <div class="relative">
                <item v-if="data[1].Name" :item="data[1]"  :id="data[1].Id" :name="data[1].Name" :title="title" :titleIndex="data[1].Sex == '男' ? 0 : 1"></item>

                <branch-add v-else :title="[title[1]]" @add="reviceF"></branch-add>
            </div> -->
        </div>

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
        }],
        Spouse: [{
            Id: null,
            Name: null,
            Parent: [],
            Spouse: []
        }]
    }
    import branchAdd from "./add.vue"
    import item from "./item.vue"
    import linkLine from "@/components/branch/linkLine";
    import { treeChange } from "@/lib/common"

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
            }
        },
        methods: {
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

                const params = await treeChange(e.data)
                data[e.index] = params;
                this.initData();
                this.$forceUpdate();
            },
            initData() {
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

                this.data || (this.data = [module, module])
                this.data[0] || (this.data[0] = module);
                this.data[1] || (this.data[1] = module);
            }
        },
        mounted() {
            this.initData();
        },
        watch:{
            data:{
                handler(){
                    this.initData();
                },
                deep: true
            }
        }
    }
</script>

<style>

</style>