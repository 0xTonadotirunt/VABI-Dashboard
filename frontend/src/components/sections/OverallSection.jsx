
import React, {useState, useEffect} from "react";
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


  const [activeTab, setActiveTab] = useState("Global");

    useEffect(() => {
      setInfo();
    }, [activeTab]);

    
  const setInfo = () => {
    switch (activeTab) {
      case "Global":     
      
        setCurrentDashboard("https://public.tableau.com/views/EmissionsDataOverview-Global/GlobalDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link");

        setStatValues({
          totalCO2e: "51.5 billion tons",
          reduction: "15.3%",
          netZeroProgress: "42%",
          carbonOffset: "320 tons",
        })
        break;

      case "Singapore":
        setCurrentDashboard("https://public.tableau.com/views/EmissionsDataOverview-Global/SGDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link");

        setStatValues({
          totalCO2e: "61.9 million tons",
          reduction: "20.1%",
          netZeroProgress: "50%",
          carbonOffset: "150 tons",
        })

        break;

      case "ASEAN":

      setCurrentDashboard("https://public.tableau.com/views/EmissionsDataOverview-Global/ASEANDashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link");

      setStatValues(
        {
          totalCO2e: "4.2 billion tons",
          reduction: "12.5%",
          netZeroProgress: "38%",
          carbonOffset: "200 tons",
        })

        break;

      default:
        return null;
    }
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
  
  export default OverallSection;
