import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import {Link} from "react-router-dom";
import 'antd/dist/antd.css'; 
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BookOutlined ,
  VideoCameraOutlined,
  UploadOutlined,
  UserAddOutlined,
  FileAddOutlined 
} from '@ant-design/icons';
import Navbar from "./components/navbar.component";
import dashBoard from "./components/dashBoard-page.component";
import collegeCourseView from "./components/college-course.component";
import collegeList from "./components/college-list.component";
import collegeStateView from "./components/college-state.component";
import collegeView from "./components/collegeview-list.component";
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
    <Layout style={{
           
            
            
            minWidth: 1200,
          }}>

{/* <MediaQuery query='(max-width: 1224px)'> */}
      <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
        { this.state.collapsed ? <div></div>:
         <Link to="/" className="navbar-brand " ><div className="logo" style={{marginLeft:70,marginTop:20, color:'pink'}}>HOME </div></Link>
        }
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<BookOutlined />}>
            <Link to="/colleges" className="nav-link">College List</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/students" className="nav-link">Student List</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FileAddOutlined />}>
          <Link to="/addCollege" className="nav-link">Add College</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserAddOutlined />}>
          <Link to="/addStudent" className="nav-link">Add Students</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div style={ {fontWeight: 'bold',textAlign: 'center',color:'snow'}}>
            One Shot AI TasK
          </div>
          

          <div style={{fontSize: 23, color:'white',marginTop:-75,marginLeft:10}}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
          })}
          </div>
          
        </Header>
        <Content

          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 880,
            
          }}
        >
            
      <div className="">
      <br/>
      <Route path="/" exact component = {collegeList} />
      <Route path="/course/college/:id" component={collegeCourseView}/>

      <Route path="/state/college/:id" component={collegeStateView}/>
      <Route path="/simi/colleges/:id"  component={collegesimiDetails}  />
      <Route path="/colleges/:id" exact component={collegeDetails}  />
      <Route path="/colleges" exact component ={collegeView} />
      
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
