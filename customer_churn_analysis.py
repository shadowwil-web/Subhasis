import pandas as pd
import numpy as np
import random

def create_churn_dataframe(num_rows=5000):
    # Set seed for reproducibility
    np.random.seed(42)
    random.seed(42)
    
    # 1. Generate base features
    data = {
        'customer_id': [f"CUST-{i+1:06d}" for i in range(num_rows)],
        'gender': np.random.choice(['Male', 'Female'], num_rows),
        'tenure': np.random.randint(1, 73, num_rows), # Months with company (1 to 72)
        'internet_services': np.random.choice(['Fiber', 'DSL'], num_rows),
        'contract': np.random.choice(['Monthly', '1 year', '2 years'], num_rows, p=[0.55, 0.20, 0.25])
    }
    
    df = pd.DataFrame(data)
    
    # 2. Assign monthly charges based on internet service
    df['monthly_charges'] = np.where(
        df['internet_services'] == 'Fiber',
        np.random.uniform(75.0, 120.0, num_rows),
        np.random.uniform(40.0, 70.0, num_rows)
    ).round(2)
    
    # 3. Calculate total charges
    df['total_charges'] = (df['tenure'] * df['monthly_charges']).round(2)
    
    # 4. Define Churn logic (Target Variable)
    def calculate_churn(row):
        churn_risk = 0.10 # Base chance of churning
        
        # Add realistic correlations
        if row['contract'] == 'Monthly':
            churn_risk += 0.35
        elif row['contract'] == '2 years':
            churn_risk -= 0.08
            
        if row['tenure'] < 6:
            churn_risk += 0.20
            
        if row['internet_services'] == 'Fiber':
            churn_risk += 0.05
            
        if row['monthly_charges'] > 90:
            churn_risk += 0.10
            
        # Ensure probability stays between 0 and 1
        churn_risk = max(0.0, min(1.0, churn_risk))
        
        return 'Yes' if random.random() < churn_risk else 'No'

    # Apply the churn logic to create the target column
    df['churn'] = df.apply(calculate_churn, axis=1)
    
    return df

# --- Generate the DataFrame ---
# Change the number below to make it as big as you need
if __name__ == "__main__":
    df = create_churn_dataframe(num_rows=10000)

    # Display the first 10 rows to verify
    print(df.head(10))

    # Basic Analysis
    print("\n=== Churn Analysis ===")
    print(f"Total customers: {len(df)}")
    print(f"Churn rate: {df['churn'].value_counts(normalize=True)['Yes']:.2%}")

    print("\nChurn rate by contract:")
    churn_by_contract = df.groupby('contract')['churn'].value_counts(normalize=True).unstack()
    print(churn_by_contract['Yes'].round(3))

    print("\nChurn rate by internet service:")
    churn_by_service = df.groupby('internet_services')['churn'].value_counts(normalize=True).unstack()
    print(churn_by_service['Yes'].round(3))

    print("\nAverage tenure by churn:")
    avg_tenure = df.groupby('churn')['tenure'].mean()
    print(avg_tenure.round(1))

    print("\nAverage monthly charges by churn:")
    avg_charges = df.groupby('churn')['monthly_charges'].mean()
    print(avg_charges.round(2))

    # To save it locally, uncomment the line below:
    # df.to_csv('large_telco_churn_data.csv', index=False)