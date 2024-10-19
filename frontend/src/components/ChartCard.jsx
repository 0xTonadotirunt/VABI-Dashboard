import React, { useEffect, useRef } from "react";

const ChartCard = ({ title, chartUrl, className = "" }) => {
  const vizRef = useRef(null);

  useEffect(() => {
    const initViz = () => {
      if (window.tableau && chartUrl) {
        new window.tableau.Viz(vizRef.current, chartUrl, {
          hideTabs: true,
          hideToolbar: true,
          width: "100%",
          height: "100%",
        });
      }
    };

    initViz();

    return () => {
      if (vizRef.current && vizRef.current.children.length > 0) {
        window.tableau.VizManager.getVizs()[0].dispose();
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
