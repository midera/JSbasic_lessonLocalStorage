/*Дана textarea.
    В неё вводится текст.
    Сделайте так, чтобы после захода на эту страницу через некоторое время, введенный текст остался в textarea.*/
/*
const table=document.getElementById('textarea')
table.value=localStorage.getItem('text');
table.oninput = (ev )=> {
   localStorage.setItem('user',ev.target.value)
}
*/

/*- Дана форма с инпутами, текстареа, чекбоксами, радио кнопочками, селектами и тп.
    Пользователь вводит какие-то данные и закрывает страницу (не факт, что он заполнил всю форму).
Сделайте так, чтобы при следующем заходе на страницу введенные им ранее данные стояли на своих местах.
    Сделайте ваш скрипт как можно более универсальным.*/
/*const windowForm = document.getElementById('my form');
dataForm(windowForm);
function saveF(t){
    writeForm(t)
}
function writeForm(tag){
    for(let i=0; i<tag.length; i++) {
        let tagEl=tag[i];
        if (tagEl.type==='checkbox'|| tagEl.type==='radio')
            tagEl.checked
                ?tagEl.value=true: tagEl.value=false
        localStorage.setItem(tagEl.id,tagEl.value)
    }
}
function dataForm(tag){
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.hasOwnProperty(tag.children[i].id)){
            tag.children[i].value=localStorage.getItem(tag.children[i].id);
            if (tag.children[i].id==='true'){
                tag.children[i].setAttribute('checked','checked')
            }
        }
        let key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
    }
}*/

/*-Дан текстареа. В него можно ввести данные, нажать кнопку "сохранить" и они "фикисруются"
(в хранилище), затем поредактировать их, затем еще поредактировать и возможно еще.....
Требование : хранить историю своих изменений (даже после перезагрузки страницы).
Сверху над текстареа должны появится стрелочки, с помощью которых можно перемещаться по истории
(не забудьте!чекпоинт истории - нажатеи кнопки сохранить).*/
/*
const text = document.getElementById("text");
const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");
const save = document.getElementById("save");
const  input='input';
let currentIndex=0;
if (!localStorage.getItem(input)){
    localStorage.setItem(input,JSON.stringify([]))
}else {
   const elems=localStorage.getItem(input);
   currentIndex=elems.length-1;
   text.value=elems[currentIndex];
}
save.onclick=()=>{
    const data=text.value;
    const low= JSON.parse(localStorage.getItem(input ));
    low.push(data);
    localStorage.setItem(input,JSON.stringify(low));
};
arrowLeft.onclick=()=>{
    const low= JSON.parse(localStorage.getItem(input ));
    if (currentIndex-1>=0){
        currentIndex--;
    }else {
        currentIndex=low.length-1;
    }
    text.value=low[currentIndex]
}
arrowRight.onclick=()=>{
    const low= JSON.parse(localStorage.getItem(input ));
    if (currentIndex+1< low.length){
        currentIndex++;
    }else{
        currentIndex=0;
    }
    text.value=low[currentIndex];
}*/
/*- Реализуйте записную книгу, хранящую данные в локальном хранилище.
    Данные которые надо сохранять : ФИО, номер, почта, фирма, отдел, день рождения
Данные вводить через соответсвующую форму.
--Каждому контакту добавить кнопку для удаления контакта.
--Каждому контакту добавить кнопку редактироваиня.
    При нажати на нее появляется форма, в которой есть все необходимые инпуты для редактирования,
    которые уже заполнены данными объекта*/
const arrUser='arrUser';
const createPerson=document.getElementById('createPerson');
let formUser={};
const myForm=document.getElementById('myform');
myForm.submit.onclick=ev=>{
    let person={...formUser};
    formUser={};
    for (let i = 0; i < myForm.children.length; i++) {
        const formElem = myForm.children[i];
        if (formElem.name && formElem.type  !=='submit'){
           person[formElem.name]=formElem.value;
        }
    }
    if (!person.id){
        person.id=new Date().getTime();}

    console.log("person");
    console.log(person);
    saveUserPerson(person);
}
editFormPerson()
function saveUserPerson(user){
    if (localStorage.hasOwnProperty(arrUser)){
       const userNameArr=JSON.parse( localStorage.getItem(arrUser));
       const saveFindUser=userNameArr.find(value => value.id=== user.id);
       if (saveFindUser){
          const filterUserSave=userNameArr.filter(value=> value.id !==user.id);
          filterUserSave.push(user);
          localStorage.setItem(arrUser,JSON.stringify(filterUserSave))
    }else {
        userNameArr.push(user)
        localStorage.setItem(arrUser, JSON.stringify(userNameArr));
    }
    }else {
        localStorage.setItem(arrUser,JSON.stringify([user]))
    }
}

function editFormPerson(){
    if (localStorage.hasOwnProperty(arrUser)){
      const editUser= JSON.parse(localStorage.getItem(arrUser));
        for (const user of editUser) {
           createPerson.appendChild(cardPerson(user))
        }
    }
}

function cardPerson(user){
   const generate=document.createElement('div');
   let trew=true;
    for (const key in user) {
        if (trew){
            const h3=document.createElement('h3');
            h3.innerText=key + ' : ' + user[key];
            generate.appendChild(h3);
            trew=false;
        }else {
            const p=document.createElement('p');
            p.innerText=key + ' : ' + user[key];
            generate.appendChild(p);
        }
    }
    generate.style.cssText = "width:250px; background: #d4f4ff; color: blue; border: 1px solid black";

    const but1=document.createElement('button');
    const but2=document.createElement('button');
    but1.innerText="Edit";
    but2.innerText="Del";
    but1.onclick=ev=>{
        editCreatePerson(user.id);
    }
    but2.onclick=ev=>{
        delcreateUser(user.id);
    }
    generate.appendChild(but1);
    generate.appendChild(but2);
   return generate;
}

function delcreateUser(id){
    const userParse=JSON.parse(localStorage.getItem(arrUser));
   const userfilt=userParse.filter(user=>user.id !==id);
   localStorage.setItem(arrUser,JSON.stringify(userfilt));
location.reload();
}
function editCreatePerson(id){
    const userParse=JSON.parse(localStorage.getItem(arrUser));
    const user=userParse.find(user=> user.id === id);
    for (let i = 0; i < myForm.children.length; i++) {
        const formElem = myForm.children[i];
        if (formElem.name && formElem.type  !=='submit'){
            for (const key in user) {
                if (formElem.name === key){
                    formElem.value=user[key];
                }
            }
        }
    }
    formUser=user;
}