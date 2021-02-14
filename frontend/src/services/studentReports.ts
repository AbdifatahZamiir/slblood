import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a students argument
const generatePDF = (students: any) => {
  // initialize jsPDF
  const doc: any = new jsPDF();

  // define the columns we want and their examCodes
  const tableColumn = [
    "Student Id",
    "First Name",
    "Second Name",
    "Last Name",
    "Country",
    "Contact",
    "Gender",
    "Teacher",
  ];
  // define an empty array of rows
  const tableRows: any = [];

  // for each student pass all its data into an array
  students.forEach((student: any) => {
    const studentData = [
      student.studentId,
      student.firstname,
      student.secondname,
      student.lastname,
      student.country,
      student.contact,
      student.gender,
      `${student.teachers.firstname} ${student.teachers.secondname} ${student.teachers.lastname}`,

      // called date-fns to format the date on the student
      format(new Date(student.createdAt), "yyyy-MM-dd"),
    ];
    // push each tickcet's info into a row
    tableRows.push(studentData);
  });

  // startY is basically margin-top
  doc.autoTable({
    theme: "grid",
    margin: { top: 50 },
    head: [tableColumn],
    body: tableRows,
  });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // student examCode. and margin-top + margin-left
  doc.text("Amaano Quran Onlne", 80, 15);
  doc.text("Student Report", 14, 40);
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
