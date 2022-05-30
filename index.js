const askQ = document.querySelector('#AskQ');
const addQ = document.querySelector('#AddQ');
const addQ_A = document.querySelector('#AddQ_A');
const output = document.querySelector('#output');
const askBtn = document.querySelector('#AskBtn');
const addBtn = document.querySelector('#AddBtn');
const clear = document.querySelector('#clear');

const kbid = ''
const EndpointKey = "";

const askURL = `https://pz-sadzawka.azurewebsites.net/qnamaker/knowledgebases/${kbid}/generateAnswer`;
const addURL = `https://pz-sadzawka.azurewebsites.net/qnamaker/knowledgebases/${kbid}`;


clear.addEventListener('click', () => {
    askQ.value = "";
    addQ.value = "";
    addQ_A.value = "";
})

askBtn.addEventListener('click', () => {
    if(askQ.value.length == 0) alert("Wpisz pytanie!");
    else {
        console.log(askQ.value);
        let body = {
            "question": String(askQ.value),
            "RankerType":"QuestionOnly"
        }
        fetch(askURL, {
            method: 'POST',
            headers: {
                'Authorization': "EndpointKey " + EndpointKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            console.log(response);
            output.textContent = response.text();
    })
    .catch(error => console.log(error));
    }
})

addBtn.addEventListener('click', () => {
    if(addQ.value.length == 0 && addQ_A.value.length == 0) alert("Wpisz pytanie i odpowiedź do dodania!");
    else {
        console.log(addQ.value +  " : " + addQ_A.value);
        let body = {
            'add' : {
                'qnaList': [{
                    'id': 0,
                    'answer': addQ_A.value,
                    'questions': [
                        addQ.value
                    ]
                }]
            }
        }
        fetch(addURL, {
            method: 'PATCH',
            headers: {
                'Authorization': "EndpointKey " + EndpointKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => {
        if(!response.ok) throw Error(response.statusText);
        output.value = response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
    }
})

