import numpy as np
import json

# np_array = np.array([[1,0,0],[0,1,0],[0,0,1]])

# # print(len(np_array))


# for rows_list in range (len(np_array)):

#     for elements in np_array[rows_list]:
#         print (elements)


# def array_to_json(np_array):
#     calculated_json = {}
#     i = 1 # rows
#     j= 1  # columns
#     for row_list in range(len(np_array)):
#         for elements in np_array[row_list]:
#             calculated_json[f"a{i}-{j}"] = elements
#             j+=1
#         i +=1 
#         j = 1

#     return calculated_json

# print(array_to_json(np_array))


def byte_string_to_json(byte_string):
    decode_byte_string = byte_string.decode()
    matrix_dict = json.loads(decode_byte_string)

    return matrix_dict

print(byte_string_to_json(b'{"a-1-1":"1","a-1-2":"0","a-2-1":"0","a-2-2":"1"}'))