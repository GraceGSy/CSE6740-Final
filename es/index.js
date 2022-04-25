// import './index.css'
import React, { useRef, useEffect, useState, componentDidMount } from 'react';
import * as d3 from 'd3';
import { Scatterplot } from './Scatterplot';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
export var Test = function Test(_ref) {
  var data = _ref.data;

  var _React$useState = React.useState('knn'),
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
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: divStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: description
  }, /*#__PURE__*/React.createElement(FormControl, {
    sx: {
      m: 1,
      minWidth: 120
    }
  }, /*#__PURE__*/React.createElement(InputLabel, {
    id: "demo-select-small"
  }, "Model"), /*#__PURE__*/React.createElement(Select, {
    labelId: "demo-select-small",
    id: "demo-select-small",
    value: model,
    label: "Model",
    onChange: handleChange,
    defaultValue: "knn"
  }, /*#__PURE__*/React.createElement(MenuItem, {
    value: 'gmm'
  }, "Gaussian Mixture Model"), /*#__PURE__*/React.createElement(MenuItem, {
    value: 'gnb'
  }, "Gaussian Naive Bayes"), /*#__PURE__*/React.createElement(MenuItem, {
    value: 'gpc'
  }, "Gaussian Process Classifier"), /*#__PURE__*/React.createElement(MenuItem, {
    value: 'knn'
  }, "k-Nearest Neighbors"), /*#__PURE__*/React.createElement(MenuItem, {
    value: 'lin_reg'
  }, "Linear Regression"), /*#__PURE__*/React.createElement(MenuItem, {
    value: 'log_ref'
  }, "Log Regression"), /*#__PURE__*/React.createElement(MenuItem, {
    value: 'mlp'
  }, "Multi-layer Perceptron"), /*#__PURE__*/React.createElement(MenuItem, {
    value: 'rf'
  }, "Random Forest"), /*#__PURE__*/React.createElement(MenuItem, {
    value: 'svm_clf'
  }, "SVM"))), /*#__PURE__*/React.createElement("h2", null, "Music Genre Classification Explorer")), /*#__PURE__*/React.createElement("p", {
    style: paragraph
  }, "Select a genre or a song to begin.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Scatterplot, {
    dataset: data,
    model: model
  })));
};