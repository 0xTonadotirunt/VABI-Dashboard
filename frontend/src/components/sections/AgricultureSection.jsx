import React, { useState } from "react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import { Select } from "@/components/ui/select";

const AgricultureSection = () => {
  const [selectedModel, setSelectedModel] = useState("baseline");

  const models = [
    { value: "baseline", label: "Baseline" },
    { value: "sustainable", label: "Sustainable Practices" },
    { value: "tech-driven", label: "Technology-Driven" },
    { value: "organic", label: "Organic Farming" },
  ];

  const scenarioData = {
    baseline: {
      co2e: "320",
      yoyChange: "+2.1",
      chartUrl:
        "https://public.tableau.com/views/AgricultureEmissions/Baseline",
    },
    sustainable: {
      co2e: "280",
      yoyChange: "-5.3",
      chartUrl:
        "https://public.tableau.com/views/AgricultureEmissions/Sustainable",
    },
    "tech-driven": {
      co2e: "250",
      yoyChange: "-8.7",
      chartUrl:
        "https://public.tableau.com/views/AgricultureEmissions/TechDriven",
    },
    organic: {
      co2e: "300",
      yoyChange: "-1.2",
      chartUrl: "https://public.tableau.com/views/AgricultureEmissions/Organic",
    },
  };

  const currentScenario = scenarioData[selectedModel];

  return (
    <section id="agriculture" className="min-h-screen p-6 snap-start">
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
      <ChartCard
        title={`Agriculture Emissions by Source (${
          models.find((m) => m.value === selectedModel).label
        })`}
        chartUrl={currentScenario.chartUrl}
        className="h-96"
      />
    </section>
  );
};

export default AgricultureSection;
