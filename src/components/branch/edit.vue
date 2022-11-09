<template>
    <div>
        <van-popup v-model="show">
            <div style="width:90vw;margin:.6rem">
                <van-form>
                    <van-cell-group>
                        <van-field name="radio" label="">
                            <template #input>
                                <van-radio-group v-model="inside_title" direction="horizontal">
                                    <van-radio :name="item" v-for="(item, key) in title" :key="key">{{item}}</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>
                    </van-cell-group>
                    <van-cell-group>
                        <van-field v-model="inside_name" name="姓名"  />
                    </van-cell-group>
                    <div style="display:flex;margin-top:.3rem;padding:.3rem">
                        <van-button round block size="normal" native-type="submit" @click="close">
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
    export default {
        props: {
            title: Array,
            data: Object,
            show: {
                type: Boolean,
                default: () => false
            }
        },
        data() {
            return {
                inside_title: null,
                inside_name: null
            }
        },
        methods: {
            submit() {
                this.$emit('submit', {
                    Name: this.inside_name,
                    Sex: this.title.indexOf(this.inside_title) == 0 ? '男' : '女'
                })
            },
            close(){
                this.$emit('close', true)
            }
        },
        watch:{
            "show": function(newValue){
                if(newValue){
                    this.inside_title = this.data.title;
                    this.inside_name = this.data.name;
                }
            }
        },
        mounted(){
            // debugger
            // console.log(this.data)
            // this.inside_checked = this.checked;
            // this.inside_username = this.username;
        }
    }
</script>