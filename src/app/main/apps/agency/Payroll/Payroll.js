import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import FuseAnimate from "@fuse/core/FuseAnimate";
import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup";
import FusePageSimple from "@fuse/core/FusePageSimple";
import FusePageCarded from "@fuse/core/FusePageCarded";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import FuseLoading from "@fuse/core/FuseLoading";
import withReducer from "app/store/withReducer";
import { makeStyles } from "@material-ui/core/styles";
import _ from "@lodash";
import reducer from "../store";
import Table from "../../../components/widgets/Table";
import SpecialTable from "../../../components/widgets/SpecialTable";
import Chart from "../../../components/widgets/BarChart";
import PieChart from "../../../components/widgets/PieChart";
import SelectBox from "../../../components/CustomSelectBox";
import Header from "../../../components/widgets/Header";
import { getWidgets, selectWidgets } from "../store/widgetsSlice";
import { getUsers, selectUsers } from "../store/usersSlice";
import { getBonusPlans, selectBonusPlans } from "../store/bonusPlansSlice";
import { getLapseRate, selectLapseRate } from "../store/lapseRateSlice";
import {
  getPolicyGrowth,
  selectPolicyGrowth,
} from "../store/policyGrowthSlice";
import { getEntries, selectEntries } from "../store/entriesSlice";
import {
  getBonusVerified,
  selectBonusVerified,
  saveBonusVerified,
} from "../store/bonusVerifiedSlice";
import { months, Options as options, policies } from "../../../utils/Globals";
import { dividing, getLevel, getMain } from "../../../utils/Function";
import DownloadBtn from "app/fuse-layouts/shared-components/DownloadButton";

const belongTo = localStorage.getItem("@BELONGTO");
const UID = localStorage.getItem("@UID");

let years = {
  id: "Year",
  data: [],
};

let yearData = [];
for (let i = 2020; i < moment().format("yyyy"); i++) {
  yearData.push({ item: i, value: i });
}
years = { ...years, data: [...yearData] };

