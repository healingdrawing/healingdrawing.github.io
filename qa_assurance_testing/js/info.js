//database arrays

//questions array qx[i] = [qx,ax,ex]
var qx = [];

//for each qx question indices !!! 0-correct answer !!!
//for each ax, answer set
//for each ex, explanation.

var q1 = "Which of the following statements BEST describes one of the seven key principles of software testing?";
var a1 = [
  "<m>C</m>  It is normally impossible to test all input/output combinations for a software system.",
  "<m>A</m>  Automated tests avoid exhaustive testing better than manual tests.",
  "<m>B</m>  With sufficient effort and tool support, exhaustive testing is feasible for all software.",
  "<m>D</m>  The purpose of testing is to demonstrate the absence of defects."
];
var e1 = [
  "<m>A</m>  WRONG - Exhaustive test is impossible, regardless of it being manual or automated.",
  "<m>B</m>  WRONG - Exhaustive testing is impossible, regardless of the amount of effort put into testing (Principle # 2)",
  "<m>C</m>  CORRECT - Principle #2 states: \"Testing everything (all combinations of inputs and preconditions) is not feasible except for trivial cases\"",
  "<m>D</m>  WRONG - This statement is contradicting Principle #1: Testing shows presence of defects: Testing can show that defects are present, but cannot prove that there are no defects."
];

qx.push([q1, a1, e1]);


var q2 = "Which of the following statements is the MOST valid goal for a test team?";

var a2 = [
  "<m>B</m>  To detect as many failures as possible so that defects can be identified and corrected.",
  "<m>A</m>  To determine whether enough component tests were executed within system testing.",
  "<m>C</m>  To prove that all defects are identified.",
  "<m>D</m> To prove that any remaining defect will not cause any failures. "
];

var e2 = [
  "<m>A</m>  WRONG - Component testing is not part of System testing.",
  "<m>B</m>  CORRECT - This is the main role of a test team.",
  "<m>C</m>  WRONG - Principle #1 states that exhaustive testing is impossible, so one can never prove that all defects were identified.",
  "<m>D</m>  WRONG - To make an assessment whether a defect will cause a failure or not, one has to detect the defect first. Saying that no remaining defect will cause a failure, implicitly means that all defects were found. This contradicts Principle #1. "
];

qx.push([q2, a2, e2]);


var q3 = "Which of these tasks would you expect to be performed during the Test Analysis and Design phase of the Fundamental Test Process?"

var a3 = [
  "<m>B</m>  Reviewing the test basis",
  "<m>A</m>  Defining test objectives",
  "<m>C</m>  Creating test suites from test procedures",
  "<m>D</m>  Analyzing lessons learned for process improvement"
];

var e3 = [
  "<m>A</m>  WRONG - this activity is performed during \"Test Planning\" phase (section 1.4.1)",
  "<m>B</m>  CORRECT - this activity is performed during \"Test Analysis and Design\" phase (section 1.4.2)",
  "<m>C</m>  WRONG - this activity is performed during \"Test Implementation and Execution\" phase (section 1.4.3)",
  "<m>D</m>  WRONG - this activity is performed during \"Test Closure Activities\" phase (section 1.4.5)"
];

qx.push([q3, a3, e3]);


var q4 = "Below is a list of problems that can be observed during testing or in production. Which of these problems is a failure?";

var a4 = [
  "<m>A</m>  The product crashed when the user selected an option in a dialog box.",
  "<m>B</m>  One source code file included in the build has the wrong version.",
  "<m>C</m>  The computation algorithm used wrong input variables.",
  "<m>D</m>  The developer misinterpreted the requirement for the algorithm."
];

var e4 = [
  "<m>A</m>  CORRECT - A failure is an external manifestation of a defect. A crash is clearly noticeable by user.",
  "<m>B</m>  WRONG - This type of mistake will not necessarily lead to a visible or noticeable failure. For example: if the changes in the new version of the source file are only in the comments.",
  "<m>C</m>  WRONG - Use of a wrong input variable will not necessarily lead to a visible or noticeable failure. For example: if no one uses this specific algorithm; or: if the wrongly used input variable had a similar value as the correct input variable; or: if no one is using the wrong result from the algorithm. \"Defects in software, systems or documents may result in failures, but not all defects do so.\" (Section 1.1.2)",
  "<m>D</m>  WRONG - This type of mistake will not necessarily lead to a visible or noticeable failure. For example: if no one uses this specific algorithm."
];

qx.push([q4, a4, e4]);


var q5 = "Which of the following attitudes, qualifications or actions would lead to problems (or conflict) within mixed teams of testers and developers, when observed in reviews and tests?";

var a5 = [
  "<m>C</m>  Testers and developers communicate defects as criticism of people, not as criticism of the software product.",
  "<m>A</m>   Testers and developers are curious and focused on finding defects.",
  "<m>B</m>  Testers and developers are sufficiently qualified to find failures and defects.",
  "<m>D</m>  Testers expect that there might be defects in the software product which the developers have not found and fixed."
];
var e5 = [
  "<m>A</m>  WRONG. There is no situation which leads to conflict. Testers and developers should be focused on finding defects.",
  "<m>B</m>  WRONG. Testers and developers should be sufficiently qualified to find failures and defects.",
  "<m>C</m>  CORRECT. According to the syllabus, testers and developers should cooperate, and communicating defects as criticism of people would lead to conflict inside the team.",
  "<m>D</m>  WRONG. The tester's role in the team is finding defects in the software product that the developers have not found and fixed."
];

qx.push([q5, a5, e5]);


var q6 = "Which of the following statements are TRUE?<br><br><mm>1</mm>. Software testing may be required to meet legal or contractual requirements.<br><br><mm>2</mm>. Software testing is mainly needed to improve the quality of the product released by the developers.<br><br><mm>3</mm>. Rigorous testing and fixing of found defects could help reduce the risk of problems occurring in an operational environment.<br><br><mm>4</mm>. Rigorous testing is sometimes used to prove that all failures have been found.";

