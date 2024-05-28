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
            
            let td_id = document.createElement('td');
            td.textContent = user.id;
            row.appendChild(td_id);

            let td_name = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td_name);

            let td_age = document.createElement('td');
            td.textContent = user.age;
            row.appendChild(td_age);

            let td_marketing = document.createElement('td');
            td.textContent = user.marketing ? '동의':'거부';
            row.appendChild(td_marketing);
            
            tbody.appendChild(row);
            //625p
        });
    }catch(err){console.error(err);}
}



//

document.getElementById('usesr-form').addEventListener('submit' ,
    async (e)=>{
        e.preventDefault();
        const name = e.target.username.value;
        const age = e.target.age.value;
        const marketing = e.target.marketing.value;
        try{
            await axios.post('/users', {name, age, marketing});
            getUser();
        }catch(err){console.error(err);}
        e.target.username.value = '';
        e.target.age.value = '';
        e.target.marketing.checked = false;
    }
);



async function getComment(id){
    try{
        const res = await axios.get(`/user/${id}/comment`);
        const comment = res.data;
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML='';
        comment.map(function (comment){
            const row = document.createElement('tr');

            let id_td = document.createElement('td');
            id_td.textContent = comment.id;
            row.appendChild(id_td);

            let name_td = document.createElement('td');
            name_td.textContent = comment.User.name;
            row.appendChild(name_td);

            let comment_td = document.createElement('td');
            comment_td.textContent = comment.comment;
            row.appendChild(comment_td);

            const comment_edit = document.createElement('button');
            comment_edit.textContent = '수정';
            comment_edit.addEventListener('click', async()=>{
                const newComment = prompt('수정할 내용을 입력해주세요');
                if(!newComment){return alert('수정 내용을 입력하지않았습니다')}
                try{
                    await axios.patch(`/comments/${comment.id}`,{comment:newComment})
                    getComment(id);  //다시 불러오기
                }catch(err){console.error(err);}
            });
        });
    }catch(err){console.error(err); next(err);}
}