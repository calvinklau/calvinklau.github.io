// Wrapper function to avoid polluting global variable namespace
(function() {
    let computeFlag = false;

    window.addEventListener("load", function() {
        initializeBtnListeners();
    });

    function initializeBtnListeners() {
        let buttons = document.getElementsByTagName("button");
        for (let btn of buttons) {
            // Call processInput() on button click
            btn.onclick = function() {
                processInput(btn.innerText);
            }
        }
    }

    function processInput(input) {
        let resultElement = document.getElementById("result");
        let historyElement = document.getElementById("history");
        let clearBtnText = document.getElementById("clear");
        switch (input) {
            case "CE":
                if (resultElement.value[resultElement.value.length - 1] === " ") {
                    // Delete operator and associated space chars
                    resultElement.value = resultElement.value.substring(0, resultElement.value.length - 3);
                } else if (resultElement.value.length === 1 || resultElement.value === "0") {
                    // Change input field to 0 if deleting single non-zero digit or if deleting zero
                    resultElement.value = "0";
                } else {
                    // Delete rightmost character
                    resultElement.value = resultElement.value.substring(0, resultElement.value.length - 1);
                }
                break;
            case "AC":
                // Clear entire input field
                resultElement.value = "0";
                clearBtnText.innerText = "CE";
                break;
            case "=":
                // Calculate inputted expression
                calculate(resultElement, historyElement);
                clearBtnText.innerText = "AC";
                break;
            case "/":
            case "x":
            case "-":
            case "+":
                // Pad math operators with spaces for readability
                resultElement.value += " " + input + " ";
                break;
            default:
                // Append digits or periods
                if (resultElement.value === "0") {
                    resultElement.value = input;
                } else {
                    resultElement.value += input;
                }
                break;
        }
    }

    // Evaluate inputted expression
    function calculate(resultEl, historyEl) {
        let expression = resultEl.value;
        let result = 0;
        try {
            result = eval(expression.replace("x", "*"));
            resultEl.value = result.toString();
            historyEl.innerText = expression + " = ";
        } catch (err) {
            // Display error
            console.log(expression.replace("x", "*"));
            resultEl.value = expression;
            historyEl.innerText = expression + " = ERROR";
        }
    }
})();