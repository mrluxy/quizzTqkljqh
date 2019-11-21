// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
//console.log("rendererIndex.js - loaded")

function reset()
{
    localStorage.setItem('nbGood', 0);
    localStorage.setItem('currQuest', 1);
    location.reload();
}

var form = JSON.parse(localStorage.getItem('form'));
let currQuest = localStorage.getItem('currQuest');
let x;
if(currQuest <= form.questions.length)
{
    x = document.getElementById("evolutionQCM");
    x.innerHTML = currQuest+"/"+form.questions.length;
    x = document.getElementById("nomQuestion");
    x.innerHTML = form.questions[currQuest-1].question
    x = document.getElementById("questImg");
    console.log(form.questions[currQuest-1].imgQuestion)
    x.setAttribute("src", form.questions[currQuest-1].imgQuestion);

    x = document.getElementById("answers");
    var index = 1;
    for (const element of form.questions[currQuest-1].options) {
        var button = document.createElement("button");
        button.setAttribute("style", "width:50%; margin:8px;")
        button.setAttribute("onclick", "answer("+index+");")
        button.appendChild(document.createTextNode(element))
        x.appendChild(button);
        index++;
    }

    function answer(nbReponse)
    {
        let good = form.questions[currQuest-1].answer
        let nbGood = localStorage.getItem('nbGood');
        if(nbReponse == good)
        {
            nbGood++;
            localStorage.setItem('nbGood', nbGood);
        }
        currQuest++;
        localStorage.setItem('currQuest', currQuest);
        location.reload();
    }
    
}
else
{
    window.location = "./results.html";
}
