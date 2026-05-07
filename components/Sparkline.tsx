"use client";

import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  data: number[];
  isPositive: boolean;
}

export default function Sparkline({ data, isPositive }: Props) {
  const chartData = data.map((price, i) => ({ i, price }));
  const color = isPositive ? "#10b981" : "#f43f5e";

  return (
    <ResponsiveContainer width="100%" height={56}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
        <Tooltip
          content={() => null}
          cursor={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
