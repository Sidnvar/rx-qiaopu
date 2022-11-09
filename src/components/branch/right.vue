// 分支向右 配偶
<template>
    <div class="box-flex" id="branch-right">
        <div class="relative" v-for="(item, key) in data" :key="key">
            <linkLine :set='[[0,1,1.2,1]]' type="vertical_l" v-if="key == 0"></linkLine>
            <item :id="item.id" :name="item.name" title="配偶"></item>
        </div>
        <div class="relative">
            <branchAdd :title="['(前)配偶']" @add="revice"></branchAdd>
        </div>
    </div>
</template>

<script>
    import branchAdd from "./add.vue"
    import item from "./item.vue"
    import linkLine from "@/components/branch/linkLine";

    export default {
        props: {
            data: Array
        },
        components: {
            branchAdd,
            item,
            linkLine
        },
        methods: {
            revice(e) {
                const {
                    data
                } = this;
                data.push(e);
                Bus.$emit('treeChange', e)
            }
        }
    }
</script>