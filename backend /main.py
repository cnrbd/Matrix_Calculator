# import numpy as np
# from flask import Flask, render_template, url_for
from flask import Flask, render_template, url_for

# matrix = np.array([[2,0],
#                     [0,4]], dtype="float")

# test = np.array([[1],
#                  [2]])


# # rows,columns = matrix.shape 




# def rref(a): 
#     pivot = None
#     rows, columns = a.shape 
#     i_row = 0
#     j_column = 0 
#     nonzerorow= 0 

#     while True:
#         if i_row >= rows and j_column >= columns:
#             break

#         if a[i_row][j_column] == 0:
#             nonzerorow = i_row
#             while nonzerorow < rows and a[nonzerorow][j_column] == 0:
#                 nonzerorow += 1

#         if nonzerorow == rows:
#             j += 1

#         temp = a[i_row]
#         a[i_row] = a[nonzerorow]
#         a[nonzerorow] = temp

        
#         pivot = a[i_row][j_column]
    
#     print(pivot)

        

# print(rref (matrix))
# print(matrix[0,0])

app = Flask(__name__, template_folder="../templates")
#necessary change
#necessary change 2

cock = [
    {
        "author" : "LAM PHAM",
        "title" : " I LOVE MATH",
        "content": "LINEAR ALGEBRA",
        "date_posted": "11/13/2023"
    },
    {
        "author" : "LAM PHAM 1 ",
        "title" : " I LOVE MATH 1 ",
        "content": "LINEAR ALGEBRA 1 ",
        "date_posted": "11/13/2024"
    },
    
]

@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html", posts= cock)

@app.route("/about")
def about():
    return render_template("about.html", title = " about")


if __name__ == "__main__":
    app.run(debug=True)

    