import React, { useState, useEffect } from "react";
import { Cloud, TrendingDown, Target, Leaf } from "lucide-react";

const iconMap = {
  cloud: Cloud,
  "trending-down": TrendingDown,
  target: Target,
  leaf: Leaf,
};

const StatCard = ({ title, value, icon, color }) => {
  const [count, setCount] = useState(0);
  const duration = 1000;
  const steps = 30;

  useEffect(() => {
    // Allow for negative values by preserving the minus sign during parsing
    const numericValue = parseFloat(value.replace(/[^-\d.]/g, ""));

    // If the parsed value is NaN, display the value as a string
    if (isNaN(numericValue)) {
      setCount(value);
      return;
    }

    // Proceed with animation for numeric values
    let start = 0;
    const end = numericValue;

    if (start === end) return;

    const increment = (end - start) / steps;
    const timer = setInterval(() => {
      start += increment;
      setCount(start);
      if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
        clearInterval(timer);
        setCount(end);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const Icon = iconMap[icon];

  const formatValue = (count) => {
    if (typeof count === "number") {
      const [, unit] = value.split(" ");
      return `${count.toFixed(1)} ${unit || ""}`.trim();
    }
    return count;
  };

  return (
    <div className={`${color} rounded-lg p-4 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-75">{title}</p>
          <p className="text-2xl font-bold">{formatValue(count)}</p>
        </div>
        <div className="text-3xl opacity-75">{Icon && <Icon size={24} />}</div>
      </div>
    </div>
  );
};

export default StatCard;
