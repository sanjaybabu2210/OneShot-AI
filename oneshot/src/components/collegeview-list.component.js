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


        this.state = {colleges: [], search: '',freqcat: [],frestat:[],status:false}
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
        axios.get('https://glacial-wave-89509.herokuapp.com/allCollege/').then(response => {
            console.log(response.data.coll);
            
            this.setState({colleges: response.data.coll})

            var freq = [];

            var colcount = response.data.coll.length;
            for (var i=0; i< response.data.coll.length;i++) {
                for(var j=0;j< response.data.coll[i].courses.length;j++){

                  var x = response.data.coll[i].courses[j]
                   freq.push(x.trim());
                }

            }

            var countcour = freq.length;
           var freq2 = [];

            for (var i=0; i< response.data.coll.length;i++) {
                

                  var x = response.data.coll[i].state;
                   freq2.push(x.trim());
                

            }


            const counts = {};
            
            for (const col of freq) {
              counts[col] = counts[col] ? counts[col] + 1 : 1;
            }

            const counts2 = {};
            
            for (const col of freq2) {
              counts2[col] = counts2[col] ? counts2[col] + 1 : 1;
            }

            const unique = (value, index, self) => {
              return self.indexOf(value) === index
            }
            
           
            const datat = freq.filter(unique);
            const datat2 = freq2.filter(unique);

            var cout = [];
            var cout2 = [];

            
            for(const x of datat){

              var val = (counts[x]/countcour)*100;
              val = parseInt(val.toFixed(2));
              cout.push({key:x , value: val});
            }
            for(const x of datat2){

              var val = (counts2[x]/colcount)*100;
              val = parseInt(val.toFixed(2));

              cout2.push({key:x , value: val});
            }
            console.log(cout);
            // console.log(keys(counts))
            this.setState({freqcat:cout});
            this.setState({frestat:cout2});
            
            for (const col of freq) {
              counts[col] = counts[col] ? counts[col] + 1 : 1;
            }
            console.log(counts);
            // console.log(keys(counts))
            
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
                <h3 style={{textAlign:'center'}}>All Colleges View</h3>
                <UserInput update={(e) => this.handleChange(e)} />
                <Table columns={columns} dataSource={colle} />

            </div>
        )
    }
}






