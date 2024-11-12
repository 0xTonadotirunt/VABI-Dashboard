import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import ChartCard from "@/components/ChartCard";

const OverallEmissionsCharts = () => {
  const [currentDashboard, setCurrentDashboard] = useState(
    "https://public.tableau.com/views/EmissionsDataOverview-Global/GlobalDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
  );
  const [statValues, setStatValues] = useState({
    totalCO2e: "51.5 billion tons",
    reduction: "15.3%",
    netZeroProgress: "42%",
    carbonOffset: "320 tons",
  });

  const [activeTab, setActiveTab] = useState("Global");

  useEffect(() => {
    setInfo();
  }, [activeTab]);

  const setInfo = () => {
    switch (activeTab) {
      case "Global":
        setCurrentDashboard(
          "https://public.tableau.com/views/EmissionsDataOverview-Global/GlobalDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
        );

        setStatValues({
          totalCO2e: "51.5 billion tons",
          reduction: "15.3%",
          netZeroProgress: "42%",
          carbonOffset: "320 tons",
        });
        break;

      case "Singapore":
        setCurrentDashboard(
          "https://public.tableau.com/views/EmissionsDataOverview-Global/SGDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
        );

        setStatValues({
          totalCO2e: "61.9 million tons",
          reduction: "20.1%",
          netZeroProgress: "50%",
          carbonOffset: "150 tons",
        });

        break;

      case "ASEAN":
        setCurrentDashboard(
          "https://public.tableau.com/views/EmissionsDataOverview-Global/ASEANDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
        );

        setStatValues({
          totalCO2e: "4.2 billion tons",
          reduction: "12.5%",
          netZeroProgress: "38%",
          carbonOffset: "200 tons",
        });

        break;

      default:
        return null;
    }
  };

  const tooltipTextMap = {
    "Total CO2e":
      "Measures our total greenhouse gas emissions in CO2 equivalent tons. This includes direct emissions (Scope 1), energy consumption (Scope 2), and indirect emissions (Scope 3).",
    "Emissions Reduction":
      "Shows percentage decrease in emissions compared to our baseline year. The trending-down indicator means we're on track with our reduction targets.",
    "Net-Zero Progress":
      "Tracks our progress toward net-zero emissions, combining both reduction efforts and offset programs. The target indicator shows we're aligned with our 2050 net-zero commitment.",
    "Carbon Offset":
      "Represents the amount of CO2e we've offset through verified carbon removal projects, including reforestation, soil carbon sequestration, and other nature-based solutions.",
  };

  return (
    <section id="overall" className="min-h-screen snap-start p-6 flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-300">
        Overall Emissions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title={`Total ${activeTab} GHG CO2e in tons (as of 2020)`}
          value={statValues.totalCO2e}
          icon="cloud"
          color="bg-red-500"
          tooltipText={tooltipTextMap["Total CO2e"]}
        />
        <StatCard
          title={`${activeTab} Emissions Reduction`}
          value={statValues.reduction}
          icon="trending-down"
          color="bg-green-500"
          tooltipText={tooltipTextMap["Emissions Reduction"]}
        />
        <StatCard
          title={`${activeTab} Net-Zero Progress`}
          value={statValues.netZeroProgress}
          icon="target"
          color="bg-blue-500"
          tooltipText={tooltipTextMap["Net-Zero Progress"]}
        />
        <StatCard
          title={`${activeTab} Carbon Offset`}
          value={statValues.carbonOffset}
          icon="leaf"
          color="bg-emerald-500"
          tooltipText={tooltipTextMap["Carbon Offset"]}
        />
      </div>
      <div className="grow h-[800px] w-full mb-6 relative">
        <div className="flex-grow">
          <div className="flex space-x-4 mb-6 border-b border-slate-700">
            {["Global", "Singapore", "ASEAN"].map((tab) => (
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

          <div></div>
        </div>
        <ChartCard
          title="Emissions Information"
          chartUrl={currentDashboard}
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default OverallEmissionsCharts;