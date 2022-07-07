import _ from "@lodash";
import mock from "../mock";

const activityAppDB = {
  widgets: [
    {
      id: "Activity_AppRegister_Table",
      title: "",
      table: {
        headers: [
          { id: "No", value: "No", type: false, color: "", sort: true },
          {
            id: "Client Name",
            value: "Client Name",
            type: false,
            color: "",
            sort: true,
          },
          {
            id: "Policy(Tracking) Number or Description",
            value: "Policy(Tracking) Number or Description",
            type: false,
            color: "",
            disablePadding: false,
            sort: true,
          },
          {
            id: "Date Product Is Written",
            value: "Date Product Is Written",
            type: false,
            color: "",
            disablePadding: false,
            sort: true,
          },
          {
            id: "Date Product Is Issued",
            value: "Date Product Is Issued",
            type: false,
            color: "",
            disablePadding: false,
            sort: true,
          },
          {
            id: "Product Line",
            value: "Product Line",
            type: false,
            color: "",
            disablePadding: false,
            sort: true,
          },
          {
            id: "Product Type",
            value: "Product Type",
            type: false,
            color: "",
            disablePadding: false,
            sort: true,
          },
          {
            id: "Marketing Source",
            value: "Marketing Source",
            type: false,
            color: "",
            disablePadding: false,
            sort: true,
          },
          {
            id: "Product Dollars",
            value: "Product Dollars",
            type: false,
            color: "",
            disablePadding: false,
            sort: true,
          },
          {
            id: "Bonus",
            value: "Bonus",
            type: false,
            color: "",
            disablePadding: false,
            sort: true,
          },
          {
            id: "Month Written",
            value: "Month Written",
            type: false,
            color: "",
            disablePadding: false,
            sort: true,
          },
          {
            id: "Month Issued",
            value: "Month Issued",
            type: false,
            color: "",
            disablePadding: false,
            sort: true,
          },
        ],
        columns: [],
        rows: [],
        tableContent: {},
      },
    },
  ],
};

mock.onGet("/api/activity-app/widgets").reply((config) => {
  return [200, activityAppDB.widgets];
});
