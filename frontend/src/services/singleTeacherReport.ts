import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a generatePDF function that accepts a teachers argument
const generateTeacherPDF = (teacher: any) => {
  // initialize jsPDF
  const doc: any = new jsPDF();

  // define the columns we want and their examCodes
  const teacherInfoColumn = ["Teacher Id", "Full Name", "Gender", "Contact"];

  const studentInfoColumn = ["ID", "Full Name", "Country", "Contact", "Gender"];
  // define an empty array of rows
  const teacherInfo: any = [];
  const studentInfo: any = [];

  const teacherData = [
    teacher.teacherId,
    `${teacher.firstname} ${teacher.secondname} ${teacher.lastname}`,
    teacher.gender,
    teacher.contact,
    // format(new Date(teacher.createdAt), "yyyy-MM-dd"),
  ];

  teacher.students.forEach((student: any) => {
    const studentData = [
      student.studentId,
      `${student.firstname} ${student.secondname} ${student.lastname}`,
      student.country,
      student.contact,
      student.gender,
    ];
    studentInfo.push(studentData);
  });

  teacherInfo.push(teacherData);

  // startY is basically margin-top
  doc.autoTable({
    // styles: { fillColor: [255, 255, 255] },
    // columnStyles: { 0: { halign: "center", fillColor: [0, 255, 0] } }, // Cells in first column centered and green
    theme: "grid",
    margin: { top: 60 },
    head: [teacherInfoColumn],
    body: teacherInfo,
  });
  doc.autoTable({
    // styles: { fillColor: [255, 255, 255] },
    // columnStyles: { 0: { halign: "center", fillColor: [0, 255, 0] } }, // Cells in first column centered and green
    theme: "grid",
    head: [studentInfoColumn],
    body: studentInfo,
  });

  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // teacher examCode. and margin-top + margin-left
  doc.text("Amaano Quran Onlne", 80, 15);
  doc.text(
    `Class: (${teacher.firstname} ${teacher.secondname} ${teacher.lastname})`,
    14,
    40
  );
  doc.text(
    `${date[0]} / ${date[1]} / ${date[2]} / ${date[3]} / ${date[4]}`,
    120,
    40
  );
  doc.text(`Total Students: ${teacher.students.length}`, 14, 50);
  // doc.addImage(myImage, "png", 5, 5, 40, 10);
  doc.save(`single_teacher_report_${dateStr}.pdf`);

  // we define the name of our PDF file.
};

export default generateTeacherPDF;
