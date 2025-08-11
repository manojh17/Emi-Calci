import { useState } from "react";
import EmiForm from "./EmiForm";
import EmiResults from "./EmiResults";
import EmiChart from "./EmiChart";




import jsPDF from "jspdf";
import html2canvas from "html2canvas";





export default function EmiCalculator() {
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(0);
  const [time, setTime] = useState(0);

  const [emi, setEmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  function calculateEmi(p, r, t) {
    const RPM = (r / 12) / 100;
    const nominator = (p * RPM) * (1 + RPM) ** t;
    const denominator = (1 + RPM) ** t - 1;
    const emiCalc = nominator / denominator;
    const totalAmt = emiCalc * t;
    const totalInt = totalAmt - p;

    setEmi(emiCalc);
    setTotalPayment(totalAmt);
    setTotalInterest(totalInt);
  }

  function handleCalculate() {
    calculateEmi(principal, rate, time);
  }

  function handleReset() {
    setPrincipal(0);
    setRate(0);
    setTime(0);
    setEmi(0);
    setTotalPayment(0);
    setTotalInterest(0);
  }

  function handleDownloadPDF() {
  const pdf = new jsPDF("p", "mm", "a4");

  // Title
  pdf.setFontSize(20);
  pdf.text("EMI Report", 105, 15, { align: "center" });

  // EMI Details Table
  pdf.setFontSize(12);
  pdf.text(`Principal Amount: Rs.  ${principal.toLocaleString()}`, 20, 40);
  pdf.text(`Interest Rate: ${rate}%`, 20, 50);
  pdf.text(`Tenure: ${time} months`, 20, 60);
  pdf.text(`Monthly EMI: Rs. ${emi.toFixed(2)}`, 20, 70);
  pdf.text(`Total Payment: Rs. ${totalPayment.toFixed(2)}`, 20, 80);
  pdf.text(`Total Interest: Rs. ${totalInterest.toFixed(2)}`, 20, 90);
  pdf.text(`Generated on: ${new Date().toLocaleString()}`, 20, 210);

    // Save
  pdf.save("EMI_Report.pdf");
 

    // Footer
    pdf.setFontSize(10);

  
}

  return (
    <div className="container" style={{ maxWidth: "900px", margin: "30px auto", display: "flex", gap: "30px", color: "#fff" }}>
      <EmiForm
        principal={principal}
        setPrincipal={setPrincipal}
        rate={rate}
        setRate={setRate}
        time={time}
        setTime={setTime}
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      <div>
        <EmiResults emi={emi} totalPayment={totalPayment} totalInterest={totalInterest} />
        <EmiChart principal={principal} totalInterest={totalInterest} />
        <button
  onClick={handleDownloadPDF}
  style={{
    backgroundColor: "#28a745",
    color: "white",
    padding: "7px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px"
  }}
>
  Download EMI Report
</button>
      </div>

      
    </div>
  );
}
