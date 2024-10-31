import React, {useState} from "react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";


  const OverallSection = () => {
    const [currentDashboard, setCurrentDashboard] = useState(
      "https://public.tableau.com/views/EmissionsDataOverview-Global/GlobalDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
    );
    const [statValues, setStatValues] = useState({
      totalCO2e: "51.5 billion tons",
      reduction: "15.3%",
      netZeroProgress: "42%",
      carbonOffset: "320 tons",
    });
  
    const handleButtonClick = (dashboardUrl, values) => {
      setCurrentDashboard(dashboardUrl);
      setStatValues(values);
    };
  
    return (
      <section id="overall" className="min-h-screen p-6 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-300">
          Overall Emissions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total CO2e in tons (as of 2020)"
            value={statValues.totalCO2e}
            icon="cloud"
            color="bg-red-500"
          />
          <StatCard
            title="Reduction"
            value={statValues.reduction}
            icon="trending-down"
            color="bg-green-500"
          />
          <StatCard
            title="Net-Zero Progress"
            value={statValues.netZeroProgress}
            icon="target"
            color="bg-blue-500"
          />
          <StatCard
            title="Carbon Offset"
            value={statValues.carbonOffset}
            icon="leaf"
            color="bg-emerald-500"
          />
        </div>
        <div className="grow h-[800px] w-full mb-6 relative">
          <ChartCard
            title="Overall Emissions Trend"
            chartUrl={currentDashboard}
            className="w-full h-full"
          />
          <div className="absolute top-0 right-0 flex gap-4 p-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() =>
                handleButtonClick(
                  "https://public.tableau.com/views/EmissionsDataOverview-Global/GlobalDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
                  {
                    totalCO2e: "51.5 billion tons",
                    reduction: "15.3%",
                    netZeroProgress: "42%",
                    carbonOffset: "320 tons",
                  }
                )
              }
            >
              Global Overview
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() =>
                handleButtonClick(
                  "https://public.tableau.com/views/EmissionsDataOverview-Global/SGDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
                  {
                    totalCO2e: "61.9 million tons",
                    reduction: "20.1%",
                    netZeroProgress: "50%",
                    carbonOffset: "150 tons",
                  }
                )
              }
            >
              Singapore Overview
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() =>
                handleButtonClick(
                  "https://public.tableau.com/views/EmissionsDataOverview-Global/ASEANDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
                  {
                    totalCO2e: "4.2 billion tons",
                    reduction: "12.5%",
                    netZeroProgress: "38%",
                    carbonOffset: "200 tons",
                  }
                )
              }
            >
              ASEAN Overview
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default OverallSection;
  
