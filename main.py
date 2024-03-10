from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import numpy as np
from numpy.linalg import inv, det
import json

app = Flask(__name__)
app.config["SECRET_KEY"] = "LAMPHAM"

#this function turns the byte string into a json for the server to calculate its operations
def byte_string_to_json(byte_string):
    decode_byte_string = byte_string.decode()
    matrix_dict = json.loads(decode_byte_string)

    return matrix_dict

def inverse_calculation(matrix,rows,columns):
    # rows = 3 
    # columns = 3 
    array_list =[]

    for i in matrix:
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



def determinant_calculation(matrix, rows, columns):
    array_list =[]

    for i in matrix:
        array_list.append(int(matrix[i]))

    matrix = np.array(array_list).reshape(rows,columns)
    return (det(matrix))

# function that transpose a matrix using numpy
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
        
        elif request.form["operation"] == "determinant":
            return redirect(url_for("determinant"))
        
        elif request.form["operation"] == "transpose":
            return redirect(url_for("transpose"))
    
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
    

@app.route("/inverse", methods = ["GET","POST"])
def inverse():
    if request.method == "GET":
        return render_template("inverse.html")
    
    
@app.route("/inverse_calculation", methods = ["GET","POST"])
def display_inverse():
    if request.method == "POST":
        print("inverse")
        matrix_form_dictionary = byte_string_to_json(request.data)
        print(matrix_form_dictionary)
        inverse_matrix = inverse_calculation(matrix_form_dictionary, session.get("rows"), session.get("columns"))
        print(inverse_matrix)
        inverse_json = np_array_to_json(inverse_matrix)
        print(jsonify(inverse_json))
        return jsonify(inverse_json)   

@app.route("/determinant", methods = ["GET","POST"])
def determinant():
    if request.method == "GET":
        return render_template("determinant.html")
    
@app.route("/determinant_calculation", methods = ["GET", "POST"] )
def display_determinant():
    if request.method == "POST":
        print("determinant")
        matrix_form_dictionary = byte_string_to_json(request.data)
        determinant_value = determinant_calculation(matrix_form_dictionary, session.get("rows"), session.get("columns"))
        print(determinant_value)
        return jsonify({"determinant_answer": determinant_value})
        
if __name__ == "__main__":
    app.run(port=8000, debug=True)

