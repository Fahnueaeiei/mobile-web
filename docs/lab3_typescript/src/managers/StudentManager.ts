import { Student } from "../models/Student.js";


export class StudentManager {
 private students: Student[] = [];


 addStudent(student: Student): void {
   this.students.push(student);
   this.saveToLocalStorage();
 }


 getAllStudents(): Student[] {
   return this.students;
 }


 findStudentByID(id: string): Student | undefined {
   return this.students.find(s => s.id === id);
 }


 // แก้ไขให้ค้นหาจาก first_name หรือ last_name
 findStudentsByName(name: string): Student[] {
   return this.students.filter(s =>
     s.first_name.toLowerCase().includes(name.toLowerCase()) ||
     s.last_name.toLowerCase().includes(name.toLowerCase())
   );
 }


 findStudentsByMajor(major: string): Student[] {
   return this.students.filter(s =>
     s.major.toLowerCase().includes(major.toLowerCase())
   );
 }


 // เพิ่มฟังก์ชัน ค้นหานักศึกษาด้วย email
 findStudentByEmail(email: string): Student | undefined {
   return this.students.find(s =>
     s.email.toLowerCase() === email.toLowerCase()
   );
 }


 saveToLocalStorage(): void {
   localStorage.setItem("students", JSON.stringify(this.students));
 }


 loadFromLocalStorage(): void {
   const data = localStorage.getItem("students");
   if (data) {
     this.students = JSON.parse(data);
   }
 }
}
