'use client';
import { UsesTimestamps } from '@/api/constants';
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type GraphProps = {
  uses: UsesTimestamps;
};

export const OverviewGraph: React.FC<GraphProps> = ({ uses }) => {
  const data = [
    {
      name: 'Jan',
      total: uses.january,
    },
    {
      name: 'Feb',
      total: uses.february,
    },
    {
      name: 'Mar',
      total: uses.march,
    },
    {
      name: 'Apr',
      total: uses.april,
    },
    {
      name: 'May',
      total: uses.may,
    },
    {
      name: 'Jun',
      total: uses.june,
    },
    {
      name: 'Jul',
      total: uses.july,
    },
    {
      name: 'Aug',
      total: uses.august,
    },
    {
      name: 'Sep',
      total: uses.september,
    },
    {
      name: 'Oct',
      total: uses.october,
    },
    {
      name: 'Nov',
      total: uses.november,
    },
    {
      name: 'Dec',
      total: uses.december,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