var a6 = [
  "<m>A</m>  <mm>1</mm>, <mm>2</mm> and <mm>3</mm> are true; <mm>4</mm> is false.",
  "<m>B</m>  <mm>1</mm> is true; <mm>2</mm>, <mm>3</mm>, and <mm>4</mm> are false.",
  "<m>C</m>  <mm>1</mm> and <mm>3</mm> are true; <mm>2</mm> and <mm>4</mm> are false.",
  "<m>D</m>  <mm>3</mm> and <mm>4</mm> are true; <mm>1</mm> and <mm>2</mm> are false."
];
var e6 = [
  "<mm>1</mm>. CORRECT. Software testing may be required to meet legal or contractual requirements.",
  "<mm>2</mm>. CORRECT. Software testing is mainly needed to improve the quality of the product released by the developers.",
  "<mm>3</mm>. CORRECT. One of the main aims of software testing is to reduce the risk of problems occurring in an operational environment.",
  "<mm>4</mm>. WRONG. It is impossible to prove that all failures have been found.<br><br>Hence<br><br><m>A</m>  CORRECT.<br><br><m>B</m>  WRONG.<br><br><m>C</m>  WRONG.<br><br><m>D</m>  WRONG."
];
qx.push([q6, a6, e6]);


var q7 = "Which of the following statements correctly describes the difference between testing and debugging?";

var a7 = [
  "<m>B</m>  Dynamic testing shows failures caused by defects; debugging finds, analyzes, and removes the causes of failures in the software.",
  "<m>A</m>  Testing identifies the source of defects; debugging analyzes the faults and proposes prevention activities.",
  "<m>C</m>   Testing removes faults; debugging identifies the causes of failures.",
  "<m>D</m>  Dynamic testing prevents the causes of failures; debugging removes the failures."
];

var e7 = [
  "<m>A</m>  WRONG. Testing does not identify the source of defects.",
  "<m>B</m>  CORRECT. Dynamic testing shows failures caused by defects; debugging finds, analyzes, and removes the causes of failures in the software.",
  "<m>C</m>  WRONG. Testing does not remove faults.",
  "<m>D</m>  WRONG. Dynamic testing does not prevent the causes of failures."
];

qx.push([q7, a7, e7]);


var q8 = "Which of the following statements BEST describes non-functional testing?";

var a8 = [
  "<m>D</m>  Non-functional testing is testing system attributes, such as usability, reliability, or maintainability.",
  "<m>A</m>  Non-functional testing is the process of testing an integrated system to verify that it meets specified requirements.",
  "<m>B</m>  Non-functional testing is the process of testing to determine system compliance with coding standards.",
  "<m>C</m>  Non-functional testing is testing without reference to the internal structure of a system."
];

var e8 = [
  "<m>A</m>  WRONG, this is a definition of system testing.",
  "<m>B</m>  WRONG, this is a function of white box testing.",
  "<m>C</m>  WRONG, it is a definition of black box testing.",
  "<m>D</m>  CORRECT, testing system attributes, such as usability, reliability, or maintainability is non-functional testing."
];

qx.push([q8, a8, e8]);


var q9 = "When working with software development models, what is it important to do?";

var a9 = [
  "<m>A</m>  If needed, adapt the models to project and product characteristics.",
  "<m>B</m>  Choose the waterfall model, because it is the most proven model.",
  "<m>C</m>  Start with the V-model, and then move to either the iterative or the incremental model.",
  "<m>D</m>  Change the organization to fit the model, not vice versa."
];

var e9 = [
  "<m>A</m>  CORRECT - Models provide general guidelines - not an accurate and step-by-step process that has to be followed to the letter.",
  "<m>B</m>  WRONG - The waterfall is only one of the possible models a team can choose to follow.",
  "<m>C</m>  WRONG - The V-model is not compatible with iterative models. So the described flow does not make sense.",
  "<m>D</m>  WRONG - Models are chosen to fit the situation and project and not vice versa."
];

qx.push([q9, a9, e9]);


var q10 = "Which of the following is a characteristic of good testing and applies to any software development life cycle model? ";

var a10 = [
  "<m>D</m>   For every development activity there is a corresponding testing activity.",
  "<m>A</m>  Acceptance testing is always the final test level to be applied.",
  "<m>B</m>  All test levels are planned and completed for each developed feature.",
  "<m>C</m>  Testers are involved as soon as the first piece of code can be executed."
];

var e10 = [
  "<m>A</m>  WRONG - This is correct only for projects that have acceptance tests. Some projects do not have this test level.",
  "<m>B</m>  WRONG - There are cases where some test levels are not necessarily needed. For example: when getting code from 3rd party, component testing is not needed.",
  "<m>C</m>  WRONG - Testers should be involved much earlier then when the code is available. For example, testers should be involved in requirements specification reviews.",
  "<m>D</m>  CORRECT - \"In any life cycle model, there are several characteristics of good testing: For every development activity there is a corresponding testing activity.\" (Section 2.1.3)"
];

qx.push([q10, a10, e10]);


var q11 = "Which of the following is an example of maintenance testing?";

var a11 = [
  "<m>B</m>  To test enhancements to an existing operational system.",
  "<m>A</m>   To test corrected defects during development of a new system.",
  "<m>C</m>  To handle complaints about system quality during user acceptance testing.",
  "<m>D</m>  To integrate functions during the development of a new system."
];

var e11 = [
  "<m>A</m>  WRONG - Testing a new system is not \"maintenance testing\".",
  "<m>B</m>  CORRECT - testing the system's ability to perform after an environment change is considered \"maintenance testing\".",
  "<m>C</m>  WRONG - Dealing with Acceptance Test failures is not \"maintenance testing\".",
  "<m>D</m>  WRONG - Integration of functions is not a testing activity."
];

qx.push([q11, a11, e11]);


