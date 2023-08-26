import React from "react";
import styles from "./ReportDownload.module.css";
import { useSelector } from "react-redux";

const ReportDownload = () => {
  const items = useSelector((state) => state.items.items);

  const convertToCSV = () => {
    let CSVReport = "Amount,Category,Description\n";
    items.forEach((element) => {
      let row =
        element[1].amount +
        "," +
        element[1].category +
        "," +
        element[1].description +
        "\n";
      CSVReport += row;
    });
    return new Blob([CSVReport], { type: "text/csv" });
  };

  const csvDownloadHandler = () => {
    const csvData = convertToCSV();
    const csvURL = URL.createObjectURL(csvData);

    const tempLink = document.createElement("a"); 
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "expenses.csv");
    tempLink.click();
  };

  return (
    <button onClick={csvDownloadHandler} className={styles.report}>
      Download Report
    </button>
  );
};

export default ReportDownload;
