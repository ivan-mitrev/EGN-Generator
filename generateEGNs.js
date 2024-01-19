const egnValidator = require("./egnValidator");

function generateEGN(year, month, day, region, suffix) {
  let formattedYear = year.toString().substring(2);
  let formattedMonth = ("0" + (month + (year >= 2000 ? 40 : 0))).slice(-2);
  let formattedDay = ("0" + day).slice(-2);
  let formattedRegion = ("0" + region).slice(-2);
  let formattedSuffix = ("0" + suffix).slice(-2);
  let firstNineDigits = `${formattedYear}${formattedMonth}${formattedDay}${formattedRegion}${formattedSuffix}`;
  return firstNineDigits;
}

async function generateEGNs(startYear, endYear) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let existingEGNs = new Set();
      for (let year = startYear; year <= endYear; year++) {
        for (let month = 1; month <= 12; month++) {
          let daysInMonth = new Date(year, month, 0).getDate();
          for (let day = 1; day <= daysInMonth; day++) {
            for (let region = 0; region <= 999; region++) {
              for (let suffix = 0; suffix <= 99; suffix++) {
                let egn = generateEGN(year, month, day, region, suffix);
                if (egnValidator(egn)) {
                  existingEGNs.add(egn);
                }
              }
            }
          }
        }
      }
      resolve(Array.from(existingEGNs));
    }, 0);
  });
}

module.exports = generateEGNs;
