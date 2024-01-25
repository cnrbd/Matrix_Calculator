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
        if (i.tagName === "INPUT" ){
            i.remove();
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

// const data = () =>{
//         axios.get(`${flaskUrl}/make_matrix`, {data: null})
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error("error: ", error)
//     })
// };




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

btnCalculateMatrix.addEventListener("click", (event)=>{
    event.preventDefault();
    let matrixFormDict = {};
    const matrixInputs = document.getElementById("matrix-form").elements;
    for (let i = 0; i< matrixInputs.length; i++ ){
        if (matrixInputs[i].tagName === "INPUT"){
            // console.log(matrixInputs[i].value);
            // console.log(matrixInputs[i].name);
            matrixFormDict[matrixInputs[i].name] =  matrixInputs[i].value
        }
        
    }
    console.log(matrixFormDict)
    axios.post(`/inverse_calculation`, matrixFormDict)
    // axios.get(`${flaskUrl}/inverse`)
    .then(response => {
        console.log(response.data);
        //add to html
    })
    .catch(error => {
        console.error("error: ", error)
    })
}
)



btnClear.addEventListener("click", clearMatrix);