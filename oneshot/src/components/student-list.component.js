import axios from 'axios';
import React, {Component} from 'react';
import {Link} from  'react-router-dom';
import { Table, Tag, Space } from 'antd';

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
      title: 'College ID',
      dataIndex: 'collegeId',
      key: 'collegeId',
    },
   
    {
      title: 'Details',
      key: 'view',
      render: (text, record) => (
        <Space size="middle">
          <Link to= {"/students/" + record.id }  > <Tag color="#778899"> view </Tag> </Link>
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
            <input className="form-control mb-2" placeholder="Search Students with Name/ID..." onChange={(e) => this.props.update(e)} />
        </div>)
    }
}

export default class collegeList extends Component {

    constructor(props){

        super(props);

        


        this.state = {students: [],search:''}
    }
    handleChange(event) {
        // Get event value
        let searchValue = event.target.value;

        
        this.setState({ search: searchValue });
    }
    componentDidMount(){
        axios.get('https://glacial-wave-89509.herokuapp.com/allStudents/').then(response => {
            console.log(response.data.students);
            this.setState({students: response.data.students})
            
        }).catch((error)=>{
            console.log(error);
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) { window.location.reload();
        }
    }


    render(){

        let stud = this.state.students,
        searchString = this.state.search.trim().toLowerCase();
        if (searchString.length > 0) {
            
            stud = stud.filter((e) => e.name.toLowerCase().match(searchString) || e.id.toLowerCase().match(searchString));
        }

        return (
            <div>
                <h3 style={{textAlign:'center'}}> All Student List</h3>
                <UserInput update={(e) => this.handleChange(e)} />

                                <Table columns={columns} dataSource={stud} />

            </div>
        )
    }
}