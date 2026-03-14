import numpy as np

# Generate two numpy arrays
array1 = np.random.randint(1,100,(3,3))
array2 = np.random.randint(1,100,(3,3))

# Merge the arrays
merged_array = np.concatenate((array1, array2))

print("Array 1:", array1)
print("Array 2:", array2)
print("Merged Array:", merged_array)