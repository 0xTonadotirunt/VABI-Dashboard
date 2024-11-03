import { useMemo, useState, useEffect } from "react";
import { LineChart } from "@/components/charts/LineChart";
import { InfoIcon } from "lucide-react";
import CustomRadarChart from "../../charts/RadarChart";
import LandCoverParallel from "./charts/LandCoverParallel";
import { useGCAMPathways } from "@/hooks/useGCAMPathways";

const AgricultureProjections = ({
  selectedModel,
  setSelectedModel,
  models,
}) => {
  const { pathwaysData, isLoading, error } = useGCAMPathways();
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Global");
  const [selectedIndicator, setSelectedIndicator] = useState("");
  const [selectedPolicies, setSelectedPolicies] = useState([]);

  // Get unique regions
  const regions = useMemo(() => {
    if (!pathwaysData?.length) {
      console.log("No pathways data available");
      return ["Global"];
    }

    console.log("Sample data:", pathwaysData.slice(0, 5)); // Log first 5 records
    console.log("Available fields:", Object.keys(pathwaysData[0])); // Log available fields

    const uniqueRegions = [
      ...new Set(pathwaysData.map((d) => d.country_region)),
    ].sort();
    console.log("Unique regions found:", uniqueRegions);

    return ["Global", ...uniqueRegions];
  }, [pathwaysData]);

  // Get unique subcategories (categories/subcategories)
  const subcategories = useMemo(() => {
    if (!pathwaysData?.length) return [];
    const uniqueSubcategories = [
      ...new Set(pathwaysData.map((d) => d.subcategory)),
    ];
    return uniqueSubcategories.sort();
  }, [pathwaysData]);

  // Set initial subcategory when data loads
  useEffect(() => {
    if (subcategories.length > 0 && !selectedSubcategory) {
      setSelectedSubcategory(subcategories[0]);
    }
  }, [subcategories, selectedSubcategory]);

  // Get unique indicators for the selected subcategory
  const indicators = useMemo(() => {
    if (!pathwaysData?.length || !selectedSubcategory) return [];
    const uniqueIndicators = [
      ...new Set(
        pathwaysData
          .filter((d) => d.subcategory === selectedSubcategory)
          .map((d) => d.indicator)
      ),
    ];
    return uniqueIndicators.sort();
  }, [pathwaysData, selectedSubcategory]);

  // Set initial indicator when subcategory changes
  useEffect(() => {
    if (indicators.length > 0) {
      setSelectedIndicator(indicators[0]);
    }
  }, [indicators]);

  // Prepare data for emissions projection line chart
  const emissionsProjectionData = useMemo(() => {
    if (!pathwaysData?.length || !selectedSubcategory) return [];

    const filteredData = pathwaysData.filter(
      (d) =>
        d.subcategory === selectedSubcategory &&
        (selectedIndicator === "" || d.indicator === selectedIndicator) &&
        (selectedRegion === "Global" || d.country_region === selectedRegion)
    );

    const groupedData = filteredData.reduce((acc, curr) => {
      if (!acc[curr.year]) {
        acc[curr.year] = {};
      }
      if (!acc[curr.year][curr.scenario]) {
        acc[curr.year][curr.scenario] = 0;
      }
      acc[curr.year][curr.scenario] += curr.value;
      return acc;
    }, {});

    return Object.entries(groupedData)
      .map(([year, scenarios]) => ({
        year: parseInt(year),
        ...scenarios,
      }))
      .sort((a, b) => a.year - b.year);
  }, [pathwaysData, selectedSubcategory, selectedIndicator, selectedRegion]);

  // Get unique scenarios
  const scenarios = useMemo(() => {
    if (!pathwaysData?.length) return [];
    return [...new Set(pathwaysData.map((d) => d.scenario))].sort();
  }, [pathwaysData]);

  // Modified radar chart data to use selected policies
  const radarChartData = useMemo(() => {
    if (!pathwaysData?.length || !selectedSubcategory) return [];

    const latestYear = Math.max(...pathwaysData.map((d) => d.year));
    const activePolicies =
      selectedPolicies.length > 0 ? selectedPolicies : scenarios;

    const relevantIndicators = [
      ...new Set(
        pathwaysData
          .filter(
            (d) =>
              d.subcategory === selectedSubcategory && d.indicator !== "Total"
          )
          .map((d) => d.indicator)
      ),
    ];

    return relevantIndicators.map((indicator) => {
      const indicatorData = pathwaysData.filter(
        (d) =>
          d.year === latestYear &&
          d.subcategory === selectedSubcategory &&
          d.indicator === indicator &&
          (selectedRegion === "Global" || d.country_region === selectedRegion)
      );

      const dataPoint = {
        indicator,
      };

      activePolicies.forEach((policy) => {
        const matchingData = indicatorData.find((d) => d.scenario === policy);
        dataPoint[policy] = matchingData
          ? Math.round(matchingData.value * 100) / 100
          : 0;
      });

      return dataPoint;
    });
  }, [
    pathwaysData,
    selectedSubcategory,
    selectedRegion,
    selectedPolicies,
    scenarios,
  ]);

  if (isLoading) return <div>Loading projections data...</div>;
  if (error) return <div>Error loading projections: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label
            htmlFor="model-select"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Select Scenario Model
          </label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-2"
          >
            {models.map((model) => (
              <option key={model.value} value={model.value}>
                {model.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="region-select"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Select Region
          </label>
          <select
            id="region-select"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-2"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <label
              htmlFor="subcategory-select"
              className="block text-sm font-medium text-gray-300"
            >
              Select Subcategory
            </label>
          </div>
          <select
            id="subcategory-select"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-2"
          >
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 bg-slate-800">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-xl font-semibold">
            {selectedSubcategory} - {selectedIndicator} Projections (2020-2050)
          </h3>

          {selectedSubcategory.includes(
            "LULUCF Anthropogenic GHG Emissions by Gas"
          ) && (
            <div className="relative group">
              <InfoIcon className="h-5 w-5 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-700 text-sm text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg border border-slate-600 w-[320px] z-10">
                <p className="mb-2">
                  <strong>LULUCF Anthropogenic GHG Emissions by Gas:</strong>
                </p>
                <p className="text-sm leading-relaxed">
                  Greenhouse gas emissions from Land Use, Land-Use Change, and
                  Forestry (LULUCF) activities. This includes emissions and
                  removals of greenhouse gases resulting from human activities
                  in land management, such as deforestation, reforestation, and
                  changes in agricultural practices.
                </p>
              </div>
            </div>
          )}

          <select
            value={selectedIndicator}
            onChange={(e) => setSelectedIndicator(e.target.value)}
            className="bg-slate-700 text-white border border-slate-600 rounded-lg p-2 min-w-[200px]"
          >
            <option value="">All Indicators</option>
            {indicators.map((indicator) => (
              <option key={indicator} value={indicator}>
                {indicator}
              </option>
            ))}
          </select>
        </div>
        <div className="h-80">
          <LineChart
            data={emissionsProjectionData}
            lines={scenarios}
            xAxisKey="year"
          />
        </div>
      </div>

      {/* Radar chart - only show for landcover */}
      {selectedSubcategory?.includes("Land Cover") && (
        <div className="p-6 bg-slate-800">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-4">
              Land Cover Comparison by Scenario
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {scenarios.map((policy) => (
                <button
                  key={policy}
                  onClick={() => {
                    setSelectedPolicies((prev) => {
                      if (prev.includes(policy) && prev.length === 1) {
                        return [policy];
                      }
                      return prev.includes(policy)
                        ? prev.filter((p) => p !== policy)
                        : [...prev, policy];
                    });
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedPolicies.length === 0 ||
                    selectedPolicies.includes(policy)
                      ? "bg-blue-500 text-white"
                      : "bg-slate-700 text-gray-300"
                  }`}
                >
                  {policy}
                </button>
              ))}
              {selectedPolicies.length > 0 && (
                <button
                  onClick={() => setSelectedPolicies([])}
                  className="px-3 py-1 rounded-full text-sm bg-slate-700 text-gray-300"
                >
                  Show All
                </button>
              )}
            </div>
          </div>

          {radarChartData.length > 0 && (
            <div className="flex justify-center">
              <CustomRadarChart
                data={radarChartData}
                scenarios={
                  selectedPolicies.length > 0 ? selectedPolicies : scenarios
                }
              />
            </div>
          )}
        </div>
      )}

      {/* Parallel Coordinates for Land Cover */}
      {/* {selectedSubcategory === "Land Cover" && (
        <LandCoverParallel
          pathwaysData={pathwaysData}
          scenarios={scenarios}
          selectedRegion={selectedRegion}
        />
      )} */}
    </div>
  );
};

export default AgricultureProjections;
