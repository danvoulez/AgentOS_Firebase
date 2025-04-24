import React from 'react';
import useDashboardData from '../src/hooks/useDashboardData';
import DashboardCard from '../components/DashboardCard';
import SplitView from '../components/SplitView';
export default function Operational() {
  const { data, loading } = useDashboardData('operational');
  if (loading) return <div>Loading...</div>;
  return <SplitView left={<div>{data.critical.map(c=><DashboardCard key={c.id} title={c.title} value={c.value}/>)}</div>} right={<div>Filters</div>} />;
}