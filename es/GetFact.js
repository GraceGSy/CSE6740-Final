import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
export var CatFact = function CatFact(_ref) {
  var data = _ref.data;

  var _useState = useState(""),
      currentFact = _useState[0],
      setCurrentFact = _useState[1];

  var GetNewFact = function GetNewFact() {
    fetch('https://catfact.ninja/fact', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      setCurrentFact(data.fact);
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      "margin-top": "25px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "small",
    variant: "outlined",
    onClick: function onClick() {
      return GetNewFact();
    }
  }, "Click for New Fact"), /*#__PURE__*/React.createElement("p", null, currentFact));
};