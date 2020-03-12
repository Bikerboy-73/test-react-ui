import React, { Component } from "react";
import { PageHeader, Row, Table, Popconfirm, Button, Modal, notification } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import {Route, Link} from 'react-router-dom'
import { fetchApi } from "../../../services/api";


class List extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleDelete = (key, e) => {
    e.preventDefault();
    const data = this.state.data.filter(item => item.publicId !== key);
    this.setState({data: data});
    let resStatus = 0;
      let url = `http://127.0.0.1:5000/api/v1/user-types/`;
      axios({
        method: "DELETE",
        url: url,
        headers: {
          Accept: "application/json",
          //"X-API-KEY": getCookie(COOKIE.ID_TOKEN),
          "Content-Type": "application/json"
          //location: getCookie(COOKIE.FARM)
        },
        data: JSON.stringify({publicId:key})
      })
        .then(res => {
          resStatus = res.status;
          console.log("res", resStatus)  
          switch (resStatus) {
            case 201:
              notification.success({
                message: "Success",
                duration: 3,
                description: "Deleted Successfully"
              });
              console.log("Response data", res);
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

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    this.setState({ loading: true });
    fetchApi(`/users/`, "get").then(res => {
        this.setState({ 
            loading: false,
            data: res.data
         });
      })
  };

  render()
  {

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: true,
          width: '20%',
          key: 'publicId',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'publicId',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'publicId',
        },
        {
          title: 'Action',
          key: 'action',
          dataIndex: 'publicId',
          key: 'publicId',
          render: (text, record) => (
            <span>
              <div>
              {/* <Link to="/edit" >
                  <a type="link" block>
                      Edit
                  </a>
              </Link> */}
            
            <Link
                to={{
                  pathname: "/edit",
                  state: {
                  edit_records: record
                  }
                  }}
                  //onClick={() => this.setPackId(id)}
                  >
                Edit
            </Link>
            </div>
              
              <Popconfirm title="Sure to delete?" onConfirm={(e) => this.handleDelete(record.publicId, e)}>
                <a>Delete</a>
              </Popconfirm>
              {/* <a>Delete</a> */}
            </span>
          ),
        }     
      ];
      
    console.log("updated data", this.state.data)
    let {data}=this.state;
    return (
    <div>
        <Link to="/add">
        <Button type="link" block>
            Add   
        </Button>
        </Link>
      <Table
        columns={columns}
        rowKey={record => record.login}
        dataSource={data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    </div>
    );
  }
}

export default List