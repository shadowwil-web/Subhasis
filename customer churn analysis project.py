import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import seaborn as sns
from customer_churn_analysis import create_churn_dataframe
# Generate the dataset
data = create_churn_dataframe(num_rows=10000)
print("Dataset generated successfully!")
print(data.head())
print(data.isnull().sum())
data.info()
data.drop('customer_id', axis=1, inplace=True)
data['churn'] = data['churn'].map({'Yes': 1, 'No': 0})
print(data['churn'].value_counts())
data.duplicated().sum()
data.drop_duplicates(inplace=True)
print(f"Dataset shape after removing duplicates: {data.shape}")
data=pd.get_dummies(data, drop_first=True)
# Ensure contract_1 year exists for plotting
if 'contract_1 year' not in data.columns:
    # contract_1 year is the case when neither contract_2 years nor contract_Monthly are True
    data['contract_1 year'] = (~data['contract_2 years']) & (~data['contract_Monthly'])

print(data.head())
print("Columns:", data.columns.tolist())

# Plot + save helpers
def save_plot(filename):
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()
    print(f"Saved: {filename}")

plt.figure(figsize=(8, 6))
sns.countplot(x='churn', data=data)
plt.title('Churn Distribution')
save_plot('churn_distribution.png')

plt.figure(figsize=(8, 6))
sns.countplot(x='contract_1 year', hue='churn', data=data)
plt.title('Churn by Contract (1 Year)')
plt.xlabel('1 Year Contract (0 = No, 1 = Yes)')
plt.legend(title='Churn')
save_plot('churn_by_contract_1_year.png')

plt.figure(figsize=(8, 6))
sns.countplot(x='gender_Male', hue='churn', data=data)
plt.title('Churn by Gender')
plt.xlabel('Male (0 = Female, 1 = Male)')
plt.legend(title='Churn')
save_plot('churn_by_gender.png')

plt.figure(figsize=(8, 6))
sns.countplot(x='internet_services_Fiber', hue='churn', data=data)
plt.title('Churn by Internet Service')
plt.xlabel('Fiber Internet (0 = DSL, 1 = Fiber)')
plt.legend(title='Churn')
save_plot('churn_by_internet_service.png')

plt.figure(figsize=(10, 6))
sns.boxplot(x='churn', y='monthly_charges', data=data)
plt.title('Monthly Charges by Churn')
save_plot('monthly_charges_by_churn.png')

print('All plots completed.')

# Model training + evaluation
print('Preparing model training data...')

# We already have churn as 0/1 in data
if 'churn' not in data.columns:
    raise ValueError('churn column missing in data')

X = data.drop('churn', axis=1)
Y = data['churn']

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42, stratify=Y)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(x_train, y_train)

print('Model training complete.')

y_pred = model.predict(x_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.4f}')
print('Classification report:')
print(classification_report(y_test, y_pred, digits=4))
print('Confusion matrix:')
print(confusion_matrix(y_test, y_pred))

# Save model score to file
with open('model_accuracy.txt', 'w') as f:
    f.write(f'Accuracy: {accuracy:.4f}\n')
    f.write(classification_report(y_test, y_pred, digits=4))

print('Model evaluation saved to model_accuracy.txt')