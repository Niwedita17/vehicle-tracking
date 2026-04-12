import React from 'react';
import { Truck, Activity, AlertTriangle, Calendar, Users, CreditCard, BarChart3, Clock } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardView = ({ vehicles = [], logs = [], schedule = [], drivers = [], globalSearch = '', setActiveView, setVehicleFilter, setScheduleFilter }) => {
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

  const metrics = [
    { title: 'Total Vehicles', value: totalVehicles.toString(), icon: <Truck size={20} />, color: 'var(--accent-primary)', view: 'vehicles', filter: 'All Status' },
    { title: 'In Maintenance', value: inMaintenance.toString(), icon: <Activity size={20} />, color: 'var(--status-warning)', view: 'vehicles', filter: 'Maintenance' },
    { title: 'Overdue Tasks', value: overdueTasks.toString(), icon: <AlertTriangle size={20} />, color: 'var(--status-danger)', view: 'schedule', filter: 'Overdue' },
    { title: 'Upcoming (30D)', value: upcomingTasksCount.toString(), icon: <Calendar size={20} />, color: 'var(--status-info)', view: 'schedule', filter: 'Pending' },
    { title: 'Total Drivers', value: totalDrivers.toString(), icon: <Users size={20} />, color: 'var(--accent-primary)', view: 'drivers' },
    { title: 'Cost This Month', value: `₹${thisMonthCost.toLocaleString()}`, icon: <CreditCard size={20} />, color: 'var(--status-success)', view: 'maintenance' },
    { title: 'All-Time Cost', value: `₹${allTimeCost.toLocaleString()}`, icon: <BarChart3 size={20} />, color: 'var(--accent-primary)', view: 'maintenance' },
  ];

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
    .slice(0, 5)
    .map(s => ({ id: s.id, vehicle: s.vehicle, task: s.task, date: s.date }));

  // Get recent activity from logs (filtered by global search)
  const recent = logs
    .filter(l => 
      globalSearch === '' ||
      l.vehicle.toLowerCase().includes(globalSearch.toLowerCase()) ||
      l.description.toLowerCase().includes(globalSearch.toLowerCase())
    )
    .slice(-5)
    .map(l => ({ id: l.id, vehicle: l.vehicle, task: l.description, cost: `₹${l.cost.toLocaleString()}`, date: l.date }));

  return (
    <div className="dashboard-view">
      <h1 className="view-title">Fleet Overview</h1>
      
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

      {/* Chart and Lists Grid */}
      <div className="dashboard-grid">
        <div className="card chart-card">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="dashboard-side">
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

          {/* Recent Activity */}
          <div className="card list-card">
            <h3 className="card-title">Recent Activity</h3>
            <div className="list-items">
              {recent.length > 0 ? (
                recent.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="list-item"
                    onClick={() => setActiveView('maintenance')}
                    style={{ cursor: 'pointer' }}
                  >
                    <Clock size={16} className="list-icon" />
                    <div className="list-content">
                      <span className="item-main">{activity.vehicle}</span>
                      <span className="item-sub">{activity.task}</span>
                    </div>
                    <span className="item-value">{activity.cost}</span>
                  </div>
                ))
              ) : (
                <div className="no-data">No matching activity</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
