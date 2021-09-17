import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const lineChartData = [
  {
    name: '11:20',
    loss: 4,
  },
  {
    name: '11:30',
    loss: 14,
  },
  {
    name: '11:40',
    loss: 4,
  },
  {
    name: '11:50',
    loss: 10,
  },
  {
    name: '12:00',
    loss: 3,
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
    <Line type="monotone" dataKey="loss" stroke="#017d73" activeDot={{ r: 6 }} />
  </LineChart>
);
