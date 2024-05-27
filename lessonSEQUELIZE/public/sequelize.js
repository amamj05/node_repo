document.querySelectorAll('#usesr-list tr').forEach((el)=>{el.addEventListener('click', function(){
    const id_func = el.querySelector('td');
    getComment(id);
});});


async function getUser(){
    try{
        const res = await axios.get('/users');
        const users = res.date;
        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML ='';
        users.map(function(user){
            const row = document.createElement('tr');
            row.addEventListener('click', ()=>{getComment(user.id);});
            let td = document.createElement('td');
            td.textContent = user.id;
            row.appendChild(td);
            //625p
        });
    }catch(err){console.error(err);}
}


function getComment(id){}