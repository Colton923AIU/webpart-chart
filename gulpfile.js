"use strict";

const build = require("@microsoft/sp-build-web");

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

var getTasks = build.rig.getTasks;

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.resolve.alias = {
      ...generatedConfiguration.resolve.alias,
      "react-dom/server": "react-dom/server.js",
    };
    return generatedConfiguration;
  },
});

build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set("serve", result.get("serve-deprecated"));

  return result;
};

build.initialize(require("gulp"));
