export const Options = {
  period: {
    id: "Report Period",
    data: [
      { item: "January", value: "January" },
      { item: "February", value: "February" },
      { item: "March", value: "March" },
      { item: "1st Quarter", value: "Quarter 1 Totals" },
      { item: "April", value: "April" },
      { item: "May", value: "May" },
      { item: "June", value: "June" },
      { item: "2nd Quarter", value: "Quarter 2 Totals" },
      { item: "July", value: "July" },
      { item: "August", value: "August" },
      { item: "September", value: "September" },
      { item: "3rd Quarter", value: "Quarter 3 Totals" },
      { item: "October", value: "October" },
      { item: "November", value: "November" },
      { item: "December", value: "December" },
      { item: "4th Quarter", value: "Quarter 4 Totals" },
      { item: "Year", value: "Annual Totals" },
    ],
  },
  production: {
    id: "Production",
    data: [
      { item: "Show Written Production", value: "Show Written Production" },
      { item: "Show Issued Production", value: "Show Issued Production" },
    ],
  },

  product: {
    id: "Product",
    data: [
      { item: "Auto", value: "Auto" },
      { item: "Fire", value: "Fire" },
      { item: "Life", value: "Life" },
      { item: "Health", value: "Health" },
      // { item: 'Bank', value: 'Bank' },
      { item: "Total", value: "Total" },
    ],
  },
  report: {
    id: "Report Type",
    data: [
      { item: "Policies", value: "Policies" },
      { item: "Premium", value: "Premium" },
      { item: "Bonuses", value: "Bonuses" },
    ],
  },
  bonus: {
    id: "Include Initial Bonus?",
    data: [
      {
        item: "Include Initial Bonus in Calculation",
        value: "Include Initial Bonus in Calculation",
      },
      {
        item: "Do not Include Initial Bonus",
        value: "Do not Include Initial Bonus",
      },
    ],
  },
  produce: {
    id: "Produced",
    data: [
      { item: "As A Team", value: "As A Team" },
      { item: "Individually", value: "Individually" },
    ],
  },
  ot: {
    id: "OT",
    data: [
      { item: "Yes", value: "Yes" },
      { item: "No", value: "No" },
    ],
  },
};

export const policies = [
  {
    id: "Auto",
    value: "Auto",
    entry: "Entries",
    typeOfProduct: "typeOfProduct",
    vision: "autoPolicies",
    color: "",
  },
  {
    id: "Fire",
    value: "Fire",
    entry: "FireEntries",
    typeOfProduct: "typeOfProductFire",
    vision: "firePolicies",
    color: "",
  },
  {
    id: "Life",
    value: "Life",
    entry: "LifeEntries",
    typeOfProduct: "typeOfProductLife",
    vision: "lifePolicies",
    color: "",
  },
  {
    id: "Health",
    value: "Health",
    entry: "HealthEntries",
    typeOfProduct: "typeOfProductHealth",
    vision: "healthPolicies",
    color: "",
  },
  {
    id: "Bank",
    value: "Bank",
    entry: "BankEntries",
    typeOfProduct: "typeOfProductBank",
    vision: "bankProducts",
    color: "",
  },
  {
    id: "Total",
    value: "Total",
    entry: "",
    typeOfProduct: "",
    vision: "totalProducts",
    color: "",
  },
];

export const months = [
  { id: "January", value: "January" },
  { id: "February", value: "February" },
  { id: "March", value: "March" },
  { id: "April", value: "April" },
  { id: "May", value: "May" },
  { id: "June", value: "June" },
  { id: "July", value: "July" },
  { id: "August", value: "August" },
  { id: "September", value: "September" },
  { id: "October", value: "October" },
  { id: "November", value: "November" },
  { id: "December", value: "December" },
];

export const monthsAndQuarters = [
  { id: "January", value: "January", visionValue: "January" },
  { id: "February", value: "February", visionValue: "February" },
  { id: "March", value: "March", visionValue: "March" },
  { id: "April", value: "April", visionValue: "April" },
  { id: "May", value: "May", visionValue: "May" },
  { id: "June", value: "June", visionValue: "June" },
  { id: "July", value: "July", visionValue: "July" },
  { id: "August", value: "August", visionValue: "August" },
  { id: "September", value: "September", visionValue: "September" },
  { id: "October", value: "October", visionValue: "October" },
  { id: "November", value: "November", visionValue: "November" },
  { id: "December", value: "December", visionValue: "December" },
  {
    id: "Quarter 1 Totals",
    value: "Quarter 1 Totals",
    visionValue: "Quarter1",
    border: "border-t-4",
  },
  {
    id: "Quarter 2 Totals",
    value: "Quarter 2 Totals",
    visionValue: "Quarter2",
  },
  {
    id: "Quarter 3 Totals",
    value: "Quarter 3 Totals",
    visionValue: "Quarter3",
  },
  {
    id: "Quarter 4 Totals",
    value: "Quarter 4 Totals",
    visionValue: "Quarter4",
  },
  {
    id: "Annual Totals",
    value: "Annual Totals",
    visionValue: "Total",
    border: "border-t-4",
  },
  // { id: "Projected for Year", value: "Projected for Year", visionValue: "Total", border: "border-t-4" },
];

