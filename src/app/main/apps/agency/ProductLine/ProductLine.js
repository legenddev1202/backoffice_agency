import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import FuseAnimate from "@fuse/core/FuseAnimate";
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
import Chart from "../../../components/widgets/BarChart";
import PieChart from "../../../components/widgets/PieChart";
import SelectBox from "../../../components/CustomSelectBox";
import Header from "../../../components/widgets/Header";
import { getWidgets, selectWidgets } from "../store/widgetsSlice";
import { getBonusPlans, selectBonusPlans } from "../store/bonusPlansSlice";
import { getMarketings, selectMarketings } from "../store/marketingsSlice";
import { getEntries, selectEntries } from "../store/entriesSlice";
import { getUsers, selectUsers } from "../store/usersSlice";
import { getVision, selectVision } from "../store/visionSlice";
import {
  policiesAndPremium1,
  monthsAndQuarters,
  bonusPlanDbNames,
  Options as options,
} from "../../../utils/Globals";
import { getMain } from "../../../utils/Function";

const belongTo = localStorage.getItem("@BELONGTO");
const UID = localStorage.getItem("@UID");

function ProductLine(props) {
  const dispatch = useDispatch();
  let widgets = useSelector(selectWidgets);
  const users = useSelector(selectUsers);
  const marketings = useSelector(selectMarketings);
  const bonusPlans = useSelector(selectBonusPlans);
  const entries = useSelector(selectEntries);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ widgets });
  const [main, setMain] = useState({});
  const [year, setYear] = useState(moment().format("yyyy"));
  const [period, setPeriod] = useState(moment().format("MMMM"));
  const [production, setProduction] = useState("Show Written Production");
  const [report, setReport] = useState("Policies");
  const [user, setUser] = useState(UID);
  const [userList, setUserList] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [title, setTitle] = useState("Product & Activity Report");

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getBonusPlans(user));
    dispatch(getMarketings());
    dispatch(getEntries(year));
    dispatch(getWidgets()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers(user));
  }, [user]);

  useEffect(() => {
    var temp = [];
    if (users.length > 0) {
      users.map((user) => {
        if (user.belongTo === UID)
          temp.push({ item: user.data.displayName, value: user.id });
      });
      setUserList(temp);
    }
  }, [users]);

  useEffect(() => {
    if (
      Object.keys(marketings).length > 0 &&
      users.length > 0 &&
      entries.length > 0 &&
      bonusPlans.length > 0
    ) {
      const temp = getMain(entries, bonusPlans, marketings, users, [], []);
      setMain(temp);
    }
  }, [entries, bonusPlans, marketings, users]);

  useEffect(() => {
    let policy = "";
    if (tabValue === 0) policy = "Auto";
    if (tabValue === 1) policy = "Fire";
    if (tabValue === 2) policy = "Life";
    if (tabValue === 3) policy = "Health";
    if (tabValue === 4) policy = "Bank";
    if (tabValue === 5) policy = "Other";

    if (!_.isEmpty(widgets) && !_.isEmpty(main) && user !== "") {
      const bonusPlan = bonusPlans[0].hasOwnProperty(
        bonusPlanDbNames[policy].db
      )
        ? bonusPlans[0][bonusPlanDbNames[policy].db]
        : {};
      if (tabValue < 5) {
        if (widgets.Agency_ProductLine_Table_1) {
          let headers = [...policiesAndPremium1];
          let tableContent = {};

          Object.keys(bonusPlan).map((key) => {
            const item = bonusPlan[key];
            headers.push({
              id: item.name,
              value: item.name,
              color: "",
            });
          });
          monthsAndQuarters.map((month, row) => {
            tableContent[month.value] = {};
            policiesAndPremium1.map((item) => {
              tableContent[month.value][item.value] = 0;
              users.map((usr) => {
                if (usr.id === user) {
                  let itemValue = "";
                  if (item.value === "Average Premium") {
                    itemValue = "Averages";
                  } else if (item.value === "Number of Policies") {
                    itemValue = "Policies";
                  } else if (item.value === "Policy Premium") {
                    itemValue = "Premium";
                  }
                  if (row < 12) {
                    tableContent[month.value][item.value] += parseFloat(
                      main[production][month.value][user][policy][itemValue]
                    );
                  }
                  if (row > 11 && row < 16) {
                    tableContent[month.value][item.value] +=
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 0].value
                        ][user][policy][itemValue]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 1].value
                        ][user][policy][itemValue]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 2].value
                        ][user][policy][itemValue]
                      );
                  }
                  if (row === 16) {
                    tableContent[month.value][item.value] +=
                      parseFloat(
                        tableContent[monthsAndQuarters[12].value][item.value]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[13].value][item.value]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[14].value][item.value]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[15].value][item.value]
                      );
                  }
                  if (row === 17) {
                    tableContent[month.value][item.value] = "";
                  }
                }
              });
            });
            Object.keys(bonusPlan).map((key) => {
              const item = bonusPlan[key];
              tableContent[month.value][item.name] = 0;
              users.map((usr) => {
                if (usr.id === user) {
                  if (row < 12) {
                    tableContent[month.value][item.name] +=
                      main[production][month.value][user][policy][item.name];
                  }
                  if (row > 11 && row < 16) {
                    tableContent[month.value][item.name] +=
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 0].value
                        ][user][policy][item.name]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 1].value
                        ][user][policy][item.name]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 2].value
                        ][user][policy][item.name]
                      );
                  }
                  if (row === 16) {
                    tableContent[month.value][item.name] +=
                      parseFloat(
                        tableContent[monthsAndQuarters[12].value][item.name]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[13].value][item.name]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[14].value][item.name]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[15].value][item.name]
                      );
                  }
                  if (row === 17) {
                    tableContent[month.value][item.name] = "";
                  }
                }
              });
            });
          });
          widgets = {
            ...widgets,
            Agency_ProductLine_Table_1: {
              ...widgets.Agency_ProductLine_Table_1,
              table: {
                ...widgets.Agency_ProductLine_Table_1.table,
                headers: headers,
              },
            },
          };
          widgets = {
            ...widgets,
            Agency_ProductLine_Table_1: {
              ...widgets.Agency_ProductLine_Table_1,
              table: {
                ...widgets.Agency_ProductLine_Table_1.table,
                tableContent: tableContent,
              },
            },
          };
        }

        if (widgets.Agency_ProductLine_Table_2) {
          let headers = [];
          let tableContent = {};

          Object.keys(marketings).map((key) => {
            const item = marketings[key];
            headers.push({
              id: item.marketingName,
              value: item.marketingName,
              color: "",
            });
          });
          monthsAndQuarters.map((month, row) => {
            tableContent[month.value] = {};
            // policiesAndPremium1.map((item) => {
            //   tableContent[month.value][item.value] = 0;
            //   users.map((usr) => {
            //     if (usr.id === user) {
            //       let itemValue = "";
            //       if (item.value === "Average Premium") {
            //         itemValue = "Averages";
            //       } else if (item.value === "Number of Policies") {
            //         itemValue = "Policies";
            //       } else if (item.value === "Policy Premium") {
            //         itemValue = "Premium";
            //       }
            //       if (row < 12) {
            //         tableContent[month.value][item.value] +=
            //           main[production][month.value][user][policy][itemValue];
            //       }
            //       if (row > 11 && row < 16) {
            //         tableContent[month.value][item.value] +=
            //           parseFloat(
            //             main[production][
            //               monthsAndQuarters[(row - 12) * 3 + 0].value
            //             ][user][policy][itemValue]
            //           ) +
            //           parseFloat(
            //             main[production][
            //               monthsAndQuarters[(row - 12) * 3 + 1].value
            //             ][user][policy][itemValue]
            //           ) +
            //           parseFloat(
            //             main[production][
            //               monthsAndQuarters[(row - 12) * 3 + 2].value
            //             ][user][policy][itemValue]
            //           );
            //       }
            //       if (row === 16) {
            //         tableContent[month.value][item.value] +=
            //           parseFloat(
            //             tableContent[monthsAndQuarters[12].value][item.value]
            //           ) +
            //           parseFloat(
            //             tableContent[monthsAndQuarters[13].value][item.value]
            //           ) +
            //           parseFloat(
            //             tableContent[monthsAndQuarters[14].value][item.value]
            //           ) +
            //           parseFloat(
            //             tableContent[monthsAndQuarters[15].value][item.value]
            //           );
            //       }
            //       if (row === 17) {
            //         tableContent[month.value][item.value] = "";
            //       }
            //     }
            //   });
            // });
            Object.keys(marketings).map((key) => {
              const item = marketings[key];
              tableContent[month.value][item.marketingName] = 0;
              users.map((usr) => {
                if (usr.id === user) {
                  if (row < 12) {
                    tableContent[month.value][item.marketingName] +=
                      main[production][month.value][user][policy][
                        item.marketingName
                      ];
                  }
                  if (row > 11 && row < 16) {
                    tableContent[month.value][item.marketingName] +=
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 0].value
                        ][user][policy][item.marketingName]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 1].value
                        ][user][policy][item.marketingName]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 2].value
                        ][user][policy][item.marketingName]
                      );
                  }
                  if (row === 16) {
                    tableContent[month.value][item.marketingName] +=
                      parseFloat(
                        tableContent[monthsAndQuarters[12].value][
                          item.marketingName
                        ]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[13].value][
                          item.marketingName
                        ]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[14].value][
                          item.marketingName
                        ]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[15].value][
                          item.marketingName
                        ]
                      );
                  }
                  if (row === 17) {
                    tableContent[month.value][item.marketingName] = "";
                  }
                }
              });
            });
          });
          widgets = {
            ...widgets,
            Agency_ProductLine_Table_2: {
              ...widgets.Agency_ProductLine_Table_2,
              table: {
                ...widgets.Agency_ProductLine_Table_2.table,
                headers: headers,
              },
            },
          };
          widgets = {
            ...widgets,
            Agency_ProductLine_Table_2: {
              ...widgets.Agency_ProductLine_Table_2,
              table: {
                ...widgets.Agency_ProductLine_Table_2.table,
                tableContent: tableContent,
              },
            },
          };
        }

        if (widgets.Agency_ProductLine_Table_3) {
          let headers = [...policiesAndPremium1];
          let tableContent = {};

          Object.keys(bonusPlan).map((key) => {
            const item = bonusPlan[key];
            headers.push({
              id: item.name,
              value: item.name,
              color: "",
            });
          });
          monthsAndQuarters.map((month, row) => {
            tableContent[month.value] = {};
            policiesAndPremium1.map((item) => {
              tableContent[month.value][item.value] = 0;
              let itemValue = "";
              if (item.value === "Average Premium") {
                itemValue = "Averages";
              } else if (item.value === "Number of Policies") {
                itemValue = "Policies";
              } else if (item.value === "Policy Premium") {
                itemValue = "Premium";
              }
              users.map((usr) => {
                if (usr.id === user) {
                  if (row < 12) {
                    tableContent[month.value][item.value] +=
                      main[production][month.value][user][policy][itemValue];
                  }
                  if (row > 11 && row < 16) {
                    tableContent[month.value][item.value] +=
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 0].value
                        ][user][policy][itemValue]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 1].value
                        ][user][policy][itemValue]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 2].value
                        ][user][policy][itemValue]
                      );
                  }
                  if (row === 16) {
                    tableContent[month.value][item.value] +=
                      parseFloat(
                        tableContent[monthsAndQuarters[12].value][item.value]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[13].value][item.value]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[14].value][item.value]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[15].value][item.value]
                      );
                  }
                  if (row === 17) {
                    tableContent[month.value][item.value] = "";
                  }
                }
              });
            });
            Object.keys(bonusPlan).map((key) => {
              const item = bonusPlan[key];
              tableContent[month.value][item.name] = 0;
              users.map((usr) => {
                if (usr.id === user) {
                  if (row < 12) {
                    tableContent[month.value][item.name] +=
                      main[production][month.value][user][policy][item.name];
                  }
                  if (row > 11 && row < 16) {
                    tableContent[month.value][item.name] +=
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 0].value
                        ][user][policy][item.name]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 1].value
                        ][user][policy][item.name]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 2].value
                        ][user][policy][item.name]
                      );
                  }
                  if (row === 16) {
                    tableContent[month.value][item.name] +=
                      parseFloat(
                        tableContent[monthsAndQuarters[12].value][item.name]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[13].value][item.name]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[14].value][item.name]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[15].value][item.name]
                      );
                  }
                  if (row === 17) {
                    tableContent[month.value][item.name] = "";
                  }
                }
              });
            });
          });
          widgets = {
            ...widgets,
            Agency_ProductLine_Table_3: {
              ...widgets.Agency_ProductLine_Table_3,
              table: {
                ...widgets.Agency_ProductLine_Table_3.table,
                headers: headers,
              },
            },
          };
          widgets = {
            ...widgets,
            Agency_ProductLine_Table_3: {
              ...widgets.Agency_ProductLine_Table_3,
              table: {
                ...widgets.Agency_ProductLine_Table_3.table,
                tableContent: tableContent,
              },
            },
          };
        }

        if (widgets.Agency_ProductLine_Table_4) {
          let headers = [];
          let tableContent = {};

          Object.keys(marketings).map((key) => {
            const item = marketings[key];
            headers.push({
              id: item.marketingName,
              value: item.marketingName,
              color: "",
            });
          });
          monthsAndQuarters.map((month, row) => {
            tableContent[month.value] = {};
            // policiesAndPremium1.map((item) => {
            //   tableContent[month.value][item.value] = 0;
            //   let itemValue = "";
            //   if (item.value === "Average Premium") {
            //     itemValue = "Averages";
            //   } else if (item.value === "Number of Policies") {
            //     itemValue = "Policies";
            //   } else if (item.value === "Policy Premium") {
            //     itemValue = "Premium";
            //   }
            //   users.map((usr) => {
            //     if (usr.id === user) {
            //       if (row < 12) {
            //         tableContent[month.value][item.value] = +main[production][
            //           month.value
            //         ][user][policy][itemValue];
            //       }
            //       if (row > 11 && row < 16) {
            //         tableContent[month.value][item.value] +=
            //           parseFloat(
            //             main[production][
            //               monthsAndQuarters[(row - 12) * 3 + 0].value
            //             ][user][policy][itemValue]
            //           ) +
            //           parseFloat(
            //             main[production][
            //               monthsAndQuarters[(row - 12) * 3 + 1].value
            //             ][user][policy][itemValue]
            //           ) +
            //           parseFloat(
            //             main[production][
            //               monthsAndQuarters[(row - 12) * 3 + 2].value
            //             ][user][policy][itemValue]
            //           );
            //       }
            //       if (row === 16) {
            //         tableContent[month.value][item.value] +=
            //           parseFloat(
            //             tableContent[monthsAndQuarters[12].value][item.value]
            //           ) +
            //           parseFloat(
            //             tableContent[monthsAndQuarters[13].value][item.value]
            //           ) +
            //           parseFloat(
            //             tableContent[monthsAndQuarters[14].value][item.value]
            //           ) +
            //           parseFloat(
            //             tableContent[monthsAndQuarters[15].value][item.value]
            //           );
            //       }
            //       if (row === 17) {
            //         tableContent[month.value][item.value] = "";
            //       }
            //     }
            //   });
            // });
            Object.keys(marketings).map((key) => {
              const item = marketings[key];
              tableContent[month.value][item.marketingName] = 0;
              users.map((usr) => {
                if (usr.id === user) {
                  if (row < 12) {
                    tableContent[month.value][item.marketingName] +=
                      main[production][month.value][user][policy][
                        item.marketingName
                      ];
                  }
                  if (row > 11 && row < 16) {
                    tableContent[month.value][item.marketingName] +=
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 0].value
                        ][user][policy][item.marketingName]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 1].value
                        ][user][policy][item.marketingName]
                      ) +
                      parseFloat(
                        main[production][
                          monthsAndQuarters[(row - 12) * 3 + 2].value
                        ][user][policy][item.marketingName]
                      );
                  }
                  if (row === 16) {
                    tableContent[month.value][item.marketingName] +=
                      parseFloat(
                        tableContent[monthsAndQuarters[12].value][
                          item.marketingName
                        ]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[13].value][
                          item.marketingName
                        ]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[14].value][
                          item.marketingName
                        ]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[15].value][
                          item.marketingName
                        ]
                      );
                  }
                  if (row === 17) {
                    tableContent[month.value][item.marketingName] = "";
                  }
                }
              });
            });
          });
          widgets = {
            ...widgets,
            Agency_ProductLine_Table_4: {
              ...widgets.Agency_ProductLine_Table_4,
              table: {
                ...widgets.Agency_ProductLine_Table_4.table,
                headers: headers,
              },
            },
          };
          widgets = {
            ...widgets,
            Agency_ProductLine_Table_4: {
              ...widgets.Agency_ProductLine_Table_4,
              table: {
                ...widgets.Agency_ProductLine_Table_4.table,
                tableContent: tableContent,
              },
            },
          };
        }
      } else {
        if (widgets.ProductLine_Other_Table) {
          let headers = [
            {
              id: "month",
              value: "Month",
              color: "",
            },
          ];
          let tableContent = {};

          Object.keys(bonusPlan).map((key) => {
            const item = bonusPlan[key];
            headers.push({
              id: item.name,
              value: item.name,
              color: "",
              startAdornment: "$",
            });
          });
          monthsAndQuarters.map((month, row) => {
            tableContent[month.value] = {};
            Object.keys(bonusPlan).map((key) => {
              const item = bonusPlan[key];
              tableContent[month.value][item.name] = 0;
              users.map((usr) => {
                if (usr.id === user) {
                  if (row < 12) {
                    tableContent[month.value][item.name] += parseInt(
                      item.dollar
                    );
                  }
                  if (row > 11 && row < 16) {
                    tableContent[month.value][item.name] +=
                      parseFloat(
                        tableContent[
                          monthsAndQuarters[(row - 12) * 3 + 0].value
                        ][item.name]
                      ) +
                      parseFloat(
                        tableContent[
                          monthsAndQuarters[(row - 12) * 3 + 1].value
                        ][item.name]
                      ) +
                      parseFloat(
                        tableContent[
                          monthsAndQuarters[(row - 12) * 3 + 2].value
                        ][item.name]
                      );
                  }
                  if (row === 16) {
                    tableContent[month.value][item.name] +=
                      parseFloat(
                        tableContent[monthsAndQuarters[12].value][item.name]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[13].value][item.name]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[14].value][item.name]
                      ) +
                      parseFloat(
                        tableContent[monthsAndQuarters[15].value][item.name]
                      );
                  }
                  if (row === 17) {
                    tableContent[month.value][item.name] = "";
                  }
                }
              });
            });
          });
          widgets = {
            ...widgets,
            ProductLine_Other_Table: {
              ...widgets.ProductLine_Other_Table,
              table: {
                ...widgets.ProductLine_Other_Table.table,
                headers: headers,
              },
            },
          };
          widgets = {
            ...widgets,
            ProductLine_Other_Table: {
              ...widgets.ProductLine_Other_Table,
              table: {
                ...widgets.ProductLine_Other_Table.table,
                tableContent: tableContent,
              },
            },
          };
        }
      }
    }

    console.log("--------------------------widgets:", widgets);
    setData({ widgets });
  }, [widgets, main, user, production, tabValue]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  function handleChangeProduction(event) {
    setProduction(event.target.value);
  }

  function handleChangeUser(event) {
    setUser(event.target.value);
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
          <div className="flex flex-1 items-center justify-center px-12 w-40">
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
              <SelectBox
                value={user}
                onChange={(ev) => handleChangeUser(ev)}
                label="Users"
                data={userList}
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
          classes={{ root: "w-full h-64" }}
        >
          <Tab className="h-64 normal-case" label="Auto" />
          <Tab className="h-64 normal-case" label="Fire" />
          <Tab className="h-64 normal-case" label="Life" />
          <Tab className="h-64 normal-case" label="Health" />
          <Tab className="h-64 normal-case" label="Bank" />
          <Tab className="h-64 normal-case" label="Other" />
        </Tabs>
      }
      content={
        <div className="w-full p-12">
          {tabValue !== 5 ? (
            <div>
              <div className="p-12">
                <Table data={data.widgets.Agency_ProductLine_Table_1} />
              </div>
              <div className="p-12">
                <Table data={data.widgets.Agency_ProductLine_Table_2} />
              </div>
              <div className="p-12">
                <Table data={data.widgets.Agency_ProductLine_Table_3} />
              </div>
              <div className="p-12">
                <Table data={data.widgets.Agency_ProductLine_Table_4} />
              </div>
            </div>
          ) : (
            <div className="p-12">
              <Table data={data.widgets.ProductLine_Other_Table} />
            </div>
          )}
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer("agencyApp", reducer)(ProductLine);
