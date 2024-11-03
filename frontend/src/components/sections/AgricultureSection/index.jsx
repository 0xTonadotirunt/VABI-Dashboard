import { useState } from "react";
import { BarChart2 } from "lucide-react";
import { models } from "@/data/agriculture/models";
import { scenarioData } from "@/data/agriculture/scenarioData";
import AgricultureOverview from "./AgricultureOverview";
import AgricultureMetrics from "./AgricultureMetrics";
import AgricultureImpacts from "./AgricultureImpacts";
import AgricultureProjections from "./AgricultureProjections";
import Modal from "@/components/ui/modal";
import ChartCard from "@/components/ChartCard";

const AgricultureSection = () => {
  const [selectedModel, setSelectedModel] = useState(
    "Global Change Assessment Model"
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentScenario =
    scenarioData[selectedModel] ||
    scenarioData["Global Change Assessment Model"];

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <AgricultureOverview
            currentScenario={currentScenario}
            selectedModel={selectedModel}
          />
        );
      case "metrics":
        return <AgricultureMetrics selectedModel={selectedModel} />;
      case "impacts":
        return <AgricultureImpacts selectedModel={selectedModel} />;
      case "projections":
        return <AgricultureProjections selectedModel={selectedModel} />;
      default:
        return null;
    }
  };

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

  return (
    <section
      id="agriculture"
      className="min-h-screen snap-start p-6 flex flex-col"
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
        <select
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-2"
        >
          {models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-grow">
        <div className="flex space-x-4 mb-6 border-b border-slate-700">
          {["overview", "metrics", "impacts", "projections"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? "text-indigo-300 border-b-2 border-indigo-300"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mx-auto mb-8"
      >
        <BarChart2 className="h-5 w-5" />
        View Detailed Dashboard
      </button>

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
            vizOptions={customVizOptions}
          />
        </div>
      </Modal>
    </section>
  );
};

export default AgricultureSection;
