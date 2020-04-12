let severeImpact;
let impact;
let DayNumber;

const covid19ImpactEstimator = (data) => {
  const {
    region: { avgDailyIncomeInUSD: avgDailyIncome, avgDailyIncomePopulation: avgPop },
    periodType: perType, timeToElapse: tTE, reportedCases: reportedCase,
    totalHospitalBeds: totalHospitalBed
  } = data;
  impact = {
    currentlyInfected: reportedCase * 10
  };
  severeImpact = {
    currentlyInfected: reportedCase * 50
  };

  if (perType === 'days') {
    DayNumber = tTE;
  } else if (perType === 'weeks') {
    DayNumber = 7 * tTE;
  }
  if (perType === 'months') {
    DayNumber = 30 * tTE;
  }

  const factor = Math.trunc(DayNumber / 3);

  const impactInfBrqt = impact.currentlyInfected * (2 ** factor);
  const sevImpactInfBrqt = severeImpact.currentlyInfected * (2 ** factor);

  impact.infectionsByRequestedTime = Math.trunc(impactInfBrqt);
  severeImpact.infectionsByRequestedTime = Math.trunc(sevImpactInfBrqt);

  const impSevercaseBrqt = 0.15 * impactInfBrqt;
  const sevImpSevercaseBrqt = 0.15 * sevImpactInfBrqt;

  impact.severeCasesByRequestedTime = Math.trunc(impSevercaseBrqt);
  severeImpact.severeCasesByRequestedTime = Math.trunc(sevImpSevercaseBrqt);

  const availableBed = 0.35 * totalHospitalBed;

  impact.hospitalBedsByRequestedTime = Math.trunc(availableBed
    - impSevercaseBrqt);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(availableBed
    - sevImpSevercaseBrqt);

  impact.casesForICUByRequestedTime = Math.trunc(0.05 * impactInfBrqt);
  severeImpact.casesForICUByRequestedTime = Math.trunc(0.05 * sevImpactInfBrqt);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * impactInfBrqt);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * sevImpactInfBrqt);

  const avgDInPop = Number(avgPop);
  const avgIncome = Number(avgDailyIncome);
  const days = Number(DayNumber);

  const impDollInFlight = (impactInfBrqt * avgDInPop
    * avgIncome) / days;
  const sevImpDollInFlight = (sevImpactInfBrqt * avgDInPop
    * avgIncome) / days;

  impact.dollarsInFlight = Math.trunc(impDollInFlight);
  severeImpact.dollarsInFlight = Math.trunc(sevImpDollInFlight);
  return {
    data, impact, severeImpact
  };
};

export default covid19ImpactEstimator;
