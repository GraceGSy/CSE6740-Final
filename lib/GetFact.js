"use strict";

exports.__esModule = true;
exports.CatFact = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("@mui/material/Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CatFact = function CatFact(_ref) {
  var data = _ref.data;

  var _useState = (0, _react.useState)(""),
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

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      "margin-top": "25px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    size: "small",
    variant: "outlined",
    onClick: function onClick() {
      return GetNewFact();
    }
  }, "Click for New Fact"), /*#__PURE__*/_react["default"].createElement("p", null, currentFact));
};

exports.CatFact = CatFact;