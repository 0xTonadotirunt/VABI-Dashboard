import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const BarChart = ({ data, bars = ["value"], xAxisKey = "name" }) => {
  const colors = ["#6366f1", "#22c55e", "#eab308", "#ec4899"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey={xAxisKey} stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
        <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #475569",
            borderRadius: "6px",
          }}
          labelStyle={{ color: "#94a3b8" }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "10px",
            color: "#94a3b8",
          }}
        />
        {bars.map((bar, index) => (
          <Bar
            key={bar}
            dataKey={bar}
            fill={colors[index % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
