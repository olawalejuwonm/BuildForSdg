var severeImpact, impact;
// const covid19ImpactEstimator = (data) => {data};
// var data = {
//     region: {
//         name: "Africa",
//         avgAge: 19.7,
//         avgDailyIncomeInUSD: 5,
//         avgDailyIncomePopulation: 0.71
//     },
//     periodType: "days",
//     timeToElapse: 58,
//     reportedCases: 674,
//     population: 66622705,
//     totalHospitalBeds: 1380614
// };

const covid19ImpactEstimator = (data) => {
	const reportedCases = data.reportedCases;
	impact = {
		currentlyInfected: reportedCases * 10
	};
	severeImpact = {
		currentlyInfected: reportedCases * 50
	};
	const periodType = 28;
	const factor = Math.floor(periodType / 3);
	impact.infectionsByRequestedTime = (impact.currentlyInfected * (2 * * factor));
	severeImpact.infectionsByRequestedTime = (severeImpact.currentlyInfected * (2 * * factor));
	impact.SevereCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
	severeImpact.SevereCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;
	const totalHospitalBeds = data.totalHospitalBeds;

	impact.hospitalBedsByRequestedTime = Math.floor((0.35 * totalHospitalBeds) - impact.SevereCasesByRequestedTime);
	severeImpact.hospitalBedsByRequestedTime = Math.floor((0.35 * totalHospitalBeds) - severeImpact.SevereCasesByRequestedTime);

	impact.casesForICUByRequestedTime = 0.05 * impact.infectionsByRequestedTime;
	severeImpact.casesForICUByRequestedTime = 0.05 * severeImpact.infectionsByRequestedTime;

	impact.casesForVentilatorsByRequestedTime = 0.02 * impact.infectionsByRequestedTime;
	severeImpact.casesForVentilatorsByRequestedTime = 0.02 * severeImpact.infectionsByRequestedTime;

	const avgDailyIncomeInUSD = data.region.avgDailyIncomeInUSD;
	impact.dollarsInFlight = (impact.infectionsByRequestedTime * 0.65 * avgDailyIncomeInUSD * periodType).toFixed(2);
	severeImpact.dollarsInFlight = (severeImpact.infectionsByRequestedTime * 0.65 * avgDailyIncomeInUSD * periodType).toFixed(2);

	return {
		data, impact, severeImpact
	};
};
// const covid19ImpactEstimator = (data) => {
// 	const input = data;
// return{ 
//  data: input, 
//  impact: {}, 
//  severeImpact: {}
//   };
//  };
// or return {data, impact, severeImpact};
export default covid19ImpactEstimator;