export const months1 = [
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
  "Quarter1",
  "Quarter2",
  "Quarter3",
  "Quarter4",
  "Total",
];

export const bonusPlanDbNames = {
  Auto: {
    name: "Auto",
    db: "autoBonus",
    indDb: "individualAutoTargetBonus",
    teamDb: "teamAutoTargetBonus",
    lapseDb: "monthlyAgencyLapseAutoBonus",
    growthDb: "monthlyAutoNetGrowthBonus",
  },
  Fire: {
    name: "Fire",
    db: "fireBonus",
    indDb: "individualFireTargetBonus",
    teamDb: "teamFireTargetBonus",
    lapseDb: "monthlyAgencyLapseFireBonus",
    growthDb: "monthlyFireNetGrowthBonus",
  },
  Life: {
    name: "Life",
    db: "lifeBonus",
    indDb: "individualLifeTargetBonus",
    teamDb: "teamLifeTargetBonus",
    lapseDb: "monthlyAgencyLapseLifeBonus",
    growthDb: "monthlyLifeNetGrowthBonus",
  },
  Health: {
    name: "Health",
    db: "healthBonus",
    indDb: "individualHealthTargetBonus",
    teamDb: "teamHealthTargetBonus",
    lapseDb: "monthlyAgencyLapseHealthBonus",
    growthDb: "monthlyHealthNetGrowthBonus",
  },
  Bank: {
    name: "Bank",
    db: "bankBonus",
    indDb: "individualBankTargetBonus",
    teamDb: "teamBankTargetBonus",
    lapseDb: "monthlyAgencyLapseBankBonus",
    growthDb: "monthlyBankNetGrowthBonus",
  },
  Other: {
    name: "Other",
    db: "otherActivityBonus",
    indDb: "individualOtherTargetBonus",
  },
  Total: {
    name: "Total",
    db: "totalBonus",
    indDb: "individualTotalTargetBonus",
  },
};

export const policiesAndPremium1 = [
  { id: "Average Premium", value: "Average Premium", startAdornment: "$" },
  { id: "Number of Policies", value: "Number of Policies" },
  { id: "Policy Premium", value: "Policy Premium", startAdornment: "$" },
];

export const policiesAndPremium2 = [
  { id: "Auto Policies", value: "Auto Policies" },
  { id: "Auto Premium", value: "Auto Premium" },
  { id: "Fire Policies", value: "Fire Policies" },
  { id: "Fire Premium", value: "Fire Premium" },
  { id: "Life Policies", value: "Life Policies" },
  { id: "Life Premium", value: "Life Premium" },
  { id: "Health Policies", value: "Health Policies" },
  { id: "Health Premium", value: "Health Premium" },
  { id: "Bank Products", value: "Bank Products" },
  { id: "Bank Dollars", value: "Bank Dollars" },
  { id: "Total Policies", value: "Total Policies" },
  { id: "Total Premium", value: "Total Premium" },
];

export const policiesAndBonuses = [
  { id: "Auto Policies", value: "Auto Policies" },
  { id: "Auto Bonuses", value: "Auto Bonuses" },
  { id: "Fire Policies", value: "Fire Policies" },
  { id: "Fire Bonuses", value: "Fire Bonuses" },
  { id: "Life Policies", value: "Life Policies" },
  { id: "Life Bonuses", value: "Life Bonuses" },
  { id: "Health Policies", value: "Health Policies" },
  { id: "Health Bonuses", value: "Health Bonuses" },
  { id: "Bank Products", value: "Bank Products" },
  { id: "Bank Bonuses", value: "Bank Bonuses" },
  { id: "Other Activities", value: "Other Activities" },
  { id: "Other Activity Bonuses", value: "Other Activity Bonuses" },
  { id: "Individual Target Bonuses", value: "Individual Target Bonuses" },
  { id: "Team Target Bonuses", value: "Team Target Bonuses" },
  { id: "Policy Growth Bonuses", value: "Policy Growth Bonuses" },
  { id: "Lapse Rate % Bonus", value: "Lapse Rate % Bonus" },
  { id: "Special Promotion	", value: "Special Promotion" },
  { id: "Total Policies", value: "Total Policies" },
  { id: "Total Bonuses", value: "Total Bonuses" },
  { id: "Bonus Verified?", value: "Bonus Verified?" },
];

