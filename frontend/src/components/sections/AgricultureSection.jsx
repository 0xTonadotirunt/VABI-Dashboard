import React, { useState } from "react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { BarChart2 } from "lucide-react";

const AgricultureSection = () => {
  const [selectedModel, setSelectedModel] = useState(
    "Global Change Assessment Model"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const models = [
    {
      value: "Global Change Assessment Model",
      label: "Global Change Assessment Model",
      description:
        "The Global Change Assessment Model (GCAM) is an integrated tool that examines the interconnected impacts of energy, economy, land use, water, and climate. Developed by PNNL, GCAM simulates how policy changes—like carbon pricing or renewable energy targets—affect greenhouse gas emissions, resource use, and climate outcomes. Covering 32 regions, it allows for detailed regional and global analyses, helping policymakers and researchers evaluate long-term environmental and economic impacts of climate and energy policies.",
    },
    {
      value: "2050 Pathways Calculator",
      label: "2050 Pathways Calculator",
      description:
        "The 2050 Pathways Calculator is an interactive tool that models different scenarios to achieve net-zero emissions by 2050. Users adjust variables in sectors like energy, transport, and agriculture to see how choices affect emissions, energy needs, and feasibility. It provides insights into the trade-offs of various low-carbon technologies and policies, helping policymakers, businesses, and the public visualize the impacts of each pathway. Developed by the UK government, it supports informed decision-making by showing the outcomes of different strategies for sustainable energy and climate goals.",
    },
    {
      value: "Energy Policy Simulator, India",
      label: "Energy Policy Simulator, India",
      description:
        "The Energy Policy Simulator (EPS), India is a tool that models the effects of various energy and climate policies on emissions, health, and the economy. Developed by the India Program at Energy Innovation, EPS India allows users to explore policy impacts in areas like renewable energy, transportation, industry, and agriculture. The simulator provides insights into how different policies can reduce greenhouse gas emissions, improve air quality, create jobs, and support economic growth, helping policymakers identify effective strategies to meet India’s climate goals.",
    },
    {
      value: "Energy Policy Simulator, Mexico",
      label: "Energy Policy Simulator, Mexico",
      description:
        "The Energy Policy Simulator (EPS), Mexico is a modeling tool that assesses the impacts of energy and climate policies on emissions, public health, and the economy in Mexico. Developed by Energy Innovation, it allows users to explore policies in sectors like energy, transportation, and industry to see how they affect greenhouse gas reductions, economic growth, and air quality. EPS Mexico provides insights into how specific policies can support Mexico’s climate goals, offering a data-driven way to evaluate the effectiveness of different strategies for sustainable development.",
    },
    {
      value: "Energy Policy Simulator, United States",
      label: "Energy Policy Simulator, United States",
      description:
        "The Energy Policy Simulator (EPS), United States is a tool that models the impact of various energy and climate policies on emissions, health, and the economy across U.S. sectors like energy, transportation, and industry. Developed by Energy Innovation, EPS allows users to explore scenarios—like renewable energy adoption or energy efficiency standards—and see their effects on greenhouse gas emissions, air quality, and job creation. This simulator helps policymakers and analysts assess strategies to reach U.S. climate goals, offering a data-driven approach to identify effective and economically beneficial pathways to sustainability.",
    },
  ];

  const scenarioData = {
    "Global Change Assessment Model": {
      co2e: "320",
      yoyChange: "+2.1",
      landUseChange: "-15%",
      cropYield: "+8%",
      waterUsage: "-12%",
      fertiliserUse: "-20%",
      chartUrl:
        "https://public.tableau.com/shared/S93NYNX25?:display_count=n&:origin=viz_share_link",
      description:
        "Integrated assessment model that considers global environmental changes, agricultural productivity, and land-use dynamics.",
      keyFeatures: [
        "Global land-use change analysis",
        "Climate impact assessment",
        "Agricultural productivity modeling",
        "Water resource management",
      ],
    },
    "2050 Pathways Calculator": {
      co2e: "280",
      yoyChange: "-5.3",
      cropDiversity: "+25%",
      organicFarming: "+30%",
      renewableEnergy: "+40%",
      soilHealth: "+15%",
      chartUrl:
        "https://public.tableau.com/views/AgricultureAnalysisScenarioModeling2050/AgriScenarioModelling2050?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
      description:
        "Long-term pathway analysis tool focusing on sustainable agricultural practices and their impact on emissions by 2050.",
      keyFeatures: [
        "Sustainable farming practices",
        "Renewable energy integration",
        "Soil conservation methods",
        "Biodiversity preservation",
      ],
    },
    "Energy Policy Simulator, India": {
      co2e: "250",
      yoyChange: "-8.7",
      solarIrrigation: "+45%",
      smartFarming: "+35%",
      biomassPower: "+25%",
      waterEfficiency: "+30%",
      chartUrl:
        "https://public.tableau.com/views/AgricultureAnalysisScenarioModelingEPS_IND/AgriScenarioModellingEPS_IND?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
      description:
        "India-specific model focusing on energy-efficient agricultural practices and technological adoption in farming.",
      keyFeatures: [
        "Solar-powered irrigation",
        "Smart farming technologies",
        "Biomass utilization",
        "Water conservation",
      ],
    },
    "Energy Policy Simulator, Mexico": {
      co2e: "300",
      yoyChange: "-1.2",
      agroforestry: "+20%",
      droughtResistance: "+25%",
      biodiversity: "+15%",
      indigenousPractices: "+30%",
      chartUrl:
        "https://public.tableau.com/views/AgricultureAnalysisScenarioModelingEPS_MEX/AgriScenarioModellingEPS_MEX?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
      description:
        "Mexico-focused model incorporating traditional farming methods with modern sustainability practices.",
      keyFeatures: [
        "Agroforestry integration",
        "Drought-resistant farming",
        "Indigenous farming practices",
        "Biodiversity conservation",
      ],
    },
    "Energy Policy Simulator, United States": {
      co2e: "300",
      yoyChange: "-1.2",
      precisionAg: "+40%",
      carbonSequestration: "+35%",
      renewableAdoption: "+45%",
      wasteReduction: "+25%",
      chartUrl:
        "https://public.tableau.com/views/AgricultureAnalysisScenarioModelingEPS_US/AgriScenarioModellingEPS_US?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
      description:
        "US-centric model emphasizing precision agriculture and advanced farming technologies.",
      keyFeatures: [
        "Precision agriculture",
        "Carbon sequestration",
        "Renewable energy adoption",
        "Agricultural waste management",
      ],
    },
  };

  const currentScenario =
    scenarioData[selectedModel] ||
    scenarioData["Global Change Assessment Model"];

  const customVizOptions = {
    hideTabs: true,
    hideToolbar: true,
    width: "100%",
    height: "100%",
    device: "desktop",
    onFirstInteractive: function () {
      console.log("Viz is interactive");
    },
  };

  const getTooltipContent = () => {
    const selectedModelData = models.find((m) => m.value === selectedModel);
    return (
      <div>
        <p className="font-semibold mb-1">{selectedModelData.label}</p>
        <p>{selectedModelData.description}</p>
      </div>
    );
  };

  return (
    <section
      id="agriculture"
      className="min-h-screen p-6 snap-start flex flex-col"
    >
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
          tooltip={getTooltipContent()}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

        {/* Dynamic stats based on selected model */}
        {Object.entries(currentScenario)
          .filter(
            ([key]) =>
              ![
                "co2e",
                "yoyChange",
                "chartUrl",
                "description",
                "keyFeatures",
              ].includes(key)
          )
          .map(([key, value]) => (
            <StatCard
              key={key}
              title={key.replace(/([A-Z])/g, " $1").trim()} // Convert camelCase to spaces
              value={value}
              icon="chart"
              color="bg-blue-600"
            />
          ))}
      </div>

      <div className="mb-8 bg-slate-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Model Description</h3>
        <p className="text-gray-300 mb-4">{currentScenario.description}</p>
        <h4 className="text-lg font-semibold mb-2">Key Features</h4>
        <ul className="list-disc list-inside text-gray-300">
          {currentScenario.keyFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* View Dashboard Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mx-auto mb-8"
      >
        <BarChart2 className="h-5 w-5" />
        View Detailed Dashboard
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Agriculture Emissions Analysis - ${
          models.find((m) => m.value === selectedModel).label
        }`}
      >
        <div className="h-[80vh]">
          <ChartCard
            chartUrl={currentScenario.chartUrl}
            className="w-full h-full"
            vizOptions={{
              ...customVizOptions,
              height: "100%",
            }}
          />
        </div>
      </Modal>
    </section>
  );
};

export default AgricultureSection;
