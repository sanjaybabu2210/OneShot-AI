import axios from 'axios';
import React, {Component} from 'react';
import {Link} from  'react-router-dom';


const Student = props => (

    <tr>
        <td> {props.stu.id} </td>
        <td> {props.stu.name} </td>
        <td> {props.stu.batchYR} </td>

        <td> {props.stu.collegeId} </td>

        <td> {props.stu.skills} </td>

        {/* <td>
            <Link to= {"/colleges/" + props.colle.id }> view </Link>
           
        </td> */}
    </tr>
)



export default class collegeList extends Component {

    constructor(props){

        super(props);

        // this.deleteCollege = this.deleteCollege.bind(this);


        this.state = {student: ""}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/student/' + this.props.match.params.id).then(response => {
            console.log(response.data.student[0]);
            this.setState({student: response.data.student[0]})
            
        }).catch((error)=>{
            console.log(error);
        })
    }

    studentList(){
        
            return (<Student stu={this.state.student} key={this.state.student._id} />);
        
    }

    render(){
        return (
            <div>
                <h3>All Colleges</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Batch</th>
                            <th>College ID</th>
                            <th>Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.studentList()}
                    </tbody>
                </table>
            </div>
        )
    }
}