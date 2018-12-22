import React, { PureComponent } from 'react';
import {Row, Col} from 'antd'
import { Link } from 'umi/link';
import { Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd';
import {register} from "../../serve/api"
import {login} from "../../serve/api"

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class GlobalHeader extends PureComponent {
 
  constructor(props){
    super(props)
    this.state = {
        current: "top",
        modalVisible: false,
        action: 'login',
        hasLogined: false,
        userNickName: '',
        userid: 0
    }
};
componentWillMount(){
    if(localStorage.userid != ""){
        this.setState({
            hasLogined: true,
            userNickName: localStorage.userNickName,
            userid: localStorage.userid
        })
    }
}
 setModiaVisible(value){
     this.setState({
         modalVisible:value
     })
 }
 handleClick(e){
     // console.log(e.key)
     if(e.key !== "register"){
         // console.log("不需要弹出模态框")
         this.setState({
             current: e.key
         })
         this.setModiaVisible(false);
     }else{
         // console.log("弹出模态框")
         this.setState({
             current:"register"
         })
         this.setModiaVisible(true);
     }
 }
 handleSubmit(e) {
     e.preventDefault();
     
     this.props.form.validateFields((err, values) => {
         if (!err) {
             //感觉你应该参考一下官网的这个栗子试试，values就是表单对象，你可以看看了来
             console.log(values);
             let formData = values;
             if(this.state.action == 'login')
             {
                login({
                  username: formData.userName,
                  pass: formData.password
                }).then((res)=>{
                console.log(res);
                let {data} = res;

                //如果登录成功
                if(data.code==0){
                  console.log(data.message);     
                }
                });
              }
              else if (this.state.action == 'register')
              {
                register({
                  full_name: formData.r_full_name,
                  username: formData.r_userName,
                  pass1: formData.r_pass1,
                  pass2: formData.r_pass2,
                  birthday: formData.r_birthday,
                  gender: formData.r_gender,
                  education: formData.r_education,
                  job: formData.r_job,
                  iOT_familiar: formData.r_iot_familiar,
                  embeded_familiar: formData.r_embeded_familiar,
                  lan_familiar: formData.r_lan_familiar,
                  type: 'register',
                  submit: 'Register'
                }).then((res)=>{
                  console.log(res);
                });
              }
         }else{
             //处理错误
         }
     });
 }
 callback(key){
     if(key == 1){
         this.setState({
             action: "login"
         })
     }else{
         this.setState({
             action: "register"
         })
     }
 }
 logout(){
     localStorage.userid = "";
     localStorage.userNickName = "";
     this.setState({
         hasLogined: false
     })
 }
render(){
  let {getFieldProps } = this.props.form ;
    return(
        <header>
            <Row>
                <Col span = {2}></Col>
                <Col span = {4}>
                    <a href="/" class = "logo">
                        <img src="./src/images/logo.png" alt=""/>
                        <span>REACTNEWS</span>
                    </a>
                </Col>
                <Col span = {12}></Col>
                <Col span = {4}>
                    <Menu  style= {{background: '#061529'}} mode="horizontal" selectedKeys={[this.state.current]} onClick={(e) => this.handleClick(e)}>
                      <Menu.Item key = "register" class = "register">
                        <Icon type = "appstore"  />注册/登陆
                      </Menu.Item>
                    </Menu>
                    <Modal  title = "用户中心" wrapClassName = "vertical-center-modal" visible = {this.state.modalVisible}
                    onCancel={()=>this.setModiaVisible(false)}
                    onOk={()=>this.setModiaVisible(false) }
                            okText="关闭">
                        <Tabs type = "card" onChange = {this.callback.bind(this)}>
                            <TabPane tab = "登陆" key = "1">
                                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem label = "账户">
                                        <Input placeholder = "请输入您的账号" {...getFieldProps("userName")}>
                                        </Input>
                                    </FormItem>
                                    <FormItem label = "密码">
                                        <Input type = "password" placeholder = "请输入您的密码" {...getFieldProps("password")}>
                                        </Input>
                                    </FormItem>
                                    <Button type = "primary" htmlType="submit">
                                        登录
                                    </Button>
                                </Form>
                            </TabPane>

                            <TabPane tab = "注册" key = "2">
                                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem label = "用户全名">
                                        <Input placeholder = "请再次输入您的密码" {...getFieldProps("r_full_name")}>
                                        </Input>
                                    </FormItem>
                                    <FormItem label = "账户">
                                        <Input placeholder = "请输入您的账号" {...getFieldProps("r_userName")}>
                                        </Input>
                                    </FormItem>
                                    <FormItem label = "密码">
                                        <Input type = "password" placeholder = "请输入您的密码" {...getFieldProps("r_pass1")}>
                                        </Input>
                                    </FormItem>
                                    <FormItem label = "确认密码">
                                        <Input type = "password" placeholder = "请再次输入您的密码" {...getFieldProps("r_pass2")}>
                                        </Input>
                                    </FormItem>
                                    <FormItem label = "生日">
                                        <Input placeholder = "请输入您的生日" {...getFieldProps("r_birthday")}>
                                        </Input>
                                    </FormItem>
                                    <FormItem label = "性别">
                                        <Input placeholder = "请输入您的性别" {...getFieldProps("r_gender")}>
                                        </Input>
                                    </FormItem>
                                    <FormItem label = "教育程度">
                                        <Input placeholder = "请输入您的教育程度" {...getFieldProps("r_education")}>
                                        </Input>
                                    </FormItem>
                                    <FormItem label = "工作">
                                        <Input placeholder = "请输入您的工作" {...getFieldProps("r_job")}>
                                        </Input>
                                    </FormItem>
                                    <FormItem label = "iot开发经验">
                                        <Input placeholder = "请输入您的iot开发经验" {...getFieldProps("r_iot_familiar")}>
                                        </Input>
                                    </FormItem>
                                    <FormItem label = "嵌入式开发经验">
                                        <Input placeholder = "请输入您的嵌入式开发经验" {...getFieldProps("r_embeded_familiar")}>
                                        </Input>
                                    </FormItem>
                                    <FormItem label = "C\C++开发经验">
                                        <Input placeholder = "请输入您的C\C++开发经验" {...getFieldProps("r_lan_familiar")}>
                                        </Input>
                                    </FormItem>
                                    <Button type = "primary" htmlType="submit">
                                        注册
                                    </Button>
                                </Form>
                            </TabPane>
                        </Tabs>

                    </Modal>
                </Col>
                <Col span = {2}></Col>
            </Row>
        </header>
    )
  }
}

export default GlobalHeader = Form.create({})(GlobalHeader)