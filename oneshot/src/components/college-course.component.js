import axios from 'axios';
import React, {Component} from 'react';
import {Link} from  'react-router-dom';
import  { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { Table, Tag, Space } from 'antd';
import { Button } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown,Card } from 'react-bootstrap';



var data = [];

    
const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Courses',
      key: 'courses',
      dataIndex: 'courses',
      render: courses => (
        <>
          {courses.map(course => {
            let color = course.length > 3 ? 'geekblue' : 'green';
            if (course == 'Mechanical') {
              color = 'volcano';
            }
            if (course == 'Electrical') {
              color = 'warning';
            }
            if (course == 'Mechatronics') {
              color = 'pink';
            }
            if (course == 'Electronics') {
              color = 'purple';
            }
            return (
              <Tag color={color} key={course}>
                {course.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Details',
      key: 'view',
      render: (text, record) => (
        <Space size="middle">
          <Link to= {"/colleges/" + record.id }  > <Tag color="#778899">view</Tag>  </Link>
        </Space>
      ),
    },
  ];
class UserInput extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div>
            <input className="form-control mb-2" placeholder="Search Colleges with Name/ID..." onChange={(e) => this.props.update(e)} />
        </div>)
    }
}
export default class collegeList extends Component {

    constructor(props){

        super(props);

        // this.deleteCollege = this.deleteCollege.bind(this);


        this.state = {colleges: [], search: '',status:false}
        this.changeStatusTrue = this.changeStatusTrue.bind(this)
        this.changeStatusFalse = this.changeStatusFalse.bind(this)


    }
    changeStatusTrue(){
        this.setState({status:false});
    }
    changeStatusFalse(){
      this.setState({status:true});
  }
    handleChange(event) {
        // Get event value
        let searchValue = event.target.value;

        // Set the state to trigger a re-rendering
        this.setState({ search: searchValue, count:[] });
    }
    componentDidMount(){
        axios.get("https://glacial-wave-89509.herokuapp.com/course/college/" + this.props.match.params.id).then(response => {
            console.log("fafddsfdsfds",response.data.coll);
            

              
            this.setState({colleges: response.data.coll})

            
          
            
            
        }).catch((error)=>{
            console.log(error);
        })
    }
    componentWillReceiveProps = (nextProps)=> {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            window.location.reload();
        }
    };
  

    render(){


        let colle = this.state.colleges,
            searchString = this.state.search.trim().toLowerCase();
            if (searchString.length > 0) {
                // We are searching. Filter the results.
                colle = colle.filter((e) => e.name.toLowerCase().match(searchString) || e.id.toLowerCase().match(searchString));
            }

        return (
            <div>
                <h3 style={{textAlign:'center'}}> Colleges View </h3>
                <UserInput update={(e) => this.handleChange(e)} />
                <Table columns={columns} dataSource={colle} />

            </div>
        )
    }
}






