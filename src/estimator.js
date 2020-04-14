/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable indent */
function changeData(file) {
  let newData;
  if (file.periodType === 'months') {
    newData = Math.trunc(2 ** Math.trunc((file.timeToElapse * 30) / 3));
  } else if (file.periodType === 'weeks') {
    newData = Math.trunc(2 ** Math.trunc((file.timeToElapse * 7) / 3));
  } else if (file.periodType === 'days') {
    newData = Math.trunc(2 ** Math.trunc((file.timeToElapse * 1) / 3));
  }
  return newData;
}
function changeDay(infections, file) {
  let newDay;
  if (file.periodType === 'months') {
    newDay = file.timeToElapse * 30;
  } else if (file.periodType === 'weeks') {
    newDay = file.timeToElapse * 7;
  } else if (file.periodType === 'days') {
    newDay = file.timeToElapse * 1;
  }
  const calc = (infections * file.region.avgDailyIncomeInUSD * file.region.avgDailyIncomePopulation) / newDay;
  return Math.trunc(calc);
}
function impact(data) {
  const {
    reportedCases,
    totalHospitalBeds
  } = data;

  const currentlyInfected = reportedCases * 10;
  const infectionsByRequestedTime = Math.trunc(currentlyInfected * changeData(data));
  const severeCasesByRequestedTime = Math.trunc(0.15 * infectionsByRequestedTime);
  const bed = (0.35 * totalHospitalBeds);
  const hospitalBedsByRequestedTime = Math.trunc(bed - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
  const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
  const dollarsInFlight = changeDay(infectionsByRequestedTime, data);
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
}
function severeImpact(data) {
  const {
    reportedCases,
    totalHospitalBeds
  } = data;

  const currentlyInfected = reportedCases * 50;
  const infectionsByRequestedTime = Math.trunc(currentlyInfected * changeData(data));
  const severeCasesByRequestedTime = Math.trunc(0.15 * infectionsByRequestedTime);
  const bed = (0.35 * totalHospitalBeds);
  const hospitalBedsByRequestedTime = Math.trunc(bed - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
  const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
  const dollarsInFlight = changeDay(infectionsByRequestedTime, data);
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
}

const covid19ImpactEstimator = (data) => {
  const newData = {
    data,
    impact: impact(data),
    severeImpact: severeImpact(data)
  };
  return newData;
};
export default covid19ImpactEstimator;