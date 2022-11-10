// 分支向下 儿孙
<template>
    <div id="branch-down">
        <div class="branch-down relative" >
            <linkLine :transform="'transform'" :set='sets'></linkLine>
            <div class="box-flex">
                <branch-add :title="title" @add="revice" :spouse="spouse"/>
                <div v-for="(item, key) in data" :key="key">
                    <item 
                    :name="item.Name" 
                    :item="item" 
                    :title="title" 
                    :titleIndex="item.Sex == '男' ? 0 : 1" 
                    :id="item.Id"
                    :isDel="true"
                    @del="handleDelete"
                    style="justify-content: flex-end;"></item>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

    import Bus from "@/lib/bus.js"
    import branchAdd from "./add.vue"
    import item from "./item.vue"
    import linkLine from "@/components/branch/linkLine";
    import { treeChange } from "@/lib/common"

    export default {
        name: 'branch-down',
        props: {
            data: Array,
            title:{
                type: Array,
                default: () => ['儿子', '女儿']
            },
            index: {
                type: [Number, String],
                dafault: () => '0'
            },
            parentSex: [Number, String],
            last: Boolean,
            spouse: Array,
            sourceId: [String, Number]
        },
        components: {
            branchAdd,
            item,
            linkLine
        },
        data() {
            return {
                widthL: 0,
                brand_children: null,
                sets: null,
                titles: [['孙子', '孙女'], ['外孙', '外孙女']],
                children_title: null
            }
        },
        methods:{
            handleDelete(item) {
                const index = this.data.findIndex(_item => _item.Id == item.Id)
                this.data.splice(index, 1)
                this.$forceUpdate();
                this.addLinkLine();
            },
            addLinkLine(){
                this.sets = [[1.6, 0, 1.6, 1.2]];
                let length = 0.5;
               
                for(let i = this.data.length-1; i >= 0; i--){
                    length += this.data[i].Children.length+1;
                   
                    this.sets.push([
                        3.2 * length,
                        0.6,
                        3.2 * length,
                        1.2
                    ],[
                        3.2 * length,
                        0.6,
                        1.6,
                        0.6
                    ])
                }

            },
            async revice(e){
                const { data } = this;
                const params = await treeChange(e.data, this.sourceId)
                if(params){
                    data.unshift(params);
                    Bus.$emit('save', true)
                }
                // Bus.$emit('treeChange', e)
            }
        },
        mounted() {
            // debugger
            if(!this.last){
                this.children_title = this.titles[this.parentSex]
            }

            setTimeout(() => {
                this.addLinkLine();
            }, 50)
        },
        watch:{
            "data":{
                deep: true,
                handler(){
                    setTimeout(() => {
                        this.addLinkLine();
                    }, 50)    
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .branch-down {
        display: flex;
        justify-content: flex-end;
    }
</style>