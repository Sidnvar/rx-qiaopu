// 分支向左 兄弟姐妹
<template>
    <div class="box-flex relative" id="branch-left" style="justify-content: flex-end;">
        <linkLine :set='sets' type="vertical_r"></linkLine>

        <div>
            <branch-add :title="title" @add="revice" />
        </div>

        <div v-for="(item, key) in data" :key="key">
            <item :id="item.Id" :item="item" :name="item.Name" :title="title" :titleIndex="item.Sex == '男' ? 0 : 1" ></item>
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
        data() {
            return {
                sets: [],
                title:['兄弟','姐妹']
            }
        },
        mounted() {
            this.addLinkLine();
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
        },
        methods: {
            async revice(e) {
                const {
                    data
                } = this;

                const params = await treeChange(e)

                data.unshift(params);
            },
            addLinkLine() {
                this.sets = [];
                this.data.map((item, key) => {
                    this.sets.push(
                        [3.2 * (key + 0.5), 0, 3.2 * (key + 0.5), .6],
                        [3.2 * (key + 0.5), 0, 0, 0]
                    )
                })

                this.sets.push(
                    [3.2 * (this.data.length + 0.5), 0, 3.2 * (this.data.length + 0.5), .6],
                    [3.2 * (this.data.length + 0.5), 0, 0, 0]
                )
            }
        }
    }
</script>