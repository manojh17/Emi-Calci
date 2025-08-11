function formatRupees(amount) {
  return `₹ ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function EmiResults({ emi, totalPayment, totalInterest }) {
  return (
    <div
      className="results"
      style={{
        background: "rgba(99, 99, 99, 0.25)",
        backdropFilter: "blur(8px)",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "30px",
        width: "300px",
      }}
    >
      <h2>EMI Details</h2>
      <div className="result">
        <p>EMI : <strong>{formatRupees(emi)} per month</strong></p>
        <p>Total Payment : <strong>{formatRupees(totalPayment)}</strong></p>
        <p>Total Interest : <strong>{formatRupees(totalInterest)}</strong></p>
      </div>
    </div>
  );
}
