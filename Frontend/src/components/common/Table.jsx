import React, { useState } from "react";
import PropTypes from "prop-types"; 
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  PencilSquareIcon,
  ViewfinderCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import LordIconComponent from "../Icons/LordIconComponent";

// Reusable Ticket Table Component
function TicketTable({
    addBtnIcon: AddBtnIcon,
  title,
  subtitle,
  addBtn,
  toolTipView,
  toolTipEdit,
  toolTipDelete,
  tabs,
  tableHeaders,
  tableData,
  onSearch,
  onCreate,
  onView,
  onEdit,
  onDelete,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState(tableData);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Call parent search function if needed
    filterRows(query);
  };

  const filterRows = (query) => {
    const filtered = tableData.filter(
      (row) =>
        row.type.toLowerCase().includes(query.toLowerCase()) ||
        row.id.toString().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
  <Card className="container w-full flex-shrink-0">
    <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            {title}
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            {subtitle}
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        
          <Button className="flex items-center gap-3" size="sm" onClick={onCreate}>
          < AddBtnIcon className="h-6 w-6 text-white" />
            {addBtn}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader>
            {tabs.map(({ label, value }) => (
              <Tab key={value} value={value}>
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </CardHeader>
    <CardBody className="overflow-scroll px-0">
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {tableHeaders.map((head, index) => (
              <th
                key={head}
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  {head}
                  {index !== tableHeaders.length - 1 && (
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  )}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.length === 0 ? (
            <tr>
              <td colSpan={tableHeaders.length} className="p-4 text-center">
                <LordIconComponent />
                <Typography variant="small" color="blue-gray" className="font-normal">
                  No records found
                </Typography>
              </td>
            </tr>
          ) : (
            filteredRows.map(
              ({ id, type, status, priority, update_at }, index) => (
                <tr key={id}>
                  <td className="p-4 border-b border-blue-gray-50">{id}</td>
                  <td className="p-4 border-b border-blue-gray-50">{type}</td>
                  <td className="p-4 border-b border-blue-gray-50">{status}</td>
                  <td className="p-4 border-b border-blue-gray-50">{priority}</td>
                  <td className="p-4 border-b border-blue-gray-50">{update_at}</td>
                  <td className="p-4 border-b border-blue-gray-50 flex gap-2">
                    <Tooltip content={toolTipView}>
                      <IconButton variant="text" onClick={() => onView(id)}>
                        <ViewfinderCircleIcon className="h-4 w-4 text-green-700" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content={toolTipEdit}>
                      <IconButton variant="text" onClick={() => onEdit(id)}>
                        <PencilSquareIcon className="h-4 w-4 text-blue-700" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content={toolTipDelete}>
                      <IconButton variant="text" onClick={() => onDelete(id)}>
                        <TrashIcon className="h-4 w-4 text-red-700" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </CardBody>
  </Card>
</div>

  );
}

// Prop validation
TicketTable.propTypes = {
  addBtnIcon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  addBtn: PropTypes.string.isRequired,
  toolTipView: PropTypes.string.isRequired,
  toolTipEdit: PropTypes.string.isRequired,
  toolTipDelete: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      update_at: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSearch: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TicketTable;
