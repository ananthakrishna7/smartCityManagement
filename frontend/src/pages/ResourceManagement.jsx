import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./resource.css";
import Navbar from "../compoents/ui/Navbar";

const ResourceManagement = () => {
  const [electricityData, setElectricityData] = useState([]);
  const [waterData, setWaterData] = useState([]);
  const [gasData, setGasData] = useState([]);
  const [wasteData, setWasteData] = useState([]);
  const [transportData, setTransportData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/resources")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((resource) => {
          switch (resource.type) {
            case "Electricity":
              setElectricityData(resource.data);
              break;
            case "Water":
              setWaterData(resource.data);
              break;
            case "Gas":
              setGasData(resource.data);
              break;
            case "Waste":
              setWasteData(resource.data);
              break;
            case "Transport":
              setTransportData(resource.data);
              break;
            default:
              break;
          }
        });
      })
      .catch((err) => console.error("Error fetching resource data:", err));
  }, []);

  return (
    <div className="resource-container">
      <Navbar />
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
          <h3>Water Consumption and Bill</h3>
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

        {/* Gas Bar Chart */}
        <div className="chart-box">
          <h3>Gas Usage and Cost</h3>
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

        {/* Waste Bar Chart */}
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

        {/* Transport Line Chart */}
        <div className="chart-box full-width">
          <h3>Public Transport Usage & Efficiency</h3>
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
