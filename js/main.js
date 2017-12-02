// js/main.js


document.addEventListener('DOMContentLoaded', init);

function init(){
    //when the html and JS finish loading run this script
    
    document.getElementById('btnSend').addEventListener('click', getNumbers)
    document.getElementById('btnBack').addEventListener('click', nav)
}

function nav(ev){
    let btn = ev.target;
    console.log(btn.id);
    switch(btn.id){
        case 'btnSend':
            document.getElementById('home').classList.remove('active');
            document.getElementById('list').classList.add('active');
            //getNumbers();
            break;
        case 'btnBack':
            document.getElementById('home').classList.add('active');
            document.getElementById('list').classList.remove('active');
            break;
    }
}

function makeURL(){
    let url = "https://tibu0003.github.io/ajax-lotto/nums.php?";
    //  ?digits=4&max=345
    //get the digits and max from the form
    let digits = document.getElementById('digits');
    let max = document.getElementById('max');
    url = `${url}digits=${digits.value}&max=${max.value}`;
    
    return url;
}

function getNumbers(ev){
    ev.preventDefault();
    //let url = makeURL();
    let url = "https://tibu0003.github.io/ajax-lotto/nums.php";
    
    let d = document.getElementById('digits');
    let m = document.getElementById('max');
    let dv = d.value;
    let mv = m.value;
    if( parseInt(mv) <  parseInt(dv)*2 ){
        //the max value must be at least double the digits
        //tell the user to try again
        alert('Your max value is too low');
    }else if( isNaN(mv) || isNaN(dv) ){
        //BOTH values MUST be numbers
        alert('You must provide numeric values for digits and max');
    }else if( mv.trim() == ""  || dv.trim() == ""){
        //check for empty strings inside m and d
    }else{
        //do the fetch
        //navigate to the next page when we get a response... or now
        //pass the event object
        nav(ev);
        //all the other code from below goes here.
        let fd = new FormData();
        fd.append('digits', dv);
        fd.append('max', mv);

        let h = new Headers();
        let info = {
            method:'POST',
            headers: h,
            body: fd
        };

        fetch(url, info)
        .then(response => {
            //console.dir( response );
            return response.json();
        } )
        .then(data => {
            if( data.code == 0){
                //code 0 means there were no errors on the server
                let ul = document.querySelector('ul.num_list');
                ul.innerHTML = "";
                data.numbers.forEach( (num) => {
                    let li = document.createElement("li");
                    li.className = "num";
                    li.textContent = num;
                    ul.appendChild(li);
                });
            }else{
                //the code was bad.... do something...
            }
        })
    }
    
    
    
    
    /**
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        console.log(data.code);
        console.log(data.numbers[1])
    })
    **/
    
}
