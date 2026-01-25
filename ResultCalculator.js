function checkResult() {
    let totalMarks =
        Number(document.getElementById("sub001").value) +
        Number(document.getElementById("sub002").value) +
        Number(document.getElementById("sub003").value) +
        Number(document.getElementById("sub004").value) +
        Number(document.getElementById("sub005").value) +
        Number(document.getElementById("sub006").value) +
        Number(document.getElementById("sub007").value) +
        Number(document.getElementById("sub008").value) +
        Number(document.getElementById("sub009").value);
    let totalBox = document.getElementById("Total");
    totalBox.innerHTML = "Total Marks : " + totalMarks + " / 900";
    let resultBox = document.getElementById("Result");
    if (totalMarks >= 800) {
        resultBox.innerHTML = "Distinction";
        resultBox.style.color = "green";
    }
    else if (totalMarks >= 700) {
        resultBox.innerHTML = "First Division";
    }
    else if (totalMarks >= 600) {
        resultBox.innerHTML = "Second Division";
    }
    else if (totalMarks >= 500) {
        resultBox.innerHTML = "Third Division";
    }
    else {
        resultBox.innerHTML = "Fail";
        resultBox.style.color = "red";
    }
}
