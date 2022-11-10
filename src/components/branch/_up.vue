// 分支向上 长辈组件
<template>
    <div id="branch-up">
        <div class="box-flex center">
            <div class="relative">
                <item v-if="data[0].Name" :item="data[0]" :id="data[0].Id" :name="data[0].Name" :title="title" :titleIndex="data[0].Sex == '男' ? 0 : 1"></item>

                <!-- <item v-if="brand_male.Name" :id="brand_male.Id" :name="brand_male.Name" :title="title" :titleIndex="0" ></item> -->
                <branch-add v-else :title="[title[0]]" @add="revice"></branch-add>
            </div>

            <div class="relative">
                <item v-if="data[1].Name" :item="data[1]"  :id="data[1].Id" :name="data[1].Name" :title="title" :titleIndex="data[1].Sex == '男' ? 0 : 1"></item>

                <!-- <item v-if="brand_famale.Name" :id="brand_famale.Id" :name="brand_famale.Name" :title="title" :titleIndex="1"></item> -->
                <branch-add v-else :title="[title[1]]" @add="reviceF"></branch-add>
            </div>
        </div>

    </div>
</template>

<script>
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
            async reviceF(e) {
                const {
                    data
                } = this;

                const params = await treeChange(e)

                data[1] = params;
                this.initData();
                this.$forceUpdate();

            },
            async revice(e) {
                const {
                    data
                } = this;
                const params = await treeChange(e)

                data[0] = params;
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