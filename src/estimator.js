let severeImpact;
let impact;

const covid19ImpactEstimator = (data) => {
  const {
    region: { avgDailyIncomeInUSD: avgDailyIncome }, reportedCases: reportedCase,
    totalHospitalBeds: totalHospitalBed
  } = data;
  impact = {
    currentlyInfected: reportedCase * 10
  };
  severeImpact = {
    currentlyInfected: reportedCase * 50
  };
  const periodType = 28;
  const factor = Math.floor(periodType / 3);
  impact.infectionsByRequestedTime = (impact.currentlyInfected * (2 ** factor));
  severeImpact.infectionsByRequestedTime = (severeImpact.currentlyInfected * (2 ** factor));
  impact.SevereCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.SevereCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  impact.hospitalBedsByRequestedTime = Math.floor((0.35 * totalHospitalBed)
    - impact.SevereCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = Math.floor((0.35 * totalHospitalBed)
    - severeImpact.SevereCasesByRequestedTime);

  impact.casesForICUByRequestedTime = 0.05 * impact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = 0.05 * severeImpact.infectionsByRequestedTime;

  impact.casesForVentilatorsByRequestedTime = 0.02 * impact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = 0.02 * severeImpact.infectionsByRequestedTime;

  impact.dollarsInFlight = (impact.infectionsByRequestedTime * 0.65
    * avgDailyIncome * periodType).toFixed(2);
  severeImpact.dollarsInFlight = (severeImpact.infectionsByRequestedTime * 0.65
    * avgDailyIncome * periodType).toFixed(2);

  return {
    data, impact, severeImpact
  };
};

export default covid19ImpactEstimator;