var q12 = "Which of the following statements are TRUE?<br><br><mm>1</mm>. Regression testing and re-testing are the same.<br><br><mm>2</mm>. Regression tests show if all failures have been resolved.<br><br><mm>3</mm>. Regression tests are good candidates for test automation.<br><br><mm>4</mm>. Regression tests are performed to uncover defects as a result of changes in the program.<br><br><mm>5</mm>. Regression tests should not be performed during integration testing.";

var a12 = [
  "<m>C</m>  <mm>3</mm> and <mm>4</mm> are true.",
  "<m>A</m>  <mm>1</mm> and <mm>2</mm> are true.",
  "<m>B</m>  <mm>1</mm>, <mm>3</mm> and <mm>5</mm> are true.",
  "<m>D</m>  <mm>2</mm>, <mm>4</mm>, and <mm>5</mm> are true."
];

var e12 = [
  "<mm>1</mm>  is incorrect - Regression testing is the repeated testing of an already tested program, after modification, to discover any defects introduced or uncovered as a result of the change(s). Re-test is done to confirm that a defect has been successfully removed. (Section 2.3.4).",
  "<mm>2</mm>  is incorrect - The sentence describes \"Re-test\".",
  "<mm>3</mm>  is correct - Regression test suites are run many times and generally evolve slowly, so regression testing is a strong candidate for automation. (Section 2.3.4).",
  "<mm>4</mm>  is correct - This is the definition of regression tests. See Section 2.3.4.",
  "<mm>5</mm>  is incorrect - \"Regression testing may be performed at all test levels, and includes functional, non-functional and structural testing.\" (Section 2.3.4).<br><br>Hence<br><br><m>A</m>  WRONG.<br><br><m>B</m>  WRONG.<br><br><m>C</m>  CORRECT.<br><br><m>D</m>  WRONG."
];

qx.push([q12, a12, e12]);


var q13 = "Which of the following statements comparing component testing and system testing is TRUE?";

var a13 = [
  "<m>B</m>  Test cases for component testing are usually derived from component specifications, design specifications, or data models, whereas test cases for system testing are usually derived from requirement specifications, functional specifications, or use cases.",
  "<m>A</m>  Component testing verifies the functionality of software modules, program objects, and classes that are separately testable, whereas system testing verifies interfaces between components and interactions between different parts of the system.",
  "<m>C</m>  Component testing only focuses on functional characteristics, whereas system testing focuses on functional and non-functional characteristics.",
  "<m>D</m>  Component testing is the responsibility of the testers, whereas system testing typically is the responsibility of the users of the system."
];

var e13 = [
  "<m>A</m>  WRONG. System testing does not test interfaces between components and interactions between different parts of the system; it is a target of integration tests.",
  "<m>B</m>  CORRECT.",
  "<m>C</m>  WRONG, Component testing does not ONLY focus on functional characteristics.",
  "<m>D</m>  WRONG, Component testing typically is the responsibility of the developers, whereas system testing typically is the responsibility of testers."
];

qx.push([q13, a13, e13]);


var q14 = "Which of the following describes the main phases of a formal review?";

var a14 = [
  "<m>C</m>  Planning, kick off, individual preparation, review meeting, rework, follow up.",
  "<m>A</m>  Initiation, status, individual preparation, review meeting, rework, follow up.",
  "<m>B</m>  Planning, individual preparation, review meeting, rework, closure, follow up.",
  "<m>D</m>  Individual preparation, review meeting, rework, closure, follow up, root cause analysis."
];

var e14 = [
  "The main phases of a formal review are planning, kick off, individual preparation, review meeting, rework, follow up.<br><br>Hence<br><br><m>A</m>  WRONG.<br><br><m>B</m>  WRONG.<br><br><m>C</m>  CORRECT.<br><br><m>D</m>  WRONG."
];

qx.push([q14, a14, e14]);


var q15 = "Which of the review types below is the BEST option to choose for reviewing safety critical components in a software project?";

var a15 = [
  "<m>C</m>  Inspection.",
  "<m>A</m>  Informal Review.",
  "<m>B</m>  Peer Review.",
  "<m>D</m>  Walkthrough."
];

var e15 = [
  "For reviewing safety critical components in a software project a more formal, documented review is needed.<br><br>Hence<br><br><m>A</m>  WRONG.<br><br><m>B</m>  WRONG.<br><br><m>C</m>  CORRECT.<br><br><m>D</m>  WRONG."
];

qx.push([q15, a15, e15]);


var q16 = "Which of the following statements about tool-supported static analysis is FALSE?";

var a16 = [
  "<m>D</m>  Tool-supported static analysis is a good way to force failures into the software.",
  "<m>A</m>  Tool-supported static analysis can be used as a preventive measure with appropriate processes in place.",
  "<m>B</m>  Tool-supported static analysis can find defects that are not easily found by dynamic testing.",
  "<m>C</m>  Tool-supported static analysis can result in cost savings by finding defects early."
];

var e16 = [
  "<m>A</m>  WRONG. This sentence is true, tool-supported static analysis can be used as a preventive measure.",
  "<m>B</m>  WRONG. This sentence is true, tool-supported static analysis can find defects that are not found by dynamic testing.",
  "<m>C</m>  WRONG. This sentence is true, tool-supported static analysis is a cost saving method used to find defects early.",
  "<m>D</m>  CORRECT."
];

qx.push([q16, a16, e16]);


var q17 = "One of the test goals for your project is to have 100% decision coverage. The following three tests have been executed for the control flow graph shown below. <br><br>Test A covers path: A, B, D, E, G. <br>Test B covers path: A, B, D, E, F, G. <br>Test C covers path: A, C, F, C, F, C, F, G. <br><br> <img src=\"img/q17.png\"> <br><br> Which of the following statements related to the decision coverage goal is TRUE? ";

