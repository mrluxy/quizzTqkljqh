// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const fs = require('fs');
const PDFDocument = require('pdfkit');

let rawdata = fs.readFileSync('data.json');
let form = JSON.parse(rawdata);
//localStorage['form'] = form;
//console.log(form);
localStorage.setItem('form', JSON.stringify(form));
//console.log(form);

window.addEventListener('DOMContentLoaded', () => {
  //const chokidar = require('chokidar');
  //console.error("preload.js - loaded")
  //console.log(form)
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var HH = today.getHours();
  var MM = today.getMinutes();

  today = dd + '/' + mm + '/' + yyyy;
  hours = HH+":"+MM;

  let prenom = localStorage.getItem("prenom")
  let nom = localStorage.getItem("nom")
  let mail = localStorage.getItem("mail")
  let nbGood = localStorage.getItem("nbGood")
  let currQuest = localStorage.getItem("currQuest") - 1 
  document.getElementById("diplomeButton") && document.getElementById("diplomeButton").addEventListener("click", () => {

    if(localStorage.getItem("winner") == true)
    {
      const doc = new PDFDocument;
      doc.pipe(fs.createWriteStream('./diplome.pdf')); // write to PDF
      doc.fontSize(18)
      doc.text('Certificat de réussite', {
        width: 410,
        align: 'center'
      });
      doc.fontSize(12)
      doc.text('"'+form.nom+'"', {
        width: 410,
        align: 'center'
      })
      doc.moveDown();
      doc.image('image/winner.png', 430, 15, {fit: [100, 100], align: 'center', valign: 'center'})
      doc.moveDown();
      doc.fontSize(10)
      doc.text("Ce document certifie que M./Mme "+nom + " " + prenom + " a passé son test avec succès", {
        width: 410,
        align: 'center'
      });
      doc.moveDown();
      doc.text("("+ mail+")", {
        width: 410,
        align: 'center'
      });
      doc.moveDown();
      doc.text("Score : "+nbGood+"/"+currQuest, {
        width: 410,
        align: 'center'
      });
      doc.moveDown();
      doc.text("Le "+today+" à "+hours+".", {
        width: 410,
        align: 'center'
      });

      // end and display the document in the iframe to the right
      doc.end();
    }
    else
    {
      const doc = new PDFDocument;
      doc.pipe(fs.createWriteStream('./diplome.pdf')); // write to PDF
      doc.fontSize(18)
      doc.text('Certificat de nazitude', {
        width: 410,
        align: 'center'
      });
      doc.fontSize(12)
      doc.text('"'+form.nom+'"', {
        width: 410,
        align: 'center'
      })
      doc.moveDown();
      doc.image('image/oss.jpg', 430, 15, {fit: [100, 100], align: 'center', valign: 'center'})
      doc.moveDown();
      doc.fontSize(10)
      doc.text("Ce document certifie que M./Mme "+nom + " " + prenom + " est un gros naze.", {
        width: 410,
        align: 'center'
      });
      doc.moveDown();
      doc.text("("+ mail+")", {
        width: 410,
        align: 'center'
      });
      doc.moveDown();
      doc.text("Score : "+nbGood+"/"+currQuest+" (gros boulet)", {
        width: 410,
        align: 'center'
      });
      doc.moveDown();
      doc.text("Allé rentre chez toi, kiddo...", {
        width: 410,
        align: 'center'
      });

      // end and display the document in the iframe to the right
      doc.end();
      //alert("Impossible d'imprimer votre diplôme : t'es trop naze.")
    }
  }) 
  
})
