import React, { Component } from "react";
import StudentDataService from "../services/student.service";
import { Link } from "react-router-dom";
export default class StudentsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchId = this.onChangeSearchId.bind(this);
    this.retrieveStudents = this.retrieveStudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStudent = this.setActiveStudent.bind(this);
    this.searchId = this.searchId.bind(this);
    this.state = {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      searchId: ""
    };
  }
  componentDidMount() {
    this.retrieveStudents();
  }
  onChangeSearchId(e) {
    const searchId = e.target.value;
    this.setState({
      searchId: searchId
    });
  }
  retrieveStudents() {
    StudentDataService.getAll()
      .then(response => {
        this.setState({
          students: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });
  }
  setActiveStudent(student, index) {
    this.setState({
      currentStudent: student,
      currentIndex: index
    });
  }
  searchId() {
    StudentDataService.findById(this.state.searchId)
      .then(response => {
        this.setState({
          students: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchId, students, currentStudent, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Student ID"
              value={searchId}
              onChange={this.onChangeSearchId}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchId}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Students List</h4>
          <ul className="list-group">
            {students &&
              students.map((student, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveStudent(student, index)}
                  key={index}
                >
                  {student.firstName} {student.lastName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentStudent ? (
            <div>
              <h4>Student</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentStudent.firstName} {currentStudent.lastName}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentStudent.email}
              </div>
              <div>
                <label>
                  <strong>Date Of Birth:</strong>
                </label>{" "}
                {currentStudent.dateOfBirth}
              </div>
              <div>
                <label>
                  <strong>Mobile:</strong>
                </label>{" "}
                {currentStudent.mobile}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentStudent.status}
              </div>
              <div>
                <label>
                  <strong>Password:</strong>
                </label>{" "}
                {currentStudent.password}
              </div>
              <Link
                to={"/students/" + currentStudent.id}
                className="badge badge-warning"
              >
                Edit Student
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Student...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}