var a17 = [
  "<m>A</m>  Decision D has not been tested completely.",
  "<m>B</m>  100% decision coverage has been achieved.",
  "<m>C</m>  Decision E has not been tested completely.",
  "<m>D</m>  Decision F has not been tested completely."
];

var e17 = [
  "In the diagram there are following four conditions: A, D, E, F.",
  "The test A covers A&rarr;B, D&rarr;E and E&rarr;G.",
  "The test B covers A&rarr;B, D&rarr;E, E&rarr;F and F&rarr;G.",
  "The test C covers A&rarr;C, F&rarr;C and F&rarr;G.",
  "Hence condition A is covered (A&rarr;B and A&rarr;C), condition E is covered (E&rarr;G and E&rarr;F), condition F is covered (F&rarr;C and F&rarr;G). Condition D is not covered, there is only D&rarr;E and D- >F is not covered.<br><br>Hence<br><br><m>A</m>  CORRECT.<br><br><m>B</m>  WRONG.<br><br><m>C</m>  WRONG.<br><br><m>D</m>  WRONG."

];
qx.push([q17, a17, e17]);


var q18 = "A defect was found during testing:<br><br>While receiving customer data from a server the system crashed. The defect was fixed by correcting the code that checked the network availability during data transfer. The existing test cases covered 100% of all statements of the corresponding module. To verify the fix and to ensure more extensive coverage, some new tests were designed and added to the test suite and executed.<br><br>What types of testing are described above? <br><br><mm>1</mm>. Functional testing, <br><br><mm>2</mm>. Structural testing, <br><br><mm>3</mm>. Re-testing. <br><br><mm>4</mm>. Performance testing.";

var a18 = [
  "<m>C</m>  <mm>1</mm>, <mm>2</mm>, and <mm>3</mm>, but not <mm>4</mm>.",
  "<m>A</m>  <mm>1</mm> and <mm>2</mm>, but not <mm>3</mm> and <mm>4</mm>.",
  "<m>B</m>  <mm>1</mm> and <mm>3</mm>, but not <mm>2</mm> and <mm>4</mm>.",
  "<m>D</m>  <mm>2</mm>, <mm>3</mm>, and <mm>4</mm>, but not <mm>1</mm>."
];

var e18 = [
  "<mm>1</mm>  is true. Receiving customer data is typical functional testing.",
  "<mm>2</mm>  is true. In the problem description it was stated, \"The existing test cases covered 100% of all statements of the corresponding module\"; statement testing is structural testing.",
  "<mm>3</mm>  is true. In the problem description it was stated, \"To verify the fix and to ensure more extensive coverage, some new tests were designed and added to the test suite and executed\", so this is a retest.",
  "<mm>4</mm>  is false. In the problem description there is no information about performance testing.<br><br>Hence<br><br><m>A</m>  WRONG.<br><br><m>B</m>  WRONG.<br><br><m>C</m>  CORRECT.<br><br><m>D</m>  WRONG."
];

qx.push([q18, a18, e18]);


var q19 = "Which of the following statements about the given state transition diagram and table of test cases is TRUE?<br><br><img src=\"img/q19.png\"><table> <tr> <td>Test Case</td> <td>1</td> <td>2</td> <td>3</td> <td>4</td> <td>5</td> </tr> <tr> <td>Start State</td> <td>S1</td> <td>S2</td> <td>S2</td> <td>S3</td> <td>S3</td> </tr> <tr> <td>Input</td> <td>Power On</td> <td>Power Off</td> <td>RC On</td> <td>RC Off</td> <td>Power Off</td> </tr> <tr> <td>Expected Output</td> <td>TV Stand By</td> <td>TV Off</td> <td>TV Play</td> <td>TV Stand By</td> <td>TV Off</td> </tr> <tr> <td>Final State</td> <td>S2</td> <td>S1</td> <td>S3</td> <td>S2</td> <td>S1</td> </tr> </table>";

var a19 = [
  "<m>B</m>  The given test cases represent all possible valid transitions in the state transition diagram.",
  "<m>A</m>  The given test cases can be used to derive both valid and invalid transitions in the state transition diagram.",
  "<m>C</m>  The given test cases represent only some of the valid transitions in the state transition C diagram.",
  "<m>D</m>  The given test cases represent sequential pairs of transitions in the state transition diagram."
];
var e19 = [
  "Proposed test cased covered all five possible single valid transitions in the given state diagram (S1&rarr;S2, S2&rarr;S1, S2&rarr;S3, S3&rarr;S2, S3&rarr;S1).<br><br>Hence<br><br><m>A</m>  WRONG.<br><br><m>B</m>  CORRECT.<br><br><m>C</m>  WRONG.<br><br><m>D</m>  WRONG."
];

qx.push([q19, a19, e19]);


var q20 = "Which of the following statements for the equivalence partitioning test technique are TRUE?<br><br>Equivalence partition testing ...<br><br><mm>1</mm>. divides possible inputs into classes where all elements are expected to cause the same behavior.<br><br><mm>2</mm>. uses both valid and invalid partitions.<br><br><mm>3</mm>. must include at least two values from every equivalence partition.<br><br><mm>4</mm>. can be used only for testing equivalence partition inputs from a Graphical User Interface.";

var a20 = [
  "<m>D</m>  <mm>1</mm> and <mm>2</mm> are true; <mm>3</mm> and <mm>4</mm> are false.",
  "<m>A</m>  <mm>1</mm>, <mm>2</mm>, and <mm>4</mm> are true; <mm>3</mm> is false.",
  "<m>B</m>  <mm>1</mm> is true; <mm>2</mm>, <mm>3</mm> and <mm>4</mm> are false.",
  "<m>C</m>  <mm>2</mm> and <mm>3</mm> are true; <mm>1</mm> and <mm>4</mm> are false."
];
var e20 = [
  "Equivalence partitions divide possible inputs into classes where all elements are expected to cause the same behavior and uses both valid and invalid partitions. What more it is enough to use one value from each class. Introducing input from GUI is possible, but is not the best method.<br><br>Hence<br><br><mm>1</mm>  is true.<br><br><mm>2</mm>  is true.<br><br><mm>3</mm>  is false.<br><br><mm>4</mm>  is false.<br><br>Hence<br><br><m>A</m>  WRONG.<br><br><m>B</m>  WRONG.<br><br><m>C</m>  WRONG.<br><br><m>D</m>  CORRECT."
];

