import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Options as options } from "../../../utils/Globals";
import { getMain } from "../../../utils/Function";

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const belongTo = localStorage.getItem("@BELONGTO");
const UID = localStorage.getItem("@UID");

function PoliciesAndBank(props) {
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
  const [userList, setUserList] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [title, setTitle] = useState("Policies & Bank");  
  const [date, setDate] = useState(moment());

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getBonusPlans());
    dispatch(getMarketings());
    dispatch(getEntries(moment(date).format('yyyy')));
    dispatch(getWidgets()).then(() => setLoading(false));
  }, [dispatch, date]);

  useEffect(() => {
    if (
      Object.keys(marketings).length > 0 &&
      users.length > 0 &&
      entries.length > 0 &&
      bonusPlans.length > 0
    ) {
      const temp = getMain(entries, bonusPlans, marketings, users, [], []);
      setMain(temp);
    }else {setMain({})}
  }, [entries, bonusPlans, marketings, users]);

  useEffect(() => {
    if (!_.isEmpty(widgets) && !_.isEmpty(main)) {
      if (widgets.Producer_PoliciesAndBank_AutoAndFire_Table) {
        let tableColumns = [
          {
            id: "avatar",
            title: "Producer",
            color: "",
            align: "center",
            colSpan: 1,
            rowSpan: 2,
          },
        ];
        let tableRows = [
          {
            id: "Total",
            value: "Total",
            border: "border-b-4",
          },
        ];
        let tableHeaders = [];
        let tableContent = {
          Total: {},
        };

        const tempPolices = [
          { policy: "Auto", dbName: "autoBonus" },
          { policy: "Fire", dbName: "fireBonus" },
          { policy: "Life", dbName: "lifeBonus" },
          { policy: "Health", dbName: "healthBonus" },
          { policy: "Bank", dbName: "bankBonus" },
        ];
        tempPolices.map((tempPolicy) => {
          if (bonusPlans[0].hasOwnProperty(tempPolicy.dbName)) {
            let bonusPlanCount = 0;
            Object.keys(bonusPlans[0][tempPolicy.dbName]).map((key) => {
              const item = bonusPlans[0][tempPolicy.dbName][key];
              tableHeaders.push({
                id: `${tempPolicy.policy}@${item.name}`,
                value: `${tempPolicy.policy}@${item.name}`,
                startAdornment: report !== "Policies" ? "$" : "",
              });
              bonusPlanCount++;
            });
            tableHeaders.push({
              id: `${tempPolicy.policy}@Total`,
              value: `${tempPolicy.policy}@Total`,
              border: "border-l-4 border-r-4",
              startAdornment: report !== "Policies" ? "$" : "",
            });
            tableColumns.push({
              id: `${tempPolicy.policy} ${report}`,
              title:
                tempPolicy.policy === "Bank"
                  ? "Bank"
                  : `${tempPolicy.policy} ${report}`,
              color: "",
              colSpan: bonusPlanCount + 1,
            });
          }
        });

        users.map((user) => {
          if (user.belongTo === UID) {
            tableRows.push({
              id: user.id,
              value: user.id,
            });
            tableContent[user.data.displayName] = {};
            tableHeaders.map((header) => {
              if (
                header.value.substring(header.value.indexOf("@") + 1) != "Total"
              ) {
                tableContent[user.data.displayName][header.value] =
                  main[production][period][user.id][header.value.split("@")[0]][
                    `${header.value.split("@")[1]}@${report}`
                  ];

                // Total per Policy
                if (
                  !tableContent[user.data.displayName].hasOwnProperty(
                    `${header.value.split("@")[0]}@Total`
                  )
                ) {
                  tableContent[user.data.displayName][
                    `${header.value.split("@")[0]}@Total`
                  ] = 0;
                }
                tableContent[user.data.displayName][
                  `${header.value.split("@")[0]}@Total`
                ] += parseFloat(
                  tableContent[user.data.displayName][header.value]
                );

                // Annual Total
                if (!tableContent["Total"].hasOwnProperty(header.value)) {
                  tableContent["Total"][header.value] = 0;
                }
                tableContent["Total"][header.value] +=
                  tableContent[user.data.displayName][header.value];

                if (
                  !tableContent["Total"].hasOwnProperty(
                    `${header.value.split("@")[0]}@Total`
                  )
                ) {
                  tableContent["Total"][
                    `${header.value.split("@")[0]}@Total`
                  ] = 0;
                }
                tableContent["Total"][
                  `${header.value.split("@")[0]}@Total`
                ] += parseFloat(
                  tableContent[user.data.displayName][header.value]
                );
              }
            });
          }
        });
        widgets = {
          ...widgets,
          Producer_PoliciesAndBank_AutoAndFire_Table: {
            ...widgets.Producer_PoliciesAndBank_AutoAndFire_Table,
            table: {
              ...widgets.Producer_PoliciesAndBank_AutoAndFire_Table.table,
              columns: tableColumns,
            },
          },
        };
        widgets = {
          ...widgets,
          Producer_PoliciesAndBank_AutoAndFire_Table: {
            ...widgets.Producer_PoliciesAndBank_AutoAndFire_Table,
            table: {
              ...widgets.Producer_PoliciesAndBank_AutoAndFire_Table.table,
              rows: tableRows,
            },
          },
        };
        widgets = {
          ...widgets,
          Producer_PoliciesAndBank_AutoAndFire_Table: {
            ...widgets.Producer_PoliciesAndBank_AutoAndFire_Table,
            table: {
              ...widgets.Producer_PoliciesAndBank_AutoAndFire_Table.table,
              headers: tableHeaders,
            },
          },
        };
        widgets = {
          ...widgets,
          Producer_PoliciesAndBank_AutoAndFire_Table: {
            ...widgets.Producer_PoliciesAndBank_AutoAndFire_Table,
            table: {
              ...widgets.Producer_PoliciesAndBank_AutoAndFire_Table.table,
              tableContent: tableContent,
            },
          },
        };
      }

      // Producer_PolicesAndBank_Premium_Chart
      if (widgets.Producer_PolicesAndBank_Premium_Chart) {
        let tempDatasets = [];
        widgets.Producer_PolicesAndBank_Premium_Chart.mainChart.TW.datasets.map(
          (dataset) => {
            let tempDataset = dataset;
            let tempData = [];
            const tableContent =
              widgets.Producer_PoliciesAndBank_AutoAndFire_Table.table
                .tableContent;
            users.map((user) => {
              if (user.belongTo === UID) {
                tempData.push(
                  tableContent[user.data.displayName][
                    `${dataset.label.split(" ")[1]}@Total`
                  ]
                );
              }
            });

            tempDataset = { ...tempDataset, data: tempData };
            tempDatasets.push(tempDataset);
          }
        );
        widgets = {
          ...widgets,
          Producer_PolicesAndBank_Premium_Chart: {
            ...widgets.Producer_PolicesAndBank_Premium_Chart,
            mainChart: {
              ...widgets.Producer_PolicesAndBank_Premium_Chart.mainChart,
              TW: {
                ...widgets.Producer_PolicesAndBank_Premium_Chart.mainChart.TW,
                datasets: [...tempDatasets],
              },
            },
          },
        };

        let tempXAxes = [];
        let tempLabels = [];
        let temp =
          widgets.Producer_PolicesAndBank_Premium_Chart.mainChart.options.scales
            .xAxes[0];
        users.map((user) => {
          if (user.belongTo === UID) tempLabels.push(user.data.displayName);
        });
        temp = { ...temp, labels: tempLabels };
        tempXAxes.push(temp);
        widgets = {
          ...widgets,
          Producer_PolicesAndBank_Premium_Chart: {
            ...widgets.Producer_PolicesAndBank_Premium_Chart,
            mainChart: {
              ...widgets.Producer_PolicesAndBank_Premium_Chart.mainChart,
              options: {
                ...widgets.Producer_PolicesAndBank_Premium_Chart.mainChart
                  .options,
                scales: {
                  ...widgets.Producer_PolicesAndBank_Premium_Chart.mainChart
                    .options.scales,
                  xAxes: [...tempXAxes],
                },
              },
            },
          },
        };
      }
    }

    console.log("--------------widgets", widgets);
    setData({ widgets });
  }, [widgets, main, production, period, report]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  function handleChangePeriod(event) {
    setPeriod(event.target.value);
  }
  function handleChangeYear(date) {
		setDate(date);
	}
  function handleChangeProduction(event) {
    setProduction(event.target.value);
  }

  function handleChangeReport(event) {
    setReport(event.target.value);
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
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									disableToolbar
									variant="inline"
									format="yyyy"
									margin="normal"
									id="date-picker-inline"
									label="Year"
									value={date}
									onChange={handleChangeYear}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
									views={['year']}
								/>
							</MuiPickersUtilsProvider>
						</FuseAnimate>
					</div>
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
                value={report}
                onChange={(ev) => handleChangeReport(ev)}
                label="Report"
                data={options.report.data}
              />
            </FuseAnimate>
          </div>
        </Header>
      }
      content={
        <div className="w-full p-12">
          <FuseAnimateGroup
            className="flex flex-wrap"
            enter={{ animation: "transition.slideUpBigIn" }}
          >
            <div className="widget flex w-full p-12">
              <Table
                data={data.widgets.Producer_PoliciesAndBank_AutoAndFire_Table}
              />
            </div>
          </FuseAnimateGroup>
          <FuseAnimateGroup
            className="flex flex-wrap"
            enter={{ animation: "transition.slideUpBigIn" }}
          >
            <div className="widget flex w-full p-12">
              <Chart
                data={data.widgets.Producer_PolicesAndBank_Premium_Chart}
              />
            </div>
          </FuseAnimateGroup>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer("producerApp", reducer)(PoliciesAndBank);
