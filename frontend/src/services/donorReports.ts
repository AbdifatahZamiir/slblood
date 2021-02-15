import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a donors argument
const generatePDF = (donors: any) => {
  // initialize jsPDF
  const doc: any = new jsPDF();

  // define the columns we want and their examCodes
  const tableColumn = [
    "Donor Id",
    "First Name",
    "Second Name",
    "Last Name",
    "City",
    "Contact",
    "Gender",
  ];
  // define an empty array of rows
  const tableRows: any = [];

  // for each donor pass all its data into an array
  donors.forEach((donor: any) => {
    const donorData = [
      donor.donorId,
      donor.firstname,
      donor.secondname,
      donor.lastname,
      donor.city,
      donor.contact,
      donor.gender,

      // called date-fns to format the date on the donor
      format(new Date(donor.createdAt), "yyyy-MM-dd"),
    ];
    // push each tickcet's info into a row
    tableRows.push(donorData);
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
  // donor examCode. and margin-top + margin-left
  doc.text("Somaliland Blood Bank", 80, 15);
  doc.text("donor Report", 14, 40);
  doc.text(
    `${date[0]} / ${date[1]} / ${date[2]} / ${date[3]} / ${date[4]}`,
    120,
    40
  );
  // doc.addImage(myImage, "png", 5, 5, 40, 10);
  doc.save(`donor_report_${dateStr}.pdf`);

  // we define the name of our PDF file.
};

export default generatePDF;
