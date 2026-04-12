import React from 'react';
import { Truck, Activity, AlertTriangle, Calendar, Users, CreditCard, BarChart3, Clock, BellRing } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardView = ({ vehicles = [], logs = [], schedule = [], drivers = [], compliance = [], globalSearch = '', setActiveView, setVehicleFilter, setScheduleFilter }) => {
  // Calculate metrics
  const totalVehicles = vehicles.length;
  const inMaintenance = vehicles.filter(v => v.status === 'Maintenance').length;
  const overdueTasks = schedule.filter(s => s.status === 'Overdue').length;
  const upcomingTasksCount = schedule.filter(s => s.status === 'Pending').length;
  const totalDrivers = drivers.length;
  
  // Calculate costs
  const allTimeCost = logs.reduce((sum, log) => sum + (typeof log.cost === 'number' ? log.cost : 0), 0);
  const thisMonthCost = logs
    .filter(log => log.date && log.date.startsWith('2026-04'))
    .reduce((sum, log) => sum + (typeof log.cost === 'number' ? log.cost : 0), 0);

  // Calculate Compliance Health (Vehicle-centric)
  let groundedVehicles = 0;
  let atRiskVehicles = 0;
  let fullyCompliantVehicles = 0;

  vehicles.forEach(v => {
    const docs = compliance.filter(c => c.vehicle === v.plate);
    const statuses = docs.map(c => c.status);
    
    if (statuses.length === 0) {
      groundedVehicles++; // No docs means not ready to run
    } else if (statuses.includes('Expired')) {
      groundedVehicles++;
    } else if (statuses.includes('Expiring Soon')) {
      atRiskVehicles++;
    } else {
      fullyCompliantVehicles++;
    }
  });

  const metrics = [
    { title: 'In Maintenance', value: inMaintenance.toString(), icon: <Activity size={20} />, color: 'var(--status-warning)', view: 'vehicles', filter: 'Maintenance' },
    { title: 'Overdue Tasks', value: overdueTasks.toString(), icon: <AlertTriangle size={20} />, color: 'var(--status-danger)', view: 'schedule', filter: 'Overdue' },
    { title: 'Upcoming (30D)', value: upcomingTasksCount.toString(), icon: <Calendar size={20} />, color: 'var(--status-info)', view: 'schedule', filter: 'Pending' },
    { title: 'Maint. Cost (Apr)', value: `₹${thisMonthCost.toLocaleString()}`, icon: <CreditCard size={20} />, color: 'var(--status-success)', view: 'maintenance' },
    { title: 'Total Maint. Cost', value: `₹${allTimeCost.toLocaleString()}`, icon: <BarChart3 size={20} />, color: 'var(--accent-primary)', view: 'maintenance' },
  ];

  const doughnutData = {
    labels: [`Fully Compliant (${fullyCompliantVehicles})`, `At Risk (${atRiskVehicles})`, `Grounded (${groundedVehicles})`],
    datasets: [
      {
        data: [fullyCompliantVehicles, atRiskVehicles, groundedVehicles],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: 'var(--text-secondary)' },
      },
      title: {
        display: false,
      },
    },
    cutout: '70%',
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Maintenance Cost (₹)',
        data: [50000, 70000, 40000, thisMonthCost, 60000, 0],
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'var(--text-secondary)' },
      },
      title: {
        display: true,
        text: 'Monthly Maintenance Costs (₹)',
        color: 'var(--text-primary)',
        font: { size: 16, weight: '600' }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: 'var(--border-color)' },
      },
      x: {
        ticks: { color: 'var(--text-secondary)' },
        grid: { display: false },
      },
    },
  };

  // Get upcoming tasks from schedule (filtered by global search)
  const upcoming = schedule
    .filter(s => s.status === 'Pending')
    .filter(s => 
      globalSearch === '' ||
      s.vehicle.toLowerCase().includes(globalSearch.toLowerCase()) ||
      s.task.toLowerCase().includes(globalSearch.toLowerCase())
    )
    .slice(0, 3)
    .map(s => ({ id: s.id, vehicle: s.vehicle, task: s.task, date: s.date }));

  // Simulated Alerts based on Compliance
  const alerts = compliance
    .filter(c => c.status === 'Expired' || c.status === 'Expiring Soon')
    .slice(0, 3)
    .map(c => ({
      id: c.id,
      text: `Alert: ${c.vehicle} ${c.type} is ${c.status === 'Expired' ? 'expired' : 'expiring soon'}. Do not dispatch for long hauls.`,
      status: c.status
    }));

  return (
    <div className="dashboard-view">
      <div className="view-header">
        <div>
          <h1 className="view-title">Fleet Overview</h1>
          <p className="view-subtitle">Welcome back, Manager</p>
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className="card metric-card" 
            onClick={() => {
              setActiveView(metric.view);
              if (metric.view === 'vehicles' && metric.filter && setVehicleFilter) {
                setVehicleFilter(metric.filter);
              }
              if (metric.view === 'schedule' && metric.filter && setScheduleFilter) {
                setScheduleFilter(metric.filter);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="metric-icon" style={{ color: metric.color }}>
              {metric.icon}
            </div>
            <div className="metric-info">
              <span className="metric-title">{metric.title}</span>
              <span className="metric-value">{metric.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Charts */}
      <div className="dashboard-grid">
        <div className="card chart-card">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Compliance Health Card */}
        <div className="card compliance-health-card">
          <h3 className="card-title">Compliance Health (Fleet Status)</h3>
          <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Row 3: Lists */}
      <div className="lists-grid" style={{ marginTop: '20px' }}>
        {/* Alerts Feed */}
        <div className="card list-card alerts-card">
          <h3 className="card-title flex items-center gap-2">
            <BellRing size={18} className="text-status-danger" />
            <span>Active Alerts</span>
          </h3>
          <div className="list-items">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`list-item alert-item ${alert.status === 'Expired' ? 'alert-danger' : 'alert-warning'}`}
                  onClick={() => setActiveView('compliance')}
                  style={{ cursor: 'pointer', borderLeft: `4px solid ${alert.status === 'Expired' ? 'var(--status-danger)' : 'var(--status-warning)'}`, paddingLeft: '10px' }}
                >
                  <div className="list-content">
                    <span className="item-main text-sm">{alert.text}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No active alerts</div>
            )}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="card list-card">
          <h3 className="card-title">Upcoming Maintenance</h3>
          <div className="list-items">
            {upcoming.length > 0 ? (
              upcoming.map((task) => (
                <div 
                  key={task.id} 
                  className="list-item"
                  onClick={() => setActiveView('schedule')}
                  style={{ cursor: 'pointer' }}
                >
                  <Calendar size={16} className="list-icon" />
                  <div className="list-content">
                    <span className="item-main">{task.vehicle}</span>
                    <span className="item-sub">{task.task}</span>
                  </div>
                  <span className="item-date">{task.date}</span>
                </div>
              ))
            ) : (
              <div className="no-data">No matching tasks</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
