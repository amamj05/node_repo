document.querySelectorAll('#user-list tr').forEach((el)=>{el.addEventListener('click', function(){
    const id_func = el.querySelector('td');
    getComment(id_func);
});});



async function getUser(){
    try{
        const res = await axios.get('/user');
        const users = res.data;
        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML ='';
        users.map(function(user){
            const row = document.createElement('tr');
            row.addEventListener('click', ()=>{getComment(user.id);});
            
            let td_id = document.createElement('td');
            td_id.textContent = user.id;
            row.appendChild(td_id);

            let td_name = document.createElement('td');
            td_name.textContent = user.name;
            row.appendChild(td_name);

            let td_age = document.createElement('td');
            td_age.textContent = user.age;
            row.appendChild(td_age);

            let td_marketing = document.createElement('td');
            td_marketing.textContent = user.marketing ? '동의':'거부';
            row.appendChild(td_marketing);
            
            tbody.appendChild(row);
            //625p
        });
    }catch(err){console.error(err);}
}



//

document.getElementById('user-form').addEventListener('submit' ,
    async (e)=>{
        e.preventDefault();
        const name = e.target.username.value;
        const age = e.target.age.value;
        const marketing = e.target.marketing.checked;
        console.log({name, age, marketing});  ///
        try{
            await axios.post('/user', {name, age, marketing});
            getUser();
        }catch(err){console.error(err);}
        e.target.username.value = '';
        e.target.age.value = '';
        e.target.marketing.checked = false;
    }
);

document.getElementById('comment-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const id = e.target.userid.value;
    const comment = e.target.comment.value;
    try {
        await axios.post(`/comment`, {id, comment});
        getComment(id);
    } catch (err) { console.error(err); next(err); }
    e.target.userid.value = '';
    e.target.comment.value = '';
});


async function getComment(id){
    try{
        const res = await axios.get(`/user/${id}/comment`);
        const comments = res.data;
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML='';
        comments.map(function (comment){
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

            //댓글 수정
            const comment_edit = document.createElement('button');
            comment_edit.textContent = '수정';
            comment_edit.addEventListener('click', async()=>{
                const newComment = prompt('수정할 내용을 입력해주세요');
                if(!newComment){return alert('수정 내용을 입력하지않았습니다')}
                try{
                    await axios.patch(`/comment/${comment.id}`,{comment:newComment});
                    getComment(id);  //다시 불러오기
                }catch(err){console.error(err);}
            });

            let edit_td = document.createElement('td');
            edit_td.appendChild(comment_edit);
            row.appendChild(edit_td);

            // 댓글 삭제
            const comment_remove = document.createElement('button');
            comment_remove.textContent = '삭제';
            comment_remove.addEventListener('click', async()=>{
                try{
                    await axios.delete(`/comment/${comment.id}`);
                    getComment(id);  //다시 불러오기
                }catch(err){console.error(err); }
            });

            let remove_td = document.createElement('td');
            remove_td.appendChild(comment_remove);
            row.appendChild(remove_td);

            tbody.appendChild(row);
        });

       
    }catch(err){console.error(err); next(err);}
}