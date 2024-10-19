import React from "react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";

const ManufacturingSection = () => {
  return (
    <section
      id="manufacturing"
      className="min-h-screen p-6 bg-slate-800 snap-start"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-300">
        Manufacturing Industry
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="Manufacturing CO2e"
          value="464 tons"
          icon="factory"
          color="bg-blue-600"
        />
        <StatCard
          title="YoY Change"
          value="-1.8%"
          icon="trending-down"
          color="bg-green-600"
        />
      </div>
      <ChartCard
        title="Manufacturing Emissions by Process"
        chartUrl="https://public.tableau.com/views/ManufacturingEmissions/Process"
        className="h-96"
      />
    </section>
  );
};

export default ManufacturingSection;
