import Bus from "./bus"
import {
    CheckUserName,
} from "@/api/index"
import {
    Toast
} from 'vant';
import 'vant/es/toast/style';
export const treeChange = async (e, sourceId) => {
    const {
        Name,
        Sex,
        Id
    } = e;
    const req = await CheckUserName({
        CheckName: Name,
        CheckSex: Sex,
        CheckId: Id || 0,
        Id: sourceId
    })
    if(req.Code == 200){
        Bus.$emit('treeChange', e)
        e.Id = req.Data.Ext1;
        return e;
    }
    
    if(req.Code == 405 && req.Msg.indexOf('关系') > -1){
        Bus.$emit('sameName', {data:e , sendToUserNo: req.Data.Ext2})
    }else{
        Toast('出错了')
    }

    return false

}