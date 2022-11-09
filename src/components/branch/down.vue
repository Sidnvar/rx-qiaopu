// 分支向下 儿孙
<template>
    <div id="branch-down">
        <div class="branch-down relative" >
            <linkLine :transform="'transform'" :set='sets'></linkLine>
            <div class="box-flex">
                <branch-add :title="title" @add="revice" :spouse="spouse"/>
                <div v-for="(item, key) in data" :key="key">
                    <item :name="item.Name" :title="item.Sex == '男' ? title[0]:title[1]" :id="item.Id" style="justify-content: flex-end;"></item>
                    <branch-down v-if="item.Children && children_title" 
                    :data="item.Children" 
                    :title="children_title" 
                    :index="key"
                    :parentSex="parentSex"
                    :last="true"
                    ></branch-down>
                </div>
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
            spouse: Array
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
                const params = await treeChange(e)
                data.unshift(params);

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