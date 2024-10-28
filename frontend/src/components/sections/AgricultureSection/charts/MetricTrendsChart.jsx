import { LineChart } from "@/components/charts/LineChart";
import { getMetricTrends } from "@/utils/agriculture/chartHelpers";

const MetricTrendsChart = ({ selectedModel }) => {
  const data = getMetricTrends(selectedModel);

  if (!data || !data.data || data.data.length === 0) {
    return <div>No trend data available</div>;
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-200">
          GCAM Agricultural Metrics Trends (2010-2050)
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Historical data and projections of key agricultural indicators
        </p>
      </div>

      <div className="h-[400px] w-full">
        <LineChart data={data.data} lines={data.lines} xAxisKey="year" />
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-slate-300 mb-2">Data Sources:</h4>
        <ul className="list-disc list-inside text-sm text-slate-400">
          {data.metadata.sources.map((source, index) => (
            <li key={index}>
              {source.name} - {source.metrics.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-slate-300 mb-2">Notes:</h4>
        <ul className="list-disc list-inside text-sm text-slate-400">
          {data.metadata.notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-slate-300 mb-2">Key Assumptions:</h4>
        <ul className="list-disc list-inside text-sm text-slate-400">
          {data.metadata.assumptions.map((assumption, index) => (
            <li key={index}>{assumption}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MetricTrendsChart;
