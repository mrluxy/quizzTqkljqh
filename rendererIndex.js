// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
//console.log("rendererIndex.js - loaded")

var form = JSON.parse(localStorage.getItem('form'));
var x;
x = document.getElementById("formName");
x.innerHTML = form.nom;
x = document.getElementById("nbQuestions");
x.innerHTML = "Nombre de questions : " + form.questions.length
x = document.getElementById("formImg");
x.setAttribute("src", form.imgCover);

function startQCM()
{
    let nom = document.getElementById("inputNom").value
    let prenom = document.getElementById("inputPrenom").value
    let mail = document.getElementById("inputMail").value
    //console.log({nom, prenom, mail})
    localStorage.setItem('nom', nom);
    localStorage.setItem('prenom', prenom);
    localStorage.setItem('mail', mail);

    let currQuest = 1;
    let nbGood = 0
    localStorage.setItem('currQuest', currQuest);
    localStorage.setItem('nbGood', nbGood);
    localStorage.setItem("winner", false);
    window.location = "./QCM.html";
}
