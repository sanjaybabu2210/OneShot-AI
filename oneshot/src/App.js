import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import {Link} from "react-router-dom";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Navbar from "./components/navbar.component";
import dashBoard from "./components/dashBoard-page.component";
import collegeList from "./components/college-list.component";
import collegesimiDetails from "./components/college-details-simi.component";
import collegeDetails from "./components/college-details.component";
import studentList from "./components/student-list.component";
import studentDetails from "./components/student-details.component";
import createCollege from "./components/create-college.component";
import createStudent from "./components/create-student.component";




const { Header, Sider, Content } = Layout;




class App extends React.Component {


  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

render(){
    return (
     
        <Router >
    <Layout>
      <Sider collapsible collapsed={this.state.collapsed}>
         <Link to="/" className="navbar-brand p-3"><div className="logo" /></Link>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<MenuFoldOutlined />}>
            <Link to="/colleges" className="nav-link">College List</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/students" className="nav-link">Student List</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<MenuFoldOutlined />}>
          <Link to="/addCollege" className="nav-link">Add College</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to="/addStudent" className="nav-link">Add Students</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
            
      <div className="">
      <br/>
      <Route path="/" exact component = {dashBoard} />
      <Route path="/simi/colleges/:id"  component={collegesimiDetails}  />
      <Route path="/colleges/:id" exact component={collegeDetails}  />
      <Route path="/colleges" exact component ={collegeList} />
      
      <Route path="/students" exact component = {studentList} />
      <Route path="/students/:id" component = {studentDetails} />
      <Route path="/addCollege" component = {createCollege} />
      <Route path="/addStudent" component = {createStudent} />


      </div>
           
  
        </Content>
      </Layout>
      </Layout>
      </Router>
     
      
    );
        }
  }





export default App;
