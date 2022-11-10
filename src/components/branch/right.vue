// 分支向右 配偶
<template>
    <div class="box-flex" id="branch-right">
        <div class="relative" v-for="(item, key) in data" :key="key">
            <linkLine :set='[[0,1,1.2,1]]' type="vertical_l" v-if="key == 0"></linkLine>
            <item :item="item" :id="item.Id" :name="item.Name" :title="[`${key != 0 ? '(前)':''}配偶`]"  :titleIndex="0" ></item>
        </div>
        <div class="relative">
            <branchAdd :title="[addTitle]" @add="revice"></branchAdd>
        </div>
    </div>
</template>

<script>
    import branchAdd from "./add.vue"
    import item from "./item.vue"
    import linkLine from "@/components/branch/linkLine";
    import { treeChange } from "@/lib/common"

    export default {
        props: {
            data: Array
        },
        components: {
            branchAdd,
            item,
            linkLine
        },
        data(){
            return {
                addTitle: '配偶'
            }
        },
        methods: {
            async revice(e) {
                const {
                    data
                } = this;
                const params = await treeChange(e)
                data.push(params);
            }
        },
        watch:{
            "data":function(newValue){
                if(newValue){
                    this.addTitle = newValue.length >= 1 ? '前配偶' : '配偶'
                }else{
                    this.addTitle = '前配偶'

                }
            }
        }
    }
</script>