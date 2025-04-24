import React from 'react';
import useDashboardData from '../src/hooks/useDashboardData';
import { Line, Bar, Pie } from 'react-chartjs-2';
export default function Strategic() {
  const { data, loading } = useDashboardData('strategic');
  if (loading) return <div>Loading...</div>;
  return <div>
    <Line data={data.salesTrend} />
    <Bar data={data.margins} />
    <Pie data={data.channels} />
  </div>;
}