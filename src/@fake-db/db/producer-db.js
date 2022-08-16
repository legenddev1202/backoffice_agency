import mock from "../mock";
import { db, realDb } from "./firebase";

const producerAppDB = {
  widgets: [
    {
      id: "Producer_PolicesAndBank_Premium_Chart",
      title: "POLICY PRODUCTION BY PERSON",
      mainChart: {
        TW: {
          labels: [],
          datasets: [
            {
              type: "bar",
              label: "Total Bank",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#f9cfcf",
              hoverBackgroundColor: "#ffcece",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Total Health",
              data: [],
              backgroundColor: "#42BFF7",
              hoverBackgroundColor: "#87CDF7",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Total Life",
              data: [],
              backgroundColor: "#C6ECFD",
              hoverBackgroundColor: "#D7EFFD",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Total Fire",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#f9cfcf",
              hoverBackgroundColor: "#ffcece",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Total Auto",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "top",
          },
          tooltips: {
            mode: "label",
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                display: true,
                gridLines: {
                  display: true,
                },
                labels: [],
              },
            ],
            yAxes: [
              {
                stacked: true,
                type: "linear",
                display: true,
                position: "left",
                gridLines: {
                  display: true,
                },
                labels: {
                  show: true,
                },
              },
            ],
          },
        },
      },
    },
    {
      id: "Producer_PolicesAndBank_Bank_Chart",
      title: "Bank Sales by Product Type",
      mainChart: {
        TW: {
          labels: [],
          datasets: [
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Name1",
              data: [20, 25, 22, 12, 12, 50, 45, 7, 8, 10, 56, 22],
              backgroundColor: "#42BFF7",
              hoverBackgroundColor: "#87CDF7",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Name2",
              data: [11, 8, 10, 50, 45, 7, 8, 10, 17, 45, 56, 22],
              backgroundColor: "#C6ECFD",
              hoverBackgroundColor: "#D7EFFD",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Name3",
              barPercentage: 0.5,
              data: [45, 7, 8, 10, 17, 45, 76, 23, 77, 31, 56, 22],
              backgroundColor: "#f9cfcf",
              hoverBackgroundColor: "#ffcece",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Name4",
              barPercentage: 0.5,
              data: [67, 34, 34, 20, 25, 34, 20, 25, 56, 22, 56, 22],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Name5",
              barPercentage: 0.5,
              data: [67, 34, 34, 20, 25, 34, 20, 25, 56, 22, 56, 22],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Name6",
              barPercentage: 0.5,
              data: [67, 34, 34, 20, 25, 34, 20, 25, 56, 22, 56, 22],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Name7",
              barPercentage: 0.5,
              data: [67, 34, 34, 20, 25, 34, 20, 25, 56, 22, 56, 22],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Name8",
              barPercentage: 0.5,
              data: [67, 34, 34, 20, 25, 34, 20, 25, 56, 22, 56, 22],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Name9",
              barPercentage: 0.5,
              data: [67, 34, 34, 20, 25, 34, 20, 25, 56, 22, 56, 22],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Name10",
              barPercentage: 0.5,
              data: [67, 34, 34, 20, 25, 34, 20, 25, 56, 22, 56, 22],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Name11",
              barPercentage: 0.5,
              data: [67, 34, 34, 20, 25, 34, 20, 25, 56, 22, 56, 22],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Name12",
              barPercentage: 0.5,
              data: [67, 34, 34, 20, 25, 34, 20, 25, 56, 22, 56, 22],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "top",
          },
          tooltips: {
            mode: "label",
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                display: true,
                gridLines: {
                  display: true,
                },
                labels: [
                  "Label1",
                  "Label2",
                  "Label3",
                  "Label4",
                  "Label5",
                  "Label6",
                  "Label7",
                  "Label8",
                  "Label9",
                  "Label10",
                  "Label11",
                  "Label12",
                ],
              },
            ],
            yAxes: [
              {
                stacked: true,
                type: "linear",
                display: true,
                position: "left",
                gridLines: {
                  display: true,
                },
                labels: {
                  show: true,
                },
              },
            ],
          },
        },
      },
    },
    {
      id: "Producer_StaffSources_SourcesOfBusiness_Chart",
      title: "Team Member Marketing Source of Use",
      mainChart: {
        TW: {
          labels: [],
          datasets: [],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "top",
          },
          tooltips: {
            mode: "label",
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                display: true,
                gridLines: {
                  display: true,
                },
                labels: [],
              },
            ],
            yAxes: [
              {
                stacked: true,
                type: "linear",
                display: true,
                position: "left",
                gridLines: {
                  display: true,
                },
                labels: {
                  show: true,
                },
              },
            ],
          },
        },
      },
    },
    {
      id: "Producer_GoalsAndActual_SalesGoals_Chart",
      title: "Production Goal Vs Actual",
      mainChart: {
        TW: {
          labels: [],
          datasets: [
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Goal",
              data: [],
              backgroundColor: "#42BFF7",
              hoverBackgroundColor: "#87CDF7",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Actual",
              data: [],
              backgroundColor: "#C6ECFD",
              hoverBackgroundColor: "#D7EFFD",
              categoryPercentage: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "bottom",
          },
          tooltips: {
            mode: "label",
          },
          scales: {
            xAxes: [
              {
                stacked: false,
                display: true,
                gridLines: {
                  display: true,
                },
                labels: ["Auto", "Fire", "Life", "Health", "Bank", "Total"],
              },
            ],
            yAxes: [
              {
                stacked: false,
                type: "linear",
                display: true,
                position: "left",
                gridLines: {
                  display: true,
                },
                labels: {
                  show: true,
                },
              },
            ],
          },
        },
      },
    },
    {
      id: "Producer_GoalsAndActual_ActivityGoals_Chart",
      title: "Other activites",
      mainChart: {
        TW: {
          labels: [],
          datasets: [
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Goal",
              data: [],
              backgroundColor: "#42BFF7",
              hoverBackgroundColor: "#87CDF7",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Actual",
              data: [],
              backgroundColor: "#C6ECFD",
              hoverBackgroundColor: "#D7EFFD",
              categoryPercentage: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "bottom",
          },
          tooltips: {
            mode: "label",
          },
          scales: {
            xAxes: [
              {
                stacked: false,
                display: true,
                gridLines: {
                  display: true,
                },
                labels: ["Auto", "Fire", "Life", "Health", "Bank", "Total"],
              },
            ],
            yAxes: [
              {
                stacked: false,
                type: "linear",
                display: true,
                position: "left",
                gridLines: {
                  display: true,
                },
                labels: {
                  show: true,
                },
              },
            ],
          },
        },
      },
    },
    {
      id: "StaffMultiline_Summary_Policies_Chart",
      title: "Policies by Person",
      mainChart: {
        TW: {
          labels: [],
          datasets: [
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Auto",
              data: [],
              backgroundColor: "#42BFF7",
              hoverBackgroundColor: "#87CDF7",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Fire",
              data: [],
              backgroundColor: "#C6ECFD",
              hoverBackgroundColor: "#D7EFFD",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Life",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#f9cfcf",
              hoverBackgroundColor: "#ffcece",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Health",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Bank",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#f9cfcf",
              hoverBackgroundColor: "#ffcece",
              categoryPercentage: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "top",
          },
          tooltips: {
            mode: "label",
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                display: true,
                gridLines: {
                  display: true,
                },
                labels: [],
              },
            ],
            yAxes: [
              {
                stacked: true,
                type: "linear",
                display: true,
                position: "left",
                gridLines: {
                  display: true,
                },
                labels: {
                  show: true,
                },
              },
            ],
          },
        },
      },
    },
    {
      id: "StaffMultiline_Summary_Producer_Chart",
      title: "Producer Contribution to Total Production by Producer Line",
      mainChart: {
        TW: {
          labels: [],
          datasets: [],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "bottom",
          },
          tooltips: {
            mode: "label",
          },
          scales: {
            yAxes: [
              {
                stacked: true,
                display: true,
                gridLines: {
                  display: true,
                },
                labels: ["Bank", "Health", "Life", "Fire", "Auto"],
              },
            ],
            xAxes: [
              {
                stacked: true,
                type: "linear",
                display: true,
                position: "left",
                gridLines: {
                  display: true,
                },
                labels: {
                  show: true,
                },
              },
            ],
          },
        },
      },
    },
    {
      id: "Producer_StaffMultiline_Ratios_Chart_1",
      title:
        "MULILINE RATIO - Life, Health & Bank Production per P&C(Auto/Fire) Policy Solid",
      mainChart: {
        TW: {
          labels: [],
          datasets: [
            {
              type: "bar",
              label: "Life",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#f9cfcf",
              hoverBackgroundColor: "#ffcece",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Health",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Bank",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#f9cfcf",
              hoverBackgroundColor: "#ffcece",
              categoryPercentage: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "top",
          },
          tooltips: {
            mode: "label",
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                display: true,
                gridLines: {
                  display: true,
                },
                labels: [],
              },
            ],
            yAxes: [
              {
                stacked: true,
                type: "linear",
                display: true,
                position: "left",
                gridLines: {
                  display: true,
                },
                labels: {
                  show: true,
                },
              },
            ],
          },
        },
      },
    },
    {
      id: "Producer_StaffMultiline_Ratios_Chart_2",
      title: "Percent of Total Production By Product for Each Producer",
      mainChart: {
        TW: {
          labels: [],
          datasets: [
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Auto",
              data: [],
              backgroundColor: "#42BFF7",
              hoverBackgroundColor: "#87CDF7",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              barPercentage: 0.5,
              label: "Fire",
              data: [],
              backgroundColor: "#C6ECFD",
              hoverBackgroundColor: "#D7EFFD",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Life",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#f9cfcf",
              hoverBackgroundColor: "#ffcece",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Health",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#77ff99",
              hoverBackgroundColor: "#c9ffd6",
              categoryPercentage: 1,
            },
            {
              type: "bar",
              label: "Bank",
              barPercentage: 0.5,
              data: [],
              backgroundColor: "#f9cfcf",
              hoverBackgroundColor: "#ffcece",
              categoryPercentage: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "top",
          },
          tooltips: {
            mode: "label",
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                display: true,
                gridLines: {
                  display: true,
                },
                labels: [],
              },
            ],
            yAxes: [
              {
                stacked: true,
                type: "linear",
                display: true,
                position: "left",
                gridLines: {
                  display: true,
                },
                labels: {
                  show: true,
                },
              },
            ],
          },
        },
      },
    },
    {
      id: "Producer_StaffSources_ProductSales_PieChart",
      title: "Product Sales by Marketing Source",
      mainChart: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
          },
        ],
        options: {
          cutoutPercentage: 0,
          spanGaps: false,
          legend: {
            display: true,
            position: "bottom",
            labels: {
              padding: 16,
              usePointStyle: true,
            },
          },
          maintainAspectRatio: false,
        },
      },
    },
    {
      id: "Producer_StaffSources_Production_PieChart",
      title: "Production by Product",
      mainChart: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
          },
        ],
        options: {
          cutoutPercentage: 0,
          spanGaps: false,
          legend: {
            display: true,
            position: "bottom",
            labels: {
              padding: 16,
              usePointStyle: true,
            },
          },
          maintainAspectRatio: false,
        },
      },
    },
    {
      id: "Producer_GoalsAndActual_AgencyGoals_Table",
      title: "Production Goal Vs Actual",
      table: {
        columns: [
          {
            id: "avatar",
            title: "Users",
            color: "",
            align: "center",
            colSpan: 1,
            rowSpan: 2,
          },
          {
            id: "auto",
            title: "Auto",
            color: "",
            colSpan: 2,
          },
          {
            id: "fire",
            title: "Fire",
            color: "",
            colSpan: 2,
          },
          {
            id: "life",
            title: "Life",
            color: "",
            colSpan: 2,
          },
          {
            id: "health",
            title: "Health",
            color: "",
            colSpan: 2,
          },
          {
            id: "bank",
            title: "Bank",
            color: "",
            colSpan: 2,
          },
          {
            id: "total",
            title: "Total",
            color: "",
            colSpan: 2,
          },
        ],
        rows: [],
        headers: [
          { value: "Auto@Goals", type: true, color: "" },
          { value: "Auto@Actual", type: true, color: "" },
          { value: "Fire@Goals", type: true, color: "" },
          { value: "Fire@Actual", type: true, color: "" },
          { value: "Life@Goals", type: true, color: "" },
          { value: "Life@Actual", type: true, color: "" },
          { value: "Health@Goals", type: true, color: "" },
          { value: "Health@Actual", type: true, color: "" },
          { value: "Bank@Goals", type: true, color: "" },
          { value: "Bank@Actual", type: true, color: "" },
          { value: "Total@Goals", type: true, color: "" },
          { value: "Total@Actual", type: true, color: "" },
        ],
        tableContent: {},
      },
    },
    {
      id: "Producer_GoalsAndActual_OtherActivities_Table",
      title: "Other activites",
      table: {
        columns: [
          {
            id: "avatar",
            title: "Users",
            color: "",
            align: "center",
            colSpan: 1,
            rowSpan: 2,
          },
          {
            id: "multilineReview",
            title: "Multiline Review Appt. Kept",
            color: "",
            colSpan: 2,
          },
          {
            id: "ifr",
            title: "IFR",
            color: "",
            colSpan: 2,
          },
          {
            id: "ifrCompleted",
            title: "IFR Completed",
            color: "",
            colSpan: 2,
          },
          {
            id: "auto",
            title: "Auto Policies Bought In",
            color: "",
            colSpan: 2,
          },
          {
            id: "fire",
            title: "Fire Policies Bought In",
            color: "",
            colSpan: 2,
          },
          {
            id: "life",
            title: "Life Policies Bought In",
            color: "",
            colSpan: 2,
          },
          {
            id: "health",
            title: "Health Policies Bought In",
            color: "",
            colSpan: 2,
          },
          {
            id: "bank",
            title: "Bank Documents Bought In",
            color: "",
            colSpan: 2,
          },
          {
            id: "total",
            title: "Total",
            color: "",
            colSpan: 2,
          },
        ],
        rows: [],
        headers: [
          { value: "Multiline Review Appt. Kept@Goals", type: true, color: "" },
          {
            value: "Multiline Review Appt. Kept@Actual",
            type: true,
            color: "",
          },
          { value: "IFR@Goals", type: true, color: "" },
          { value: "IFR@Actual", type: true, color: "" },
          { value: "IFR Completed@Goals", type: true, color: "" },
          { value: "IFR Completed@Actual", type: true, color: "" },
          { value: "Auto Policies Bought In@Goals", type: true, color: "" },
          { value: "Auto Policies Bought In@Actual", type: true, color: "" },
          { value: "Fire Policies Bought In@Goals", type: true, color: "" },
          { value: "Fire Policies Bought In@Actual", type: true, color: "" },
          { value: "Life Policies Bought In@Goals", type: true, color: "" },
          { value: "Life Policies Bought In@Actual", type: true, color: "" },
          { value: "Health Policies Bought In@Goals", type: true, color: "" },
          { value: "Health Policies Bought In@Actual", type: true, color: "" },
          { value: "Bank Policies Bought In@Goals", type: true, color: "" },
          { value: "Bank Policies Bought In@Actual", type: true, color: "" },
          { value: "Total@Goals", type: true, color: "" },
          { value: "Total@Actual", type: true, color: "" },
        ],
        tableContent: {},
      },
    },
    {
      id: "Producer_PoliciesAndBank_AutoAndFire_Table",
      title: "",
      table: {
        columns: [],
        rows: [],
        headers: [],
        tableContent: {},
      },
    },
    {
      id: "Producer_StaffSources_Auto_Table",
      title: "",
      table: {
        columns: [],
        rows: [],
        headers: [],
        tableContent: {},
      },
    },
    {
      id: "Producer_StaffSources_Fire_Table",
      title: "",
      table: {
        columns: [],
        rows: [],
        headers: [],
        tableContent: {},
      },
    },
    {
      id: "Producer_StaffSources_Life_Table",
      title: "",
      table: {
        columns: [],
        rows: [],
        headers: [],
        table: {
          columns: [],
          rows: [],
          headers: [],
          tableContent: {},
        },
      },
    },
    {
      id: "Producer_StaffSources_Health_Table",
      title: "",
      table: {
        columns: [],
        rows: [],
        headers: [],
        tableContent: {},
      },
    },
    {
      id: "Producer_StaffSources_Bank_Table",
      title: "",
      table: {
        columns: [],
        rows: [],
        headers: [],
        tableContent: {},
      },
    },
    {
      id: "Producer_StaffSources_Total_Table",
      title: "",
      table: {
        columns: [],
        rows: [],
        headers: [],
        tableContent: {},
      },
    },
    {
      id: "Producer_StaffSources_ViewGrid_Table",
      title: "",
      table: {
        columns: [],
        rows: [],
        headers: [
          { id: 1, value: "Sources", type: true, color: "" },
          { id: 2, value: "Auto", type: true, color: "" },
          { id: 3, value: "Fire", type: true, color: "" },
          { id: 4, value: "Life", type: true, color: "" },
          { id: 5, value: "Health", type: true, color: "" },
          { id: 6, value: "Bank", type: true, color: "" },
          { id: 7, value: "Total", type: true, color: "" },
        ],
        tableContent: {},
      },
    },
    {
      id: "Producer_StaffMultiline_Summary_Table",
      title: "Multi-Line Production Summary Report",
      table: {
        columns: [
          {
            id: "avatar",
            title: "Producer",
            color: "",
            align: "center",
            colSpan: 1,
            rowSpan: 2,
          },
          {
            id: "auto",
            title: "AUTO",
            color: "",
            colSpan: 5,
          },
          {
            id: "fire",
            title: "FIRE",
            color: "",
            colSpan: 5,
          },
          {
            id: "life",
            title: "LIFE",
            color: "",
            colSpan: 4,
          },
          {
            id: "health",
            title: "HEALTH",
            color: "",
            colSpan: 4,
          },
          {
            id: "bank",
            title: "BANK",
            color: "",
            colSpan: 4,
          },
          {
            id: "total",
            title: "TOTAL",
            color: "",
            colSpan: 4,
          },
          {
            id: "ml",
            title: "ML",
            color: "",
            colSpan: 1,
          },
        ],
        rows: [],
        headers: [
          { id: 1, value: "Auto@Policies", type: true, color: "" },
          {
            id: 2,
            value: "Auto@Annual Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 3,
            value: "Auto@Average Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 4,
            value: "Auto@Auto Bonus",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 44,
            value: "Auto@Multiline Percentage",
            type: true,
            color: "",
            endAdornment: "%",
          },
          { id: 5, value: "Fire@Policies", type: true, color: "" },
          {
            id: 6,
            value: "Fire@Annual Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 7,
            value: "Fire@Average Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 8,
            value: "Fire@Auto Bonus",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 88,
            value: "Fire@Multiline Percentage",
            type: true,
            color: "",
            endAdornment: "%",
          },
          { id: 9, value: "Life@Policies", type: true, color: "" },
          {
            id: 10,
            value: "Life@Annual Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 11,
            value: "Life@Average Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 12,
            value: "Life@Auto Bonus",
            type: true,
            color: "",
            startAdornment: "$",
          },
          { id: 13, value: "Health@Policies", type: true, color: "" },
          {
            id: 14,
            value: "Health@Annual Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 15,
            value: "Health@Average Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 16,
            value: "Health@Auto Bonus",
            type: true,
            color: "",
            startAdornment: "$",
          },
          { id: 17, value: "Bank@Policies", type: true, color: "" },
          {
            id: 18,
            value: "Bank@Annual Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 19,
            value: "Bank@Average Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 20,
            value: "Bank@Auto Bonus",
            type: true,
            color: "",
            startAdornment: "$",
          },
          { id: 21, value: "Total@Policies", type: true, color: "" },
          {
            id: 22,
            value: "Total@Annual Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 23,
            value: "Total@Average Premium",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 24,
            value: "Total@Auto Bonus",
            type: true,
            color: "",
            startAdornment: "$",
          },
          {
            id: 25,
            value: "Multiline Ratio",
            type: true,
            color: "",
            endAdornment: "%",
          },
        ],
        tableContent: {},
      },
    },
    {
      id: "Producer_StaffMultiline_Ratio_Table",
      title: "",
      table: {
        columns: [
          {
            id: "avatar",
            title: "Producer",
            color: "",
            align: "center",
            colSpan: 1,
            rowSpan: 2,
          },
          {
            id: "auto",
            title: "For Every Auto, There Are",
            color: "",
            colSpan: 4,
          },
          {
            id: "fire",
            title: "For Every Fire, There Are",
            color: "",
            colSpan: 4,
          },
          {
            id: "life",
            title: "For Every Life, There Are",
            color: "",
            colSpan: 4,
          },
          {
            id: "health",
            title: "For Every Health, There Are",
            color: "",
            colSpan: 4,
          },
          {
            id: "bank",
            title: "For Every Bank, There Are",
            color: "",
            colSpan: 4,
          },
          {
            id: "product",
            title: "For Every P&C Product",
            color: "",
            colSpan: 4,
          },
          {
            id: "total",
            title: "Percent of Total",
            color: "",
            colSpan: 5,
          },
        ],
        headers: [
          { id: 1, value: "Auto@Fire", type: true, color: "" },
          { id: 2, value: "Auto@Life", type: true, color: "" },
          { id: 3, value: "Auto@Health", type: true, color: "" },
          { id: 4, value: "Auto@Bank", type: true, color: "" },
          { id: 5, value: "Fire@Auto", type: true, color: "" },
          { id: 6, value: "Fire@Life", type: true, color: "" },
          { id: 7, value: "Fire@Health", type: true, color: "" },
          { id: 8, value: "Fire@Bank", type: true, color: "" },
          { id: 9, value: "Life@Auto", type: true, color: "" },
          { id: 10, value: "Life@Fire", type: true, color: "" },
          { id: 11, value: "Life@Health", type: true, color: "" },
          { id: 12, value: "Life@Bank", type: true, color: "" },
          { id: 13, value: "Health@Auto", type: true, color: "" },
          { id: 14, value: "Health@Fire", type: true, color: "" },
          { id: 15, value: "Health@Life", type: true, color: "" },
          { id: 16, value: "Health@Bank", type: true, color: "" },
          { id: 17, value: "Bank@Auto", type: true, color: "" },
          { id: 18, value: "Bank@Fire", type: true, color: "" },
          { id: 19, value: "Bank@Life", type: true, color: "" },
          { id: 20, value: "Bank@Health", type: true, color: "" },
          { id: 21, value: "Auto&Fire@Life", type: true, color: "" },
          { id: 22, value: "Auto&Fire@Health", type: true, color: "" },
          { id: 23, value: "Auto&Fire@Bank", type: true, color: "" },
          { id: 24, value: "Total L/H/B", type: true, color: "" },
          { id: 25, value: "Auto", type: true, color: "" },
          { id: 26, value: "Fire", type: true, color: "" },
          { id: 27, value: "Life", type: true, color: "" },
          { id: 28, value: "Health", type: true, color: "" },
          { id: 29, value: "Bank", type: true, color: "" },
        ],
        rows: [],
        tableContent: {},
      },
    },
  ],
  projects: [
    {
      id: 1,
      name: "ACME Corp. Backend App",
    },
    {
      id: 2,
      name: "ACME Corp. Frontend App",
    },
    {
      id: 3,
      name: "Creapond",
    },
    {
      id: 4,
      name: "Withinpixels",
    },
  ],
  users: [],
};

mock.onGet("/api/producer-app/widgets").reply((config) => {
  return [200, producerAppDB.widgets];
});

mock.onGet("/api/producer-app/projects").reply((config) => {
  return [200, producerAppDB.projects];
});

mock.onGet("/api/producer-app/users").reply(
  () =>
    new Promise((resolve, reject) => {
      var starCountRef = realDb.ref(`users/`);
      starCountRef.on("value", (snapshot) => {
        const data = snapshot.val();

        if (data) {
          Object.keys(data).map((item) => {
            producerAppDB.users.push(data[item]);
          });
        }

        resolve(producerAppDB.users);
      });
    })
);
