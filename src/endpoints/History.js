import Axios from "axios"
import API, { ip } from "./API"


export default{
    gethistory:async(user_id)=>{
        let resp = await Axios.get(ip+"history/gethistory/"+user_id)
        return resp.data;
    }
}