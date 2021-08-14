import axios from 'axios';
import React, {Component} from 'react';
import {Link} from  'react-router-dom';
import  { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { Table, Tag, Space } from 'antd';



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
    {
      title: 'Details',
      key: 'view',
      render: (text, record) => (
        <Space size="middle">
          <Link to= {"/colleges/" + record.id }  > view </Link>
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


        this.state = {colleges: [], search: '',freqcat: []}
    }
    handleChange(event) {
        // Get event value
        let searchValue = event.target.value;

        // Set the state to trigger a re-rendering
        this.setState({ search: searchValue, count:[] });
    }
    componentDidMount(){
        axios.get('http://localhost:5000/allCollege/').then(response => {
            console.log(response.data.coll);
            
            this.setState({colleges: response.data.coll})

            var freq = [];
            for (var i=0; i< response.data.coll.length;i++) {
                for(var j=0;j< response.data.coll[i].courses.length;j++){

                  var x = response.data.coll[i].courses[j]
                   freq.push(x.trim());
                }

            }
           
            
            const counts = {};
            
            for (const col of freq) {
              counts[col] = counts[col] ? counts[col] + 1 : 1;
            }


            const unique = (value, index, self) => {
              return self.indexOf(value) === index
            }
            
           
            const datat = freq.filter(unique);
            var cout = [];
            
            for(const x of datat){
              cout.push({key:x , value: counts[x]});
            }
            
            console.log(cout);
            // console.log(keys(counts))
            this.setState({freqcat:cout});
            
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


      
var config = {
appendPadding: 10,
data: this.state.freqcat,
angleField: 'value',
colorField: 'key',
radius: 1,
innerRadius: 0.6,
label: {
  type: 'inner',
  offset: '-50%',
  content: '{value}',
  style: {
    textAlign: 'center',
    fontSize: 14,
  },
},
interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
statistic: {
  title: false,
  content: {
    style: {
      whiteSpace: 'pre-wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    content: 'Colleges',
  },
},
};
        let colle = this.state.colleges,
            searchString = this.state.search.trim().toLowerCase();
            if (searchString.length > 0) {
                // We are searching. Filter the results.
                colle = colle.filter((e) => e.name.toLowerCase().match(searchString) || e.id.toLowerCase().match(searchString));
            }

        return (
            <div>
                <h3>All Colleges</h3>
                <UserInput update={(e) => this.handleChange(e)} />
                <Table columns={columns} dataSource={colle} />

                <Pie {...config} />
            </div>
        )
    }
}






