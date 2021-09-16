import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const lineChartData = [
  {
    name: '05/25',
    Workloads: 4,
  },
  {
    name: '05/26',
    Workloads: 14,
  },
  {
    name: '05/27',
    Workloads: 24,
  },
  {
    name: '05/28',
    Workloads: 0,
  },
];

export default () => (
  <LineChart
    width={520}
    height={250}
    data={lineChartData}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="4 4" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="Workloads" stroke="#017d73" activeDot={{ r: 6 }} />
  </LineChart>
);
