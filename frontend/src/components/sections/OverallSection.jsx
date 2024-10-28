import React from "react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";

const OverallSection = () => {
  return (
    <section id="overall" className="min-h-screen p-6 snap-start flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-300">
        Overall Emissions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total CO2e"
          value="1,234 tons"
          icon="cloud"
          color="bg-red-500"
        />
        <StatCard
          title="Reduction"
          value="15.3%"
          icon="trending-down"
          color="bg-green-500"
        />
        <StatCard
          title="Net-Zero Progress"
          value="42%"
          icon="target"
          color="bg-blue-500"
        />
        <StatCard
          title="Carbon Offset"
          value="320 tons"
          icon="leaf"
          color="bg-emerald-500"
        />
      </div>
      <ChartCard
        title="Overall Emissions Trend"
        chartUrl="https://public.tableau.com/views/OverallEmissions/Trend"
        className="h-96"
      />
    </section>
  );
};

export default OverallSection;
