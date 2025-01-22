import React, { useEffect, useRef } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
// @material-tailwind/react
import {
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { formatters } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Tickets Stats",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      label: "New Ticket",
      data: [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200],
      borderColor: "rgb(204, 238, 255)",
      backgroundColor: "blue",
    },
    {
      label: "Pending Ticket",
      data: [2, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300],
      borderColor: "RGB(255, 204, 215)",
      backgroundColor: "red",
    },
    {
      label: "Resolved Ticket",
      data: [300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400],
      borderColor: "RGB(225, 241, 218)",
      backgroundColor: "light-green",
    },
    {
      label: "Closed Ticket",
      data: [400, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500],
      borderColor: "RGB(165, 213, 144)",
      backgroundColor: "green",
    },
  ],
};

// Custom HTML Legend Plugin
const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart) {
    const legendContainer = document.getElementById("custom-legend");

    // Clear previous legend items
    while (legendContainer.firstChild) {
      legendContainer.firstChild.remove();
    }

    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    // Legend wrapper for horizontal alignment
    const wrapper = document.createElement("div");
    wrapper.className =
      "grid  gap-4 justify-center mb-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center  md:gap-2.5";

    items.forEach((item) => {
      // Card container for legend item
      const card = document.createElement("div");
      card.className = `flex items-center justify-center gap-2 p-2 rounded-lg border-top-red shadow-md border border-t-${item.fillStyle}-600 border-gray-200 bg-${item.fillStyle}-50 cursor-pointer transition-transform transform hover:scale-15 hover:shadow-lg`;

      // Legend color box
      const colorBox = document.createElement("div");
      colorBox.style.backgroundColor = item.fillStyle;
      colorBox.style.width = "20px";
      colorBox.style.height = "20px";
      colorBox.style.borderRadius = "40px";

      // Legend text
      const text = document.createElement("span");
      text.innerText = item.text;
      text.className = "text-sm text-gray-800";

      // Append children
      // card.appendChild(colorBox);
      card.appendChild(text);

      // Append card to the wrapper
      wrapper.appendChild(card);

      // Toggle dataset visibility on click
      card.addEventListener("click", () => {
        const { datasetIndex } = item;
        const meta = chart.getDatasetMeta(datasetIndex);

        meta.hidden =
          meta.hidden === null
            ? !chart.data.datasets[datasetIndex].hidden
            : null;
        chart.update();
      });
    });

    // Append the wrapper to the legend container
    legendContainer.appendChild(wrapper);
  },
};

ChartJS.register(htmlLegendPlugin);

export function KpiCard({ title, percentage, price, color, icon }) {
  return (
    <Card className="shadow-sm border border-gray-200 !rounded-lg">
      <CardBody className="p-4">
        <div className="flex justify-between items-center">
          <Typography className="!font-medium !text-xs text-gray-600">
            {title}
          </Typography>
          <div className="flex items-center gap-1">
            {icon}
            <Typography color={color} className="font-medium !text-xs">
              {percentage}
            </Typography>
          </div>
        </div>
        <Typography color="blue-gray" className="mt-1 font-bold text-2xl">
          {price}
        </Typography>
      </CardBody>
    </Card>
  );
}

const kpiData = [
  {
    title: "Total Tickets",
    // percentage: "12%",
    price: "846",
    color: "red",
    // icon: (
    //   <ChevronDownIcon
    //     strokeWidth={4}
    //     className="w-3 h-3 text-red-500"
    //   />
    // ),
  },
  {
    title: "unassigned Tickets",
    // percentage: "16%",
    price: "342",
    color: "green",
    // icon: (
    //   <ChevronUpIcon
    //     strokeWidth={4}
    //     className="w-3 h-3 text-green-500"
    //   />
    // ),
  },
  {
    title: "In process Tickets",
    // percentage: "10%",
    price: "20",
    color: "green",
    // icon: (
    //   <ChevronUpIcon
    //     strokeWidth={4}
    //     className="w-3 h-3 text-green-500"
    //   />
    // ),
  },
  {
    title: "Closed Tickets",
    // percentage: "10%",
    price: "10",
    color: "red",
    // icon: (
    //   <ChevronDownIcon
    //     strokeWidth={4}
    //     className="w-3 h-3 text-red-500"
    //   />
    // ),
  },
];

