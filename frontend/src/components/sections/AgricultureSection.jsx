import React from "react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";

const AgricultureSection = () => {
  return (
    <section id="agriculture" className="min-h-screen p-6 snap-start">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-300">
        Agriculture Industry
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="Agriculture CO2e"
          value="320 tons"
          icon="wheat"
          color="bg-green-700"
        />
        <StatCard
          title="YoY Change"
          value="+2.1%"
          icon="trending-up"
          color="bg-red-600"
        />
      </div>
      <ChartCard
        title="Agriculture Emissions by Source"
        chartUrl="https://public.tableau.com/views/AgricultureEmissions/Source"
        className="h-96"
      />
    </section>
  );
};

export default AgricultureSection;
