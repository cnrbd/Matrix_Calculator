from flask import Flask, render_template, request, redirect, url_for, session
import numpy as np
from numpy.linalg import inv, det

app = Flask(__name__)
app.config["SECRET_KEY"] = "LAMPHAM"

def inverse_calculation(matrix,rows,columns):
    # rows = 3 
    # columns = 3 
    array_list =[]

    for i in matrix:
        if matrix[i] != matrix["calculate"]:
            array_list.append(int(matrix[i]))

    matrix = np.array(array_list).reshape(rows,columns)
    return (inv(matrix))


def np_array_to_json(np_array):
    calculated_json = {}
    i = 1 # rows
    j= 1  # columns
    for row_list in range(len(np_array)):
        for elements in np_array[row_list]:
            calculated_json[f"a{i}-{j}"] = elements
            j+=1
        i +=1 
        j = 1

    return calculated_json

        
def processing_rows(rows_and_columns):
    rows = int(rows_and_columns["rows"])
    # print (f"{rows}")
    return rows

def processing_columns(rows_and_columns):
    columns = int(rows_and_columns["columns"])
    # print (f"{columns}")
    return columns



def determinant_calculation(matrix):
    rows = 3 
    columns = 3 
    array_list =[]

    for i in matrix:
        array_list.append(int(matrix[i]))

    matrix = np.array(array_list).reshape(rows,columns)
    return (det(matrix))

def transpose_calculation(matrix):
    rows = 3 
    columns = 3 
    array_list =[]

    for i in matrix:
        array_list.append(int(matrix[i]))

    matrix = np.array(array_list).reshape(rows,columns)
    return (np.transpose(matrix))

# make a function that creates the matrix by user input 

@app.route("/", methods = ["GET", "POST"])
def operation ():
    if request.method == "POST":
        print (request.form["operation"])

        if request.form["operation"] == "inverse":
            return redirect(url_for("inverse"))
    
    return render_template ("home1.html")


@app.route("/make_matrix" , methods = ["GET","POST"])
def make_matrix_function():
    if request.method == "POST":
        print (request.get_json())
        rows = processing_rows(request.get_json())
        columns = processing_columns(request.get_json())

        session["rows"] = rows
        session["columns"] = columns       
    return (render_template("inverse.html"))
    

# @app.route("/inverse", methods = ["GET","POST"])
# def inverse():
#     request_method = request.method
#     calculate = request.form.get("calculate")
#     clear = request.form.get("clear")
#     if request_method == "POST":
#         print("POST METHOD")
#         if calculate is not None:
#             matrix = request.form.to_dict()
#             print("matrix:")
#             print(matrix)
#             inverse_matrix = inverse_calculation(matrix,session.get("rows"),session.get("columns"))
#             print(inverse_matrix)
#             # print(array_to_json(inverse_matrix))
#             return render_template("inverse.html", inverse_matrix = inverse_matrix)
#         elif clear is not None:
#             return render_template("inverse.html")
#         else:
#             return render_template("inverse.html")
#     else:
#         print("GET METHOD")
#         return render_template("inverse.html")

@app.route("/inverse", methods = ["GET","POST"])
def inverse():
    if request.method == "GET":
        return render_template("inverse.html")
    
    
@app.route("/inverse_calculation", methods = ["GET","POST"])
def display_inverse():
    calculate = request.form.get("calculate")
    clear = request.form.get("clear")
    if request.method == "POST":
        print("POST METHOD")
        matrix = request.form.to_dict()
        print(matrix)
        inverse_matrix = inverse_calculation(matrix,session.get("rows"),session.get("columns"))
        print(inverse_matrix)
        inverse_json = np_array_to_json(inverse_matrix)
        return inverse_json

@app.route("/determinant", methods = ["POST"])
def determinant():
    print (request.method)
        

if __name__ == "__main__":
    app.run(port=8000, debug=True)

