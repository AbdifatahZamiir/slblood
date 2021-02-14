import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a students argument
const generatePDF = (student: any) => {
  // initialize jsPDF
  const doc: any = new jsPDF();

  // define the columns we want and their examCodes
  const studentInfoColumn = [
    "Student Id",
    "First Name",
    "Second Name",
    "Last Name",
    "Country",
    "Gender",
    "Contact",
    "Teacher",
  ];

  const examInfoColumn = ["ID", "Exam Code", "Subject", "Grade"];
  // define an empty array of rows
  const studentInfo: any = [];
  const examInfo: any = [];

  const studentData = [
    student.studentId,
    student.firstname,
    student.secondname,
    student.lastname,
    student.country,
    student.gender,
    student.contact,
    `${student.teachers.firstname} ${student.teachers.secondname} ${student.teachers.lastname}`,
    format(new Date(student.createdAt), "yyyy-MM-dd"),
  ];

  student.grades.forEach((grade: any) => {
    const examData = [
      grade.gradeId,
      grade.exams.examCode,
      grade.subjects.subjectname,
      grade.grade,
    ];
    examInfo.push(examData);
  });

  studentInfo.push(studentData);

  // startY is basically margin-top
  doc.autoTable({
    // styles: { fillColor: [255, 255, 255] },
    // columnStyles: { 0: { halign: "center", fillColor: [0, 255, 0] } }, // Cells in first column centered and green
    theme: "grid",
    margin: { top: 50 },
    head: [studentInfoColumn],
    body: studentInfo,
  });
  doc.autoTable({
    // styles: { fillColor: [255, 255, 255] },
    // columnStyles: { 0: { halign: "center", fillColor: [0, 255, 0] } }, // Cells in first column centered and green
    theme: "grid",
    head: [examInfoColumn],
    body: examInfo,
  });

  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // student examCode. and margin-top + margin-left
  doc.text("Amaano Quran Onlne", 80, 15);
  doc.text("Student Information", 14, 40);
  doc.text(
    `${date[0]} / ${date[1]} / ${date[2]} / ${date[3]} / ${date[4]}`,
    120,
    40
  );
  // doc.addImage(myImage, "png", 5, 5, 40, 10);
  doc.save(`student_report_${dateStr}.pdf`);

  // we define the name of our PDF file.
};

export default generatePDF;
