import React, {Component} from 'react';

import axios from 'axios';
import { Form } from 'react-bootstrap';
export default class addCollege extends Component {

    constructor(props){
        super(props);

        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeCourses = this.onChangeCourses.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeStudents = this.onChangeStudents.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeId = this.onChangeId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        

        this.state = {
            id :'',
            name: '',
            year: '',
            city: '',
            state: '',
            country: '',
            nofstudents: '',
            courses: ''
        }
    }

    componentDidMount(){
        this.setState({
            id: '',
            name: 'test',
            year: '',
            city: '',
            state: '',
            country: '',
            nofstudents: '',
            courses: ''
        })
    }
        onChangeId(e) {
            this.setState({
                id: e.target.value
            });
        }
        onChangeName(e) {
            this.setState({
                name: e.target.value
            })
        }
        onChangeYear(e) {
            this.setState({
                year: e.target.value
            })
        }
        onChangeCity(e) {
            this.setState({
                city: e.target.value
            })
        }
        onChangeState(e) {
            this.setState({
                state: e.target.value
            })
        }
        onChangeCountry(e) {
            this.setState({
                country: e.target.value
            })
        }
        onChangeStudents(e) {
            this.setState({
                nofstudents: e.target.value
            })
        }
        onChangeCourses(e) {
            this.setState({
                courses: e.target.value
            })
        }
        onSubmit(e){
            e.preventDefault();

            const college = {
                id: this.state.id,
                name: this.state.name,
                year: this.state.year,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country,
                nofstudents: this.state.nofstudents,
                courses: this.state.courses

            }
            console.log(college);

            axios.post('https://glacial-wave-89509.herokuapp.com/addColleges/', college).then(res => console.log(res.data));


            // window.location = '/';
        }
    render(){
        return (

            <div style={{  width:"40vw",padding:20,marginLeft:'20%',background:"snow",borderRadius:10,minWidth:400}}>
                <h3>Add New College</h3>
           <form onSubmit = {this.onSubmit}>

               
                <div className = "form-group">
                    <label> College Id:</label>
                    <input type="text" className="form-control" value = {this.state.id} onChange = {this.onChangeId} />

                </div>
                <div className = "form-group">
                    <label> College Name:</label>
                    <input type="text" className="form-control" value = {this.state.name} onChange = {this.onChangeName} />

                </div>
                <div className = "form-group">
                    <label> Founded Year:</label>
                    <input type="text" className="form-control" value = {this.state.year} onChange = {this.onChangeYear} />

                </div>
                <div className = "form-group">
                    <label> City:</label>
                    <input type="text" className="form-control" value = {this.state.city} onChange = {this.onChangeCity} />

                </div>
                <div className = "form-group">
                    <label> State:</label>
                    <input type="text" className="form-control" value = {this.state.state} onChange = {this.onChangeState} />

                </div>
                <div className = "form-group">
                    <label> Country:</label>
                    <input type="text" className="form-control" value = {this.state.country} onChange = {this.onChangeCountry} />

                </div>
                <div className = "form-group">
                    <label> No Of Students:</label>
                    <input type="text" className="form-control" value = {this.state.nofstudents} onChange = {this.onChangeStudents} />

                </div>
                <div className = "form-group">
                    <label> Courses:</label>
                    <input type="text" className="form-control" value = {this.state.courses} onChange = {this.onChangeCourses} />

                </div> 
                <div className = "form-group" style={{marginTop:10}}>
                
                    <input type="submit" className="btn btn-primary" />

                </div> 
           </form>
            </div>
          
        )
    }
}