import { useMemo, useState } from "react";
import { BarChart } from "@/components/charts/BarChart";
import { PieChart } from "@/components/charts/PieChart";
import { Badge } from "@/components/ui/badge";

const AgricultureOverview = ({
  emissionsData = [],
  selectedModel,
  models = [],
  currentScenario,
}) => {
  // Add state for selected year
  const [selectedYear, setSelectedYear] = useState(2021);

  // Get available years for the dropdown
  const availableYears = useMemo(() => {
    if (!emissionsData?.length) return [];
    return [
      ...new Set(emissionsData.map((d) => new Date(d.Date).getFullYear())),
    ].sort((a, b) => b - a);
  }, [emissionsData]);

  // Update topEmittersData to use selectedYear
  const topEmittersData = useMemo(() => {
    if (!emissionsData?.length) return [];

    const data = emissionsData
      .filter((d) => {
        const year = new Date(d.Date).getFullYear();
        return year === selectedYear && d.Gas === "All GHG";
      })
      .sort((a, b) => b.Value - a.Value)
      .slice(0, 5)
      .map((d) => ({
        name: d.Country.length > 12 ? d.ISO : d.Country,
        value: d.Value, // Keep as number for the chart
      }));

    console.log("Formatted data for BarChart:", data);
    return data;
  }, [emissionsData, selectedYear]);

  // Prepare data for emissions by gas type pie chart
  const gasTypeData = useMemo(() => {
    if (!emissionsData?.length) return [];

    // Filter for selected year and specific gases (CH4 and N2O)
    const filteredData = emissionsData
      .filter((d) => {
        const year = new Date(d.Date).getFullYear();
        return year === selectedYear && ["CH4", "N2O"].includes(d.Gas);
      })
      .reduce((acc, curr) => {
        acc[curr.Gas] = (acc[curr.Gas] || 0) + curr.Value;
        return acc;
      }, {});

    // Calculate total for percentages
    const total = Object.values(filteredData).reduce(
      (sum, value) => sum + value,
      0
    );

    // Format data for Recharts PieChart
    return [
      {
        name: "Methane (CH4)",
        value: Number(filteredData["CH4"]?.toFixed(2)) || 0,
      },
      {
        name: "Nitrous Oxide (N2O)",
        value: Number(filteredData["N2O"]?.toFixed(2)) || 0,
      },
    ].filter((item) => item.value > 0);
  }, [emissionsData, selectedYear]);

  console.log("Gas Type Data:", gasTypeData); // Debugging

  // If no data is available, show a message
  if (
    !emissionsData ||
    !Array.isArray(emissionsData) ||
    emissionsData.length === 0
  ) {
    return <div className="text-center p-4">No emissions data available</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-6 bg-slate-800 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Top Agricultural Emitters</h3>
          <div className="flex items-center gap-2">
            <label htmlFor="year-select" className="text-sm text-gray-400">
              Year:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-slate-700 text-white border border-slate-600 rounded-md px-2 py-1 text-sm"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="h-[300px]">
          {topEmittersData.length > 0 && (
            <BarChart data={topEmittersData} indexBy="name" keys={["value"]} />
          )}
        </div>
      </div>

      <div className="p-6 bg-slate-800 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">
          Agricultural Emissions by Gas Type ({selectedYear})
        </h3>
        {gasTypeData.length > 0 ? (
          <div className="h-[300px]">
            <PieChart
              data={gasTypeData}
              margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
              valueFormat=" >-.2f"
              arcLabel={(d) => `${d.formattedValue}`}
              arcLinkLabel={(d) => d.label}
            />
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            No gas type data available for {selectedYear}
          </div>
        )}
      </div>

      <div className="lg:col-span-2 p-6 bg-slate-800 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">About this Model</h3>
        <p className="text-gray-300 mb-4">
          {models.find((m) => m.value === selectedModel)?.description ||
            "Model description not available"}
        </p>
        <div className="flex flex-wrap gap-2">
          {currentScenario?.keyFeatures?.map((feature, index) => (
            <Badge key={index} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgricultureOverview;
