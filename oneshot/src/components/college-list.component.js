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


        this.state = {colleges: [], search: '',freqcat: [],frestat:[],status:false,statecat:[],coursecat: []}
        this.changeStatusTrue = this.changeStatusTrue.bind(this)
        this.changeStatusFalse = this.changeStatusFalse.bind(this)


    }
    // stateList(){
    //               return (
    //                 <Dropdown.Item onClick={this.changeStatusFalse}></Dropdown.Item>

    //              );

    // }
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
            this.setState({statecat:datat2});
            this.setState({coursecat:datat});

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


      
var config1 = {
appendPadding: 10,
data: this.state.freqcat,
angleField: 'value',
colorField: 'key',
radius: 1,
innerRadius: 0.6,
label: {
  type: 'inner',
  offset: '-50%',
  content: '{value} %',
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
    content: 'Courses',
  },
},
};

var config2 = {
  appendPadding: 10,
  data: this.state.frestat,
  angleField: 'value',
  colorField: 'key',
  radius: 1,
  innerRadius: 0.6,
  label: {
    type: 'inner',
    offset: '-50%',
    content: '{value} %',
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
      content: 'States',
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

              <div className="row text-center" style={{textAlign:'center',marginBottom:30}}>



                  <div className="col-sm-4" style={{ background:'#2f4f4f ',height:'35vh',width:'36vw',margin:'auto',borderRadius:5,boxShadow:"2px 4px 4px 6px",padding:10,minWidth:320,}}>
                  <Link to="/colleges"  >
                          <div style={{textAlign:'center',verticalAlign:'middle',fontFamily:'fantasy',text:'snow',height:'33vh',width:'34vw',marginTop:-10,padding:30}}>
                            <h3 style={{color:'snow',marginTop:'10vh'}}>College List</h3>
                          </div> </Link>
                  </div>

                  
                  <div className="col-sm-4" style={{background:'#2f4f4f ',height:'35vh',width:'36vw',margin:'auto',borderRadius:5,boxShadow:"2px 4px 4px 6px",padding:'1vw',minWidth:320}}>
                  
                  <Link to="/students"  >
                  <div style={{textAlign:'center',verticalAlign:'middle',fontFamily:'fantasy',text:'snow',height:'30vh',width:'34vw',marginTop:-10,padding:30}}>
                            <h3 style={{color:'snow',marginTop:'10vh'}}>Student List</h3>
                          </div>
                          </Link>
                    </div>
                  
              </div>
             
                {/* <h3 style={{textAlign:'center'}}>All Colleges View</h3>


                <UserInput update={(e) => this.handleChange(e)} />


                <Table columns={columns} dataSource={colle} /> */}






            <div style={{textAlign:'center',marginLeft:"22%",marginBottom:30}} className="row">
              
              
              <div className="col-sm-3">
              < Dropdown>
  <Dropdown.Toggle variant="info" id="dropdown-basic">
    Select By State
  </Dropdown.Toggle>
  <Dropdown.Menu>
    {this.state.statecat.map(state => {

        return( <Dropdown.Item> <Link to={"/state/college/" + state} >{state}</Link></Dropdown.Item>)
    })}

 </Dropdown.Menu>
</Dropdown>

              </div>
              
              <div className="col-sm-3">
              < Dropdown>
  <Dropdown.Toggle variant="info" id="dropdown-basic">
    Change View 
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={this.changeStatusTrue}>States View</Dropdown.Item>
    <Dropdown.Item onClick={this.changeStatusFalse}>Courses View</Dropdown.Item>
   
  </Dropdown.Menu>
</Dropdown>

              </div>

              <div className="col-sm-3">
              < Dropdown>
  <Dropdown.Toggle variant="info" id="dropdown-basic">
    Select By Course
  </Dropdown.Toggle>
  <Dropdown.Menu>
    {this.state.coursecat.map(course => {

        return( <Dropdown.Item> <Link to={"/course/college/" + course} >{course}</Link></Dropdown.Item>)
    })}

 </Dropdown.Menu>
</Dropdown>

              </div>
 

</div>

            {this.state.status?<div style={{}}>
            <Card className="bg-light text-white p-4">
 
            <Pie {...config1} />
</Card>
           
            </div> : <div>
            <Card className="bg-light text-white p-4" >
            <Pie {...config2} />
            </Card>
            </div>}
                
                
            <div style={{marginTop:30}}><h5>By Sanjay Babu </h5></div>

            </div>
        )
    }
}