qx.push([q20, a20, e20]);


var q21 = "Which of the following options lists techniques categorized as Black Box design techniques?";
var a21 = [
  "<m>A</m>  Equivalence Partitioning, Decision Table testing, State Transition testing, and Boundary Value analysis.",
  "<m>B</m>  Equivalence Partitioning, Decision Table testing, Statement coverage, Use Case Based B testing.",
  "<m>C</m>   Equivalence Partitioning, Decision Coverage testing, Use Case Based testing.",
  "<m>D</m>  Equivalence Partitioning, Decision Coverage testing, Boundary Value analysis."
];

var e21 = [
  "<m>A</m>  CORRECT - all four are black box tests techniques. See section 4.3.",
  "<m>B</m>  WRONG - Statement Coverage is a white box test technique.",
  "<m>C</m>  WRONG - Decision Coverage is a white box test technique.",
  "<m>D</m>  WRONG - Decision Coverage is a white box test technique."
];

qx.push([q21, a21, e21]);


var q22 = "An employee's bonus is to be calculated. It cannot be negative, but it can be calculated down to zero. The bonus is based on the length of employment. The categories are: less than or equal to 2 years, more than 2 years but less than 5 years, 5 or more years, but less than 10 years, 10 years or longer. Depending on the length of employment, an employee will get different levels of bonus.<br><br>How many valid equivalence partitions are needed to test the calculation of the bonus?";

var a22 = [
  "<m>D</m>  4",
  "<m>A</m>  3",
  "<m>B</m>  5",
  "<m>C</m>  2"
];
var e22 = [
  "<m>A</m>  WRONG - see the correct partitions in (d).",
  "<m>B</m>  WRONG - see the correct partitions in (d).",
  "<m>C</m>  WRONG - see the correct partitions in (d).",
  "<m>D</m>  CORRECT. The partitions follow the description in the question: <br><br>0 &lt; employment time &le; 2 <br><br>2 &lt; employment time &lt; 5 <br><br>5 &le; employment time &lt; 10 <br><br>10 &le; employment time. "
];
qx.push([q22, a22, e22]);


var q23 = "Which of the following statements about the benefits of deriving test cases from use cases are true and which are false? <br><br><mm>1</mm>. Deriving test cases from use cases is helpful for system and acceptance testing. <br><br><mm>2</mm>. Deriving test cases from use cases is helpful only for automated testing. <br><br><mm>3</mm>. Deriving test cases from use cases is helpful for component testing. <br><br><mm>4</mm>. Deriving test cases from use cases is helpful for integration testing.";

var a23 = [
  "<m>A</m>  <mm>1</mm> and <mm>4</mm> are true; <mm>2</mm> and <mm>3</mm> are false.",
  "<m>B</m>  <mm>1</mm> is true; <mm>2</mm>, <mm>3</mm>, and <mm>4</mm> are false.",
  "<m>C</m>  <mm>2</mm> and <mm>4</mm> are true; <mm>1</mm> and <mm>3</mm> are false.",
  "<m>D</m>  <mm>1</mm>, <mm>3</mm>, and <mm>4</mm> are true; <mm>2</mm> is false."
];

var e23 = [
  "<mm>1</mm>  is CORRECT - Use cases describe how users interact with the completed system, therefore are best fitted for defining system-level tests. Additionally, \"Use cases are very useful for designing acceptance tests with customer/user participation.\" (Section 4.3.5).",
  "<mm>2</mm>  is WRONG - Use cases can be executed manually, not just automatically.",
  "<mm>3</mm>  is WRONG - at the component level we derive test cases to increase code coverage. These are derived mostly by looking at the code, not by definition of a use case which will eventually exercise a certain piece of the code.",
  "<mm>4</mm>  is CORRECT - \"[use cases] also help uncover integration defects caused by the interaction and interference of different components\" (Section 4.3.5).<br><br>Hence<br><br><m>A</m>  CORRECT.<br><br><m>B</m>  WRONG.<br><br><m>C</m>  WRONG.<br><br><m>D</m>  WRONG."
];

qx.push([q23, a23, e23]);


var q24 = "Which of the options below would be the BEST basis for testing using fault attacks?";

var a24 = [
  "<m>A</m>  Experience, defect and failure data; knowledge about software failures.",
  "<m>B</m>  Risk identification performed at the beginning of the project.",
  "<m>C</m>  Use Cases derived from business flows by domain experts.",
  "<m>D</m>  Expected results from comparison with an existing system."
];

var e24 = [
  "<m>A</m>  CORRECT - \"These defect and failure lists can be built based on experience, available defect and failure data, and from common knowledge about why software fails.\" (Section 4.5).",
  "<m>B</m>  WRONG - Risk identification tags the areas or features of concern in the project - not how to test them.",
  "<m>C</m>  WRONG - Testing business flows is not targeted at known weaknesses in software. It just attempts to verify certain use cases can be executed.",
  "<m>D</m>  WRONG - The sentence describes one of the possible ways to know if a test failed or not and has nothing specific to do with fault-attacks."
];

qx.push([q24, a24, e24]);


var q25 = "You are working on a project that has poor specifications and time pressure.<br><br>Which of the following test techniques would be the best test approach to use?";

var a25 = [
  "<m>C</m>  Exploratory Testing.",
  "<m>A</m>  Use Case Testing.",
  "<m>B</m>  Statement Testing.",
  "<m>D</m>  Decision Testing."
];

