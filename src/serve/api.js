import axios from 'axios';

axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;

function request(option) {
    let defaults = {
        methods: "get",
        path: "",
        params: {},
        data: {},
        withCredentials: true,
        headers:{
            authorization: 123,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'

        }
    };

    Object.assign(defaults,option);

    return axios[defaults.methods](defaults.path,JSON.stringify(defaults.data),{headers: {authorization: 123,
        'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/json'}},{params: defaults.params}).catch((error)=>{
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
    })
}

export function getPictureList(){
    return request({path: "/get_picture_list"})
}

export function login(option){
    let defaults = {
        username: '',
        pass: ''
    };
    Object.assign(defaults,option);
    return request({methods:'post',path: "http://api.daixinye.com/user/login",data: defaults})
}

export function register(option){

    let defaults = {
        full_name: '',
        username: '',
        pass1: '',
        pass2: '',
        birthday: '',
        gender: '',
        education: '',
        job: '',
        iOT_familiar: '',
        embeded_familiar: '',
        lan_familiar: '',
        type: 'register',
        submit: 'Register'
    };

    Object.assign(defaults,option);

    console.log(JSON.stringify(defaults));

    return request({methods:'post',path: "http://192.168.31.141:8080/user/register", data: defaults})
}

export function logout(option){
    let defaults = {
        username: '',
        pass: ''
    };
    Object.assign(defaults,option);
    return request({methods:'post',path: "http://api.daixinye.com/user/logout",data: defaults})
}

export function uploadImg(option){

    let token = window.localStorage.getItem("token") || '';
    let defaults = {
        title:"", //名称
        classify:"", //分类
        description:"", //描述
        isFree:"", //是否免费
        price:"",//价格
        token: token
    };

    Object.assign(defaults,option);
    console.log(defaults);

    return token && axios({method:'post',url: "/user/upload",data: option,headers:{'Content-Type': 'multipart/form-data'}})
}

//测试

export function test(){

    let token = window.localStorage.getItem("token") || '';
    let defaults = {
        url:1,
        title:1, //名称
        author:"", //作者
        classify:"", //分类
        description:"", //描述
        size:"",
        imgType:"",//图片格
        tag:"",//标签
        isFree:"", //是否免费
        price:"",//价格
        token: token
    };

    console.log(token);

    // Object.assign(defaults,option);
    return token && request({methods:'post',path: "/user/upload",data: defaults})
}

export const getUserInfo = (params={userid:''})=>{
    return request({path: `/user/${params.userid}`});
};