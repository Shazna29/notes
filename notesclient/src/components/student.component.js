import React, { Component } from "react";
import StudentDataService from "../services/student.service";
export default class Student extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getStudent = this.getStudent.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.state = {
      currentStudent: {
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
      },
      message: ""
    };
  }
  componentDidMount() {
    this.getStudent(this.props.match.params.id);
  }
  onChangeFirstName(e) {
    const firstName = e.target.value;
    this.setState(function(prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          firstName: firstName
        }
      };
    });
  }
  onChangeLastName(e) {
    const lastName = e.target.value;
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        lastName: lastName
      }
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;
    this.setState(function(prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          email: email
        }
      };
    });
  }
  onChangeDateOfBirth(e) {
    const dateOfBirth = e.target.value;
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        dateOfBirth: dateOfBirth
      }
    }));
  }

  onChangeMobile(e) {
    const mobile = e.target.value;
    this.setState(function(prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          mobile: mobile
        }
      };
    });
  }
  onChangePassword(e) {
    const password = e.target.value;
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        password: password
      }
    }));
  }

  onChangeAccountType(e) {
    const accountType = e.target.value;
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        accountType: accountType
      }
    }));
  }


  getStudent(id) {
    StudentDataService.get(id)
      .then(response => {
        this.setState({
          currentStudent: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStudent() {
    StudentDataService.update(
      this.state.currentStudent.id,
      this.state.currentStudent
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The student was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteStudent() {    
    StudentDataService.delete(this.state.currentStudent.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/students')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentStudent } = this.state;
    return (
      <div>
        {currentStudent ? (
          <div className="edit-form">
            <h4>Student</h4>
            <form>

              <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                value={currentStudent.firstName}
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
                value={currentStudent.lastName}
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
                value={currentStudent.email}
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
                value={currentStudent.dateOfBirth}
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
                value={currentStudent.mobile}
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
                value={currentStudent.password}
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
                value={currentStudent.accountType}
                onChange={this.onChangeAccountType}
                name="accountType"
              />
            </div>
            </form>
            
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteStudent}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateStudent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Student...</p>
          </div>
        )}
      </div>
    );
  }
}