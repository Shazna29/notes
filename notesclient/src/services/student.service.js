import http from "../http-common";
class StudentDataService {
  getAll() {
    return http.get("/students");
  }
  get(id) {
    return http.get(`/students/${id}`);
  }
  create(data) {
    return http.post("/students", data);
  }
  update(id, data) {
    return http.put(`/students/${id}`, data);
  }
  delete(id) {
    return http.delete(`/students/${id}`);
  }
  deleteAll() {
    return http.delete(`/students`);
  }
  findByemail(email) {
    return http.get(`/students?email=${email}`);
  }
  findByfirstName(firstName) {
    return http.get(`/students?firstName=${firstName}`);
  }
}
export default new StudentDataService();