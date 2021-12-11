function mixedArray(a) {
  var b = Array();
  for (var i = 0; i < a.length; i++) { b.push(a[i]) }
  b.reverse();

  var yes = () => Math.random() > 0.5;
  var added = Array();
  var c = Array();
  while (c.length < b.length) {
    for (var i = 0; i < b.length; i++) {
      if (yes() && !(added.includes(i))) {
        c.push(b[i]);
        added.push(i);
      }
    }
  }

  return c;
}

/**<br> creator*/
function br() { return document.createElement("br"); }
/**<hr> creator*/
function hr() { return document.createElement("hr"); }

/*
item radio creator, inside personal div
qi - question index for comparing with qx[qi][0] later , used as radio group name
i - input radio index, inside radio group
a - answer, used as label for input radio
*/
function itemRadio(qi, i, a) {
  var div = document.createElement("div");

  var input = document.createElement("input");
  input.type = "radio";
  input.name = "question" + qi;
  input.id = input.name + "answer" + i;
  input.value = a;

  var label = document.createElement("label");
  label.htmlFor = input.id;
  label.innerHTML = input.value;

  div.append(input);
  div.append(label);

  return div;
}

/*
ax - array of answers
qi - question index for comparing with qx[qi][0] later
*/
function printAnswers(ax, qi) {
  var div = document.createElement("div");

  var mixed = Array();
  for (var i = 0; i < ax.length; i++) { mixed.push(ax[i]) }
  mixed = mixedArray(mixed);

  for (var i = 0; i < mixed.length; i++) {
    div.append(itemRadio(qi, i, mixed[i]));
    if (i < mixed.length - 1) { div.append(hr()) }
  }

  return div
}

/**div with tag text */
function itemText(htmlText) {
  var div = document.createElement("div");

  var text = document.createElement("text");
  text.innerHTML = htmlText;

  div.append(text);

  return div;
}

function printExplanation(ex) {
  var div = document.createElement("div");

  for (var i = 0; i < ex.length; i++) {
    div.append(itemText(ex[i]));
    if (i < ex.length - 1) { div.append(hr()) }
  }

  return div
}



/*
qi - question index in qx array from info.js
*/
function printQuestion(qi, training = false) {
  var q = qx[qi][0];
  var ax = qx[qi][1];
  var ex = qx[qi][2];

  var div = document.createElement("div");

  var question = document.createElement("text");
  question.className = "questionLabel";
  question.innerHTML = "<m>Question " + (qi + 1) + "</m>";

  var qtext = document.createElement("text");
  qtext.innerHTML = q;

  var answerSet = document.createElement("text");
  answerSet.className = "answerLabel";
  answerSet.innerHTML = "Answer Set:";

  var axtext = printAnswers(ax, qi);
  var explanation = document.createElement("text");
  explanation.className = "explanationLabel";
  explanation.innerHTML = "Justification:";

  var etext = printExplanation(ex);

  div.append(hr());
  div.append(hr());
  div.append(question);
  // div.append(br());
  div.append(qtext);
  div.append(br());
  div.append(br());

  div.append(answerSet);
  div.append(axtext);
  div.append(br());

  if (training) {
    div.append(explanation);
    div.append(br());
    div.append(etext);
    div.append(br());
  }

  div.append(br());

  document.getElementById("testing").append(div);

}

var usedQuestions = 0;

function miniTest() {
  //cleaning
  document.getElementById("testing").innerHTML = "";
  usedQuestions = 7;
  //testing
  for (var i = 0; i < usedQuestions; i++) {
    printQuestion(i);
  }

  //button
  var d = document.getElementById("resultButton");
  d.innerHTML = "";
  var b = document.createElement("button");
  b.onclick = testResult;
  b.textContent = "show mini result";
  d.append(b);
}

function fullTest() {
  //cleaning
  document.getElementById("testing").innerHTML = "";
  usedQuestions = qx.length;
  //testing
  for (var i = 0; i < usedQuestions; i++) {
    printQuestion(i);
  }

  //button
  var d = document.getElementById("resultButton");
  d.innerHTML = "";
  var b = document.createElement("button");
  b.onclick = testResult;
  b.textContent = "show full result";
  d.append(b);
}

function training() {
  //cleaning
  document.getElementById("testing").innerHTML = "";
  usedQuestions = qx.length;
  //testing
  for (var i = 0; i < usedQuestions; i++) {
    printQuestion(i, true);
  }

  //button
  var d = document.getElementById("resultButton");
  d.innerHTML = "";
  var b = document.createElement("button");
  b.onclick = testResult;
  b.textContent = "show training result";
  d.append(b);
}

/**check the answer using input radio values vs first value in qx which intended for correct answers */
function checkedAnswerIsCorrect(q) {
  var correctAnswer = qx[q][1][0];
  var checkedAnswer = "";
  var answers = document.getElementsByName("question" + q);

  for (let answer of answers) {

    if (answer.checked) {
      checkedAnswer = answer.value;
      break;
    }
  }

  return correctAnswer == checkedAnswer;
}

/**check the result of testing */
function testResult() {
  var result = 0;

  for (var q = 0; q < usedQuestions; q++) {
    if (checkedAnswerIsCorrect(q)) { result++; }
  }
  document.getElementById("resultButton").innerHTML = "";
  var div = document.getElementById("testing");
  div.innerHTML = "";
  div.innerText = "" + result + "/" + usedQuestions + " answers is correct"

}
