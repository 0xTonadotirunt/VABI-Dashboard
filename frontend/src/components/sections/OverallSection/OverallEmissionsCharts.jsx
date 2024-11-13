import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import ChartCard from "@/components/ChartCard";
import { GaugeComponent } from 'react-gauge-component';
import { Tooltip } from "@/components/ui/tooltip";
import { Cloud, TrendingDown, Target, Leaf, Info } from "lucide-react";
import CustomGauge from "./CustomGauge";



const OverallEmissionsCharts = () => {
  const [currentDashboard, setCurrentDashboard] = useState(
    "https://public.tableau.com/views/EmissionsDataOverview-Global/GlobalDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
  );
  const [statValues, setStatValues] = useState({
    totalCO2e: "51.5 billion tons",
    reduction: "-15.3%",
    netZeroProgress: "42%",
    carbonOffset: "320 tons",
    totalReductions: -24.6
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
          reduction: "+15.3%",
          netZeroProgress: "42%",
          carbonOffset: "320 tons",
          totalReductions: -35.2
        });
        break;

      case "Singapore":
        setCurrentDashboard(
          "https://public.tableau.com/views/EmissionsDataOverview-Global/SGDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
        );

        setStatValues({
          totalCO2e: "61.9 million tons",
          reduction: "+20.1%",
          netZeroProgress: "50%",
          carbonOffset: "150 tons",
          totalReductions: -24.6
        });

        break;

      case "ASEAN":
        setCurrentDashboard(
          "https://public.tableau.com/views/EmissionsDataOverview-Global/ASEANDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
        );

        setStatValues({
          totalCO2e: "4.2 billion tons",
          reduction: "+12.5%",
          netZeroProgress: "38%",
          carbonOffset: "200 tons",
          totalReductions: -20
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
    <section id="overall" className="min-h-screen snap-start flex flex-col mt-3">
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
          
          
          <div className="flex justify-center space-x-4 mb-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-2 whitespace-nowrap">
            <Tooltip text="Shows GHG Emissions Reduction Progress from 2019">
                <Info size={16} className="mr-3" />
              </Tooltip>
              <h3 className="text-xl font-semibold">GHG Emissions Reduction Progress from 2019</h3>
            </div>
            <CustomGauge pointerValue={statValues.totalReductions} />
          </div>
          </div>


      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title={`Total ${activeTab} GHG CO2e in tons (as of 2020)`}
          value={statValues.totalCO2e}
          icon="cloud"
          color="bg-blue-500"
          tooltipText={tooltipTextMap["Total CO2e"]}
        />
        <StatCard
          title={`${activeTab} YoY Emissions Change`}
          value={statValues.reduction}
          icon="trending-down"
          color="bg-red-500"
          tooltipText={tooltipTextMap["Emissions Reduction"]}
        />
        <StatCard
          title={`${activeTab} 2030 targets`}
          value="-43 %"
          icon="target"
          color="bg-blue-500"
          tooltipText={tooltipTextMap["Net-Zero Progress"]}
        />
      </div>
      <div className="grow h-[800px] w-full mb-6 relative">
        <div className="flex-grow">


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
