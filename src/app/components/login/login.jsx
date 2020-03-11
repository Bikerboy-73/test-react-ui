import React, {Component} from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { Redirect } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { fetchApi } from "../../../services/api";
import '../login/login.css'

class Login extends Component {
    
      constructor() {
        super();
          this.state = { 
            data : []
         }
      }



    //   fetchApi(/dwarves/remove/${seedlingUuid}, "post", {
    //     dtDied: dtRemoved.format("YYYY-MM-DD"),
    //     deleteReason: reason
    //     }).then(res => {





        onFinish = values => {
            let resStatus = "";
            console.log('Received values of form: ', values);
            fetchApi(`/user-types/login/`, "post", values)
            .then(res => {
                resStatus = res.status;
                console.log(resStatus)
                console.log("Response data", res);
                switch (resStatus) {
                  case "SUCCESS":
                    notification.success({
                      message: "Success",
                      duration: 2,
                      description: res.message
                    });
                    console.log("Response data", res);
                    this.props.history.push("/");
                    break;
                  case "FAIL":
                    notification.error({
                      message: "Fail",
                      duration: 3,
                      description: "Something went wrong !"
                    });
                    break;
                  case 500:
                    console.log("server error, try again");
                    break;
                  default:
                    console.log("unhandled");
                    break;
                }
                if (res.status == "FAIL") {
                  notification.error({
                    message: "Failed",
                    description: res.message
                  });
                }
            })
            .catch(err => {
              console.error(err);
            });   
            };
    
      render() {

          return(
            <div className="form">
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                >
                <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
                </Form.Item>
                <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
        
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
                </Form.Item>
        
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href="">register now!</a>
                </Form.Item>
            </Form>
            </div>
          );
        }
    }

export default Login;