export const incomeGoalsColumns = [
  {
    id: "avatar",
    title: "GOALS",
    color: "",
    align: "center",
    rowSpan: 2,
  },
  {
    id: "policyAndProductGoals",
    title: "POLICY & PRODUCT GOALS",
    color: "",
    colSpan: 6,
  },
  {
    id: "premiumAndDollarsGoals",
    title: "PREMIUM & DOLLARS GOALS",
    color: "",
    colSpan: 6,
    startAdornment: "$",
  },
];

export const incomeBonusesColumns = [
  {
    id: "avatar",
    title: "BONUSES",
    color: "",
    align: "center",
    rowSpan: 2,
  },
  {
    id: "initialPoliciAndProductGoals",
    title: "Premium & Dollar Goals",
    color: "",
    colSpan: 5,
  },
  {
    id: "indivisualTargetBonuses",
    title: "Bonuses: Initial Policy & Product Bonus",
    color: "",
    colSpan: 5,
  },
];

export const incomeGoalsHeaders = [
  { id: "autoPolicies", value: "Auto Policies", type: false, color: "" },
  { id: "firePolicies", value: "Fire Policies", type: false, color: "" },
  { id: "lifePolicies", value: "Life Policies", type: false, color: "" },
  { id: "healthPolicies", value: "Health Policies", type: false, color: "" },
  { id: "bankProducts", value: "Bank Products", type: false, color: "" },
  { id: "totalProducts", value: "Total Products", type: false, color: "" },
  {
    id: "annualAutoPremium",
    value: "Annual Auto Premium",
    type: false,
    color: "",
    startAdornment: "$",
  },
  {
    id: "annualFirePremium",
    value: "Annual Fire Premium",
    type: false,
    color: "",
    startAdornment: "$",
  },
  {
    id: "annualLifePremium",
    value: "Annual Life Premium",
    type: false,
    color: "",
    startAdornment: "$",
  },
  {
    id: "annualHealthPremium",
    value: "Annual Health Premium",
    type: false,
    color: "",
    startAdornment: "$",
  },
  {
    id: "agencyBankComm",
    value: "Agency Bank Comm",
    type: false,
    color: "",
    startAdornment: "$",
  },
  {
    id: "totalAnnualPremium",
    value: "Total Annual Premium",
    type: false,
    color: "",
    startAdornment: "$",
  },
];

export const incomeBonusesHeaders = [
  {
    id: "autoPolicyBonuses",
    value: "Auto Policy Bonuses",
    type: false,
    color: "",
  },
  {
    id: "firePolicyBonuses",
    value: "Fire Policy Bonuses",
    type: false,
    color: "",
  },
  {
    id: "lifePolicyBonuses",
    value: "Life Policy Bonuses",
    type: false,
    color: "",
  },
  {
    id: "healthPolicyBonuses",
    value: "Health Policy Bonuses",
    type: false,
    color: "",
  },
  {
    id: "bankProductBonuses",
    value: "Bank Product Bonuses",
    type: false,
    color: "",
  },
  {
    id: "individualAutoTargetBonuses",
    value: "Individual Auto Target Bonuses",
    type: false,
    color: "",
  },
  {
    id: "individualFireTargetBonuses",
    value: "Individual Fire Target Bonuses",
    type: false,
    color: "",
  },
  {
    id: "individualLifeTargetBonuses",
    value: "Individual Life Target Bonuses",
    type: false,
    color: "",
  },
  {
    id: "individualHealthTargetBonuses",
    value: "Individual Health Target Bonuses",
    type: false,
    color: "",
  },
  {
    id: "individualBankTargetBonuses",
    value: "Individual Bank Target Bonuses",
    type: false,
    color: "",
  },
];

export const incomeAvgsRows = [
  { id: "Average Commission", value: "Average Commission", type: false, color: "" },
  {
    id: "Average Annual Premium",
    value: "Average Annual Premium",
    type: false,
    color: "",
  },
];

export const projectionsRows = [
  {
    id: "Year 1 Commission per Item(Custom)",
    value: "Year 1 Commission per Item(Custom)",
    type: false,
    color: "",
  },
  {
    id: "Year 1 Commission per Item",
    value: "Year 1 Commission per Item",
    type: false,
    color: "",
  },
  {
    id: "ANNUAL Premium Average per Policy",
    value: "ANNUAL Premium Average per Policy",
    type: false,
    color: "",
  },
  {
    id: "Average Initial PRODUCER Bonus per Policy",
    value: "Average Initial PRODUCER Bonus per Policy",
    type: false,
    color: "",
  },
  {
    id: "Avg Initial Bonus per Item",
    value: "Avg Initial Bonus per Item",
    type: false,
    color: "",
  },
  {
    id: "Avg Annual Premium / $",
    value: "Avg Annual Premium / $",
    type: false,
    color: "",
  },
];

