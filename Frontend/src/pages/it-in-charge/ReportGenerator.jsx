import { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import LordIconComponent from "../../components/Icons/LordIconComponent"; // Your custom loader
import { Chip, Typography } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { format } from "date-fns";
import "react-comments-section/dist/index.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Input } from "@material-tailwind/react";
import "react-day-picker/dist/style.css";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { Button, Tabs } from "@material-tailwind/react";

import "../../styles/style.css";
import { useNavigate } from "react-router-dom";
import TicketService from "../../services/ticket.service";
import axios from "axios";
import * as XLSX from "xlsx";

const Export = ({ onExport, name }) => (
  <Button onClick={() => onExport()}>{name}</Button>
);

const ReportGenerator = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // csv file download
  const convertArrayOfObjectsToCSV = (data) => {
    if (!data || data.length === 0) {
      console.error("Data is empty or undefined");
      return ""; // Return an empty string if there's no data
    }
  
    try {
      // Define columns to ignore
      const columnsToIgnore = ['description', 'status', 'user_id', 'priority', 'model', 'brand'];
  
      // Define header mappings
      const headerNameMapping = {
        'id': 'Id',
        'category': 'Issue Type',
        'device': 'Device category',
        'serial_no': 'ServiceTag',
        'user_name': 'Username',
        'assigned_to': 'Assigned',
      };
  
      // Define custom column order
      const customOrder = ['id', 'category', 'device', 'serial_no', 'user_name', 'assigned_to'];
  
      // Filter data columns and map headers
      const filteredHeaders = Object.keys(data[0]).filter(
        (key) => !columnsToIgnore.includes(key)
      );
  
      const orderedHeaders = customOrder.filter((key) => filteredHeaders.includes(key));
      const mappedHeaders = orderedHeaders.map(
        (header) => headerNameMapping[header] || header
      );
  
      // Generate CSV content
      const csv = [
        mappedHeaders.join(","), // Add column headers
        ...data.map((row) =>
          orderedHeaders
            .map((header) => `"${row[header] !== undefined ? row[header] : ""}"`) // Extract and quote values
            .join(",")
        ),
      ].join("\n");
  
      return csv;
    } catch (error) {
      console.error("Error generating CSV:", error);
      return ""; // Handle unexpected errors gracefully
    }
  };

  const handleExport = () => {
    const csvContent = convertArrayOfObjectsToCSV(filteredData);
  
    if (csvContent) {
      const blob = new Blob([csvContent], { type: "text/xlsx;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
  
      link.setAttribute("href", url);
      link.setAttribute("download", `report_${new Date().toISOString()}.xlsx`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No data available to export as CSV.");
    }
  };

  const handleExportPDF = () => {
    if (!filteredData || filteredData.length === 0) {
      alert("No data available to export.");
      return;
    }

    const columnsToIgnore = ['description', 'status','user_id','priority','model','brand']; // Replace with the columns you want to ignore

    const headerNameMapping = {
      'id': 'Id',  // Original column name -> New header name
      'category': 'Issue Type',
      'device': 'Device category',
      'serial_no': 'ServiceTag',
      'user_name': 'Username',
      'assigned_to': 'Assigned',
      // Add more mappings as necessary
    };

    const filteredHeaders = Object.keys(filteredData[0])
      .filter(key => !columnsToIgnore.includes(key));

    const mappedHeaders = filteredHeaders.map(header => headerNameMapping[header] || header);


    // Define the custom order for the headers (adjust this order as needed)
    const customOrder = ['id', 'category', 'device','serial_no','user_name','assigned_to']; // Example: the new order of the columns

    // Filter the headers to exclude columns you don't want
    

    // Rearrange the filtered headers to match the custom order
    // Rearrange the mapped headers according to the custom order
    const orderedMappedHeaders = customOrder.filter(column => filteredHeaders.includes(column))
      .map(header => headerNameMapping[header] || header);




    // Filter each row's values based on the new ordered headers
    const filteredRows = filteredData.map(row => {
      return customOrder.map(header => row[header]);
    });

    console.log("filtered Data",filteredData);

    const nonResolvedTicketsCount = filteredData.filter(row => row.status === 0).length;
    const resolvedTicketsCount = filteredData.filter(row => row.status === 1).length;

    const doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4',
    });

    //font family
    doc.setFont('times');
    // Add a title
    doc.text("Ticket State Report", 125, 10); 
    
    doc.setFontSize(12);
    doc.text("Duration: " , 10, 20);
    doc.setFontSize(9);
    doc.text(format(new Date(startDate), "dd MMM yyyy")+" to " + format(new Date(endDate), "dd MMM yyyy"), 35, 20);

    doc.setFontSize(12);
    doc.text("Total Tickets: " , 10, 30);
    doc.setFontSize(9);
    doc.text(filteredRows.length.toString(), 35, 30);

    //Resolved Tickets
    doc.setFontSize(12);
    doc.text("Non resolved Tickets: " , 200, 20);
    doc.setFontSize(9);
    doc.text(nonResolvedTicketsCount.toString(), 240, 20);

    doc.setFontSize(12);
    doc.text("Resolved Tickets: " , 200, 30);
    doc.setFontSize(9);
    doc.text(resolvedTicketsCount.toString(), 240, 30);
    

    // Add the table
    doc.autoTable({
      head: [orderedMappedHeaders], // Use the ordered headers
      body: filteredRows,
      startY: 50,
    });

    // Save the PDF
    doc.save(`report_${new Date().toISOString()}.pdf`);
};



const handleExportExcel = async () => {
  if (!filteredData || filteredData.length === 0) {
    alert("No data available to export.");
    return;
  }

  const columnsToIgnore = ['description', 'status', 'user_id', 'priority', 'model', 'brand'];

  const headerNameMapping = {
    id: 'Id',
    category: 'Issue Type',
    device: 'Device Category',
    serial_no: 'ServiceTag',
    user_name: 'Username',
    assigned_to: 'Assigned',
  };

  const customOrder = ['id', 'category', 'device', 'serial_no', 'user_name', 'assigned_to'];

  const filteredHeaders = Object.keys(filteredData[0]).filter(
    (key) => !columnsToIgnore.includes(key)
  );

  const orderedHeaders = customOrder.filter((key) => filteredHeaders.includes(key));
  const mappedHeaders = orderedHeaders.map(
    (header) => headerNameMapping[header] || header
  );

  const formattedRows = filteredData.map((row) =>
    customOrder.reduce((acc, key) => {
      if (!columnsToIgnore.includes(key)) {
        acc[headerNameMapping[key] || key] = row[key];
      }
      return acc;
    }, {})
  );

  const nonResolvedTicketsCount = filteredData.filter(row => row.status === 0).length;
  const resolvedTicketsCount = filteredData.filter(row => row.status === 1).length;
  
  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Ticket Report');

    // Add a title row
  const titleRow = worksheet.addRow(['Ticket State Report']);

    // Merge cells for the title row
  worksheet.mergeCells('A1:F1'); 

  // Style the title row
  titleRow.getCell(1).font = {
    name: 'Arial',
    size: 16,
    bold: true,
    color: { argb: 'FFFFFFFF' }, // White text
  };

  titleRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
  titleRow.getCell(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '0070C0' }, // Blue background
  };

  const duration = worksheet.addRow(["Duration: "+ startDate+ " to " + endDate,"","","","","Non resolved Tickets: "+nonResolvedTicketsCount]);
  const total = worksheet.addRow(['Total Tickets: '+ filteredData.length.toString(),'','','','','Resolved Tickets: '+ resolvedTicketsCount])
  // const nonResolvedTicketsCount = worksheet.add(["Duration: "]);


  // Add header row with styling
  const headerRow = worksheet.addRow(mappedHeaders);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0070C0' }, // Blue background
    };
    cell.font = {
      color: { argb: 'FFFFFFFF' }, // White text
      bold: true,
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // Add data rows
  formattedRows.forEach((rowData) => {
    worksheet.addRow(Object.values(rowData));
  });

  // Auto-fit column widths
  worksheet.columns.forEach((column) => {
    const maxLength = column.values.reduce((max, curr) => {
      const text = curr ? curr.toString() : '';
      return Math.max(max, text.length);
    }, 10); // Default column width
    column.width = maxLength + 2;
  });

  // Generate Excel file and trigger download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `report_${new Date().toISOString()}.xlsx`);
};





  // Handle date range change
  const handleDateRangeChange = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
    console.log("start date", startDate);
    console.log("end date", endDate);
    console.log("Adjusted end date", adjustedEndDate);

    setFilteredData(
      data.filter((row) => {
        const rowDate = new Date(row.createdAt);
        return rowDate >= new Date(startDate) && rowDate < adjustedEndDate; // Exclusive end date
      })
    );
  };

  // Fetch user data
  const retrieveTicket = async (page) => {
    setLoading(true);
    try {
      const response = await TicketService.getLogTickets(page, perPage);
      setData(response.data.data || []);
      setFilteredData(response.data.data || []);
      setTotalRows(response.data.totalItems || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  //pdf generator
  // const handleGenerate = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/convertPDF");
  //     console.log("response", response);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // Handle page change
  const handlePageChange = (page) => {
    retrieveTicket(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    retrieveTicket(1); // Reset to page 1 when page size changes
  };

  //filter rows based on filter text
  const handleFilter = (event) => {
    const text = event.target.value.toLowerCase();
    setFilterText(text);
    setFilteredData(
      data.filter((row) => row.description.toLowerCase().includes(text))
    );
  };

  useEffect(() => {
    retrieveTicket(1);
    console.log("Role", localStorage.getItem("userRole"));
  }, [perPage]);

  // Define columns
  const columns = [
    {
      name: "ID",
      cell: (row) => row.id,
    },
    {
      name: "Issue Type",
      selector: (row) => row.category,
    },
    {
      name: "Device Category",
      selector: (row) => row.device,
    },
    {
      name: "Service Tag",
      selector: (row) => row.serial_no,
    },
    {
      name: "Branch",
      selector: (row) => row.branch,
    },
    {
      name: "Unit",
      selector: (row) => row.branch,
    },
    {
      name: "User name",
      selector: (row) => row.user_name,
    },
    {
      name: "Assigned To",
      selector: (row) => row.assigned_to,
    },
    // {
    //   name: "Priority",
    //   cell: (row) => (
    //     <>
    //       <Chip
    //         color={
    //           row.priority === 0 ? "cyan" : row.priority === 1 ? "teal" : "pink"
    //         }
    //         value={
    //           row.priority === 0
    //             ? "Low"
    //             : row.priority === 1
    //             ? "Medium"
    //             : "High"
    //         }
    //       />
    //     </>
    //   ),
    // },
    // {
    //   name: "Status",
    //   cell: (row) => (
    //     <>
    //       <Chip
    //         color={row.status_id === 1 ? "green" : "red"}
    //         value={row.status_id === 1 ? "Active" : "Inactive"}
    //       />
    //     </>
    //   ),
    // },
    {
      name: "Created At",
      selector: (row) =>
        format(new Date(row.createdAt), "dd MMM yyyy, hh:mm a"),
    },
  ];

  return (
    <>
      <div className="flex justify-center items-center mt-5">
        <div className="w-11/12">
          <div className="flex flex-row ">
            <div className="basis-11/12  ">
              <Typography variant="h5" color="blue-gray">
                Monthly Tickets state Report
              </Typography>
              <Typography color="gray" className="mt-1 mb-5 font-normal">
                {/* Tickets Report */}
              </Typography>
            </div>
            <div className="basis-1/12 ">
              <div>
                <Export onExport={handleExportExcel} name="Excel" /> 
              </div>
            </div>
            <div className="basis-1/12 ">
              <div>
                <Export onExport={handleExportPDF} name="PDF" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              {/* <TabsHeader>
                {tabs.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader> */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div>
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <button
                  onClick={handleDateRangeChange}
                  className="btn-primary mt-4 md:mt-0 p-2 rounded bg-blue-500 text-white"
                >
                  Filter
                </button>
              </div>
              
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                placeholder="Filter by Name"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={filterText}
                onChange={handleFilter}
              />
            </div>
          </div>
          <div className="mt-4">
            <DataTable
              progressPending={loading}
              progressComponent={
                <Spinner className="h-16 w-16 text-gray-900/50" />
              }
              // title="User Management"
              columns={columns}
              data={filteredData}
              noDataComponent={
                <div className="flex flex-col items-center justify-center">
                  <LordIconComponent />{" "}
                  {/* Optional: Display icon for "No Records Found" */}
                  <p className="mt-4 text-center text-gray-600">
                    No Records Found
                  </p>
                </div>
              }
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportGenerator;
