import axios from "axios";
import {DELETE, GET, POST, PUT} from "../utils/requestActionConstants";

export async function processReq(method, url, data, customHeader) {
    const token = localStorage.getItem('token');
    let response = {data: null, error: true}
    let headerConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'SocketId': localStorage.getItem('socketId')
        }
    };

    if (customHeader) {
        headerConfig = customHeader;
    }

    // console.log(headerConfig);

    switch (method) {
        case GET:
            try {
                let result = await axios.get(url, headerConfig);

                response = result.data;
            } catch (error) {

                // console.log('error printing', error.toString());
                // alert(error.toString());
                response = false;
            }
            
            break;
        case POST:
            try {
                let result = await axios.post(url, data, headerConfig);
                
                response = result.data;
            } catch (error) {
                // console.log('error printing', error.toString());
                // alert(error.toString());
                // console.log(error.toString())
                response.message = (error.response && error.response.data.message ? error.response.data.message : '') || error.toString();
                
                // window.location.replace('/');
            }
            
            break;
        case PUT:
            try {
                let result = await axios.put(url, data, headerConfig);
                
                response = result.data;
            } catch (error) {
                // console.log('error printing', error.toString());
                // alert(error.toString());
                // console.log(error.toString())
                response.message = (error.response && error.response.data.message ? error.response.data.message : '') || error.toString();
                
                // window.location.replace('/');
            }
            
            break;
        case DELETE:
            try {
                let result = await axios.delete(url, headerConfig);
                response = result.data;
            } catch (error) {
                response.message = (error.response && error.response.data.message ? error.response.data.message : '') || error.toString();
            }
            break;
        default:
            response = {};
    }

    return response;
}

export const fetcher = ({method, url, data}) => processReq(method, url, data);

export const headerConfig = () => {
    const token = localStorage.getItem('token');

    return ({
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};