<template>
    <div class="box" :class="customClass">
        <div class="box-item">
            <div class="name" @click.stop="handleClick">
                {{name}}
                <img @click.stop="change" v-if="!customClass && id" class="change" src="../../assets/change.png" />
            </div>
            <div class="title">
                {{title[titleIndex]}}
            </div>
        </div>

       <van-popup v-model="show">
            <div style="width:90vw;margin:.6rem">
                <van-form>
                    <van-cell-group>
                        <van-field name="radio" label="">
                            <template #input>
                                <van-radio-group v-model="checked" direction="horizontal">
                                    <van-radio :name="key" v-for="(item, key) in title" :key="key">{{item}}</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>
                    </van-cell-group>
                    <van-cell-group>
                        <van-field v-model="i_name" name="姓名"/>
                    </van-cell-group>
                    <div style="display:flex;margin-top:.3rem;padding:.3rem">
                        <van-button round block size="normal" native-type="submit" @click="show = false">
                            取消
                        </van-button>
                        <div style="width:.6rem"></div>
                        <van-button color="#4D77FF" round block type="primary" size="normal" native-type="submit"
                            @click="submit">
                            修改
                        </van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>

    </div>

</template>

<script>
    import Bus from "@/lib/bus.js"
    import { treeChange } from "@/lib/common"

    export default {
        props: {
            item: Object,
            name: String,
            title: Array,
            titleIndex: Number,
            id: [String, Number],
            customClass: String
        },
        data(){
            return{
                show: false,
                checked: 0,
                i_name: null
            }
        },
        methods: {
            change() {
                Bus.$emit('change', {
                    id: this.id,
                    name: this.name
                })
            },
            handleClick() {
                this.show = true;
                this.checked = this.titleIndex;
                this.i_name = this.name
                // this.$emit('handleClick', {
                //     id: this.id,
                //     name: this.name,
                //     title: this.title
                // })
            },
            async submit(){
                this.item.Name = this.i_name;
                this.item.Sex = this.checked == 0 ? '男' : '女';
                await treeChange(this.item);
                this.show = false;

            }
        }
    }
</script>