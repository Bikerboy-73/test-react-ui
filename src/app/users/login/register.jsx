import React, {Component} from 'react';
import { Form, Input, InputNumber, Tooltip, Button, notification } from 'antd';
import axios from "axios";
import { QuestionCircleOutlined } from '@ant-design/icons';
import {Route, Link} from 'react-router-dom'
import 'antd/dist/antd.css';

class Register extends Component {

  constructor(props) {
    super(props);
      this.state = { 
        data : []
     }
  }

  
  render() { 

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    
    const validateMessages = {
      required: 'This field is required!',
      types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
      },
      number: {
        range: 'Must be between ${min} and ${max}',
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    const onFinish = values => {
      console.log("values",values);
      let resStatus = 0;
      let url = `http://127.0.0.1:5000/api/v1/users/`;
      axios({
        method: "POST",
        url: url,
        headers: {
          Accept: "application/json",
          //"X-API-KEY": getCookie(COOKIE.ID_TOKEN),
          "Content-Type": "application/json"
          //location: getCookie(COOKIE.FARM)
        },
        data: JSON.stringify(values)
      })
        .then(res => {
          resStatus = res.status;
          console.log(resStatus)
          console.log("Response data", res);
          switch (resStatus) {
            case 201:
              notification.success({
                message: "Success",
                duration: 3,
                description: "Data saved Successfully"
              });
              //console.log("Response data", res);
              break;
            case 400:
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

    return ( 
      <div> 
         
        <Link to="/">
        <Button type="link" block>
            Back
        </Button>
        </Link>
        <div>
       <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
       <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label={
            <span>
              Name&nbsp;
              <Tooltip title="Please enter your name.">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[{ required: true, message: 'Please input your Nname!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
     );
  }
}
 
export default Register;

