export const calcDewPoint = function (temp: number, rh: number) {
  const constA = 17.625;
  const constB = 243.04;

  // convert temp to Celsius
  // temp = (cToF(temp) - 32) * (5 / 9);

  // calculate numerator of Td equation
  const dew_numer =
    constB * (Math.log(rh / 100.0) + (constA * temp) / (temp + constB));
  // calculate denominator of Td equation
  const dew_denom =
    constA - Math.log(rh / 100.0) - (constA * temp) / (temp + constB);
  // calculate the dew point
  let dew = dew_numer / dew_denom;
  // convert dew to F
  dew = dew * (9 / 5) + 32;
  // round dew
  dew = Math.round(dew);
  return dew;
};
