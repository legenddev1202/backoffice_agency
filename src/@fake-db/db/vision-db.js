import _ from "@lodash";
import mock from "../mock";
import { db, realDb } from "./firebase";

const visionAppDB = {
  widgets: [
    {
      id: "Vision_IncomeGoals_Averages_Table",
      title: "",
      table: {
        columns: [
          {
            id: "avatar",
            title: "",
            color: "",
            align: "center",
            rowSpan: 2,
          },
          {
            id: "id",
            title: "Averages Per Item",
            color: "",
            colSpan: 5,
          },
        ],
        headers: [
          { id: "Auto", value: "Auto", type: false, color: "" },
          { id: "Fire", value: "Fire", type: false, color: "" },
          { id: "Life", value: "Life", type: false, color: "" },
          { id: "Health", value: "Health", type: false, color: "" },
          { id: "Bank", value: "Bank", type: false, color: "" },
        ],
        rows: [
          {
            id: "Average Bonus",
            value: "Average Bonus",
            color: "",
            endAdornment: "%",
          },
          {
            id: "Average Annual Premium",
            value: "Average Annual Premium",
            color: "",
            startAdornment: "$",
          },
        ],
        tableContent: {
          "Average Bonus": {
            Auto: 0,
            Fire: 0,
            Life: 0,
            Health: 0,
            Bank: 0,
          },
          "Average Annual Premium": {
            Auto: 0,
            Fire: 0,
            Life: 0,
            Health: 0,
            Bank: 0,
          },
        },
      },
    },
    {
      id: "Vision_IncomeGoals_Goals_Table",
      title: "",
      table: {
        columns: [],
        headers: [],
        rows: [
          { id: "January", value: "January", color: "" },
          { id: "February", value: "February", color: "" },
          { id: "March", value: "March", color: "" },
          { id: "April", value: "April", color: "" },
          { id: "May", value: "May", color: "" },
          { id: "June", value: "June", color: "" },
          { id: "July", value: "July", color: "" },
          { id: "August", value: "August", color: "" },
          { id: "September", value: "September", color: "" },
          { id: "October", value: "October", color: "" },
          { id: "November", value: "November", color: "" },
          { id: "December", value: "December", color: "" },
          {
            id: "Quarter 1 Totals",
            value: "Quarter 1 Totals",
            border: "border-t-4",
            readOnly: true,
          },
          { id: "Quarter 2 Totals", value: "Quarter 2 Totals", readOnly: true },
          { id: "Quarter 3 Totals", value: "Quarter 3 Totals", readOnly: true },
          { id: "Quarter 4 Totals", value: "Quarter 4 Totals", readOnly: true },
          {
            id: "Annual Totals",
            value: "Annual Totals",
            border: "border-t-4",
            readOnly: true,
          },
          {
            id: "Projected for Year",
            value: "Projected for Year",
            border: "border-t-4",
            readOnly: true,
          },
        ],
        tableContent: {},
      },
    },
    {
      id: "Vision_IncomeGoals_Bonuses_Table",
      title: "",
      table: {
        columns: [],
        headers: [],
        rows: [
          { id: "January", value: "January", color: "" },
          { id: "February", value: "February", color: "" },
          { id: "March", value: "March", color: "" },
          { id: "April", value: "April", color: "" },
          { id: "May", value: "May", color: "" },
          { id: "June", value: "June", color: "" },
          { id: "July", value: "July", color: "" },
          { id: "August", value: "August", color: "" },
          { id: "September", value: "September", color: "" },
          { id: "October", value: "October", color: "" },
          { id: "November", value: "November", color: "" },
          { id: "December", value: "December", color: "" },
          {
            id: "Quarter 1 Totals",
            value: "Quarter 1 Totals",
            border: "border-t-4",
            readOnly: true,
          },
          { id: "Quarter 2 Totals", value: "Quarter 2 Totals", readOnly: true },
          { id: "Quarter 3 Totals", value: "Quarter 3 Totals", readOnly: true },
          { id: "Quarter 4 Totals", value: "Quarter 4 Totals", readOnly: true },
          {
            id: "Annual Totals",
            value: "Annual Totals",
            border: "border-t-4",
            readOnly: true,
          },
          {
            id: "Projected for Year",
            value: "Projected for Year",
            border: "border-t-4",
            readOnly: true,
          },
        ],
        tableContent: {},
      },
    },
  ],
};

mock.onGet("/api/vision-app/vision").reply(() => {
  return [200, visionAppDB.vision];
});

mock.onPost("/api/vision-app/vision/save").reply((request) => {
  var belongTo = localStorage.getItem("@BELONGTO");
  var UID = localStorage.getItem("@UID");
  const data = JSON.parse(request.data);
  let product = data;

  realDb.ref(`Vision/${data.year}/${belongTo}/${data.userId}`).set({
    Averages: data.Averages,
    Bonuses: data.Bonuses,
    Goals: data.Goals,
  });

  return [200, product];
});

mock.onGet("/api/vision-app/widgets").reply((config) => {
  return [200, visionAppDB.widgets];
});
