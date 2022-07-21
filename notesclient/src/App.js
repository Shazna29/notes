import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
import {Routes,Route,Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardStudent from "./components/board-student.component";
import BoardAdmin from "./components/board-admin.component";
import AddNote from "./components/add-note.component";
import Note from "./components/note.component";
import NotesList from "./components/notes-list.component";
import AddStudent from "./components/add-student.component";
import Student from "./components/student.component";
import StudentsList from "./components/students-list.component";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showStudentBoard: user.roles.includes("ROLE_STUDENT"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    EventBus.on("logout", () => {
      this.logOut();
    });
  }
  componentWillUnmount() {
    EventBus.remove("logout");
  }
  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  render() {
    const { currentUser, showStudentBoard, showAdminBoard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
          Notes Application
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {showStudentBoard && (
              <li className="nav-item">
                <Link to={"/student"} className="nav-link">
                  Student Board
                </Link>
              </li>
            )(
              <li className="nav-item">
                <Link to={"/notes"} className="nav-link">
                  Notes
                </Link>
              </li>
            )(
              <li className="nav-item">
                <Link to={"/addnote"} className="nav-link">
                  Add Note
                </Link>
              </li>)}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )(
              <li className="nav-item">
                <Link to={"/students"} className="nav-link">
                    Students
                </Link>
              </li>
            )(
              <li className="nav-item">
                <Link to={"/addstudent"} className="nav-link">
                  Add Student
                </Link>
              </li>)}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">

          <Routes>
              <Route  path="/" exact element={<Home/>}/>
              <Route  path="/login" exact element={<Login/>}/>
              <Route  path="/register" exact element={<Register/>}/>
              <Route  path="/profile" exact element={<Profile/>}/>
              <Route  path="/notes" exact element={<NotesList/>}/>
              <Route  path="/addnote" exact element={<AddNote/>}/>
              <Route  path="/students" exact element={<StudentsList/>}/>
              <Route  path="/addstudent" exact element={<AddStudent/>}/>
              <Route path="/students/:id" element={<Student/>}/>
              <Route path="/notes/:id" element={<Note/>}/>
              <Route path="/student" element={<BoardStudent/>}/>
              <Route path="/admin" element={<BoardAdmin/>}/>
              
          </Routes>

        </div>
        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;