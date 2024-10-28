import React, { useState } from "react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import { Select } from "@/components/ui/select";

const AgricultureSection = () => {
  const [selectedModel, setSelectedModel] = useState("Global Change Assessment Model");

  const models = [
    { value: "Global Change Assessment Model", label: "Global Change Assessment Model" },
    { value: "2050 Pathways Calculator", label: "2050 Pathways Calculator" },
    { value: "Energy Policy Simulator, India", label: "Energy Policy Simulator, India" },
    { value: "Energy Policy Simulator, Mexico", label: "Energy Policy Simulator, Mexico" },
    { value: "Energy Policy Simulator, United States", label: "Energy Policy Simulator, United States" },
  ];

  const scenarioData = {
    "Global Change Assessment Model": {
      co2e: "320",
      yoyChange: "+2.1",
      chartUrl:
        "https://public.tableau.com/shared/S93NYNX25?:display_count=n&:origin=viz_share_link",
    },
    "2050 Pathways Calculator": {
      co2e: "280",
      yoyChange: "-5.3",
      chartUrl:
        "https://public.tableau.com/views/AgricultureAnalysisScenarioModeling2050/AgriScenarioModelling2050?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    },
    "Energy Policy Simulator, India": {
      co2e: "250",
      yoyChange: "-8.7",
      chartUrl:
        "https://public.tableau.com/views/AgricultureAnalysisScenarioModelingEPS_IND/AgriScenarioModellingEPS_IND?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    },
    "Energy Policy Simulator, Mexico": {
      co2e: "300",
      yoyChange: "-1.2",
      chartUrl: "https://public.tableau.com/views/AgricultureAnalysisScenarioModelingEPS_MEX/AgriScenarioModellingEPS_MEX?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    },
    "Energy Policy Simulator, United States": {
      co2e: "300",
      yoyChange: "-1.2",
      chartUrl: "https://public.tableau.com/views/AgricultureAnalysisScenarioModelingEPS_US/AgriScenarioModellingEPS_US?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    }
  };

  const currentScenario = scenarioData[selectedModel] || scenarioData["Global Change Assessment Model"];

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
    <section id="agriculture" className="min-h-screen p-6 snap-start flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-300">
        Agriculture Industry
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
          title="Agriculture CO2e"
          value={`${currentScenario.co2e} tons`}
          icon="wheat"
          color="bg-green-700"
        />
        <StatCard
          title="YoY Change"
          value={`${currentScenario.yoyChange}%`}
          icon={
            currentScenario.yoyChange.startsWith("-")
              ? "trending-down"
              : "trending-up"
          }
          color={
            currentScenario.yoyChange.startsWith("-")
              ? "bg-green-600"
              : "bg-red-600"
          }
        />
      </div>
      <div className="grow h-[600px] w-full">
        <ChartCard
          title={`Agriculture Emissions by Source (${
            models.find((m) => m.value === selectedModel).label
          })`}
          chartUrl={currentScenario.chartUrl}
          className="w-full h-full"
          vizOptions={customVizOptions}
        />
      </div>
    </section>
  );
};

export default AgricultureSection;
