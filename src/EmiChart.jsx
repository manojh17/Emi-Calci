import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function formatRupees(amount) {
  return `₹ ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function EmiChart({ principal, totalInterest }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.datasets[0].data = [principal, totalInterest];
      chartInstanceRef.current.update();
    } else {
      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Principal Amount", "Total Interest"],
          datasets: [
            {
              label: "Amount in Rupees",
              data: [principal, totalInterest],
              backgroundColor: ["#2b83ff", "#ff0000ff"],
              borderWidth: 1,
              radius: 100,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: context => {
                  const label = context.label || "";
                  const value = context.parsed || 0;
                  return `${label}: ${formatRupees(value)}`;
                },
              },
            },
            legend: {
              position: "bottom",
              labels: { color: "#fff" },
            },
          },
        },
      });
    }

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [principal, totalInterest]);

  return (
    <div
      className="results"
      style={{
        background: "rgba(99, 99, 99, 0.25)",
        backdropFilter: "blur(8px)",
        borderRadius: "10px",
        padding: "20px",
        width: "300px",
      }}
    >
      <h2>Chart</h2>
      <canvas ref={chartRef} width={290} height={290} />
    </div>
  );
}
