// const { default: axios } = require("axios");

const matrixDisplay = document.querySelector(".matrix_display");
const matrixSetting = document.querySelector(".matrix_setting");
const display = document.querySelector(".display");
console.log("hello");


const rows = document.getElementById("rows");
const columns = document.getElementById("columns");
const btnMakeMatrix = document.getElementById("btn-make-matrix");
const btnClear = document.getElementById("btn-clear")
const btnCalculateMatrix = document.getElementById("btn-calculate-matrix")
const matrixForm = document.getElementById("matrix-form");
const answer = document.getElementById("answer")
let temp = 0;

const flaskUrl = "http://127.0.0.1:5000";

function createMatrix() {
    
    for (i=0; i<Number(rows.value); i++){
        let newDiv = document.createElement("div");
        matrixForm.appendChild(newDiv);
        for (j=0; j<Number(columns.value); j++){
            let newInput = document.createElement("input");
            newInput.type = "number";
            newInput.name = `a-${i+1}-${j+1}`;
            newInput.id = `a-${i+1}-${j+1}`;
            newInput.minLength = "1";
            newInput.required = true;
            newInput.placeholder = 0
            newInput.setAttribute("form","matrix-form");
            matrixForm.appendChild(newInput);        
        }
    }
}


function clearMatrix(){
    const matrixInputs = document.getElementById("matrix-form").elements;
    // console.log(matrixInputs)

    for (var i=0; i< matrixInputs.length; i++)
        console.log(i)
        if (matrixInputs[i].tagName === "INPUT" ){
            matrixInputs[i].remove();
        }    
}

const getMatrix = () => {
    axios.get(`${flaskUrl}/inverse`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error("error: ", error)
    })
};

btnMakeMatrix.addEventListener("click", (event)=>{
    event.preventDefault();
    
    const myRequest = new Request("/make_matrix");
    fetch(myRequest, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({rows: `${rows.value}`, columns:`${columns.value}`})
      })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response);
        })
    createMatrix();
});




matrixForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Call the fetchInverseMatrix function to make the request
    fetchInverseMatrix();
});

// Define the fetchInverseMatrix function to fetch the inverse matrix JSON
const fetchInverseMatrix = () => {
    const formData = new FormData(document.getElementById('matrix-form'));

    const data = Object.fromEntries(formData)

    fetch('/inverse_calculation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Process the JSON data (inverse matrix)
        displayMatrix(data);

        // Update the HTML elements on the page to display the calculated matrix
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

function displayMatrix (json){
    console.log(json);


  
        // Access the value corresponding to the key
        // let value = json[key];
        matrixTable = document.createElement("table")
        matrixTable.style.borderSpacing = "10px 15px";
        answer.appendChild(matrixTable)

        for ( i = 1; i<Number(rows.value) + 1; i++){
            let newTableRow = document.createElement("tr");
            matrixTable.appendChild(newTableRow);

            for (j=1; j<Number(columns.value) + 1; j++){
                let key = `a${i}-${j}`;
                let value = json[key];
                
                let newTableData = document.createElement("td");
                newTableData.textContent = value; 

                newTableRow.appendChild(newTableData);        
            }
        }
}

btnClear.addEventListener("click", clearMatrix);