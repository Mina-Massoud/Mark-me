const input = document.getElementById("input-el") ; 
input.onclick = function(){ 
    input.setAttribute('id','focus') ;
    input.style.fontSize = "7px"
}; 
let deletebtn = document.getElementById('delete-btn') ; 
let mybookmarks = document.getElementsByClassName('bookmarks') ; 
let myLeads = [] ; 

const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borgen/"}
]
let tabBtn = document.getElementById('tab-btn') ; 
const ulEl = document.getElementById("ul-el")
let inputBtn = document.getElementById('input-btn') ;
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
console.log(leadsFromLocalStorage) ; 
// localStorage.clear() ;
tabBtn.addEventListener("click", function(){    
    ulEl.style.display="block" ; 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        console.log(tabs[0].url)
        console.log(myLeads)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderLeads(myLeads)
    })    
})

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    ulEl.style.display="block" ; 
    renderLeads(myLeads)
}
deletebtn.addEventListener("click" ,function() {
    ulEl.style.display="none" ; 
    myLeads = [] ; 
    localStorage.clear() ; 
    renderLeads(myLeads) ;
})

inputBtn.addEventListener("click", function() { 
    if (input.value !== "") {
        ulEl.style.display="block" ; 
    myLeads.push(input.value);
    localStorage.setItem("myLeads",JSON.stringify(myLeads)) ; 
    renderLeads(myLeads);  
    console.log(leadsFromLocalStorage) ;
    input.value = "" ;  
    }
    // input.value = "" ; 
} )

function renderLeads(leads) {
    let listItems = ""
    for (let i = 0; i <leads.length; i++) {
        let test = ""  ;
        let cnt = 0 ; 
        let flag = false ; 
        if (leads[i].length > 20) {
        for (let j = 0 ; j<22 ; j++) {   
                test+=leads[i][j] ; 
            }
            test+="..." ; 
        }
        else { 
            test+=leads[i] ; 
        }
        listItems += `
            <li>
                <a id="urInput" target='_blank' href='${leads[i]}'>
                    ${test}
                </a>
            </li>
    
            <hr>
        `
    }
    ulEl.innerHTML = listItems  
}

 
// local Storage 
// we use JSON.stringify(myarray) to convert my array to string 
// we use too JSON.parse(myarray) to convert it to array to just use push method