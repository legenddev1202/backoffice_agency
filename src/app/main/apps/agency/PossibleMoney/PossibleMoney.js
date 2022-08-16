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
import { ceil } from "lodash";
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
import { getEntries, selectEntries } from "../store/entriesSlice";
import {
  bonusPlanDbNames,
  Options as options,
  policies,
} from "../../../utils/Globals";
import { dividing, getLevel, getMain } from "../../../utils/Function";

const belongTo = localStorage.getItem("@BELONGTO");
const UID = localStorage.getItem("@UID");

function PossibleMoney(props) {
  const dispatch = useDispatch();
  let widgets = useSelector(selectWidgets);
  const users = useSelector(selectUsers);
  const bonusPlans = useSelector(selectBonusPlans);
  const entries = useSelector(selectEntries);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [main, setMain] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [production, setProduction] = useState("Show Written Production");
  const [bonus, setBonus] = useState("Include Initial Bonus in Calculation");
  const [user, setUser] = useState(UID);
  const [userList, setUserList] = useState([]);
  const [year, setYear] = useState(moment().format("yyyy"));
  const [period, setPeriod] = useState(moment().format("MMMM"));
  const [title, setTitle] = useState("Agency(Possible Money)");

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getBonusPlans());
    dispatch(getEntries(year));
    dispatch(getWidgets()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const temp = [];
    if (users.length > 0) {
      users.map((user1) => {
        if (user1.belongTo === UID) {
          temp.push({ item: user1.data.displayName, value: user1.id });
        }
      });
      setUserList(temp);
    }
  }, [users]);

  useEffect(() => {
    if (users.length > 0 && bonusPlans.length > 0 && entries.length > 0) {
      const temp = getMain(entries, bonusPlans, [], users, [], []);
      setMain(temp);
    }
  }, [entries, bonusPlans, users]);

  useEffect(() => {
    if (!_.isEmpty(widgets) && !_.isEmpty(main)) {
      if (tabValue === 0 && user === "") return;
      if (widgets.Agency_PossibleMoney_Current_Level_Table) {
        let totalBonus = 0;
        const tempRows = [];

        const policiesCells = [
          {
            id: "left_title",
            value: "Policies",
            classes: "bg-blue text-white",
            icon: "",
          },
        ];
        const annualPremiumCells = [
          {
            id: "left_title",
            value: "Anual Preminum",
            classes: "bg-green text-white",
            icon: "",
          },
        ];
        const avgPremiumCells = [
          {
            id: "left_title",
            value: "Avg Premium",
            classes: "bg-pink text-white",
            icon: "",
          },
        ];
        const levelReachedCells = [
          {
            id: "left_title",
            value: "Level Reached",
            classes: "bg-red text-white",
            icon: "",
          },
        ];
        const targetBonusEarned = [
          {
            id: "left_title",
            value: "Target Bonus Earned",
            classes: "bg-orange text-white",
            icon: "",
          },
        ];
        policies.map((policy) => {
          if (policy.value !== "Total") {
            let policySum = 0;
            let premiumSum = 0;
            let avgPremium = 0;
            let bonusSum = 0;
            if (tabValue === 0) {
              policySum =
                main[production][period][user][policy.value].Policies;
              premiumSum =
                main[production][period][user][policy.value].Premium;
              avgPremium = dividing(premiumSum, policySum);
              bonusSum = parseFloat(
                ((main[production][period][user].Auto.Premium / 2 +
                  main[production][period][user].Fire.Premium) *
                  getLevel(policySum, policy.value, bonusPlans).amount) /
                  100
              );
              if (bonus === "Include Initial Bonus in Calculation") {
                bonusSum += parseFloat(
                  main[production][period][user][policy.value].Bonuses
                );
              }
            } else {
              users.map((user1) => {
                if (user1.belongTo === UID) {
                  policySum +=
                    main[production][period][user1.id][policy.value].Policies;
                  premiumSum +=
                    main[production][period][user1.id][policy.value].Premium;
                  avgPremium = dividing(premiumSum, policySum);
                  const policyCount =
                    main[production][period][user1.id][policy.value].Policies;
                  bonusSum += parseFloat(
                    getLevel(policyCount, `Team${policy.value}`, bonusPlans)
                      .amount
                  );
                  if (bonus === "Include Initial Bonus in Calculation") {
                    bonusSum += parseFloat(
                      main[production][period][user1.id][policy.value].Bonuses
                    );
                  }
                }
              });
            }
            policiesCells.push({
              id: policy.value,
              value: policySum,
              classes: "",
              icon: "",
            });
            annualPremiumCells.push({
              id: policy.value,
              value: premiumSum,
              classes: "",
              icon: "",
            });
            avgPremiumCells.push({
              id: policy.value,
              value: avgPremium,
              classes: "",
              icon: "",
            });
            levelReachedCells.push({
              id: policy.value,
              value:
                tabValue === 0
                  ? getLevel(policySum, policy.value, bonusPlans).level
                  : getLevel(policySum, `Team${policy.value}`, bonusPlans)
                      .level,
              classes: "",
              icon: "",
            });
            targetBonusEarned.push({
              id: policy.value,
              value: bonusSum,
              classes: "",
              icon: "",
            });
            totalBonus += parseFloat(bonusSum);
          }
        });
        policiesCells.push({
          id: "total",
          value: totalBonus,
          classes: "",
          icon: "",
        });

        tempRows.push({
          id: 1,
          cells: policiesCells,
        });
        tempRows.push({
          id: 2,
          cells: annualPremiumCells,
        });
        tempRows.push({
          id: 3,
          cells: avgPremiumCells,
        });
        tempRows.push({
          id: 4,
          cells: levelReachedCells,
        });
        tempRows.push({
          id: 5,
          cells: targetBonusEarned,
        });
        widgets = {
          ...widgets,
          Agency_PossibleMoney_Current_Level_Table: {
            ...widgets.Agency_PossibleMoney_Current_Level_Table,
            table: {
              ...widgets.Agency_PossibleMoney_Current_Level_Table.table,
              rows: [...tempRows],
            },
          },
        };
      }

      if (widgets.Agency_PossibleMoney_Next_Level_Table) {
        let totalBonus = 0;
        const tempRows = [];
        const {rows} = widgets.Agency_PossibleMoney_Current_Level_Table.table;

        const policiesCells = [
          {
            id: "left_title",
            value: "Policies",
            classes: "bg-blue text-white",
            icon: "",
          },
        ];
        const annualPremiumCells = [
          {
            id: "left_title",
            value: "Anual Preminum",
            classes: "bg-green text-white",
            icon: "",
          },
        ];
        const levelReachedCells = [
          {
            id: "left_title",
            value: "Your Level Would Be",
            classes: "bg-red text-white",
            icon: "",
          },
        ];
        const targetBonusEarned = [
          {
            id: "left_title",
            value: "Your Bonus Would Be",
            classes: "bg-orange text-white",
            icon: "",
          },
        ];
        policies.map((policy, col) => {
          if (policy.value !== "Total") {
            const currPolicyCount = rows[0].cells[col + 1].value;
            const currPremium = rows[1].cells[col + 1].value;
            let nextAutoPolicies = 0;
            let nextFirePolicies = 0;
            let level = {};
            if (tabValue === 0) {
              nextAutoPolicies = getLevel(
                rows[0].cells[1].value,
                "Auto",
                bonusPlans
              ).nextPolicies;
              nextFirePolicies = getLevel(
                rows[0].cells[2].value,
                "Fire",
                bonusPlans
              ).nextPolicies;
              level = getLevel(currPolicyCount, policy.value, bonusPlans);
            } else {
              nextAutoPolicies = getLevel(
                rows[0].cells[1].value,
                "TeamAuto",
                bonusPlans
              ).nextPolicies;
              nextFirePolicies = getLevel(
                rows[0].cells[2].value,
                "TeamFire",
                bonusPlans
              ).nextPolicies;
              level = getLevel(
                currPolicyCount,
                `Team${policy.value}`,
                bonusPlans
              );
            }
            const {nextLevel} = level;
            const nextPolicyCount = level.nextPolicies;
            const nextPremium =
              dividing(currPremium, currPolicyCount) * nextPolicyCount;
            const nextAutoPremium =
              dividing(rows[1].cells[1].value, rows[0].cells[1].value) *
              nextAutoPolicies;
            const nextFirePremium =
              dividing(rows[1].cells[2].value, rows[0].cells[2].value) *
              nextFirePolicies;
            let nextBonus = 0;
            if (tabValue === 0) {
              nextBonus =
                ((nextAutoPremium / 2 + nextFirePremium) * level.nextAmount) /
                100;
              if (bonus === "Include Initial Bonus in Calculation") {
                nextBonus += parseFloat(
                  main[production][period][user][policy.value].Bonuses
                );
              }
            } else {
              nextBonus = parseFloat(level.nextAmount);
              if (bonus === "Include Initial Bonus in Calculation") {
                users.map((user1) => {
                  if (user1.belongTo === UID) {
                    nextBonus += parseFloat(
                      main[production][period][user1.id][policy.value].Bonuses
                    );
                  }
                });
              }
            }
            totalBonus += parseFloat(nextBonus);

            policiesCells.push({
              id: policy.value,
              value: nextPolicyCount,
              classes: "",
              icon: "",
            });
            annualPremiumCells.push({
              id: policy.value,
              value: nextPremium,
              classes: "",
              icon: "",
            });
            levelReachedCells.push({
              id: policy.value,
              value: nextLevel,
              classes: "",
              icon: "",
            });
            targetBonusEarned.push({
              id: policy.value,
              value: nextBonus,
              classes: "",
              icon: "",
            });
          }
        });
        policiesCells.push({
          id: "total",
          value: totalBonus,
          classes: "",
          icon: "",
        });

        tempRows.push({
          id: 1,
          cells: policiesCells,
        });
        tempRows.push({
          id: 2,
          cells: annualPremiumCells,
        });
        tempRows.push({
          id: 4,
          cells: levelReachedCells,
        });
        tempRows.push({
          id: 5,
          cells: targetBonusEarned,
        });

        widgets = {
          ...widgets,
          Agency_PossibleMoney_Next_Level_Table: {
            ...widgets.Agency_PossibleMoney_Next_Level_Table,
            table: {
              ...widgets.Agency_PossibleMoney_Next_Level_Table.table,
              rows: tempRows,
            },
          },
        };
      }
      if (widgets.Agency_PossibleMoney_Max_Level_Table) {
        let totalBonus = 0;
        const tempRows = [];
        const {rows} = widgets.Agency_PossibleMoney_Current_Level_Table.table;

        const policiesCells = [
          {
            id: "left_title",
            value: "Policies",
            classes: "bg-blue text-white",
            icon: "",
          },
        ];
        const annualPremiumCells = [
          {
            id: "left_title",
            value: "Anual Preminum",
            classes: "bg-green text-white",
            icon: "",
          },
        ];
        const levelReachedCells = [
          {
            id: "left_title",
            value: "Your Level Would Be",
            classes: "bg-red text-white",
            icon: "",
          },
        ];
        const targetBonusEarned = [
          {
            id: "left_title",
            value: "Your Bonus Would Be",
            classes: "bg-orange text-white",
            icon: "",
          },
        ];
        policies.map((policy, col) => {
          if (policy.value !== "Total") {
            const currPolicyCount = rows[0].cells[col + 1].value;
            const currPremium = rows[1].cells[col + 1].value;
            let maxAutoPolicies = 0;
            let maxFirePolicies = 0;
            let level = {};
            if (tabValue === 0) {
              maxAutoPolicies = getLevel(
                rows[0].cells[1].value,
                "Auto",
                bonusPlans
              ).maxPolicies;
              maxFirePolicies = getLevel(
                rows[0].cells[2].value,
                "Fire",
                bonusPlans
              ).maxPolicies;
              level = getLevel(currPolicyCount, policy.value, bonusPlans);
            } else {
              maxAutoPolicies = getLevel(
                rows[0].cells[1].value,
                "TeamAuto",
                bonusPlans
              ).maxPolicies;
              maxFirePolicies = getLevel(
                rows[0].cells[2].value,
                "TeamFire",
                bonusPlans
              ).maxPolicies;
              level = getLevel(
                currPolicyCount,
                `Team${policy.value}`,
                bonusPlans
              );
            }
            const {maxLevel} = level;
            const maxPolicyCount = level.maxPolicies;
            const maxPremium =
              dividing(currPremium, currPolicyCount) * maxPolicyCount;
            const maxAutoPremium =
              dividing(rows[1].cells[1].value, rows[0].cells[1].value) *
              maxAutoPolicies;
            const maxFirePremium =
              dividing(rows[1].cells[2].value, rows[0].cells[2].value) *
              maxFirePolicies;
            let maxBonus = 0;
            if (tabValue === 0) {
              maxBonus =
                ((maxAutoPremium / 2 + maxFirePremium) * level.maxAmount) / 100;
              if (bonus === "Include Initial Bonus in Calculation") {
                maxBonus += parseFloat(
                  main[production][period][user][policy.value].Bonuses
                );
              }
            } else {
              maxBonus = parseFloat(level.maxAmount);
              if (bonus === "Include Initial Bonus in Calculation") {
                users.map((user1) => {
                  if (user1.belongTo === UID) {
                    maxBonus += parseFloat(
                      main[production][period][user1.id][policy.value].Bonuses
                    );
                  }
                });
              }
            }
            totalBonus += parseFloat(maxBonus);

            policiesCells.push({
              id: policy.value,
              value: maxPolicyCount,
              classes: "",
              icon: "",
            });
            annualPremiumCells.push({
              id: policy.value,
              value: maxPremium,
              classes: "",
              icon: "",
            });
            levelReachedCells.push({
              id: policy.value,
              value: maxLevel,
              classes: "",
              icon: "",
            });
            targetBonusEarned.push({
              id: policy.value,
              value: maxBonus,
              classes: "",
              icon: "",
            });
          }
        });
        policiesCells.push({
          id: "total",
          value: totalBonus,
          classes: "",
          icon: "",
        });

        tempRows.push({
          id: 1,
          cells: policiesCells,
        });
        tempRows.push({
          id: 2,
          cells: annualPremiumCells,
        });
        tempRows.push({
          id: 4,
          cells: levelReachedCells,
        });
        tempRows.push({
          id: 5,
          cells: targetBonusEarned,
        });

        widgets = {
          ...widgets,
          Agency_PossibleMoney_Max_Level_Table: {
            ...widgets.Agency_PossibleMoney_Max_Level_Table,
            table: {
              ...widgets.Agency_PossibleMoney_Max_Level_Table.table,
              rows: tempRows,
            },
          },
        };
      }

      if (
        widgets.Agency_PossibleMoney_BonusPlan_Table &&
        bonusPlans.length > 0
      ) {
        const tempBonusPlans = {};
        let dbName = "";
        if (tabValue === 0) {
          dbName = "indDb";
        } else {
          dbName = "teamDb";
        }
        policies.map((policy) => {
          if (policy.value !== "Total") {
            tempBonusPlans[policy.value] = {};
            if (
              bonusPlans[0].hasOwnProperty(
                bonusPlanDbNames[policy.value][dbName]
              )
            ) {
              Object.keys(
                bonusPlans[0][bonusPlanDbNames[policy.value][dbName]]
              ).map((key) => {
                const item =
                  bonusPlans[0][bonusPlanDbNames[policy.value][dbName]][key];
                tempBonusPlans[policy.value][item.level] = item;
              });
            }
          }
        });
        console.log("---Bonus Plan", tempBonusPlans);

        const {rows} = widgets.Agency_PossibleMoney_BonusPlan_Table.table;
        const tempRows = [];
        rows.map((row, rowNum) => {
          let tempRow = row;
          const tempCells = [];
          row.cells.map((cell, cellNum) => {
            let tempCell = cell;
            const level = row.cells[0].value;
            if (cellNum === 0) {
              tempCell = { ...tempCell, value: cell.value };
            }
            if (cellNum > 0) {
              console.log(policies[cellNum - 1].value, `level ${rowNum + 1}`);
              tempCell = {
                ...tempCell,
                value:
                  tempBonusPlans[policies[cellNum - 1].value][
                    `level ${rowNum + 1}`
                  ].policies,
              };
            }

            tempCells.push(tempCell);
          });
          tempRow = { ...tempRow, cells: tempCells };
          tempRows.push(tempRow);
        });
        widgets = {
          ...widgets,
          Agency_PossibleMoney_BonusPlan_Table: {
            ...widgets.Agency_PossibleMoney_BonusPlan_Table,
            table: {
              ...widgets.Agency_PossibleMoney_BonusPlan_Table.table,
              rows: tempRows,
            },
          },
        };
      }
      if (widgets.Agency_PossibleMoney_Chart) {
        const tempDatasets = [];
        const tempBonuses = {
          "Current Bonus": 0,
          "Next Level": 0,
          "Max Level": 0,
        };
        Object.keys(
          widgets.Agency_PossibleMoney_Chart.mainChart.TW.datasets
        ).map((key, n) => {
          let temp =
            widgets.Agency_PossibleMoney_Chart.mainChart.TW.datasets[key];
          const tempData = [];
          if (temp.label !== "Total") {
            tempData.push(
              widgets.Agency_PossibleMoney_Current_Level_Table.table.rows[4]
                .cells[n + 1].value
            );
            tempBonuses["Current Bonus"] +=
              widgets.Agency_PossibleMoney_Current_Level_Table.table.rows[4].cells[
                n + 1
              ].value;

            tempData.push(
              widgets.Agency_PossibleMoney_Next_Level_Table.table.rows[3].cells[
                n + 1
              ].value
            );
            tempBonuses["Next Level"] +=
              widgets.Agency_PossibleMoney_Next_Level_Table.table.rows[3].cells[
                n + 1
              ].value;

            tempData.push(
              widgets.Agency_PossibleMoney_Max_Level_Table.table.rows[3].cells[
                n + 1
              ].value
            );
            tempBonuses["Max Level"] +=
              widgets.Agency_PossibleMoney_Max_Level_Table.table.rows[3].cells[
                n + 1
              ].value;

            temp = { ...temp, data: tempData };
            tempDatasets.push(temp);
          }
        });

        widgets = {
          ...widgets,
          Agency_PossibleMoney_Chart: {
            ...widgets.Agency_PossibleMoney_Chart,
            mainChart: {
              ...widgets.Agency_PossibleMoney_Chart.mainChart,
              TW: {
                ...widgets.Agency_PossibleMoney_Chart.mainChart.TW,
                datasets: [...tempDatasets],
              },
            },
          },
        };

        widgets = {
          ...widgets,
          Agency_PossibleMoney_Chart: {
            ...widgets.Agency_PossibleMoney_Chart,
            mainChart: {
              ...widgets.Agency_PossibleMoney_Chart.mainChart,
              options: {
                ...widgets.Agency_PossibleMoney_Chart.mainChart.options,
                scales: {
                  ...widgets.Agency_PossibleMoney_Chart.mainChart.options
                    .scales,
                  xAxes: [
                    {
                      stacked: true,
                      display: true,
                      gridLines: {
                        display: true,
                      },
                      labels: [
                        `Current Bonus(${ceil(tempBonuses["Current Bonus"])})`,
                        `Next Level(${ceil(tempBonuses["Next Level"])})`,
                        `Max Level(${ceil(tempBonuses["Max Level"])})`,
                      ],
                    },
                  ],
                },
              },
            },
          },
        };
      }
    }
    console.log("----wigets=", widgets);

    setData({ widgets });
  }, [widgets, main, period, production, bonus, user, tabValue]);

  function handleChangePeriod(event) {
    setPeriod(event.target.value);
  }

  function handleChangeProduction(event) {
    setProduction(event.target.value);
  }

  function handleChangeBonus(event) {
    setBonus(event.target.value);
  }

  function handleChangeProduction(event) {
    setProduction(event.target.value);
  }

  function handleChangeUser(event) {
    setUser(event.target.value);
  }

  function handleChangeTab(event, value) {
    setTabValue(value);
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
                value={period}
                onChange={(ev) => handleChangePeriod(ev)}
                label="Report Period"
                data={options.period.data}
              />
            </FuseAnimate>
          </div>
          {tabValue === 0 && userList.length > 0 && (
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
          <div className="flex flex-1 items-center justify-center px-12">
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
              <SelectBox
                value={bonus}
                onChange={(ev) => handleChangeBonus(ev)}
                label="Bonus"
                data={options.bonus.data}
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
          <Tab className="h-64 normal-case" label="INDIVIDUALLY" />
          <Tab className="h-64 normal-case" label="AS A TEAM" />
        </Tabs>
      }
      content={
        <div className="w-full p-12">
          <div className="flex items-center justify-center p-12">
            <FuseAnimateGroup
              className="flex flex-wrap w-1/2"
              enter={{ animation: "transition.slideUpBigIn" }}
            >
              <Chart data={data.widgets.Agency_PossibleMoney_Chart} />
            </FuseAnimateGroup>
          </div>
          <div className="p-12">
            <FuseAnimateGroup
              className="flex flex-wrap"
              enter={{ animation: "transition.slideUpBigIn" }}
            >
              <SpecialTable
                data={data.widgets.Agency_PossibleMoney_Current_Level_Table}
              />
            </FuseAnimateGroup>
          </div>
          <div className="p-12">
            <FuseAnimateGroup
              className="flex flex-wrap"
              enter={{ animation: "transition.slideUpBigIn" }}
            >
              <SpecialTable
                data={data.widgets.Agency_PossibleMoney_Next_Level_Table}
              />
            </FuseAnimateGroup>
          </div>
          <div className="p-12">
            <FuseAnimateGroup
              className="flex flex-wrap"
              enter={{ animation: "transition.slideUpBigIn" }}
            >
              <SpecialTable
                data={data.widgets.Agency_PossibleMoney_Max_Level_Table}
              />
            </FuseAnimateGroup>
          </div>
          <div className="p-12">
            <FuseAnimateGroup
              className="flex flex-wrap"
              enter={{ animation: "transition.slideUpBigIn" }}
            >
              <SpecialTable
              noDolarSign
                data={data.widgets.Agency_PossibleMoney_BonusPlan_Table}
              />
            </FuseAnimateGroup>
          </div>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer("agencyApp", reducer)(PossibleMoney);
