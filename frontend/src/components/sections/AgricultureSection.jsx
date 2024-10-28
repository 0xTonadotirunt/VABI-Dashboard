import React, { useState } from "react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { BarChart2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart } from "@/components/charts";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Droplets,
  Leaf,
  Sun,
  Wind,
  Factory,
  Sprout,
} from "lucide-react";

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

  const getModelSpecificMetrics = (model) => {
    // Implement this function to return model-specific metrics
    return {};
  };

  const formatMetricName = (key) => {
    // Implement this function to format metric names
    return key;
  };

  const getMetricIcon = (key) => {
    // Implement this function to return the appropriate icon for a metric
    return <Factory className="h-5 w-5" />;
  };

  const getMetricColor = (key) => {
    // Implement this function to return the appropriate color for a metric
    return "bg-green-700";
  };

  const getMetricTrends = (model) => {
    if (model !== "Global Change Assessment Model") {
      return [];
    }

    // Historical data (2010-2020) and projections (2020-2050) based on GCAM documentation
    // and FAO/IPCC reports
    return {
      data: [
        {
          year: 2010,
          "Agricultural Emissions (Gt CO2e)": 6.2,
          "Land Use Change (Gt CO2e)": 2.9,
          "Crop Yield Index": 100,
          "Water Stress Index": 100,
        },
        {
          year: 2015,
          "Agricultural Emissions (Gt CO2e)": 6.8,
          "Land Use Change (Gt CO2e)": 2.7,
          "Crop Yield Index": 106,
          "Water Stress Index": 104,
        },
        {
          year: 2020,
          "Agricultural Emissions (Gt CO2e)": 7.1,
          "Land Use Change (Gt CO2e)": 2.6,
          "Crop Yield Index": 112,
          "Water Stress Index": 108,
        },
        // Projections start here (Reference Scenario)
        {
          year: 2025,
          "Agricultural Emissions (Gt CO2e)": 7.4,
          "Land Use Change (Gt CO2e)": 2.4,
          "Crop Yield Index": 118,
          "Water Stress Index": 113,
        },
        {
          year: 2030,
          "Agricultural Emissions (Gt CO2e)": 7.8,
          "Land Use Change (Gt CO2e)": 2.2,
          "Crop Yield Index": 125,
          "Water Stress Index": 119,
        },
        {
          year: 2035,
          "Agricultural Emissions (Gt CO2e)": 8.1,
          "Land Use Change (Gt CO2e)": 2.0,
          "Crop Yield Index": 132,
          "Water Stress Index": 126,
        },
        {
          year: 2040,
          "Agricultural Emissions (Gt CO2e)": 8.3,
          "Land Use Change (Gt CO2e)": 1.8,
          "Crop Yield Index": 140,
          "Water Stress Index": 134,
        },
        {
          year: 2045,
          "Agricultural Emissions (Gt CO2e)": 8.5,
          "Land Use Change (Gt CO2e)": 1.6,
          "Crop Yield Index": 148,
          "Water Stress Index": 143,
        },
        {
          year: 2050,
          "Agricultural Emissions (Gt CO2e)": 8.7,
          "Land Use Change (Gt CO2e)": 1.4,
          "Crop Yield Index": 157,
          "Water Stress Index": 152,
        },
      ],
      lines: [
        "Agricultural Emissions (Gt CO2e)",
        "Land Use Change (Gt CO2e)",
        "Crop Yield Index",
        "Water Stress Index",
      ],
      metadata: {
        sources: [
          {
            name: "GCAM Documentation",
            url: "https://jgcri.github.io/gcam-doc/aglu.html",
            metrics: ["Agricultural Emissions", "Land Use Change"],
          },
          {
            name: "FAO Agricultural Outlook 2020-2029",
            url: "https://www.fao.org/documents/card/en/c/ca8861en/",
            metrics: ["Crop Yield Index"],
          },
          {
            name: "IPCC AR6 WGIII Chapter 7",
            url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-7/",
            metrics: ["Water Stress Index"],
          },
        ],
        notes: [
          "Agricultural Emissions include both direct emissions from agricultural activities and indirect emissions from input production",
          "Land Use Change emissions are primarily from deforestation and land conversion",
          "Crop Yield Index is normalized to 2010 levels (2010 = 100)",
          "Water Stress Index measures agricultural water demand relative to 2010 levels (2010 = 100)",
        ],
        assumptions: [
          "Reference scenario assumes current policies and technological trends",
          "No additional climate policies beyond those existing in 2020",
          "Continued population growth following UN medium projection",
          "GDP growth following SSP2 (middle of the road) scenario",
        ],
      },
    };
  };

  const getResourceDistribution = (model) => {
    // Implement this function to return the resource distribution data for a model
    return [];
  };

  const getEnvironmentalImpacts = (model) => {
    // Implement this function to return the environmental impacts for a model
    return [];
  };

  const getEmissionsProjections = (model) => {
    // Implement this function to return the emissions projections for a model
    return [];
  };

  const getScenarioComparison = (model) => {
    // Implement this function to return the scenario comparison data for a model
    return [];
  };

  const MetricTrendsChart = () => {
    const data = getMetricTrends(selectedModel);

    if (!data || !data.data || data.data.length === 0) {
      return <div>No trend data available</div>;
    }

    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-slate-200">
            GCAM Agricultural Metrics Trends (2010-2050)
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Historical data and projections of key agricultural indicators
          </p>
        </div>

        <div className="h-[400px] w-full">
          <LineChart data={data.data} lines={data.lines} xAxisKey="year" />
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-slate-300 mb-2">Data Sources:</h4>
          <ul className="list-disc list-inside text-sm text-slate-400">
            {data.metadata.sources.map((source, index) => (
              <li key={index}>
                {source.name} - {source.metrics.join(", ")}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold text-slate-300 mb-2">Notes:</h4>
          <ul className="list-disc list-inside text-sm text-slate-400">
            {data.metadata.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold text-slate-300 mb-2">
            Key Assumptions:
          </h4>
          <ul className="list-disc list-inside text-sm text-slate-400">
            {data.metadata.assumptions.map((assumption, index) => (
              <li key={index}>{assumption}</li>
            ))}
          </ul>
        </div>
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

      <Tabs defaultValue="overview" className="flex-grow">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="impacts">Environmental Impacts</TabsTrigger>
          <TabsTrigger value="projections">Future Projections</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main metrics cards */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="Agriculture CO2e"
                value={`${currentScenario.co2e} tons`}
                icon={<Factory className="h-5 w-5" />}
                color="bg-green-700"
              />
              <StatCard
                title="YoY Change"
                value={currentScenario.yoyChange}
                icon={
                  currentScenario.yoyChange.startsWith("-") ? (
                    <TrendingDown className="h-5 w-5" />
                  ) : (
                    <TrendingUp className="h-5 w-5" />
                  )
                }
                color={
                  currentScenario.yoyChange.startsWith("-")
                    ? "bg-green-600"
                    : "bg-red-600"
                }
              />
            </div>

            {/* Model description and features */}
            <div className="p-6 bg-slate-800">
              <h3 className="text-xl font-semibold mb-4">About this Model</h3>
              <p className="text-gray-300 mb-4">
                {models.find((m) => m.value === selectedModel).description}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentScenario.keyFeatures.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="space-y-6">
            <MetricTrendsChart />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Model-specific metrics */}
              {Object.entries(getModelSpecificMetrics(selectedModel)).map(
                ([key, value]) => (
                  <StatCard
                    key={key}
                    title={formatMetricName(key)}
                    value={value}
                    icon={getMetricIcon(key)}
                    color={getMetricColor(key)}
                  />
                )
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="impacts">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Environmental impact visualization */}
            <div className="p-6 bg-slate-800">
              <h3 className="text-xl font-semibold mb-4">
                Resource Usage Distribution
              </h3>
              <div className="h-80">
                <PieChart data={getResourceDistribution(selectedModel)} />
              </div>
            </div>

            {/* Impact metrics */}
            <div className="p-6 bg-slate-800">
              <h3 className="text-xl font-semibold mb-4">
                Environmental Impact Metrics
              </h3>
              <div className="space-y-4">
                {getEnvironmentalImpacts(selectedModel).map((impact, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-300">{impact.label}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-${
                          impact.trend === "positive" ? "green" : "red"
                        }-400`}
                      >
                        {impact.value}
                      </span>
                      {impact.trend === "positive" ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="projections">
          <div className="space-y-6">
            {/* Emissions projection chart */}
            <div className="p-6 bg-slate-800">
              <h3 className="text-xl font-semibold mb-4">
                Emissions Projections (2020-2050)
              </h3>
              <div className="h-80">
                <LineChart data={getEmissionsProjections(selectedModel)} />
              </div>
            </div>

            {/* Scenario comparison */}
            <div className="p-6 bg-slate-800">
              <h3 className="text-xl font-semibold mb-4">
                Scenario Comparison
              </h3>
              <div className="h-80">
                <BarChart data={getScenarioComparison(selectedModel)} />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

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