export const toUntrimed = {
  // goals headers
  autoPolicies: "Auto Policies",
  firePolicies: "Fire Policies",
  lifePolicies: "Life Policies",
  healthPolicies: "Health Policies",
  bankProducts: "Bank Products",
  totalProducts: "Total Products",
  annualAutoPremium: "Annual Auto Premium",
  annualFirePremium: "Annual Fire Premium",
  annualLifePremium: "Annual Life Premium",
  annualHealthPremium: "Annual Health Premium",
  agencyBankComm: "Agency Bank Comm",
  totalAnnualPremium: "Total Annual Premium",
  multilineReviewApptKept: "Multiline Review Appt. Kept",
  ifr: "IFR",
  autoPoliciesBoughtIn: "Auto Policies Bought In",
  firePoliciesBoughtIn: "Fire Policies Bought In",
  lifePoliciesBoughtIn: "Life Policies Bought In",
  healthPoliciesBoughtIn: "Health Policies Bought In",
  bankDocumentsBoughtIn: "Bank Documents Bought In",
  ifrCompleted: "IFR Completed",

  // avgs rows
  averageBonus: "Average Commission",
  averageAnnualPremium: "Average Annual Premium",
  annualCommission: "Year 1 Commission per Item",
  customAnnualCommission: "Year 1 Commission per Item(Custom)",
  annualPremium: "ANNUAL Premium Average per Policy",
  initialBonus: "Average Initial PRODUCER Bonus per Policy",

  avgInitialBonus: "Avg Initial Bonus per Item",
  avgAnnualPremium: "Avg Annual Premium / $",

  // bonuses rows
  autoPolicyBonuses: "Auto Policy Bonuses",
  firePolicyBonuses: "Fire Policy Bonuses",
  lifePolicyBonuses: "Life Policy Bonuses",
  healthPolicyBonuses: "Health Policy Bonuses",
  bankProductBonuses: "Bank Product Bonuses",
  individualAutoTargetBonuses: "Individual Auto Target Bonuses",
  individualFireTargetBonuses: "Individual Fire Target Bonuses",
  individualLifeTargetBonuses: "Individual Life Target Bonuses",
  individualHealthTargetBonuses: "Individual Health Target Bonuses",
  individualBankTargetBonuses: "Individual Bank Target Bonuses",

  // time report
  in: "In",
  out: "Out",
  lunch: "Lunch",
  totalHrsWorked: "Total Hrs Worked",
  regHrs: "Reg. Hrs",
  proj1Hrs: "Proj 1 Hrs",
  proj2Hrs: "Proj 2 Hrs",
  proj3Hrs: "Proj 3 Hrs",
  vacation: "Vacation",
  v: "V",
  sick: "Sick",
  s: "S",
  bereavement: "Bereavement",
  b: "B",
  holiday: "Holiday",
  totalHrs: "Total Hrs",
  notes: "Notes",
};

export const colors = [
  { backgroundColor: "#42BFF7", hoverBackgroundColor: "#87CDF7" },
  { backgroundColor: "#C6ECFD", hoverBackgroundColor: "#D7EFFD" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
  { backgroundColor: "#77ff99", hoverBackgroundColor: "#c9ffd6" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
  { backgroundColor: "#42BFF7", hoverBackgroundColor: "#87CDF7" },
  { backgroundColor: "#C6ECFD", hoverBackgroundColor: "#D7EFFD" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
  { backgroundColor: "#77ff99", hoverBackgroundColor: "#c9ffd6" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
  { backgroundColor: "#42BFF7", hoverBackgroundColor: "#87CDF7" },
  { backgroundColor: "#C6ECFD", hoverBackgroundColor: "#D7EFFD" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
  { backgroundColor: "#77ff99", hoverBackgroundColor: "#c9ffd6" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
  { backgroundColor: "#42BFF7", hoverBackgroundColor: "#87CDF7" },
  { backgroundColor: "#C6ECFD", hoverBackgroundColor: "#D7EFFD" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
  { backgroundColor: "#77ff99", hoverBackgroundColor: "#c9ffd6" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
  { backgroundColor: "#42BFF7", hoverBackgroundColor: "#87CDF7" },
  { backgroundColor: "#C6ECFD", hoverBackgroundColor: "#D7EFFD" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
  { backgroundColor: "#77ff99", hoverBackgroundColor: "#c9ffd6" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
  { backgroundColor: "#42BFF7", hoverBackgroundColor: "#87CDF7" },
  { backgroundColor: "#C6ECFD", hoverBackgroundColor: "#D7EFFD" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
  { backgroundColor: "#77ff99", hoverBackgroundColor: "#c9ffd6" },
  { backgroundColor: "#f9cfcf", hoverBackgroundColor: "#ffcece" },
];
