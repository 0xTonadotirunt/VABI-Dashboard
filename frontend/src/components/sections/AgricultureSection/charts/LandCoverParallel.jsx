import { useState, useMemo } from "react";
import Plot from "react-plotly.js";

const LandCoverParallel = ({
  pathwaysData,
  scenarios,
  selectedRegion = "Global",
}) => {
  const [selectedYear, setSelectedYear] = useState(2050);

  const plotData = useMemo(() => {
    if (!pathwaysData?.length) return null;

    // Filter data for selected year and Land Cover
    const filteredData = pathwaysData.filter(
      (d) =>
        d.year === selectedYear &&
        d.subcategory === "Land Cover" &&
        d.indicator !== "Total" &&
        (selectedRegion === "Global" || d.country_region === selectedRegion)
    );

    // Group data by scenario
    const formattedData = scenarios
      .map((scenario) => {
        const scenarioValues = filteredData.filter(
          (d) => d.scenario === scenario
        );

        const dataPoint = {
          scenario: scenario,
        };

        scenarioValues.forEach((d) => {
          dataPoint[d.indicator] = d.value;
        });

        return dataPoint;
      })
      .filter((d) => Object.keys(d).length > 1);

    // Get dimensions (indicators)
    const dimensions = Object.keys(formattedData[0])
      .filter((key) => key !== "scenario")
      .map((indicator) => {
        const values = formattedData.map((d) => d[indicator]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        // Add 5% padding to min and max
        const padding = (max - min) * 0.05;

        return {
          label: indicator,
          values: values,
          range: [min - padding, max + padding],
        };
      });

    return {
      type: "parcoords",
      line: {
        color: Array.from({ length: formattedData.length }, (_, i) => i),
        colorscale: "Viridis",
      },
      dimensions: dimensions.map((dim) => ({
        label: dim.label,
        values: dim.values,
        range: dim.range,
        tickformat: ".1f",
      })),
      labelangle: 90,
      labelfont: {
        color: "white",
        size: 12,
      },
      margin: {
        t: 100,
      },
    };
  }, [pathwaysData, selectedYear, selectedRegion, scenarios]);

  return (
    <div className="p-6 bg-slate-800">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-4">
          Land Cover Distribution Comparison ({selectedYear})
        </h3>

        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm text-gray-300">Select Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-slate-700 text-white border border-slate-600 rounded-lg p-2"
          >
            {[2030, 2040, 2050].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {plotData ? (
        <div style={{ height: "500px" }}>
          <Plot
            data={[plotData]}
            layout={{
              width: 900,
              height: 500,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: {
                color: "white",
              },
              margin: {
                l: 80,
                r: 80,
                t: 60,
                b: 60,
              },
            }}
            config={{
              displayModeBar: false,
              responsive: true,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      ) : (
        <div className="text-center text-gray-400 py-10">
          No land cover data available for the selected criteria
        </div>
      )}
    </div>
  );
};

export default LandCoverParallel;
