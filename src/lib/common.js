import Bus from "./bus"
import {
    CheckUserName,
} from "@/api/index"
export const treeChange = async (e) => {
    const {
        Name,
        Sex
    } = e;
    const req = await CheckUserName({
        Name,
        Sex,
        Id: 0
    })
    if(req.Code == 200){
        Bus.$emit('treeChange', e)
        e.Id = req.Msg;
        return e;
    }
    
}