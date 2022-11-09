<template>
    <div>
        <div class="box default">
            <div class="box-item">
                <div class="name" @click="show = true">
                    添加
                </div>
                <div class="title">
                    {{title[0]}} <span v-if="title[1]">OR {{title[1]}}</span>
                </div>
            </div>
        </div>

        <van-popup v-model="show">
            <div style="width:90vw;margin:.6rem">
                <van-form>
                    <van-cell-group>
                        <van-field name="radio" label="">
                            <template #input>
                                <van-radio-group v-model="checked" direction="horizontal">
                                    <van-radio :name="item" v-for="(item, key) in title" :key="key">{{item}}</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>

                    </van-cell-group>
                    <van-cell-group>
                        <van-field v-model="username" name="姓名"  :placeholder="`请输入${checked}姓名`" />
                    </van-cell-group>
                    <div style="display:flex;margin-top:.3rem;padding:.3rem">
                        <van-button round block  size="normal" native-type="submit" @click="show = false">
                            取消
                        </van-button>
                        <div style="width:.6rem"></div>
                         <van-button color="#4D77FF" round block  type="primary" size="normal" native-type="submit" @click="add">
                            提交
                        </van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>
    </div>
</template>

<script>
    export default {
        props: {
            title: Array
        },
        data() {
            return {
                show: false,
                username: null,
                checked: null
            }
        },
        methods:{
            add(){
                this.show = false;
                this.$emit('add', {
                    id: null,
                    name: this.username,
                    sex: this.checked,
                    children: [],
                    parent: [],
                    brother: [],
                    spouse: []
                })
            }
        },
        mounted(){
            this.checked = this.title[0];
            // console.log(this.checked)
        }
    }
</script>

<style lang="less">
    .van-field__control--custom{
        justify-content: center;
    }
    .van-field__control{
        text-align: center;
    }

</style>