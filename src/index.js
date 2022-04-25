// import './index.css'

import React, {useRef, useEffect, useState, componentDidMount} from 'react'
import * as d3 from 'd3';
import {Scatterplot} from './Scatterplot';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const Test = ({data}) => {

  const [model, setModel] = React.useState('knn');

  function handleChange(e) {
    setModel(e.target.value);
    console.log('current mode', model)
  };

  const models = ['gmm', 'gnb', 'gpc', 'knn', 'lin_reg', 'log_reg', 'mlp', 'rf', 'svm_clf']

  const divStyle = {"fontFamily": "sans-serif", "marginLeft": "60px", "marginTop": "50px"}
  const description = {"display": "flex", "alignItems": "center"}
  const header = {"fontSize": "1.2em"}
  const paragraph = {"marginLeft": "10px"}

  return (
  	<div>
      <div style={divStyle}>
    		
        <div style={description}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-select-small">Model</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={model}
              label="Model"
              onChange={handleChange}
              defaultValue = "knn"
            >
              <MenuItem value={'gmm'}>Gaussian Mixture Model</MenuItem>
              <MenuItem value={'gnb'}>Gaussian Naive Bayes</MenuItem>
              <MenuItem value={'gpc'}>Gaussian Process Classifier</MenuItem>
              <MenuItem value={'knn'}>k-Nearest Neighbors</MenuItem>
              <MenuItem value={'lin_reg'}>Linear Regression</MenuItem>
              <MenuItem value={'log_ref'}>Log Regression</MenuItem>
              <MenuItem value={'mlp'}>Multi-layer Perceptron</MenuItem>
              <MenuItem value={'rf'}>Random Forest</MenuItem>
              <MenuItem value={'svm_clf'}>SVM</MenuItem>
            </Select>
          </FormControl>
          <h2>Music Genre Classification Explorer</h2>
        </div>
        <p style={paragraph}>Select a genre or a song to begin.</p>
      </div>
	  	<div>
	    	<Scatterplot dataset={data} model={model} />
	    </div>
    </div>
  )
}
