import React, { Component } from "react";
import StudentDataService from "../services/student.service";
export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAccountType = this.onChangeAccountType.bind(this);

    
    this.saveStudent = this.saveStudent.bind(this);
    this.newStudent = this.newStudent.bind(this);
    this.state = {
      id: null,
      firstName: "",
      lastName: "", 
      email: "",
      dateOfBirth: "", 
      mobile: "",
      password: "", 
      accountType: "",
      status: false,
      submitted: false
    };
  }



  onChangeFirstName(e) {
    this.setState({
        firstName: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
        lastName: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
        email: e.target.value
    });
  }
  onChangeDateOfBirth(e) {
    this.setState({
        dateOfBirth: e.target.value
    });
  }
  onChangeMobile(e) {
    this.setState({
        mobile: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
        password: e.target.value
    });
  }
  onChangeAccountType(e) {
    this.setState({
        accountType: e.target.value
    });
  }


  saveStudent() {
    var data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        dateOfBirth: this.state.dateOfBirth,
        mobile: this.state.mobile,
        password: this.state.password,
        accountType: this.state.accountType,
    };
    StudentDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          dateOfBirth: response.data.dateOfBirth,
          mobile: response.data.mobile,
          password: response.data.password,
          accountType: response.data.accountType,
          status: response.data.status,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  newStudent() {
    this.setState({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      mobile: "",
      password: "",
      accountType: "",
      status: false,
      submitted: false
    });
  }
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newStudent}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                value={this.state.firstName}
                onChange={this.onChangeFirstName}
                name="firstName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                value={this.state.lastName}
                onChange={this.onChangeLastName}
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                required
                value={this.state.dateOfBirth}
                onChange={this.onChangeDateOfBirth}
                name="dateOfBirth"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                required
                value={this.state.mobile}
                onChange={this.onChangeMobile}
                name="mobile"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountType">Account Type</label>
              <input
                type="text"
                className="form-control"
                id="accountType"
                required
                value={this.state.accountType}
                onChange={this.onChangeAccountType}
                name="accountType"
              />
            </div>

            <button onClick={this.saveStudent} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}