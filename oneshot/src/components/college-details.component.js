import axios from 'axios';
import React, {Component} from 'react';
import {Link} from  'react-router-dom';
import { Table, Tag, Space } from 'antd';



const columns1 = [
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
      title: 'Year Established',
      dataIndex: 'year',
      key: 'year',
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'No of Students',
        dataIndex: 'nofstudends',
        key: 'nofstudends',
      },
      {
        title: 'Courses',
        key: 'courses',
        dataIndex: 'courses',
        render: courses => (
          <>
            {courses.map(course => {
              let color = course.length > 5 ? 'geekblue' : 'green';
              if (course === 'loser') {
                color = 'volcano';
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
   
  ];

  const columns2 = [
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
      title: 'College ID',
      dataIndex: 'collegeId',
      key: 'collegeId',
    },
   
    {
      title: 'Details',
      key: 'view',
      render: (text, record) => (
        <Space size="middle">
          <Link to= {"/students/" + record.id }  > view </Link>
        </Space>
      ),
    },
  ];
  
  const columns3 = [
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
      title: 'Year Established',
      dataIndex: 'year',
      key: 'year',
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
      },
    {
      title: 'Details',
      key: 'view',
      render: (text, record) => (
        <Space size="middle">
          <Link to= {"/simi/colleges/" + record.id }  > view </Link>
        </Space>
      ),
    },
  ];



const Student = props => (
    <tr>
        <Link to= {"/students/" + props.stu.id }><td> {props.stu.id} </td></Link>
        <td> {props.stu.name} </td>

        
    </tr>
)

export default class collegeList extends Component {

    constructor(props){

        super(props);


        this.state = {colleges: [], stud: [], similar: []}
    }

    componentDidMount(){
        axios.get( "http://localhost:5000/college/" + this.props.match.params.id ).then(response => {
            console.log(response.data.coll);
            this.setState({colleges: response.data.colleges, stud: response.data.stud, similar: response.data.similarColl})
            
            console.log(this.state.colleges);
            console.log("students" ,this.state.stud);
            console.log("similar",this.state.similar);
        }).catch((error)=>{
            console.log(error);
        })
    }

    
    render(){
        return (
            <div>
                <h3>Colleges Details</h3>
                
                <Table columns={columns1} dataSource={this.state.colleges} />

                <h4>Students Registered </h4>
                <Table columns={columns2} dataSource={this.state.stud} />

                <h4>Similar Colleges</h4>
                <Table columns={columns3} dataSource={this.state.similar} />

            </div>
        )
    }
}