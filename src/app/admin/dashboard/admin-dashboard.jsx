import React, {Component} from 'react';
import { Form, Input, InputNumber, Button, notification } from 'antd';
import axios from "axios";
import {Route, Link} from 'react-router-dom'
import 'antd/dist/antd.css';

class AdminDashboard extends Component {

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


    const onFinish = values => {
      console.log("values",values);
      let resStatus = 0;
      let url = `http://127.0.0.1:5000/api/v1/user-types/`;
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
       <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
       <Input />
     </Form.Item>
     <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]}>
       <Input />
     </Form.Item>
     <Form.Item name={['age']} label="Age" rules={[{ type: 'number', min: 18, max: 99 }]}>
       <InputNumber />
     </Form.Item>
     <Form.Item name={['website']} label="Website">
       <Input />
     </Form.Item>
     <Form.Item name={['introduction']} label="Introduction">
       <Input.TextArea />
     </Form.Item>
     <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
       <Button type="primary" htmlType="submit">
         Save
       </Button>
     </Form.Item>
      </Form>
      </div>
    </div>
     );
  }
}
 
export default AdminDashboard;

