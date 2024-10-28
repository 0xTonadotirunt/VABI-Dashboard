import React from "react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import TableauEmbed from "../TableauEmbed";

const TransportSection = () => {
  return (
    <section
      id="transport"
      className="min-h-screen p-6 snap-start flex flex-col"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-300">
        Transport Industry
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard title="Transport CO2e" value="450 tons" icon="truck" color="bg-yellow-600" />
        <StatCard title="YoY Change" value="-5.2%" icon="trending-down" color="bg-green-600" />
      </div>
      <div className="h-[600px] overflow-y-auto border border-gray-300 rounded-lg">
        <TableauEmbed tableauUrl="https://public.tableau.com/views/SG_Transport_Analysis/Dashboard?:language=en-GB&publish=yes&:display_count=n&:origin=viz_share_link" />
      </div>

      {/* <ChartCard
        title="Transport Emissions by Vehicle Type"
        chartUrl="https://public.tableau.com/views/TransportEmissions/VehicleType"
        className="h-96"
      /> */}
    </section>
  );
};

export default TransportSection;
