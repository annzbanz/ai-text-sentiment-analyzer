import { useEffect, useState } from "react";

import axios from "axios";

import "../App.css";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";


function History() {

  const [history, setHistory] = useState([]);


  useEffect(() => {

    fetchHistory();

  }, []);


  const fetchHistory = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/history"
      );

      setHistory(res.data);

    } catch (err) {

      console.error(err);
    }
  };


  const exportCSV = () => {

    const headers = [
      "Text",
      "Sentiment",
      "Confidence"
    ];


    const rows = history.map((item) => [

      item.text,

      item.sentiment,

      `${item.confidence}%`
    ]);


    let csvContent =
      "data:text/csv;charset=utf-8,";


    csvContent +=
      headers.join(",") + "\n";


    rows.forEach((row) => {

      csvContent +=
        row.join(",") + "\n";
    });


    const encodedUri =
      encodeURI(csvContent);


    const link =
      document.createElement("a");


    link.setAttribute(
      "href",
      encodedUri
    );


    link.setAttribute(
      "download",
      "sentiment_history.csv"
    );


    document.body.appendChild(link);

    link.click();
  };


  const exportPDF = () => {

    const doc = new jsPDF();


    doc.setFontSize(18);


    doc.text(
      "Sentiment Analysis History",
      14,
      20
    );


    const tableData = history.map(
      (item) => [

        item.text,

        item.sentiment,

        `${item.confidence}%`
      ]
    );


    autoTable(doc, {

      head: [[
        "Text",
        "Sentiment",
        "Confidence"
      ]],

      body: tableData,

      startY: 30,
    });


    doc.save(
      "sentiment_history.pdf"
    );
  };


  return (

    <div className="container">

      <div className="card">

        <h1 className="history-title">
          Sentiment History
        </h1>


        <div className="export-buttons">

          <button onClick={exportCSV}>
            Export CSV
          </button>

          <button onClick={exportPDF}>
            Export PDF
          </button>

        </div>


        {history.length === 0 ? (

          <p className="loading">
            No history available yet.
          </p>

        ) : (

          history.map((item) => (

            <div
              key={item.id}
              className="result"
              style={{ marginBottom: "20px" }}
            >

              <p>
                <strong>Text:</strong> {item.text}
              </p>

              <p>
                <strong>Sentiment:</strong> {item.sentiment}
              </p>

              <p>
                <strong>Confidence:</strong>{" "}
                {item.confidence}%
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default History;