import numpy as np 

# a = np.array([[],
#               []])

# # print(a.shape)
# print(a[1][0])
       
# b = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

# a = np.array(b)

# print (a)


# rows = int(input("Rows: "))
# columns = int(input("Columns: "))


# matrix = np.empty(shape=(rows, columns), dtype='int')

# for row in matrix:
#     for number in range(len(row)):
#             user_input = int(input("Number: "))
#             number_sum = 0 + user_input
#             row[number] = number_sum

   
# print (matrix)
#len counts only the number of rows of the matrix 
# a = np.array([[4,8,4],
#               [3,8,5],
#               [-2,1,12]])

b = np.array([[2,0],
             [0,4]])

# print (a[0]*(1/a[0][0]))
r,c = b.shape 
# print(len(a))

print(min(r,c))

# print(a[1:,:1])

# for i in range(len(a)):
#     print (a[i,0])
