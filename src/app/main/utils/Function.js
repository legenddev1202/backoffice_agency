import { monthsAndQuarters, bonusPlanDbNames, policies, months, months1, Options as options } from './Globals';

const belongTo = localStorage.getItem('@BELONGTO');
const UID = localStorage.getItem('@UID');

export const swap = json => {
	const ret = {};
	// eslint-disable-next-line no-restricted-syntax
	for (const key in json) {
		ret[json[key]] = key;
	}
	return ret;
};

export const ceil = number => {
	return Math.ceil(number * 100) / 100;
};

export const dividing = (n1, n2) => {
	return n1 === 0 || n2 === 0 ? 0 : n1 / n2;
};

export const formattedDate = date => {
	if (date === '' || isNaN(date)) {
		return '';
	}
	let dd = date.getDate();
	let mm = date.getMonth() + 1; // January is 0!
	const yyyy = date.getFullYear();
	if (dd < 10) {
		dd = `0${dd}`;
	}
	if (mm < 10) {
		mm = `0${mm}`;
	}
	return `${mm}/${dd}/${yyyy}`;
};

export const formattedString = (val, startAdornment = '', endAdornment = '') => {
	if (IsNumeric(val)) {
		return val === 0
			? ''
			: startAdornment == '$'
			? `${startAdornment}${ceil(val).toFixed(2)}${endAdornment}`
			: `${startAdornment}${ceil(val)}${endAdornment}`;
	}
	if (IsNumeric(val) && isNaN(val)) {
		return '';
	}
	if (val === 'NaN') {
		return `${val}${endAdornment}`;
	}
	if (val === undefined) {
		return '';
	}

	if (Number.isNaN(val)) {
		return '';
	}
	return startAdornment == '$'
		? `${startAdornment}${val.toFixed(2)}${endAdornment}`
		: `${startAdornment}${val}${endAdornment}`;
};

export const formattedNumber = val => {
	if (IsNumeric(val)) {
		return ceil(val);
	}
	if (IsNumeric(val) && isNaN(val)) {
		return 0;
	}
	return ceil(val);
};

export const IsNumeric = input => {
	return input - 0 === input && `${input}`.trim().length > 0;
};

export const getLevel = (policyCount, policyName, bonusPlans) => {
	// console.log('--',policyCount, policyName, bonusPlans)
	let dbName = '';
	if (policyName === 'Auto') dbName = 'individualAutoTargetBonus';
	if (policyName === 'TeamAuto') dbName = 'teamAutoTargetBonus';
	if (policyName === 'Fire') dbName = 'individualFireTargetBonus';
	if (policyName === 'TeamFire') dbName = 'teamFireTargetBonus';
	if (policyName === 'Life') dbName = 'individualLifeTargetBonus';
	if (policyName === 'TeamLife') dbName = 'teamLifeTargetBonus';
	if (policyName === 'Health') dbName = 'individualHealthTargetBonus';
	if (policyName === 'TeamHealth') dbName = 'teamHealthTargetBonus';
	if (policyName === 'Bank') dbName = 'individualBankTargetBonus';
	if (policyName === 'TeamBank') dbName = 'teamBankTargetBonus';
	if (policyName === 'Other') dbName = 'otherActivityBonus';

	const level = {
		level: '',
		policies: 0,
		amount: 0,
		nextLevel: '',
		nextPolicies: 0,
		nextAmount: 0,
		maxLevel: '',
		maxPolicies: 0,
		maxAmount: 0
	};
	let count = 0;
	if (bonusPlans.length > 0 && bonusPlans[0].hasOwnProperty(dbName)) {
		Object.keys(bonusPlans[0][dbName]).map((key, n) => {
			const item = bonusPlans[0][dbName][key];
			if (policyCount > 0) {
				if (n === 0) {
					level.level = 'None Reached';
				}
				if (policyCount >= item.policies) {
					level.level = item.level;
					level.policies = item.policies;
					level.amount = item.amount;
					count++;
				}
				if (n === count) {
					level.nextLevel = item.level;
					level.nextPolicies = item.policies;
					level.nextAmount = item.amount;
				}
				if (n === Object.keys(bonusPlans[0][dbName]).length - 1) {
					level.maxLevel = item.level;
					level.maxPolicies = item.policies;
					level.maxAmount = item.amount;
				}
			}
		});
	}

	return level;
};

export const getOtherActivityBonus = (name, bonusPlans) => {
	//console.log('---------------', name, bonusPlans);
	if (bonusPlans.length > 0 && bonusPlans[0].hasOwnProperty('otherActivityBonus')) {
		let value = 0;
		Object.keys(bonusPlans[0].otherActivityBonus).map((key, n) => {
			const item = bonusPlans[0].otherActivityBonus[key];
			if (item.name === name) {
				value = item.dollar;
			}
		});
		return value;
	}
};

