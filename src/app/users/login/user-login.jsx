import React, {Component} from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { Redirect, Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { fetchApi } from "../../../services/api";
import '../login/user-login.css'

class UserLogin extends Component {
    
      // constructor() {
      //   super();
          state = { 
            data : [],
            loading: false,
         }
      // }

        onFinish = values => {
            let resStatus = "";
            console.log('Received values of form: ', values);
            this.setState({ loading: true });
            fetchApi(`/users/login`, "post", values)
            .then(res => {
                console.log("response1", res)
                resStatus = res.status;
                console.log("status",resStatus)
                console.log("Response data", res);
                switch (resStatus) {
                  case "SUCCESS":
                    notification.success({
                      message: "Success",
                      duration: 2,
                      description: res.message
                    });
                    console.log("Response data", res);
                    this.setState({ loading: false });
                    this.props.history.push("/dashboard");
                    break;
                  case "FALSE":
                    notification.error({
                      message: "Fail",
                      duration: 2,
                      description: "Incorrect username or password."
                    });
                    break;
                  case 500:
                    console.log("server error, try again");
                    notification.error({
                      message: "Fail",
                      duration: 2,
                      description: "Incorrect username or password."
                    });
                    break;
                  default:
                    console.log("unhandled");
                    notification.error({
                      message: "Fail",
                      duration: 2,
                      description: "Incorrect username or password."
                    });
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
              <div>
              <div>
                  <Link to="/">
                    <Button type="link" block>
                        Back   
                    </Button>
                </Link>
                </div>
            <div className="form">
                
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                loading={this.state.loading}
                onFinish={this.onFinish}
                >
                <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
            </div>
          );
        }
    }

export default UserLogin;