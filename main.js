const states = ["New card", "In Development", "QA", "Done"];

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';
  const state = 0;

  if ((description.length == 0) || (assignedTo.length == 0)) {
    alert("Please fill all fields with required data.");
    document.getElementById('add-issue').setAttribute("data-toggle", "modal");
    document.getElementById('add-issue').setAttribute("data-target", "#emptyField")
  }
  else {
    document.getElementById('add-issue').removeAttribute("data-toggle", "modal");
    document.getElementById('add-issue').removeAttribute("data-target", "#emptyField")
    const issue = { id, description, severity, assignedTo, status, state };
    let issues = [];
    if (localStorage.getItem('issues')) {
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));


    fetchIssues();
  }
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  currentIssue.description = `<strike>${currentIssue.description}</strike>`
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => ((issue.id) != id))
  localStorage.removeItem('issues');
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}
const fetchIssues = () => {

  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status, state } = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h3>${states[state]}</h3>
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <button onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
                              <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
                              <br/><br/>
                              <button onclick="prevState(${id})" class="btn btn-danger">Prev Sate</button>
                              <button onclick="nextState(${id})" class="btn btn-danger">Next State</button>
                              </div>`;
  }
}

function nextState(id){
  
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  if(currentIssue.description === 'Closed'){
    return;
  }
  
  
  if(currentIssue.state < 3){
    currentIssue.status = "Open"
    currentIssue.state++;
  }
  if(currentIssue.state  === 3){
    currentIssue.status = "Verified"
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function prevState(id){
  
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  if(currentIssue.description === 'Closed'){
    return;
  }

  if(currentIssue.state > 0){
    currentIssue.state--;
    currentIssue.status = "Verified"
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

fetchIssues();
