import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a donors argument
const generatePDF = (donor: any) => {
  // initialize jsPDF
  const doc: any = new jsPDF();

  // define the columns we want and their requestCodes
  const donorInfoColumn = [
    "Donor Id",
    "First Name",
    "Second Name",
    "Last Name",
    "City",
    "Gender",
    "Contact",
  ];

  const requestInfoColumn = ["ID", "Blood Type", "amount"];
  // define an empty array of rows
  const donorInfo: any = [];
  const requestInfo: any = [];

  const donorData = [
    donor.donorId,
    donor.firstname,
    donor.secondname,
    donor.lastname,
    donor.city,
    donor.gender,
    donor.contact,
    format(new Date(donor.createdAt), "yyyy-MM-dd"),
  ];

  donor.requests.forEach((request: any) => {
    const requestData = [
      request.requestId,
      request.bloodtypes.bloodname,
      request.amount,
    ];
    requestInfo.push(requestData);
  });

  donorInfo.push(donorData);

  // startY is basically margin-top
  doc.autoTable({
    // styles: { fillColor: [255, 255, 255] },
    // columnStyles: { 0: { halign: "center", fillColor: [0, 255, 0] } }, // Cells in first column centered and green
    theme: "grid",
    margin: { top: 50 },
    head: [donorInfoColumn],
    body: donorInfo,
  });
  doc.autoTable({
    // styles: { fillColor: [255, 255, 255] },
    // columnStyles: { 0: { halign: "center", fillColor: [0, 255, 0] } }, // Cells in first column centered and green
    theme: "grid",
    head: [requestInfoColumn],
    body: requestInfo,
  });

  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // donor requestCode. and margin-top + margin-left
  doc.text("Somaliland Blood Bank", 80, 15);
  doc.text("donor Information", 14, 40);
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
