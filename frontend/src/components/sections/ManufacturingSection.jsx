import React, {useState} from "react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import { Select } from "@/components/ui/select";

const ManufacturingSection = () => {
  const [selectedModel, setSelectedModel] = useState("Global Change Assessment Model");

  const models = [
    { value: "Energy Sources of Manufacturing", label: "Energy Sources of Manufacturing" },
    { value: "Types of Manufacturing", label: "Types of Manufacturing" },
    { value: "Real Output by Industry", label: "Real Output by Industry" },
    { value: "CO2 Emissions by Industry", label: "CO2 Emissions by Industry" }  
  ];

  // FIX VALUES
  const scenarioData = {
    "Energy Sources of Manufacturing": {
      title: "Average share of Natural Gas from 2002 to 2021",
      co2e: "41.3%",
      yoyChange: "+0.94",
      chartUrl:
        "https://public.tableau.com/views/ManufacturingEmissions/EnergySourcesDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    },
    "Types of Manufacturing": {
      title: "Total Direct Emissions of CO2e from 2002 to 2021",
      co2e: "16509 MMT",
      yoyChange: "-0.87",
      chartUrl:
        "https://public.tableau.com/views/ManufacturingEmissions/TypeofManufacturingDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    },
    "Real Output by Industry": {
      title: "Industry with the highest average YOY change",
      co2e: "Refining",
      yoyChange: "+0.98",
      chartUrl:
        "https://public.tableau.com/views/ManufacturingEmissions/RealOutputDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    },
    "CO2 Emissions by Industry": {
      title: "Industry with the highest average YOY change",
      co2e: "Cement and lime",
      yoyChange: "+0.61",
      chartUrl: "https://public.tableau.com/views/ManufacturingEmissions/CO2EmissionsDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    }
  };

  const currentScenario = scenarioData[selectedModel] || scenarioData["Energy Sources of Manufacturing"];

  const customVizOptions = {
    hideTabs: true,
    hideToolbar: true,
    width: '100%',
    height: '100%',
    device: "desktop",
    onFirstInteractive: function () {
      console.log("Viz is interactive");
    },
  };

  return (
    <section
      id="manufacturing"
      className="min-h-screen p-6 flex flex-col"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-300">
        Manufacturing Industry
      </h2>
      <div className="mb-6">
        <label
          htmlFor="model-select"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Select Scenario Model
        </label>
        <Select
          id="model-select"
          value={selectedModel}
          onValueChange={setSelectedModel}
          options={models}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title={currentScenario.title}
          value={`${currentScenario.co2e}`}
          icon="factory"
          color="bg-blue-700"
        />
        <StatCard
          title="Average YoY Change"
          value={`${currentScenario.yoyChange}%`}
          icon={
            currentScenario.yoyChange.startsWith("-")
              ? "trending-down"
              : "trending-up"
          }
          color={
            currentScenario.yoyChange.startsWith("-")
              ? "bg-red-600"
              : "bg-green-600"
          }
        />
      </div>
      <div className="grow h-[800px] w-full">
        <ChartCard
          title={`Manufacturing Emissions by Source (${
            models.find((m) => m.value === selectedModel)?.label || "Energy Sources of Manufacturing"
          })`}
          chartUrl={currentScenario.chartUrl}
          className="w-full h-full"
          vizOptions={customVizOptions}
        />
      </div>
    </section>
  );
};

export default ManufacturingSection;