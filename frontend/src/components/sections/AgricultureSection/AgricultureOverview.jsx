import StatCard from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Factory, TrendingUp, TrendingDown } from "lucide-react";
import { models } from "@/data/agriculture/models";

const AgricultureOverview = ({ currentScenario, selectedModel }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
  );
};

export default AgricultureOverview;
