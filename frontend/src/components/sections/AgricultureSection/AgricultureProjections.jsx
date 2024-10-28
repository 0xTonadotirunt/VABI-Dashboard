import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import {
  getEmissionsProjections,
  getScenarioComparison,
} from "@/utils/agriculture/chartHelpers";

const AgricultureProjections = ({ selectedModel }) => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-800">
        <h3 className="text-xl font-semibold mb-4">
          Emissions Projections (2020-2050)
        </h3>
        <div className="h-80">
          <LineChart data={getEmissionsProjections(selectedModel)} />
        </div>
      </div>

      <div className="p-6 bg-slate-800">
        <h3 className="text-xl font-semibold mb-4">Scenario Comparison</h3>
        <div className="h-80">
          <BarChart data={getScenarioComparison(selectedModel)} />
        </div>
      </div>
    </div>
  );
};

export default AgricultureProjections;
