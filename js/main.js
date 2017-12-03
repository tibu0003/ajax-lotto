document.addEventListener('DOMContentLoaded', init);

function init(){
   //js and html loaded 
    
  document.getElementById('btnSend').addEventListener('click',nav);
  document.getElementById('btnBack').addEventListener('click',nav); 
}

function nav(ev){
    let btn = ev.target;

    switch(btn.id){
        case 'btnSend':
            if (getNumbers() == true){
            document.getElementById('home').classList.remove('active');
            document.getElementById('list').classList.add('active');
            }        
            break;
        case 'btnBack':
            document.getElementById('home').classList.add('active');
            document.getElementById('list').classList.remove('active');
            break;
    }   
}

//function makeURL(){
//    let url = "http://localhost/mad9014-lotto/nums.php?";
//    let digits = document.getElementById('digits');
//    let max = document.getElementById('max');
//    url = `${url}digits=${digits.value}&max=${max.value}`;  //``quotes template string will //interpret variables
//    return url;
//}

function getNumbers(){
    let url = "http://localhost/mad9014-lotto/nums.php";
    //steve
    //let url = "http://10.70.172.62/mad9014-lotto/nums.php";
    //cesar
    //let url = "http://10.50.15.31/mad9014_lotto/nums.php";
    
    //error check
    
    let digits = document.getElementById('digits');
    let max = document.getElementById('max');
    
    //the placeholder 6,49 is there, so I decided to use it as the default if
    //the user doesn't enter anything at all.
    if (digits.value == "") {digits.value = "6";}
    if (max.value == "") {max.value = "49";}
    
    let dv = digits.value;
    let mv = max.value;
    
    if(parseInt(mv) < parseInt(dv)*2)
    {   alert('Please enter a higher maximum range value!');
        return false;
    }else if( isNaN(mv) || isNaN(dv)){
        alert('Please use numeric values!');
        return false;
    }else{   
      
       let fd = new FormData();
    
       fd.append('digits', digits.value);
       fd.append('max', max.value);
            
       let h = new Headers();
    
       let info = {
           method:'POST',
           headers:h,
           body:fd  
           };
    
       fetch(url,info)
       .then(response => response.json())
       .then(data => {
       
           if (data.code == 0)
           {
               let ul = document.querySelector('ul.num_list');
               ul.innerHTML = "";
               data.numbers.forEach( num => {
                  let li = document.createElement("li");
                  li.className = "num";
                  li.textContent = num;
                  ul.appendChild(li);
               });
           }else{}
        
       });
          
    }
    return true;
}