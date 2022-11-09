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
                                    <van-radio :name="key" v-for="(item, key) in title" :key="key">{{item}}</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>
                    </van-cell-group>
                    <van-cell-group>
                        <van-field v-model="username" name="姓名" :placeholder="`请输入${title[checked]}姓名`" />
                    </van-cell-group>
                    <van-cell-group v-if="spouse.length > 1">
                        <select class="select" v-model="parent">
                            <option value="请选择父/母" checked>请选择父/母</option>
                            <option v-for="(item, key) in spouse" :key="key" :value="item">{{item.Name}}</option>
                        </select>
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
            title: Array,
            spouse: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                show: false,
                username: null,
                parent: '请选择父/母',
                checked: null
            }
        },
        methods:{
            add(){
                this.show = false;
                const Parent = this.parent == '请选择父/母' ? [] : [this.parent];
                this.$emit('add', {
                    Id: null,
                    Name: this.username,
                    Sex: this.checked == 0 ? '男': '女',
                    Children: [],
                    Parent,
                    Brother: [],
                    Spouse: []
                })
            }
        },
        mounted(){
            this.checked = 0;
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
    .select{
        width: 100%;
        background: transparent;
        height: 1.15rem;
        color: #323233;
        font-size: inherit;
        text-align: center;
    }

</style>