function Payroll(props) {
  const dispatch = useDispatch();
  let widgets = useSelector(selectWidgets);
  const users = useSelector(selectUsers);
  const bonusPlans = useSelector(selectBonusPlans);
  const lapseRate = useSelector(selectLapseRate);
  const policyGrowth = useSelector(selectPolicyGrowth);
  const entries = useSelector(selectEntries);
  let bonusVerified = useSelector(selectBonusVerified);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [main, setMain] = useState({});
  const [production, setProduction] = useState("Show Written Production");
  const [bonus, setBonus] = useState("Include Initial Bonus in Calculation");
  const [user, setUser] = useState(UID);
  const [year, setYear] = useState(moment().format("yyyy"));
  const [period, setPeriod] = useState(moment().format("MMMM"));
  const [tabValue, setTabValue] = useState(0);
  const [title, setTitle] = useState("Payroll");

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getBonusPlans());
    dispatch(getLapseRate(year));
    dispatch(getPolicyGrowth(year));
    dispatch(getEntries(year));
    dispatch(getBonusVerified(year));
    dispatch(getWidgets()).then(() => setLoading(false));
  }, [dispatch, year, production, period, tabValue]);

  useEffect(() => {
    if (users.length > 0) {
      const temp = getMain(
        entries,
        bonusPlans,
        [],
        users,
        [],
        lapseRate,
        policyGrowth
      );
      setMain(temp);
    }
  }, [entries, bonusPlans, users, lapseRate, policyGrowth]);

  useEffect(() => {
    if (!_.isEmpty(widgets) && !_.isEmpty(main)) {
      if (widgets.Agency_Payroll_Table) {
        let tableRows = [
          {
            id: "Total",
            value: "Total",
            color: "",
            border: "border-b-4",
            uid: "Total",
          },
        ];
        let tableContent = {
          Total: {},
        };
        const tableHeaders = widgets.Agency_Payroll_Table.table.headers;

        users.map((user, row) => {
          if (user.belongTo === UID) {
            tableRows.push({
              id: user.data.displayName,
              value: user.data.displayName,
              color: "",
              border: "",
              uid: user.uid,
            });

            let totalPolicies = 0;
            let totalBonuses = 0;
            tableContent[user.data.displayName] = {};
            tableHeaders.map((header, col) => {
              let value = 0;
              if (header.value !== "Producer") {
                if (!tableContent["Total"].hasOwnProperty(header.value)) {
                  tableContent["Total"][header.value] = 0;
                }
                if (col < 11) {
                  const t =
                    header.value.split(" ")[1] === "Commission"
                      ? "Bonuses"
                      : header.value.split(" ")[1];
                  value =
                    main[production][period][user.id][
                      header.value.split(" ")[0]
                    ][t];
                }

                // getting IndividualTargetBonuses & Team Target Bonuses
                else if (
                  header.value === "Individual Target Bonuses" ||
                  header.value === "Team Target Bonuses"
                ) {
                  if (bonusPlans.length > 0) {
                    let indTargetBonuses = 0;
                    let teamTargetBonus = 0;
                    policies.map((policy) => {
                      if (policy.value !== "Total") {
                        const policyCount =
                          main[production][period][user.id][policy.value][
                            "Policies"
                          ];
                        indTargetBonuses += parseFloat(
                          ((main[production][period][user.id]["Auto"][
                            "Premium"
                          ] /
                            2 +
                            main[production][period][user.id]["Fire"][
                              "Premium"
                            ]) *
                            getLevel(policyCount, policy.value, bonusPlans)
                              .amount) /
                            100
                        );
                        teamTargetBonus += parseFloat(
                          getLevel(
                            policyCount,
                            `Team${policy.value}`,
                            bonusPlans
                          ).amount
                        );
                      }
                    });
                    if (header.value === "Individual Target Bonuses") {
                      value = indTargetBonuses;
                    } else if (header.value === "Team Target Bonuses") {
                      value = teamTargetBonus;
                    }
                  }
                }

                // getting Lapse Rate Bonus
                else if (header.value === "Lapse Rate % Bonus") {
                  value =
                    parseFloat(
                      main[production][period][user.id]["Auto"]["lapseBonus"]
                    ) +
                    parseFloat(
                      main[production][period][user.id]["Fire"]["lapseBonus"]
                    );
                }

                // getting Policy Growth Bonus
                else if (header.value === "Policy Growth Bonuses") {
                  value =
                    parseFloat(
                      main[production][period][user.id]["Auto"]["growthBonus"]
                    ) +
                    parseFloat(
                      main[production][period][user.id]["Fire"]["growthBonus"]
                    );
                }

                // getting Special Promotion
                else if (header.value === "Special Promotion") {
                  value =
                    parseFloat(
                      main[production][period][user.id]["Auto"][
                        "specialPromotion"
                      ]
                    ) +
                    parseFloat(
                      main[production][period][user.id]["Fire"][
                        "specialPromotion"
                      ]
                    );
                } else if (header.value === "Bonus Verified?") {
                  value =
                    bonusVerified.length > 0 &&
                    bonusVerified[0].hasOwnProperty(user.id) &&
                    bonusVerified[0][user.id].hasOwnProperty(period) &&
                    bonusVerified[0][user.id][period].hasOwnProperty("checked")
                      ? bonusVerified[0][user.id][period].checked
                      : false;
                } else if (header.value === "Amount Paid to Producer") {
                  value =
                    bonusVerified.length > 0 &&
                    bonusVerified[0].hasOwnProperty(user.id) &&
                    bonusVerified[0][user.id].hasOwnProperty(period) &&
                    bonusVerified[0][user.id][period].hasOwnProperty("amount")
                      ? bonusVerified[0][user.id][period].amount
                      : 0;
                }

                totalPolicies += col < 11 && col % 2 === 1 && parseFloat(value);
                totalBonuses +=
                  col > 0 && col < 11 && col % 2 === 0 && parseFloat(value);
                totalBonuses += col > 13 && col < 18 && parseFloat(value);

                tableContent[user.data.displayName][header.value] = value;
                tableContent["Total"][header.value] +=
                  tableContent[user.data.displayName][header.value];
              }
            });
            tableContent[user.data.displayName][
              "Total Policies"
            ] = totalPolicies;
            tableContent[user.data.displayName][
              "Total Bonuses"
            ] = totalBonuses;
            tableContent["Total"]["Total Policies"] =
              tableContent[user.data.displayName]["Total Policies"];
            tableContent["Total"]["Total Bonuses"] =
              tableContent[user.data.displayName]["Total Bonuses"];
          }
        });
        widgets = {
          ...widgets,
          Agency_Payroll_Table: {
            ...widgets.Agency_Payroll_Table,
            table: {
              ...widgets.Agency_Payroll_Table.table,
              rows: tableRows,
            },
          },
        };
        widgets = {
          ...widgets,
          Agency_Payroll_Table: {
            ...widgets.Agency_Payroll_Table,
            table: {
              ...widgets.Agency_Payroll_Table.table,
              tableContent: tableContent,
            },
          },
        };
      }

      // Agency_Payroll_Yearly_Table
      if (widgets.Agency_Payroll_Yearly_Table) {
        let tableRows = [
          {
            id: "Total",
            value: "Total",
            color: "",
            border: "border-b-4",
            uid: "Total",
          },
        ];
        let tableContent = {
          Total: {},
        };
        const tableHeaders = widgets.Agency_Payroll_Yearly_Table.table.headers;

        users.map((user, row) => {
          if (user.belongTo === UID) {
            tableRows.push({
              id: user.data.displayName,
              value: user.data.displayName,
              color: "",
              border: "",
              uid: user.uid,
              role: user.role[0]
            });

            let totalPolicies = 0;
            let totalBonuses = 0;
            tableContent[user.data.displayName] = {};
            tableHeaders.map((header, col) => {
              let value = 0;
              if (header.value !== "Producer") {
                if (!tableContent["Total"].hasOwnProperty(header.value)) {
                  tableContent["Total"][header.value] = 0;
                }
                months.map((month) => {
                  if (col < 9) {
                    const t =
                      header.value.split(" ")[1] === "Commission"
                        ? "Bonuses"
                        : header.value.split(" ")[1];

                    value += parseFloat(
                      main[production][month.value][user.id][
                        header.value.split(" ")[0]
                      ][t]
                    );
                  }

                  // getting IndividualTargetBonuses & Team Target Bonuses
                  else if (
                    header.value === "Individual Target Bonuses" ||
                    header.value === "Team Target Bonuses"
                  ) {
                    if (bonusPlans.length > 0) {
                      let indTargetBonuses = 0;
                      let teamTargetBonus = 0;
                      policies.map((policy) => {
                        if (policy.value !== "Total") {
                          const policyCount =
                            main[production][month.value][user.id][
                              policy.value
                            ]["Policies"];
                          indTargetBonuses += parseFloat(
                            ((main[production][month.value][user.id]["Auto"][
                              "Premium"
                            ] /
                              2 +
                              main[production][month.value][user.id]["Fire"][
                                "Premium"
                              ]) *
                              getLevel(policyCount, policy.value, bonusPlans)
                                .amount) /
                              100
                          );
                          teamTargetBonus += parseFloat(
                            getLevel(
                              policyCount,
                              `Team${policy.value}`,
                              bonusPlans
                            ).amount
                          );
                        }
                      });
                      if (header.value === "Individual Target Bonuses") {
                        value += indTargetBonuses;
                      } else if (header.value === "Team Target Bonuses") {
                        value += teamTargetBonus;
                      }
                    }
                  }

                  // getting Lapse Rate Bonus
                  else if (header.value === "Lapse Rate % Bonus") {
                    value +=
                      parseFloat(
                        main[production][month.value][user.id]["Auto"][
                          "lapseBonus"
                        ]
                      ) +
                      parseFloat(
                        main[production][month.value][user.id]["Fire"][
                          "lapseBonus"
                        ]
                      );
                  }

                  // getting Policy Growth Bonus
                  else if (header.value === "Policy Growth Bonuses") {
                    value +=
                      parseFloat(
                        main[production][month.value][user.id]["Auto"][
                          "growthBonus"
                        ]
                      ) +
                      parseFloat(
                        main[production][month.value][user.id]["Fire"][
                          "growthBonus"
                        ]
                      );
                  }

                  // getting Special Promotion
                  else if (header.value === "Special Promotion") {
                    value +=
                      parseFloat(
                        main[production][month.value][user.id]["Auto"][
                          "specialPromotion"
                        ]
                      ) +
                      parseFloat(
                        main[production][month.value][user.id]["Fire"][
                          "specialPromotion"
                        ]
                      );
                  }
                });

                totalPolicies += col < 9 && col % 2 === 1 && parseFloat(value);
                totalBonuses +=
                  col > 0 && col < 9 && col % 2 === 0 && parseFloat(value);
                totalBonuses += col > 11 && col < 17 && parseFloat(value);
                if(user.role[0]==='admin' || user.role[0]==='agency'){
                  if(header.value.split(' ').includes("Policies")||header.value.split(' ').includes("Commission"))
                  tableContent[user.data.displayName][header.value] = "NaN";
                } else {
                  tableContent[user.data.displayName][header.value] = value;
                  tableContent["Total"][header.value] +=
                  tableContent[user.data.displayName][header.value];
                }
                
              }
            });
            tableContent[user.data.displayName][
              "Total Policies"
            ] = totalPolicies;
            tableContent[user.data.displayName][
              "Total Bonuses"
            ] = totalBonuses;
            tableContent["Total"]["Total Policies"] +=
              tableContent[user.data.displayName]["Total Policies"];
            tableContent["Total"]["Total Bonuses"] +=
              tableContent[user.data.displayName]["Total Bonuses"];
          }
        });
        widgets = {
          ...widgets,
          Agency_Payroll_Yearly_Table: {
            ...widgets.Agency_Payroll_Yearly_Table,
            table: {
              ...widgets.Agency_Payroll_Yearly_Table.table,
              rows: tableRows,
            },
          },
        };
        widgets = {
          ...widgets,
          Agency_Payroll_Yearly_Table: {
            ...widgets.Agency_Payroll_Yearly_Table,
            table: {
              ...widgets.Agency_Payroll_Yearly_Table.table,
              tableContent: tableContent,
            },
          },
        };
      }

      // Agency_Payroll_Summary_Table
      if (widgets.Agency_Payroll_Summary_Table) {
        let tableRows = [
          {
            id: "Total",
            value: "Total",
            color: "",
            border: "border-b-4",
            uid: "Total",
          },
        ];
        let tableContent = {
          Total: {},
        };
        const tableHeaders = widgets.Agency_Payroll_Summary_Table.table.headers;

        months.map((month, row) => {
          // if(user.belongTo === UID) {
          tableRows.push({
            id: month.value,
            value: month.value,
            color: "",
            border: "",
            uid: user.uid,
          });

          let totalPolicies = 0;
          let totalBonuses = 0;
          tableContent[month.value] = {};
          tableHeaders.map((header, col) => {
            let value = 0;
            if (header.value !== "Producer") {
              if (!tableContent["Total"].hasOwnProperty(header.value)) {
                tableContent["Total"][header.value] = 0;
              }
              users.map((user) => {
                if (user.belongTo === UID) {
                  if (col < 9) {
                    const t =
                      header.value.split(" ")[1] === "Commission"
                        ? "Bonuses"
                        : header.value.split(" ")[1];

                    value += parseFloat(
                      main[production][month.value][user.id][
                        header.value.split(" ")[0]
                      ][t]
                    );
                  }

                  // getting IndividualTargetBonuses & Team Target Bonuses
                  else if (
                    header.value === "Individual Target Bonuses" ||
                    header.value === "Team Target Bonuses"
                  ) {
                    if (bonusPlans.length > 0) {
                      let indTargetBonuses = 0;
                      let teamTargetBonus = 0;
                      policies.map((policy) => {
                        if (policy.value !== "Total") {
                          const policyCount =
                            main[production][month.value][user.id][
                              policy.value
                            ]["Policies"];
                          indTargetBonuses += parseFloat(
                            ((main[production][month.value][user.id]["Auto"][
                              "Premium"
                            ] /
                              2 +
                              main[production][month.value][user.id]["Fire"][
                                "Premium"
                              ]) *
                              getLevel(policyCount, policy.value, bonusPlans)
                                .amount) /
                              100
                          );
                          teamTargetBonus += parseFloat(
                            getLevel(
                              policyCount,
                              `Team${policy.value}`,
                              bonusPlans
                            ).amount
                          );
                        }
                      });
                      if (header.value === "Individual Target Bonuses") {
                        value += indTargetBonuses;
                      } else if (header.value === "Team Target Bonuses") {
                        value += teamTargetBonus;
                      }
                    }
                  }

                  // getting Lapse Rate Bonus
                  else if (header.value === "Lapse Rate % Bonus") {
                    value +=
                      parseFloat(
                        main[production][month.value][user.id]["Auto"][
                          "lapseBonus"
                        ]
                      ) +
                      parseFloat(
                        main[production][month.value][user.id]["Fire"][
                          "lapseBonus"
                        ]
                      );
                  }

                  // getting Policy Growth Bonus
                  else if (header.value === "Policy Growth Bonuses") {
                    value +=
                      parseFloat(
                        main[production][month.value][user.id]["Auto"][
                          "growthBonus"
                        ]
                      ) +
                      parseFloat(
                        main[production][month.value][user.id]["Fire"][
                          "growthBonus"
                        ]
                      );
                  }

                  // getting Special Promotion
                  else if (header.value === "Special Promotion") {
                    value +=
                      parseFloat(
                        main[production][month.value][user.id]["Auto"][
                          "specialPromotion"
                        ]
                      ) +
                      parseFloat(
                        main[production][month.value][user.id]["Fire"][
                          "specialPromotion"
                        ]
                      );
                  }
                }
              });
              totalPolicies += col < 9 && col % 2 === 1 && parseFloat(value);
              totalBonuses +=
                col > 0 && col < 9 && col % 2 === 0 && parseFloat(value);
              totalBonuses += col > 11 && col < 17 && parseFloat(value);

              tableContent[month.value][header.value] = value;
              tableContent["Total"][header.value] +=
                tableContent[month.value][header.value];
            }
          });
          tableContent[month.value]["Total Policies"] = totalPolicies;
          tableContent[month.value]["Total Bonuses"] = totalBonuses;
          tableContent["Total"]["Total Policies"] +=
            tableContent[month.value]["Total Policies"];
          tableContent["Total"]["Total Bonuses"] +=
            tableContent[month.value]["Total Bonuses"];
          // }
        });
        widgets = {
          ...widgets,
          Agency_Payroll_Summary_Table: {
            ...widgets.Agency_Payroll_Summary_Table,
            table: {
              ...widgets.Agency_Payroll_Summary_Table.table,
              rows: tableRows,
            },
          },
        };
        widgets = {
          ...widgets,
          Agency_Payroll_Summary_Table: {
            ...widgets.Agency_Payroll_Summary_Table,
            table: {
              ...widgets.Agency_Payroll_Summary_Table.table,
              tableContent: tableContent,
            },
          },
        };
      }
    }

    console.log("---------widgets", widgets);
    setData({ widgets });
  }, [widgets, main, production, period, bonusVerified]);

  function handleChangeTab(event, value) {
    setTabValue(value);
    if(value===1){
      setYear(moment().format("yyyy")-1)
    } else {
      setYear(moment().format("yyyy"))
    }
  }

  function handleChangePeriod(event) {
    setPeriod(event.target.value);
  }

  function handleChangeYear(event) {
    setYear(event.target.value);
  }

  function handleChangeProduction(event) {
    setProduction(event.target.value);
  }

  function handleCheck(event, uid, rowKey, rowNum, rowData) {
    const w = data.widgets;
    widgets = {
      ...w,
      Agency_Payroll_Table: {
        ...w.Agency_Payroll_Table,
        table: {
          ...w.Agency_Payroll_Table.table,
          tableContent: {
            ...w.Agency_Payroll_Table.table.tableContent,
            [rowKey]: {
              ...w.Agency_Payroll_Table.table.tableContent[rowKey],
              ["Bonus Verified?"]: event.target.checked,
            },
          },
        },
      },
    };

    setData({ widgets });

    dispatch(
      saveBonusVerified({
        checked: event.target.checked,
        amount: rowData["Amount Paid to Producer"],
        uid,
        year,
        period,
      })
    );
  }

  function handleChangeInput(event, uid, rowKey, rowNum, rowData) {
    const w = data.widgets;
    widgets = {
      ...w,
      Agency_Payroll_Table: {
        ...w.Agency_Payroll_Table,
        table: {
          ...w.Agency_Payroll_Table.table,
          tableContent: {
            ...w.Agency_Payroll_Table.table.tableContent,
            [rowKey]: {
              ...w.Agency_Payroll_Table.table.tableContent[rowKey],
              ["Amount Paid to Producer"]: event.target.value,
            },
          },
        },
      },
    };

    setData({ widgets });

    dispatch(
      saveBonusVerified({
        checked: rowData["Bonus Verified?"],
        amount: event.target.value,
        uid,
        year,
        period,
      })
    );
  }

  if (loading) {
    return <FuseLoading />;
  }

  if (data.length === 0) {
    return (
      <FuseAnimate delay={100}>
        <div className="flex flex-1 items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            There are no data!
          </Typography>
        </div>
      </FuseAnimate>
    );
  }

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <Header title={title}>
          {tabValue === 0 && (
            <div className="flex flex-1 items-center justify-center px-12">
              <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <SelectBox
                  value={period}
                  onChange={(ev) => handleChangePeriod(ev)}
                  label="Report Period"
                  data={options.period.data}
                />
              </FuseAnimate>
            </div>
          )}
          {tabValue === 1 && (
            <div className="flex flex-1 items-center justify-center px-12">
              <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <SelectBox
                  value={year}
                  onChange={(ev) => handleChangeYear(ev)}
                  label={years.id}
                  data={years.data}
                />
              </FuseAnimate>
            </div>
          )}
          <div className="flex flex-1 items-center justify-center px-12">
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
              <SelectBox
                value={production}
                onChange={(ev) => handleChangeProduction(ev)}
                label="Production"
                data={options.production.data}
              />
            </FuseAnimate>
          </div>
        </Header>
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-full h-64 relative" }}
        >
          <Tab className="h-64 normal-case" label="Current Yearly Report" />
          <Tab className="h-64 normal-case" label="Previous Yearly Report" />
          <Tab className="h-64 normal-case" label="Office Summary" />
          <div className="absolute right-192 top-10">
            <DownloadBtn />
          </div>
        </Tabs>
      }
      content={
        <div className="w-full p-12">
          <FuseAnimateGroup
            className="flex flex-wrap"
            enter={{ animation: "transition.slideUpBigIn" }}
          >
            {tabValue === 0 && (
              <div className="p-12">
                <Table
                  tableName="Month"
                  data={data.widgets.Agency_Payroll_Table}
                  onCheck={handleCheck}
                  onAmountChange={handleChangeInput}
                />
              </div>
            )}
            {tabValue === 1 && (
              <div className="p-12">
                <Table
                  tableName="Year"
                  data={data.widgets.Agency_Payroll_Yearly_Table}
                  onCheck={handleCheck}
                  onAmountChange={handleChangeInput}
                />
              </div>
            )}
            {tabValue === 2 && (
              <div className="p-12">
                <Table
                  data={data.widgets.Agency_Payroll_Summary_Table}
                  onCheck={handleCheck}
                />
              </div>
            )}
          </FuseAnimateGroup>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer("agencyApp", reducer)(Payroll);
