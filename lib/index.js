"use strict";

exports.__esModule = true;
exports.Test = void 0;

var _react = _interopRequireWildcard(require("react"));

var d3 = _interopRequireWildcard(require("d3"));

var _Scatterplot = require("./Scatterplot");

var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));

var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));

var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));

var _Select = _interopRequireWildcard(require("@mui/material/Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import './index.css'
var Test = function Test(_ref) {
  var data = _ref.data;

  var _React$useState = _react["default"].useState('knn'),
      model = _React$useState[0],
      setModel = _React$useState[1];

  function handleChange(e) {
    setModel(e.target.value);
    console.log('current mode', model);
  }

  ;
  var models = ['gmm', 'gnb', 'gpc', 'knn', 'lin_reg', 'log_reg', 'mlp', 'rf', 'svm_clf'];
  var divStyle = {
    "fontFamily": "sans-serif",
    "marginLeft": "60px",
    "marginTop": "50px"
  };
  var description = {
    "display": "flex",
    "alignItems": "center"
  };
  var header = {
    "fontSize": "1.2em"
  };
  var paragraph = {
    "marginLeft": "10px"
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: divStyle
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: description
  }, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    sx: {
      m: 1,
      minWidth: 120
    }
  }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
    id: "demo-select-small"
  }, "Model"), /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    labelId: "demo-select-small",
    id: "demo-select-small",
    value: model,
    label: "Model",
    onChange: handleChange,
    defaultValue: "knn"
  }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 'gmm'
  }, "Gaussian Mixture Model"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 'gnb'
  }, "Gaussian Naive Bayes"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 'gpc'
  }, "Gaussian Process Classifier"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 'knn'
  }, "k-Nearest Neighbors"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 'lin_reg'
  }, "Linear Regression"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 'log_ref'
  }, "Log Regression"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 'mlp'
  }, "Multi-layer Perceptron"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 'rf'
  }, "Random Forest"), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
    value: 'svm_clf'
  }, "SVM"))), /*#__PURE__*/_react["default"].createElement("h2", null, "Music Genre Classification Explorer")), /*#__PURE__*/_react["default"].createElement("p", {
    style: paragraph
  }, "Select a genre or a song to begin.")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_Scatterplot.Scatterplot, {
    dataset: data,
    model: model
  })));
};

exports.Test = Test;