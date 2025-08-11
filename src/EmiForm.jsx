export default function EmiForm({ principal, setPrincipal, rate, setRate, time, setTime, onCalculate, onReset }) {
  return (
    <div className="calciform" style={{ background: "rgba(99, 99, 99, 0.25)", backdropFilter: "blur(8px)", borderRadius: "10px", padding: "20px", width: "300px" }}>
      <h2>Enter Your EMI Details</h2>
      <div className="form">

        <div className="principal">
          <label htmlFor="principal">Principal Amount:</label>
          <input
            type="number"
            id="principal"
            placeholder="Enter principal amount"
            value={principal || ""}
            onChange={e => setPrincipal(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="rate">
          <label htmlFor="rate">Rate of Interest:</label>
          <input
            type="number"
            id="rate"
            placeholder="Enter rate of interest"
            value={rate || ""}
            onChange={e => setRate(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="time">
          <label htmlFor="time">Time Period (in months):</label>
          <input
            type="number"
            id="time"
            placeholder="Enter time period in months"
            value={time || ""}
            onChange={e => setTime(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="buttons" style={{ marginTop: "10px" }}>
          <button
            onClick={e => {
              e.preventDefault();
              onCalculate();
            }}
            style={{
              backgroundColor: "#2b83ff",
              color: "white",
              padding: "7px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Calculate EMI
          </button>

          <button
            onClick={e => {
              e.preventDefault();
              onReset();
            }}
            style={{
              backgroundColor: "#ccc",
              color: "#333",
              padding: "7px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
