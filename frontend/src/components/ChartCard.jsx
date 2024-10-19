import React, { useEffect, useRef } from "react";

const ChartCard = ({ title, chartUrl, className = "" }) => {
  const vizRef = useRef(null);
  const vizObjectRef = useRef(null);

  useEffect(() => {
    const initViz = () => {
      if (window.tableau && chartUrl) {
        // Dispose of the existing viz if it exists
        if (vizObjectRef.current) {
          vizObjectRef.current.dispose();
        }

        // Clear the container
        if (vizRef.current) {
          vizRef.current.innerHTML = "";
        }

        // Create new viz
        vizObjectRef.current = new window.tableau.Viz(
          vizRef.current,
          chartUrl,
          {
            hideTabs: true,
            hideToolbar: true,
            width: "100%",
            height: "100%",
          }
        );
      }
    };

    initViz();

    return () => {
      if (vizObjectRef.current) {
        vizObjectRef.current.dispose();
      }
    };
  }, [chartUrl]);

  return (
    <div className={`bg-slate-800 rounded-lg p-4 shadow-lg ${className}`}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div ref={vizRef} className="h-64">
        {/* Tableau chart will be rendered here */}
      </div>
    </div>
  );
};

export default ChartCard;
