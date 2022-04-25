# observation = ['H', 'T', 'H']

# import itertools

# def perm(n, seq):
# 	all_perm = []

# 	for p in itertools.product(seq, repeat=n):
# 		result = "".join(p)
# 		all_perm.append(result)

# 	return all_perm


# all_orders = perm(3, "123")

# transitions = {"1": {"1": 0.9, "2": 0.05, "3": 0.05}, 
# 				"2": {"1": 0.45, "2": 0.1, "3": 0.45},
# 				"3": {"1": 0.45, "2": 0.45, "3": 0.1}}

# rolls = {"1": {"H": 0.5, "T": 0.5},
# 		"2":{"H": 0.75, "T": 0.25},
# 		"3":{"H": 0.25, "T": 0.75}}

# total_probability = 0

# for order in all_orders:
# 	probabilityHTH = 1

# 	print("order:", order, )

# 	for i in range(3):
# 		current_coin = order[i]
# 		obs = observation[i]

# 		print("observation:", obs, )

# 		if i == 0:
# 			pi = 1/3
# 		else:
# 			previous_coin = order[i-1]
# 			pi = transitions[previous_coin][current_coin]

# 		probability = pi * rolls[current_coin][obs]

# 		print("transition:", pi, "probability:", rolls[current_coin][obs], )

# 		probabilityHTH = probabilityHTH * probability

# 	print("probabilityHTH: ", probabilityHTH)

# 	total_probability += probabilityHTH

# 	print("\n")


# print(total_probability)

# import random

# numbers = []

# features = ['v', 'w', 'x', 'y', 'z', 'q']

# for i in range(6):
# 	f = features[i]
# 	numbers.append((f, round(random.uniform(-1, 1), 2)))

# print(numbers)

### CONVERT CSV TO JSON

import pandas as pd
import json
import numpy as np
from sklearn.preprocessing import StandardScaler
import umap

# Load original data
df_original = pd.read_csv('./all-models/lin_reg-test-original.csv')

original_cols = df_original.columns.values.tolist()

# Load test data
df_test = pd.read_csv('./test-data-prediction-results.csv')

df_test['genre'] = pd.Series([-1 for x in range(len(df_test.index))])

df_test = df_test.rename(columns={'linear_regression': 'lin_reg_predicted',
								  'logistic_regression': 'log_reg_predicted',
								  'random_forest': 'rf_predicted',
								  'svm': 'svm_clf_predicted',
								  'multi-layer_perceptron': 'mlp_predicted',
								  'gaussian_process': 'gpc_predicted',
								  'gaussian_naive_bayes': 'gnb_predicted',
								  'knn': 'knn_predicted',
								  'gaussian_mixture_model': 'gmm_predicted'})

df_test_cols = df_test.columns.values.tolist()

# Get features only of test data

df_test_features = df_test.drop(columns=['lin_reg_predicted', 'log_reg_predicted', 'rf_predicted',
										 'svm_clf_predicted', 'mlp_predicted', 'gpc_predicted',
										 'gnb_predicted', 'knn_predicted','gmm_predicted',
										 'index', 'genre', 'filepath', 'filename'])

### CREATE UMAP
# data = pd.read_json('./4-19 Model Training Data/rf-original-test.json')
df_features = df_original.drop(columns=["index", "genre", "filepath", "filename"])

# Concat original and test data
df_joined = pd.concat([df_features, df_test_features])

# print(df_joined.shape)

reducer = umap.UMAP()

scaled_data = StandardScaler().fit_transform(df_joined)
embedding = reducer.fit_transform(scaled_data)
coords = pd.DataFrame(embedding)

# Original coords
original_coords = coords.iloc[:300,:]

# Test coords
test_coords = coords.iloc[300:,:].reset_index(drop=True)

# print(original_coords, test_coords)

# Get new column names
new_cols = original_cols + ['x', 'y']
new_test_cols = df_test_cols + ['x', 'y']

# Add coords to test data
df_test_final = pd.concat([df_test, test_coords], axis=1)
df_test_final.columns =  new_test_cols

# print(df_test_final)

# Add coords and predictions to original data

df_original_final = pd.concat([df_original, original_coords], axis=1)

# Get predicted for each model

models = ['gmm', 'gnb', 'gpc', 'knn', 'lin_reg', 'log_reg', 'mlp', 'rf', 'svm_clf']

for m in models:
	df_predict = pd.read_csv('./all-models/' + m + '-test-predict.csv')
	predicted = df_predict["genre"]

	new_cols = new_cols + [m + '_predicted']

	df_original_final = pd.concat([df_original_final, predicted], axis=1)

df_original_final.columns = new_cols

# Concat original and test data

df_final = pd.concat([df_test_final, df_original_final]).reset_index(drop=True)

df_final.to_json("./all-models-with-coords.json", orient="records")

















