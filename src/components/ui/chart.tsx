import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define the shape of your chart data
interface ChartData {
  name: string;
  value: number;
}

// Props for the Chart component
interface ChartProps {
  data: ChartData[];
}

// Custom tooltip component
const ChartTooltipContent: React.FC<{ active?: boolean; payload?: ChartData[]; label?: string | number }> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="custom-tooltip"
      style={{ background: "#fff", padding: "10px", border: "1px solid #ccc" }}
    >
      {label && <p className="label">{label}</p>}
      {payload.map((entry, index) => (
        <p key={index} style={{ color: "#333" }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

// Main Chart component
export default function Chart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
