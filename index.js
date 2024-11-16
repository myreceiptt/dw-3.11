/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  const sp = new URLSearchParams(window.location.search);

  $fx.params([
    {
      id: "num_pings",
      name: "Number of Pings",
      type: "number",
      default: 1,
      options: {
        min: 1,
        max: 6,
        step: 1,
      },
    },
    {
      id: "num_cells",
      name: "Number of Cells",
      type: "number",
      default: 11,
      options: {
        min: 4,
        max: 74,
        step: 1,
      },
    },
    {
      id: "min_size",
      name: "Smallest Cells",
      type: "number",
      default: 11,
      options: {
        min: 1,
        max: 47,
        step: 1,
      },
    },
    {
      id: "max_size",
      name: "Largest Cells",
      type: "number",
      default: 111,
      options: {
        min: 74,
        max: 111,
        step: 1,
      },
    },
  ]);

  $fx.features({
    "Number of Pings": $fx.getParam("num_pings"),
    "Number of Cells": $fx.getParam("num_cells"),
    "Smallest Cells": $fx.getParam("min_size"),
    "Largest Cells": $fx.getParam("max_size"),
  });

  /******/
})();
