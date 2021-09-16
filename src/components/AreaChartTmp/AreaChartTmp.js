import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    time: '- 24h',
    Success: 400,
    Warning: 240,
    Failure: 240,
  },
  {
    time: '- 12h',
    Success: 300,
    Warning: 139,
    Failure: 221,
  },
  {
    time: '- 6h',
    Success: 200,
    Warning: 980,
    Failure: 100,
  },
  {
    time: '- 3h',
    Success: 300,
    Warning: 40,
    Failure: 100,
  },
  {
    time: '- 1h',
    Success: 400,
    Warning: 0,
    Failure: 0,
  },
];

const toPercent = (decimal) => `${(decimal * 100).toFixed(1)}%`;

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 1);
};

const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => result + entry.value, 0);

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {payload.map((entry) => (
          <li key={entry.value} style={{ color: 'black' }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default class Example extends PureComponent {
  render() {
    return (
      <AreaChart
        width={520}
        height={250}
        data={data}
        stackOffset="expand"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis tickFormatter={toPercent} />
        <Tooltip content={renderTooltipContent} />
        <Legend />
        <Area type="monotone" dataKey="Success" stackId="1" stroke="#017573" fill="#017573" />
        <Area type="monotone" dataKey="Warning" stackId="1" stroke="#f5a700" fill="#f5a700" />
        <Area type="monotone" dataKey="Failure" stackId="1" stroke="#bd271e" fill="#bd271e" />
      </AreaChart>
    );
  }
}
