import { authRoles } from "app/auth";
import i18next from "i18next";
import DocumentationNavigation from "../main/documentation/DocumentationNavigation";

import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    translate: "APPLICATIONS",
    type: "group",
    icon: "apps",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        icon: "dashboard",
        url: "/apps/dashboard/dashboard",
        exact: true,
      },
      // {
      // 	id: 'vision',
      // 	title: 'Vision',
      // 	translate: 'Vision',
      // 	type: 'collapse',
      // 	icon: 'remove_red_eye',
      // 	url: '/apps/vision',
      // 	children: [
      // 		{
      // 			id: 'vision',
      // 			title: 'Income Goals',
      // 			type: 'item',
      // 			url: '/apps/vision/income-goals',
      // 			exact: true
      // 		}
      // 	]
      // },
      {
        id: "setup",
        title: "Agency Set Up",
        translate: "Agency Set Up",
        type: "collapse",
        icon: "settings",
        url: "/apps/setup/bonus-plan-template/all",
        children: [
          {
            id: "goals-actual",
            title: "Bonus Plan Setup",
            type: "item",
            url: "/apps/setup/bonus-plan-template/all",
            exact: true,
          },
          {
            id: "users",
            title: "Bonus Plan Assignment",
            type: "item",
            url: "/apps/setup/users",
            exact: true,
          },
          {
            id: "vision",
            title: "Income Goals",
            type: "item",
            url: "/apps/vision/income-goals",
            exact: true,
          },
          {
            id: "marketing",
            title: "Marketing Source",
            type: "item",
            url: "/apps/setup/marketing",
            exact: true,
          },
          {
            id: "productType",
            title: "Product Subtype",
            type: "item",
            url: "/apps/setup/product-type",
            exact: true,
          },
          
        ],
      },
      {
        id: "producer",
        title: "Agent Producer View",
        translate: "Agency Producer View",
        type: "collapse",
        icon: "monetization_on",
        url: "/apps/producer",
        children: [
          {
            id: "goals-actual",
            title: "Goals & Production Report",
            type: "item",
            url: "/apps/producer/goals-actual",
            exact: true,
          },
          {
            id: "policies-bank",
            title: "Policies & Bank",
            type: "item",
            url: "/apps/producer/policies-bank",
            exact: true,
          },
          {
            id: "staff-sources",
            title: "Marketing Source Report",
            type: "item",
            url: "/apps/producer/staff-sources",
            exact: true,
          },
          {
            id: "staff-multiline",
            title: "Penetration Report",
            type: "item",
            url: "/apps/producer/staff-multiline",
            exact: true,
          },
        ],
      },
      {
        id: "enter-sales",
        title: "Sale",
        translate: "Sale",
        type: "item",
        icon: "shopping_cart",
        url: "/apps/enter-sales/auto-entry",
      },
      {
        id: "agency",
        title: "Agency Reports",
        translate: "Agency Reports",
        type: "collapse",
        icon: "support_agent",
        url: "/apps/lapse-rate-report",
        children: [
          {
            id: "lapse-rate",
            title: "Lapse Rate Entry",
            type: "item",
            url: "/apps/lapse-rate-report",
            // icon: 'local_activity',
            exact: true,
          },
          {
            id: "policy-growth",
            title: "Agency Growth Entry",
            type: "item",
            url: "/apps/team-policy-growth-report",
            // icon: 'align_vertical_bottom',
            exact: true,
          },
          {
            id: "payroll",
            title: "Payroll",
            type: "item",
            url: "/apps/agency/payroll",
            exact: true,
          },
          {
            id: "product-line",
            title: "Product & Activity Report",
            type: "item",
            url: "/apps/agency/product-line",
            exact: true,
          },
          {
            id: "sources",
            title: "Marketing Source",
            type: "item",
            url: "/apps/agency/sources",
            exact: true,
          },
          {
            id: "multiline",
            title: "Penetration Summary",
            type: "item",
            url: "/apps/agency/multiline",
            exact: true,
          },
          {
            id: "target-reports",
            title: "Target Bonus Report",
            type: "item",
            url: "/apps/agency/target-reports",
            exact: true,
          },
          {
            id: "possible-money",
            title: "Agency (Possible Money)",
            type: "item",
            url: "/apps/agency/possible-money",
            exact: true,
          },
        ],
      },
      {
        id: "agency-production-reporting",
        title: "Agent Production Reporting",
        translate: "Agency Production Reporting",
        type: "collapse",
        icon: "monetization_on",
        url: "/apps/activity/appRegister",
        children: [
          {
            id: "application-register",
            title: "Application Register",
            type: "item",
            url: "/apps/activity/appRegister",
            icon: "loupe",
            exact: true,
          },
        ],
      },
      {
        id: "projections",
        title: "Agency Income Projections",
        translate: "Agency Income Projections",
        type: "collapse",
        icon: "remove_red_eye",
        url: "/apps/projections",
        children: [
          {
            id: "projections",
            title: "Income Projection Setup",
            type: "item",
            url: "/apps/projections/setup",
            exact: true,
          },
          {
            id: "bonus-plan",
            title: "Bonus Plan",
            type: "item",
            url: "/apps/setup/bonus-plan-template/all",
            exact: true,
          },
          {
            id: "default",
            title: "Income Projections",
            translate: "Projections(Default Targets)",
            type: "collapse",
            icon: "remove_red_eye",
            url: "/apps/projections/default",
            children: [
              {
                id: "producer-opportunity-summary",
                title: "Producer Opportunity(Summary)",
                type: "item",
                url: "/apps/projections/default/producer-opportunity-summary",
                exact: true,
              },
              {
                id: "producer-opportunity-detailed",
                title: "Producer Opportunity(Detailed)",
                type: "item",
                url: "/apps/projections/default/producer-opportunity-detailed",
                exact: true,
              },
              {
                id: "producer-opportunity-graph",
                title: "Producer Opportunity(Graph)",
                type: "item",
                url: "/apps/projections/default/producer-opportunity-graph",
                exact: true,
              },
              {
                id: "agency-income-report",
                title: "Agency Income Report",
                type: "item",
                url: "/apps/projections/default/agency-income-report",
                exact: true,
              },
            ],
          },
          {
            id: "custom",
            title: "Income Projections",
            translate: "Projections(Custom Targets)",
            type: "collapse",
            icon: "remove_red_eye",
            url: "/apps/projections/custom",
            children: [
              {
                id: "set-custom-projection-targets",
                title: "Set Custom Projection Targets",
                type: "item",
                url: "/apps/projections/custom/producer-opportunity-summary",
                exact: true,
              },
              {
                id: "producer-opportunity-custom-detailed",
                title: "Producer Opportunity(Detailed)",
                type: "item",
                url: "/apps/projections/custom/producer-opportunity-detailed",
                exact: true,
              },
              {
                id: "producer-opportunity-custom-graph",
                title: "Producer Opportunity(Graph)",
                type: "item",
                url: "/apps/projections/custom/producer-opportunity-graph",
                exact: true,
              },
              {
                id: "agency-income-custom-report",
                title: "Income Report",
                type: "item",
                url: "/apps/projections/custom/agency-income-report",
                exact: true,
              }             
            ],
          },         
        ],
      },

      // {
      // 	id: 'time-report',
      // 	title: 'Time Report',
      // 	translate: 'Time Report',
      // 	type: 'collapse',
      // 	icon: 'schedule',
      // 	url: '/apps/time',
      // 	children: [
      // 		{
      // 			id: 'time-report',
      // 			title: 'Time Report',
      // 			type: 'item',
      // 			url: '/apps/time-report',
      // 			icon: 'alarm_on',
      // 			exact: true
      // 		},
      // 		{
      // 			id: 'time-track',
      // 			title: 'Time Track',
      // 			type: 'item',
      // 			url: '/apps/time-track',
      // 			icon: 'today',
      // 			exact: true
      // 		},
      // 	]
      // },
    ],
  },
  {
    id: "subacription",
    title: "Manage Subscription",
    type: "item",
    auth: authRoles.admin,
    url: "/apps/subscription",
    icon: 'subscriptions',
    exact: true,
  },
];

export default navigationConfig;
