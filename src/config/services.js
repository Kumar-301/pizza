import axios from "axios"
import { APIURL, USERAPI } from "./url"

function getProduct(){
    return axios.get(APIURL)
}
function getProductbyId(id){
    return axios.get(`${APIURL}${id}`)
}
function deleteProduct(id){
    return axios.delete(`${APIURL}${id}`)
}
function postUsers(state){
    return axios.post(USERAPI,state)
}
function getUserdetails(){
    return axios.get(USERAPI)
}

export {getProduct,getProductbyId,deleteProduct,postUsers,getUserdetails}