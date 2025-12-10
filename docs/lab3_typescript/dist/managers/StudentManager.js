export class StudentManager {
    constructor() {
        this.students = [];
    }
    addStudent(student) {
        this.students.push(student);
        this.saveToLocalStorage();
    }
    getAllStudents() {
        return this.students;
    }
    findStudentByID(id) {
        return this.students.find(s => s.id === id);
    }
    // แก้ไขให้ค้นหาจาก first_name หรือ last_name
    findStudentsByName(name) {
        return this.students.filter(s => s.first_name.toLowerCase().includes(name.toLowerCase()) ||
            s.last_name.toLowerCase().includes(name.toLowerCase()));
    }
    findStudentsByMajor(major) {
        return this.students.filter(s => s.major.toLowerCase().includes(major.toLowerCase()));
    }
    // เพิ่มฟังก์ชัน ค้นหานักศึกษาด้วย email
    findStudentByEmail(email) {
        return this.students.find(s => s.email.toLowerCase() === email.toLowerCase());
    }
    saveToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(this.students));
    }
    loadFromLocalStorage() {
        const data = localStorage.getItem("students");
        if (data) {
            this.students = JSON.parse(data);
        }
    }
}