var e25 = [
  "<m>A</m>  WRONG, the project has poor specifications, hence there is only a small possibility that any use cases exist.",
  "<m>B</m>  WRONG, statement testing is time consuming, and there is time pressure in the project.",
  "<m>C</m>  CORRECT, exploratory testing is a good idea when there is poor documentation and time pressure.",
  "<m>D</m>  WRONG, decision testing is time consuming, and there is time pressure in the project."
];

qx.push([q25, a25, e25]);


var q26 = "Which of the following test techniques is a white-box technique?";

var a26 = [
  "<m>A</m>  Decision Testing.",
  "<m>B</m>  Boundary Value Analysis.",
  "<m>C</m>  Equivalence Partitioning.",
  "<m>D</m>  State Transition Testing."
];

var e26 = [
  "<m>A</m>  CORRECT, decision testing is a white box technique.",
  "<m>B</m>  WRONG, BVA is black- box technique.",
  "<m>C</m>  WRONG, Equivalence partitioning is black-box technique.",
  "<m>D</m>  WRONG, State Transition testing is black-box technique."
];

qx.push([q26, a26, e26]);


var q27 = "You have started specification-based software testing. The system under test calculates the greatest common divisor (GCD) of two integers (A and B) greater than zero. [K3]<br><br>calcGCD (A, B);<br><br>The following test inputs have been specified.<br><br><table> <tr> <td>Taste Case</td> <td>A</td> <td>B</td> </tr> <tr> <td>1</td> <td>1</td> <td>1</td> </tr> <tr> <td>2</td> <td>INT_MAX</td> <td>INT_MAX</td> </tr> <tr> <td>3</td> <td>1</td> <td>0</td> </tr> <tr> <td>4</td> <td>0</td> <td>1</td> </tr> <tr> <td>5</td> <td>INT_MAX-1</td> <td>1</td> </tr> <tr> <td>6</td> <td>1</td> <td>INT_MAX-1</td> </tr> </table><br>Where INT_MAX is the largest Integer.<br><br>Which test technique has been applied in order to determine test cases 1 through 6? ";

var a27 = [
  "<m>A</m>  Boundary Value Analysis.",
  "<m>B</m>  State Transition Testing.",
  "<m>C</m>  Use Case Testing.",
  "<m>D</m>  Decision Table Testing"
];

var e27 = [
  "<m>A</m>  CORRECT: given values (0,1,INT_MAX -1, INT_MAX) are typical border values.",
  "<m>B</m>  WRONG, see a) for justification.",
  "<m>C</m>  WRONG, see a) for justification.",
  "<m>D</m>  WRONG, see a) for justification."
];

qx.push([q27, a27, e27]);


var q28 = "A company's employees are paid bonuses if they work more than a year in the company and achieve individually agreed targets.<br>The following decision table has been designed to test the system:<br><br><table> <tr class=\"bold\"> <td></td> <td></td> <td>T1</td> <td>T2</td> <td>T3</td> <td>T4</td> <td>T5</td> <td>T6</td> <td>T7</td> <td>T8</td> </tr> <tr class=\"bold\"> <td colspan = 10>Conditions</td> </tr> <tr> <td>Cond1</td> <td>Employment for more than 1 year?</td> <td>YES</td> <td>NO</td> <td>YES</td> <td>NO</td> <td>YES</td> <td>NO</td> <td>YES</td> <td>NO</td> </tr> <tr> <td>Cond2</td> <td>Agreed target?</td> <td>NO</td> <td>NO</td> <td>YES</td> <td>YES</td> <td>NO</td> <td>NO</td> <td>YES</td> <td>YES</td> </tr> <tr> <td>Cond3</td> <td>Achieved target?</td> <td>NO</td> <td>NO</td> <td>NO</td> <td>NO</td> <td>YES</td> <td>YES</td> <td>YES</td> <td>YES</td> </tr> <tr class=\"bold\"> <td colspan = 10>Action</td> </tr> <tr> <td></td> <td>Bonus payment?</td> <td>NO</td> <td>NO</td> <td>NO</td> <td>NO</td> <td>NO</td> <td>NO</td> <td>YES</td> <td>NO</td> </tr> </table><br>Which test cases could be eliminated in the above decision table because the test case wouldn't occur in a real situation?";

var a28 = [
  "<m>D</m>  T5 and T6.",
  "<m>A</m>  T1 and T2.",
  "<m>B</m>  T3 and T4.",
  "<m>C</m>  T7 and T8."
];

var e28 = [
  "In the test cases one should infer from the conditions. In the test cases T5 and T6 the situation is described, where the target is reached, however, was not agreed. Since this situation can ́t occur, therefore we can eliminate the corresponding test cases.<br><br>Hence<br><br><m>A</m>  WRONG.<br><br><m>B</m>  WRONG.<br><br><m>C</m>  WRONG.<br><br><m>D</m>  CORRECT."
];

qx.push([q28, a28, e28]);


var q29 = "Which of the following BEST describes how tasks are divided between the test manager and the tester?";

var a29 = [
  "<m>B</m>  The test manager plans, organizes, and controls the testing activities, while the tester specifies and executes tests.",
  "<m>A</m>  The test manager plans testing activities and chooses the standards to be followed, while the tester chooses the tools and controls to be used.",
  "<m>C</m>  The test manager plans, monitors, and controls the testing activities, while the tester designs tests and decides about the approval of the test object.",
  "<m>D</m>  The test manager plans and organizes the testing, and specifies the test cases, while the tester prioritizes and executes the tests."
];

var e29 = [
  "<m>A</m>  WRONG - Selecting tools is a test manager's task (Section 5.1.2).",
  "<m>B</m>  CORRECT - see section 5.1.2.",
  "<m>C</m>  WRONG - Deciding about approval of the test object is a test manager's task.",
  "<m>D</m>  WRONG - Test manager does not specify the test cases."
];

qx.push([q29, a29, e29]);


var q30 = "Which of the following can be categorized as a product risk?";

