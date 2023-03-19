var chart = bb.generate({
  data: {
    columns: [
      ["Male", -83, -143, -100, -120, -150, -85],
      ["Female", 130, 100, 140, 175, 150, 50],
    ],
    type: "bar", // for ESM specify as: bar()
    groups: [["Male", "Female"]],
    labels: {
      format: function (v, id) {
        return Math.abs(v);
      },
    },
  },
  axis: {
    rotated: true,
    x: {
      show: false,
    },
    y: {
      tick: {
        format: function (v) {
          return Math.abs(v);
        },
      },
    },
  },
  grid: {
    y: {
      show: true,
      lines: [
        {
          value: 0,
          class: "base-line",
        },
      ],
    },
  },
  tooltip: {
    format: {
      value: function (v) {
        return Math.abs(v);
      },
    },
  },
  bindto: "#rotatedAxisGroupedBar",
});
