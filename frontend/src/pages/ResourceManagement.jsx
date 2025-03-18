import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./resource.css";
import Navbar from "../compoents/ui/Navbar";

// Sample data for different resources
const electricityData = [
  { month: "Jan", usage: 320, cost: 50 },
  { month: "Feb", usage: 280, cost: 45 },
  { month: "Mar", usage: 300, cost: 48 },
  { month: "Apr", usage: 350, cost: 55 },
  { month: "May", usage: 400, cost: 60 },
  { month: "Jun", usage: 420, cost: 65 },
];

const waterData = [
  { month: "Jan", consumption: 120, bill: 30 },
  { month: "Feb", consumption: 110, bill: 28 },
  { month: "Mar", consumption: 130, bill: 35 },
  { month: "Apr", consumption: 140, bill: 38 },
  { month: "May", consumption: 150, bill: 40 },
  { month: "Jun", consumption: 160, bill: 42 },
];

const gasData = [
  { month: "Jan", usage: 80, cost: 25 },
  { month: "Feb", usage: 75, cost: 23 },
  { month: "Mar", usage: 90, cost: 27 },
  { month: "Apr", usage: 100, cost: 30 },
  { month: "May", usage: 110, cost: 35 },
  { month: "Jun", usage: 115, cost: 37 },
];

const wasteData = [
  { month: "Jan", recycled: 40, landfill: 60 },
  { month: "Feb", recycled: 42, landfill: 58 },
  { month: "Mar", recycled: 45, landfill: 55 },
  { month: "Apr", recycled: 48, landfill: 52 },
  { month: "May", recycled: 50, landfill: 50 },
  { month: "Jun", recycled: 52, landfill: 48 },
];

const transportData = [
  { month: "Jan", users: 5000, efficiency: 80 },
  { month: "Feb", users: 4800, efficiency: 78 },
  { month: "Mar", users: 5100, efficiency: 82 },
  { month: "Apr", users: 5200, efficiency: 85 },
  { month: "May", users: 5300, efficiency: 88 },
  { month: "Jun", users: 5400, efficiency: 90 },
];

// Pie Chart Data
const pieData = [
  { name: "Electricity", value: 60 },
  { name: "Water", value: 40 },
];

const COLORS = ["#4285F4", "#34A853"];

const ResourceManagement = () => {
  return (
    <div className="resource-container">
      <Navbar></Navbar>
      <h2 className="dashboard-title">Smart City Resource Dashboard</h2>

      <div className="dashboard-grid">
        {/* Electricity Line Chart */}
        <div className="chart-box">
          <h3>Electricity Usage Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={electricityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Water Bar Chart */}
        <div className="chart-box">
          <h3>Water Consumption and Cost</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="consumption" fill="#4285F4" barSize={40} />
              <Bar dataKey="bill" fill="#34A853" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gas Usage */}
        <div className="chart-box">
          <h3>Gas Consumption and Cost</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usage" fill="#FF5733" barSize={40} />
              <Bar dataKey="cost" fill="#C70039" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Waste Management */}
        <div className="chart-box">
          <h3>Waste Management</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wasteData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="recycled" fill="#34A853" barSize={40} />
              <Bar dataKey="landfill" fill="#FF5733" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transportation Usage */}
        <div className="chart-box full-width">
          <h3>Public Transportation Efficiency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ResourceManagement;