const tData = [4000, 3000, 2000, 2780, 1890, 2390, 3490,2400, 1398, 9800, 3908, 4800];
const uData = [2400, 1398, 9800, 3908, 4800, 3800, 4300,1400, 3398, 9800, 6908, 7800];
const pData = [1400, 3398, 9800, 6908, 7800, 9800, 2300,2000, 1798, 7800, 5908, 2800];
const cData = [2000, 1798, 7800, 5908, 2800, 1800, 2300,4000, 3000, 2000, 2780, 1890];
const xLabels = [
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

export const dataset = [
  {
    issues: "Equipment Issue",
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    issues: "Software Issue",
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Feb",
  },
  {
    issues: "Network Issue",
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    issues: "Email Issue",
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    issues: "Others",
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
];

export function valueFormatter(value) {
  return `${value}mm`;
}

function KpiCard1() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      chartInstance.update(); // Ensure the plugin is applied
    }
  }, []);
  return (
    <section className="container mx-auto py-20 px-8">
      <div className="flex justify-between md:items-center">
        {/* <div>
          <Typography className="font-bold">Overall Performance</Typography>
          <Typography
            variant="small"
            className="font-normal text-gray-600 md:w-full w-4/5"
          >
            Upward arrow indicating an increase in revenue compared to the
            previous period.
          </Typography>
        </div> */}
        <div className="shrink-0">
          <Menu>
            <MenuHandler>
              <Button
                color="gray"
                variant="outlined"
                className="flex items-center gap-1 !border-gray-300"
              >
                2025
                <ChevronDownIcon
                  strokeWidth={4}
                  className="w-3 h-3 text-gray-900"
                />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>2023</MenuItem>
              <MenuItem>2024</MenuItem>
              <MenuItem>2025</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center md:gap-2.5 gap-4 ">
        {kpiData.map((props, key) => (
          <KpiCard key={key} {...props} />
        ))}
      </div>

      {/* For chart */}
      <div className="mt-6 grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 md:gap-2.5 gap-4">
        <Card>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="">
              Tickets Stats
              <hr />
            </Typography>
            <LineChart
              // width={1200}
              height={300}
              series={[
                { data: tData, label: "Total Ticket" },
                { data: uData, label: "Unassigned Ticket" },
                { data: pData, label: "Pending Ticket" },
                { data: cData, label: "Closed Ticket  " },
              ]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
            />
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center md:gap-2.5 gap-4 ">
        <Card>
          <CardBody style={{ margin: "0.1vw" }}>
          <Typography variant="h5" color="blue-gray" className="">
              By Issue Category
              <hr />
            </Typography>
            <BarChart
              dataset={dataset}
              yAxis={[{ disableLine:true,disableTicks:true,scaleType: "band", dataKey: "issues" }]}
              series={[
                { dataKey: "seoul" },
              ]}
              layout="horizontal"
              xAxis={[
                {
                  // label: "rainfall (mm)",
                },
              ]}
              // width={500}
              height={300}
              borderRadius={50}
              margin={{ left: 104 }}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="">
              Staff Satisfaction
              <hr />
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Unsatisfied" },
                    { id: 1, value: 15, label: "Satisfied" },
                    { id: 2, value: 20, label: "Highly satisfied" },
                    { id: 3, value: 20, label: "Unknown" },
                  ],
                  highlightScope: { fade: "global", highlight: "item" },
                  innerRadius:100,
                  faded: {
                    innerRadius: 100,
                    additionalRadius: -10,
                    color: "gray",
                  },
                },
              ]}
              
              // width={400}
              height={300}
            />
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default KpiCard1;