var a30 = [
  "<m>C</m>  Error-prone areas, potential harm to the user, poor product characteristics.",
  "<m>A</m>  Low quality of requirements, design, code and tests.",
  "<m>B</m>  Political problems, and delays in especially complex areas in the product.",
  "<m>D</m>  Problems in defining the right requirements, potential failure areas in the software or system."
];

var e30 = [
  "<m>A</m>  WRONG - Low quality requirements are a program risk (See Syllabi Section 5.5.1).",
  "<m>B</m>  WRONG - All the items in this option are program risks.",
  "<m>C</m>  CORRECT - all items are product risks (See Syllabi Section 5.5.2).",
  "<m>D</m>  WRONG - Requirements problems are program risk. (See Syllabi Section 5.5.1)."
];

qx.push([q30, a30, e30]);


var q31 = "Which of the following are typical exit criteria from testing?";

var a31 = [
  "<m>A</m>  Test coverage measures, reliability measures, test cost, schedule, state of defect correction and residual risks.",
  "<m>B</m>  Test coverage measures, reliability measures, degree of tester independence, and product B completeness.",
  "<m>C</m>  Test coverage measures, reliability measures, test cost, availability of testable code, time to C market, and product completeness.",
  "<m>D</m>  Time to market, residual defects, tester qualification, degree of tester independence, test coverage measures and test cost."
];

var e31 = [
  "<m>A</m>  CORRECT - See section 5.2.4.",
  "<m>B</m>  WRONG - Degree of tester's independence does not play a role in exit criteria.",
  "<m>C</m>  WRONG - \"availability of testable code\" is an entry criteria.",
  "<m>D</m>  WRONG - Degree of tester's independence as well as tester qualification do not play a role in exit criteria."
];

qx.push([q31, a31, e31]);


var q32 = "As a Test Manager, you have the following requirements to test: <br><br>R1 - Process Anomalies <br><br>R2 - Synchronization <br><br>R3 - Confirmation <br><br>R4 - Issues <br><br>R5 - Financial Data <br><br>R6 - Diagram Data <br><br>R7 - Changes to the User Profile <br><br>The notation to indicate any Requirement's logical dependencies is, for example, \"R1 &rarr; R3\" meaning that R3 is dependent on R1.<br><br><img src=\"img/q32.png\"><br><br>Which of the following options structures the test execution schedule according to the requirement dependencies?";

var a32 = [
  "<m>C</m>  R1 &rarr; R3 &rarr; R2 &rarr; R5 &rarr; R6 &rarr; R4 &rarr; R7.",
  "<m>A</m>  R3 &rarr; R2 &rarr; R1 &rarr; R7 &rarr; R5 &rarr; R6 &rarr; R4.",
  "<m>B</m>  R2 &rarr; R5 &rarr; R6 &rarr; R4 &rarr; R7 &rarr; R1 &rarr; R3.",
  "<m>D</m>  R1 &rarr; R2 &rarr; R5 &rarr; R6 &rarr; R3 &rarr; R4 &rarr; R7."
];
var e32 = [
  "<m>A</m>  WRONG - everything is dependent on R1, so any test flow that does not start with R1 is wrong.",
  "<m>B</m>  WRONG - everything is dependent on R1, so any test flow that does not start with R1 is wrong.",
  "<m>C</m>  CORRECT - the tests are specified in a cadence that takes the dependencies into account.",
  "<m>D</m>  WRONG - R2 is dependent on R3, so R3 should be tested before R2."
];

qx.push([q32, a32, e32]);


var q33 = "Which of the following is a possible benefit of independent testing?";

var a33 = [
  "<m>B</m>  Independent testers tend to be unbiased and find different defects than the developers.",
  "<m>A</m>  More work gets done because testers do not disturb the developers all the time.",
  "<m>C</m>  Independent testers do not need extra education and training.",
  "<m>D</m>  Independent testers reduce the bottleneck in the incident management process."
];
var e33 = [
  "<m>A</m>  WRONG - independence does not mean loss of cooperation.",
  "<m>B</m>  CORRECT - that is one of the reasons for independence.",
  "<m>C</m>  WRONG - testers need education and training.",
  "<m>D</m>  WRONG - there is no connection between Independent testers and the bottleneck in the incident management process."
];

qx.push([q33, a33, e33]);


var q34 = "Which of the following is a project risk?";

var a34 = [
  "<m>A</m>  Skill and staff shortages.",
  "<m>B</m>  Poor software characteristics (e.g. usability).",
  "<m>C</m>  Failure-prone software delivered.",
  "<m>D</m>  Possible reliability defect (bug)"
];

var e34 = [
  "<m>A</m>  CORRECT - skill and staff shortages is typical project risk.",
  "<m>B</m>  WRONG - it is a product risk.",
  "<m>C</m>  WRONG - it is a product risk.",
  "<m>D</m>  WRONG - it is a product risk."
];

qx.push([q34, a34, e34]);


var q35 = "As a test manager, you are asked for a test summary report. Concerning test activities, and according to the IEEE 829 Standard, what should be the MOST important information to include in your report?";

var a35 = [
  "<m>B</m>  An overview of the major testing activities, events and the status with respect to meeting goals.",
  "<m>A</m>  The number of test cases executed and their results.",
  "<m>C</m>  Overall evaluation of each development work item.",
  "<m>D</m>   Training taken by members of the test team to support the test effort."
];

var e35 = [
  "<m>A</m>  WRONG - the number of test cases executed and their results may be included in a test summary report according to IEEE 829, but not as the most important part.",
  "<m>B</m>  CORRECT - the test summary report must include information about the major testing activities, events and the status with respect to meeting goals.",
  "<m>C</m>  WRONG - evaluation of each development work item is not the part of test summary report.",
  "<m>D</m>  WRONG - training is not relevant in a test summary report."
];

qx.push([q35, a35, e35]);


