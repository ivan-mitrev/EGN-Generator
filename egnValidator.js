const isValidDate = (e, t, n) => {
  var r = new Date(e, t, n);
  return r.getFullYear() === e && r.getMonth() === t && r.getDate() === n;
};

const isValidEgnDate = (e, t, n) => {
  if (t >= 40) {
    if (!isValidDate(e + 2e3, t - 40, n)) return !1;
  } else if (t >= 20) {
    if (!isValidDate(e + 1800, t - 20, n)) return !1;
  } else if (!isValidDate(e + 1900, t, n)) return !1;
  return !0;
};

const egnValidator = (egn) => {
  var n = new RegExp("^s*([0-9]{10}|.{0})s*$", "i").test(egn);
  if (n && 10 === egn.length) {
    var r = [2, 4, 8, 5, 10, 9, 7, 3, 6],
      i = +egn.substring(0, 2),
      o = +egn.substring(2, 4) - 1,
      a = +egn.substring(4, 6);
    if (isValidEgnDate(i, o, a)) {
      for (var s = +egn.substring(9, 10), c = 0, l = 0; l < 9; l++) c += egn.substring(l, l + 1) * r[l];
      var u = c % 11;
      10 === u && (u = 0), s !== u && (n = !1);
    } else n = !1;
  }
  return n;
};

module.exports = egnValidator;
