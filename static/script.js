const matrixDisplay = document.querySelector(".matrix_display");
const matrixSetting = document.querySelector(".matrix_setting");
const display = document.querySelector(".display");

const rows = document.getElementById("rows");
const columns = document.getElementById("columns");
const btnMakeMatrix = document.getElementById("btn-make-matrix");
const btnClear = document.getElementById("btn-clear")
const btnCalculateMatrix = document.getElementById("btn-calculate-matrix")
const matrixForm = document.getElementById("matrix-form");
const answer = document.getElementById("answer")
const operation = document.getElementById("operation")

let temp = 0;


function createMatrix() {

    // clear input elements if user re-entered rows and colums 
    // important to start loop at the end of the elements since starting from the beginning shift the DOM structure 
    // console.log(matrixForm.elements)
    // console.log(matrixForm.elements.length)
    for (i = matrixForm.elements.length - 1; i > -1; i--) {
        if (matrixForm.elements[i].tagName === "INPUT") {
            matrixForm.elements[i].remove();
        }
    }

    let newBreak = document.createElement("br")
    matrixForm.appendChild(newBreak)

    for (i=0; i<Number(rows.value); i++){
        let newRow = document.createElement("div");
        newRow.classList.add("row", "mb-3");
        matrixForm.appendChild(newRow);

        for (j=0; j<Number(columns.value); j++){
            let newCol = document.createElement("div");
            newCol.classList.add("col");

            let newInput = document.createElement("input");
            newInput.classList.add("form-control");
            newInput.type = "number";
            newInput.name = `a-${i+1}-${j+1}`;
            newInput.id = `a-${i+1}-${j+1}`;
            newInput.minLength = "1";
            newInput.required = true;
            newInput.placeholder = 0
            newInput.setAttribute("form","matrix-form");
            
            
            newCol.appendChild(newInput);
            newRow.appendChild(newCol);    

        }
    }
}


function clearMatrix(){
    console.log ("Test")

    for (i = matrixForm.elements.length - 1; i > -1; i--) {
        if (matrixForm.elements[i].tagName === "INPUT") {
            matrixForm.elements[i].remove();
        }
    } 

}

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
    console.log(operation)
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
        // empties the old answer 
    answer.innerHTML = '';

    let matrixContainer = document.createElement("div");
    matrixContainer.classList.add("matrix-container");
    answer.appendChild(matrixContainer);

    matrixTable = document.createElement("div")
    matrixTable.classList.add("row", "justify-content-center", "matrix-table");
    matrixContainer.appendChild(matrixTable);

    for ( i = 1; i<Number(rows.value) + 1; i++){
        let newTableRow = document.createElement("div");
        newTableRow.classList.add("row", "mb-3");
        matrixTable.appendChild(newTableRow);

        for (j=1; j<Number(columns.value) + 1; j++){
            const key = `a${i}-${j}`;
            const value = json[key];
                
            let newTableData = document.createElement("div");
            newTableData.classList.add("col", "text-center", "matrix-cell");
            newTableData.textContent = value; 
            newTableRow.appendChild(newTableData);        
        }
    }
}

function displaySingleValueAnswer(json){
    console.log(json)
    answer.innerHTML = '';

    let text = document.createElement("p");
    text.textContent = json["determinant_answer"];
    console.log(text.textContent)
}


const fetchDeterminantMatrix = () => {
    const formData = new FormData(document.getElementById('matrix-form'));

    const data = Object.fromEntries(formData)

    fetch('/determinant_calculation', {
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
        displaySingleValueAnswer(data);

        // Update the HTML elements on the page to display the calculated matrix
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

btnClear.addEventListener("click", clearMatrix);