import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {Link} from 'react-router-dom'
import "../../components/index/indexPage.css"

const { Header, Content, Footer } = Layout;


class IndexPage extends Component {
    render(){
        return(
            <div>
                <Layout className="layout">
                    <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                        <Link to="/login">
                            <Button type="button">
                                Login   
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button type="button">
                                Register   
                            </Button>
                        </Link>
                       
                    </Breadcrumb>
                    
                    <div className="site-layout-content">Content</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Created by Jarett Rodrigues</Footer>
                </Layout>
            </div>
        )
    }
      }

export default IndexPage;