var q36 = "You are a tester in a safety-critical software development project. During execution of a test, you find out that one of your test cases failed, causing you to write an incident report.<br><br>According to the IEEE Std. 829, what should you consider to be the MOST important information to include in your incident report? ";

var a36 = [
  "<m>A</m>  Impact, incident description, date and your name.",
  "<m>B</m>  Unique ID for the report, special requirements needed and the person who caused the defect.",
  "<m>C</m>  Transmitted items, your name and your feelings about the possible root cause of the defect.",
  "<m>D</m>  Incident description, development environment and expected results of testing."
];

var e36 = [
  "<m>A</m>  CORRECT - the most important information that should be included in an incident report for critical software is impact.",
  "<m>B</m>  WRONG - this information should be in incident report but this information isn't as important as impact.",
  "<m>C</m>  WRONG - an incident report should contain factual information, not the tester's 'feeling' about the possible root cause.",
  "<m>D</m>  WRONG - impact should be included."
];

qx.push([q36, a36, e36]);


var q37 = "From the list below, which are the recommended principles for introducing a test tool to an organization? <br><br><mm>1</mm>. Roll out the tool to the entire organization at the same time. <br><br><mm>2</mm>. Start with a pilot project. <br><br><mm>3</mm>. Adapt and improve processes to fit the use of the tool. <br><br><mm>4</mm>. Provide training and coaching for new users. <br><br><mm>5</mm>. Let each team decide their own way of using the tool. <br><br><mm>6</mm>. Monitor that costs do not exceed initial acquisition cost. <br><br><mm>7</mm>. Gather lessons learned from all teams.";

var a37 = [
  "<m>C</m>  <mm>2</mm>, <mm>3</mm>, <mm>4</mm>, <mm>7</mm>.",
  "<m>A</m>  <mm>1</mm>, <mm>3</mm>, <mm>4</mm>, <mm>5</mm>.",
  "<m>B</m>  <mm>2</mm>, <mm>5</mm>, <mm>6</mm>.",
  "<m>D</m>  <mm>1</mm>, <mm>6</mm>, <mm>7</mm>."
];

var e37 = [
  "<mm>1</mm> is incorrect - It is recommended to first do a pilot deployment, before rolling out to the entire organization (Section 6.3).",
  "<mm>2</mm> is correct - See above.",
  "<mm>3</mm> is correct - \"Evaluate how the tool fits with existing processes and practices, and determine what would need to change\" (Section 6.3).",
  "<mm>4</mm> is correct - Provision of training is one of the success factors for deployment (Section 6.3).",
  "<mm>5</mm> is incorrect - If you let everyone to decide how to use the tool, there will be a mess. \"Defining usage guidelines\" is one of the success factors for deployment (Section 6.3).",
  "<mm>6</mm> is incorrect - The cost of deploying a tool is more than just the acquisition cost of the tool. Failing to realize this is one of the risks associated with tool deployment (Section 6.1).",
  "<mm>7</mm> is correct - \"Gathering lessons learned from all teams\" is one of the success factors for deployment (Section 6.3).<br><br>Hence<br><br><m>A</m>  WRONG.<br><br><m>B</m>  WRONG.<br><br><m>C</m>  CORRECT.<br><br><m>D</m>  WRONG."
];

qx.push([q37, a37, e37]);


var q38 = "Which of the following BEST describes a characteristic of a keyword-driven test execution tool?";

var a38 = [
  "<m>A</m>  A table with test input data, action words, and expected results controls execution of the system under test.",
  "<m>B</m>  Actions of testers are automated using a script that is rerun several times.",
  "<m>C</m>  Actions of testers are automated using a script that is run with several sets of test input data.",
  "<m>D</m>  The ability to log test results, and compare them against the expected results stored in a text file."
];

var e38 = [
  "<m>A</m>  CORRECT - \"In a keyword-driven testing approach, the spreadsheet contains keywords describing the actions to be taken (also called action words), and test data\" (Section 6.2.3).",
  "<m>B</m>  WRONG - this is a description of scripted test automation.",
  "<m>C</m>  WRONG - this is a description of data-driven test automation.",
  "<m>D</m>  WRONG - this is describing a part of what a test automation framework does."
];

qx.push([q38, a38, e38]);


var q39 = "Which of the following is NOT a goal of a pilot project for tool evaluation?";

var a39 = [
  "<m>D</m>  To reduce the defect rate in the pilot project.",
  "<m>A</m>  To evaluate how the tool fits with existing processes and practices.",
  "<m>B</m>  To determine use, management, storage, and maintenance of the tool and testware.",
  "<m>C</m>  To assess whether the benefits will be achieved at reasonable cost."
];

var e39 = [
  "<m>A</m>  WRONG - the sentence is true, see Syllabi, section 6.3.",
  "<m>B</m>  WRONG - the sentence is true, see Syllabi, section 6.3.",
  "<m>C</m>  WRONG - the sentence is true, see Syllabi, section 6.3.",
  "<m>D</m>  CORRECT - reducing the number of defects is not the goal of a pilot project."
];

qx.push([q39, a39, e39]);


var q40 = "A software development and test organization would like to achieve the test efficiency improvement goals listed below.<br>Which would best be supported by a test management tool?";

var a40 = [
  "<m>A</m>  Enable traceability between requirements, tests, and defects (bugs).",
  "<m>B</m>  Optimize the ability of tests to identify failures.",
  "<m>C</m>  Resolve defects faster.",
  "<m>D</m>  Automate a selection of test cases for execution."
];

var e40 = [
  "<m>A</m>  CORRECT - because traceability between requirements and testing is a functionality of a test management tool.",
  "<m>B</m>  WRONG - because this is not possible with test management tools.",
  "<m>C</m>  WRONG - because this is not mainly solved by test management tools.",
  "<m>D</m>  WRONG - because the selection of test cases is not supported by test management tools."
];

qx.push([q40, a40, e40]);


// var q = "";
// var a = [];
// var e = [];
// qx.push([q, a, e]);