// Getting  main data
export const getMain = (
	entries,
	bonusPlans = [],
	marketings = [],
	users = [],
	vision = [],
	lapseRate = [],
	policyGrowth = []
) => {
	const temp = {};
	options.production.data.map(pro => {
		const production = pro.value;
		temp[production] = {};

		monthsAndQuarters.map(mon => {
			const month = mon.value;
			const visionMonth = mon.visionValue;
			temp[production][month] = {};

			users.map(user => {
				const { belongTo } = user;
				const userId = user.id;
				temp[production][month][userId] = {};

				policies.map(pol => {
					const policy = pol.value;
					const { entry } = pol;
					const { typeOfProduct } = pol;
					const visionPlicy = pol.vision;
					temp[production][month][userId][policy] = {
						Bonuses: 0,
						Premium: 0,
						Policies: 0,
						Averages: 0,
						household: 0,
						individual: 0,
						lapseRate: 0,
						lapseRateChange: 0,
						lapseBonus: 0,
						growthBonus: 0,
						specialPromotion: 0,
						Goals: 0,
						realGoal: 0
					};

					// adding marketing items
					Object.keys(marketings).map(key => {
						const marketing = marketings[key];
						temp[production][month][userId][policy][marketing.marketingName] = 0;
					});

					// adding bonusPlan items
					const bonusPlan =
						bonusPlans.length > 0 && bonusPlans[0].hasOwnProperty(bonusPlanDbNames[policy].db)
							? bonusPlans[0][bonusPlanDbNames[policy].db]
							: {};
					Object.keys(bonusPlan).map(key => {
						const item = bonusPlan[key];
						temp[production][month][userId][policy][item.name] = 0;
						temp[production][month][userId][policy][`${item.name}@Bonuses`] = 0;
						temp[production][month][userId][policy][`${item.name}@Premium`] = 0;
						temp[production][month][userId][policy][`${item.name}@Policies`] = 0;
						temp[production][month][userId][policy][`${item.name}@Averages`] = 0;
					});

					if (!month.includes('Totals')) {
						// const indBonusPlan = bonusPlans.length > 0 &&	bonusPlans[0].hasOwnProperty(bonusPlanDbNames[policy].indDb) ? bonusPlans[0][bonusPlanDbNames[policy].indDb] : {};
						// const teamBonusPlan = bonusPlans.length > 0 &&	bonusPlans[0].hasOwnProperty(bonusPlanDbNames[policy].teamDb) ? bonusPlans[0][bonusPlanDbNames[policy].teamDb] : {};
						const lapseBonusPlan =
							bonusPlans.length > 0 && bonusPlans[0].hasOwnProperty(bonusPlanDbNames[policy].lapseDb)
								? bonusPlans[0][bonusPlanDbNames[policy].lapseDb]
								: {};
						const growthBonusPlan =
							bonusPlans.length > 0 && bonusPlans[0].hasOwnProperty(bonusPlanDbNames[policy].growthDb)
								? bonusPlans[0][bonusPlanDbNames[policy].growthDb]
								: {};

						//  init lapseRate
						const lapse =
							lapseRate.length > 0 &&
							lapseRate[0].hasOwnProperty(policy) &&
							lapseRate[0][policy].hasOwnProperty(month)
								? lapseRate[0][policy][month]
								: {};
						temp[production][month][userId][policy].lapseRate = lapse.hasOwnProperty('lapseRate')
							? parseFloat(lapse.lapseRate.value)
							: 0;
						temp[production][month][userId][policy].lapseRateChange = lapse.hasOwnProperty('previousMonth')
							? isNaN(parseFloat(lapse.previousMonth.value))
								? 0
								: parseFloat(lapse.previousMonth.value)
							: 0;
						const lapseRateLevel = lapse.hasOwnProperty('level') ? lapse.level.value : 0;
						let lapseBonusByLevel = 0;
						Object.keys(lapseBonusPlan).map(key => {
							const item = lapseBonusPlan[key];
							if (item.name === lapseRateLevel) {
								lapseBonusByLevel = item.dollar;
							}
						});
						temp[production][month][userId][policy].lapseBonus = parseFloat(lapseBonusByLevel);

						//  init policyGrowth
						const growth =
							policyGrowth.length > 0 &&
							policyGrowth[0].hasOwnProperty('numberChange') &&
							policyGrowth[0].numberChange.hasOwnProperty(month)
								? policyGrowth[0].numberChange[month]
								: {};
						let growthBonusPerPolicy = 0;
						Object.keys(growthBonusPlan).map(key => {
							growthBonusPerPolicy = growthBonusPlan[key].dollar;
						});
						temp[production][month][userId][policy].growthBonus = growth.hasOwnProperty(
							policy.toLowerCase()
						)
							? growth[policy.toLowerCase()].value * growthBonusPerPolicy
							: 0;

						//  init specialPromotion
						temp[production][month][userId][policy].specialPromotion = 0;

						// init vision items
						if (vision.length > 0 && vision[0].hasOwnProperty(userId)) {
							temp[production][month][userId][policy].Goals =
								vision[0][userId].Goals[visionMonth][visionPlicy];
							temp[production][month][userId][policy].realGoal =
								vision[0][userId].Goals[visionMonth][visionPlicy];
						}

						// init entries
						if (entries.length > 0 && entries[0].hasOwnProperty(entry)) {
							const entryUserId = userId === belongTo ? 'OfficeCount' : userId;
							if (entries[0][entry].hasOwnProperty(entryUserId)) {
								Object.keys(entries[0][entry][entryUserId]).map(key => {
									const item = entries[0][entry][entryUserId][key];
									const writtenMonth = new Date(item.datePolicyIsWritten).getMonth();
									const issuedMonth =
										item.datePolicyIsIssued === ''
											? ''
											: new Date(item.datePolicyIsIssued).getMonth();
									if (production === 'Show Issued Production' && issuedMonth === '') {
										return;
									}
									const tempMonth =
										production === 'Show Written Production'
											? months[writtenMonth].value
											: months[issuedMonth].value;
									if (month === tempMonth) {
										const semiAnnual = policy === 'Auto' ? 2 : 1;
										const bonus = item.dollarBonus === '' ? 0 : item.dollarBonus;
										temp[production][month][userId][policy][item[typeOfProduct]] += parseFloat(
											item.creditPercent / 100
										);
										temp[production][month][userId][policy][item.sourceOfBusiness] += parseFloat(
											item.creditPercent / 100
										);
										temp[production][month][userId][policy][item.policyHolderType] += 1; // household, individual
										temp[production][month][userId][policy].Bonuses += parseFloat(bonus);
										temp[production][month][userId][policy].Premium +=
											(parseFloat(item.policyPremium) *
												parseFloat(item.creditPercent) *
												semiAnnual) /
											100;
										temp[production][month][userId][policy].Policies += parseFloat(
											item.creditPercent / 100
										);
										temp[production][month][userId][policy].Averages = dividing(
											temp[production][month][userId][policy].Premium,
											temp[production][month][userId][policy].Policies
										);
										temp[production][month][userId][policy][
											`${item[typeOfProduct]}@Bonuses`
										] += parseFloat(bonus);
										temp[production][month][userId][policy][`${item[typeOfProduct]}@Premium`] +=
											(parseFloat(item.policyPremium) *
												parseFloat(item.creditPercent) *
												semiAnnual) /
											100;
										temp[production][month][userId][policy][
											`${item[typeOfProduct]}@Policies`
										] += parseFloat(item.creditPercent / 100);
										temp[production][month][userId][policy][
											`${item[typeOfProduct]}@Averages`
										] = dividing(
											temp[production][month][userId][policy][`${item[typeOfProduct]}@Premium`],
											temp[production][month][userId][policy][`${item.typeOfProduct}@Policies`]
										);
									}
								});
							}
						}

						for (let i = 0; i < months1.indexOf(month); i++) {
							const tempMonth = months1[i];
							if (
								temp[production][tempMonth][userId][policy].Goals >
								temp[production][tempMonth][userId][policy].Policies
							) {
								temp[production][month][userId][policy].realGoal +=
									temp[production][tempMonth][userId][policy].Goals -
									temp[production][tempMonth][userId][policy].Policies;
							}
						}
					}

					for (let i = 0; i < 4; i++) {
						if (month === `Quarter ${i + 1} Totals`) {
							Object.keys(temp[production][`Quarter ${i + 1} Totals`][userId][policy]).map(key => {
								if (key === 'Averages') {
									temp[production][`Quarter ${i + 1} Totals`][userId][policy][key] = dividing(
										temp[production][months[i * 3].value][userId][policy].Premium,
										temp[production][months[i * 3].value][userId][policy].Policies
									);
								} else {
									temp[production][`Quarter ${i + 1} Totals`][userId][policy][key] =
										temp[production][months[i * 3].value][userId][policy][key] +
										temp[production][months[i * 3 + 1].value][userId][policy][key] +
										temp[production][months[i * 3 + 2].value][userId][policy][key];
								}
								if (key === 'realGoal') {
									temp[production][`Quarter ${i + 1} Totals`][userId][policy][key] =
										temp[production][months[i * 3 + 2].value][userId][policy].realGoal;
								}
							});
						}
					}
					if (month === `Annual Totals`) {
						Object.keys(temp[production][`Annual Totals`][userId][policy]).map(key => {
							if (key === 'realGoal') {
								temp[production][`Annual Totals`][userId][policy][key] =
									temp[production][`Quarter 4 Totals`][userId][policy].realGoal;
							} else {
								temp[production][`Annual Totals`][userId][policy][key] =
									temp[production][`Quarter 1 Totals`][userId][policy][key] +
									temp[production][`Quarter 2 Totals`][userId][policy][key] +
									temp[production][`Quarter 3 Totals`][userId][policy][key] +
									temp[production][`Quarter 4 Totals`][userId][policy][key];
							}
						});
					}
				});
			});
		});
	});

	//console.log('--------------------temp=', temp);
	return temp;
};
