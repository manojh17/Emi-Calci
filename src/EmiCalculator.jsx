import { useState } from "react";
import EmiForm from "./EmiForm";
import EmiResults from "./EmiResults";
import EmiChart from "./EmiChart";

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
      </div>
    </div>
  );
}
