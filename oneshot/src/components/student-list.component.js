import axios from 'axios';
import React, {Component} from 'react';
import {Link} from  'react-router-dom';
import { Table, Tag, Space } from 'antd';


// const Student = props => (

//     <tr>
//         <td> {props.stu.id} </td>
//         <td> {props.stu.name} </td>
//         <td> {props.stu.batchYR} </td>
//         <td> {props.stu.collegeID} </td>
//         <td> {props.stu.skills}</td>
//         <td>
//             <Link to= {"/students/" + props.stu.id }> view </Link>
           
//         </td>
//     </tr>
// )

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
          <Link to= {"/students/" + record.id }  > view </Link>
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

        // this.deleteCollege = this.deleteCollege.bind(this);


        this.state = {students: [],search:''}
    }
    handleChange(event) {
        // Get event value
        let searchValue = event.target.value;

        // Set the state to trigger a re-rendering
        this.setState({ search: searchValue });
    }
    componentDidMount(){
        axios.get('http://localhost:5000/allStudents/').then(response => {
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
            // We are searching. Filter the results.
            stud = stud.filter((e) => e.name.toLowerCase().match(searchString) || e.id.toLowerCase().match(searchString));
        }

        return (
            <div>
                <h3>Student List</h3>
                <UserInput update={(e) => this.handleChange(e)} />

                                <Table columns={columns} dataSource={stud} />

            </div>
        )
    }
}