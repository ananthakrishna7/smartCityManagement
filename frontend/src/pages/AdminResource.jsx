import React, { useState, useEffect } from "react";
import "./AdminResource.css";

const AdminResourceManagement = () => {
  const [resources, setResources] = useState([]);
  const [editingResource, setEditingResource] = useState(null);
  const [newResource, setNewResource] = useState({
    type: "Electricity",
    month: "Jan",
    usage: 0,
    cost: 0,
    consumption: 0,
    bill: 0,
    recycled: 0,
    landfill: 0,
    users: 0,
    efficiency: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Electricity");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:9000/resources");
      if (!response.ok) throw new Error("Failed to fetch resources");
      const data = await response.json();
      setResources(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({
      ...newResource,
      [name]: name === "type" || name === "month" ? value : Number(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const existingResourceIndex = resources.findIndex(
        (r) => r.type === newResource.type
      );

      let updatedResources = [...resources];
      const resourceData = {
        month: newResource.month,
        usage: newResource.usage,
        cost: newResource.cost,
        consumption: newResource.consumption,
        bill: newResource.bill,
        recycled: newResource.recycled,
        landfill: newResource.landfill,
        users: newResource.users,
        efficiency: newResource.efficiency,
      };

      if (existingResourceIndex >= 0) {
        // Update existing resource
        updatedResources[existingResourceIndex].data.push(resourceData);
        const response = await fetch(
          `http://localhost:9000/resources/update/${resources[existingResourceIndex]._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: newResource.type,
              data: updatedResources[existingResourceIndex].data,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to update resource");
      } else {
        // Create new resource
        const response = await fetch("http://localhost:9000/resources/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: newResource.type,
            data: [resourceData],
          }),
        });

        if (!response.ok) throw new Error("Failed to add resource");
      }

      await fetchResources();
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setNewResource({
      type: resource.type,
      ...resource.data[0], // Just edit the first month for simplicity
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?"))
      return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:9000/resources/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete resource");
      await fetchResources();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNewResource({
      type: "Electricity",
      month: "Jan",
      usage: 0,
      cost: 0,
      consumption: 0,
      bill: 0,
      recycled: 0,
      landfill: 0,
      users: 0,
      efficiency: 0,
    });
    setEditingResource(null);
  };

  const filteredResources = resources.filter(
    (resource) => resource.type === activeTab
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="admin-resource-container">
      <h2 className="admin-title">Resource Management Dashboard</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-content">
        <div className="resource-form">
          <h3>{editingResource ? "Edit Resource" : "Add New Resource Data"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Resource Type</label>
              <select
                name="type"
                value={newResource.type}
                onChange={handleInputChange}
                required
              >
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Gas">Gas</option>
                <option value="Waste">Waste</option>
                <option value="Transport">Transport</option>
              </select>
            </div>

            <div className="form-group">
              <label>Month</label>
              <select
                name="month"
                value={newResource.month}
                onChange={handleInputChange}
                required
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {newResource.type === "Electricity" && (
              <>
                <div className="form-group">
                  <label>Usage (kWh)</label>
                  <input
                    type="number"
                    name="usage"
                    value={newResource.usage}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cost (₹)</label>
                  <input
                    type="number"
                    name="cost"
                    value={newResource.cost}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {newResource.type === "Water" && (
              <>
                <div className="form-group">
                  <label>Consumption (gallons)</label>
                  <input
                    type="number"
                    name="consumption"
                    value={newResource.consumption}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Bill (₹)</label>
                  <input
                    type="number"
                    name="bill"
                    value={newResource.bill}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {newResource.type === "Gas" && (
              <>
                <div className="form-group">
                  <label>Usage (therms)</label>
                  <input
                    type="number"
                    name="usage"
                    value={newResource.usage}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cost (₹)</label>
                  <input
                    type="number"
                    name="cost"
                    value={newResource.cost}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {newResource.type === "Waste" && (
              <>
                <div className="form-group">
                  <label>Recycled (tons)</label>
                  <input
                    type="number"
                    name="recycled"
                    value={newResource.recycled}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Landfill (tons)</label>
                  <input
                    type="number"
                    name="landfill"
                    value={newResource.landfill}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {newResource.type === "Transport" && (
              <>
                <div className="form-group">
                  <label>Users (count)</label>
                  <input
                    type="number"
                    name="users"
                    value={newResource.users}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Efficiency (%)</label>
                  <input
                    type="number"
                    name="efficiency"
                    value={newResource.efficiency}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </>
            )}

            <div className="form-actions">
              <button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Processing..."
                  : editingResource
                  ? "Update"
                  : "Add"}
              </button>
              {editingResource && (
                <button type="button" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="resource-data">
          <div className="resource-tabs">
            {["Electricity", "Water", "Gas", "Waste", "Transport"].map(
              (type) => (
                <button
                  key={type}
                  className={activeTab === type ? "active" : ""}
                  onClick={() => setActiveTab(type)}
                >
                  {type}
                </button>
              )
            )}
          </div>

          {isLoading ? (
            <div className="loading">Loading data...</div>
          ) : filteredResources.length > 0 ? (
            <div className="data-table">
              <h3>{activeTab} Data</h3>
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    {activeTab === "Electricity" && (
                      <>
                        <th>Usage (kWh)</th>
                        <th>Cost (₹)</th>
                      </>
                    )}
                    {activeTab === "Water" && (
                      <>
                        <th>Consumption (gallons)</th>
                        <th>Bill (₹)</th>
                      </>
                    )}
                    {activeTab === "Gas" && (
                      <>
                        <th>Usage (therms)</th>
                        <th>Cost (₹)</th>
                      </>
                    )}
                    {activeTab === "Waste" && (
                      <>
                        <th>Recycled (tons)</th>
                        <th>Landfill (tons)</th>
                      </>
                    )}
                    {activeTab === "Transport" && (
                      <>
                        <th>Users</th>
                        <th>Efficiency (%)</th>
                      </>
                    )}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResources[0].data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.month}</td>
                      {activeTab === "Electricity" && (
                        <>
                          <td>{item.usage}</td>
                          <td>₹{item.cost}</td>
                        </>
                      )}
                      {activeTab === "Water" && (
                        <>
                          <td>{item.consumption}</td>
                          <td>₹{item.bill}</td>
                        </>
                      )}
                      {activeTab === "Gas" && (
                        <>
                          <td>{item.usage}</td>
                          <td>₹{item.cost}</td>
                        </>
                      )}
                      {activeTab === "Waste" && (
                        <>
                          <td>{item.recycled}</td>
                          <td>{item.landfill}</td>
                        </>
                      )}
                      {activeTab === "Transport" && (
                        <>
                          <td>{item.users}</td>
                          <td>{item.efficiency}%</td>
                        </>
                      )}
                      <td>
                        <button
                          onClick={() =>
                            handleEdit({
                              ...filteredResources[0],
                              data: [item],
                            })
                          }
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(filteredResources[0]._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">
              No {activeTab} data available. Add data using the form.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminResourceManagement;
