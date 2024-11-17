import React from "react";
// UserPlusIcon 
import { UserPlusIcon } from "@heroicons/react/24/outline";
import TicketTable from "../common/Table";

function ManageUser() {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const handleCreate = () => {
    console.log("Create new ticket");
  };

  const handleView = (id) => {
    console.log("View ticket", id);
  };

  const handleEdit = (id) => {
    console.log("Edit ticket", id);
  };

  const handleDelete = (id) => {
    console.log("Delete ticket", id);
  };

  const tabs = [
    { label: "All", value: "all" },
    { label: "Monitored", value: "monitored" },
    { label: "Unmonitored", value: "unmonitored" },
  ];

  const tableHeaders = ["Ticket ID", "Issue Type", "Status", "Priority", "Last Update", "Action"];

  const tableData = [
    {
      id: 123,
      type: "Network Issue",
      status: "Open",
      priority: "High",
      update_at: "23/04/18",
    },
    {
      id: 456,
      type: "Software Issue",
      status: "Close",
      priority: "Medium",
      update_at: "23/04/18",
    },
    {
      id: "789",
      type: "RAMIS Issue",
      status: "In-Progress",
      priority: "Low",
      update_at: "19/09/17",
    },
  ];

  return (
    <div className="container mx-auto mt-3">
      <TicketTable
        title="Welcome Reyanson"
        subtitle="See information about your tickets"
        tabs={tabs}
        tableHeaders={tableHeaders}
        tableData={tableData}
        onSearch={handleSearch}
        onCreate={handleCreate}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addBtn="Add User"
        addBtnIcon={UserPlusIcon}   
        toolTipView="View User"
        toolTipEdit="Edit User"
        toolTipDelete="Delete User"
        
      />
    </div>
  );
}

export default ManageUser;
