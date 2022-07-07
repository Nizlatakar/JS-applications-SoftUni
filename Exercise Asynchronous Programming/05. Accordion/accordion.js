async function solution() {
   try{
let url = 'http://localhost:3030/jsonstore/advanced/articles/list';
let response = await fetch(url);

if(!response.ok){
   throw new Error('Error obtaining article list')
}
let data = await response.json()
 
data.forEach(articleInfo => {
   let articleElement = document.createElement('div')
   articleElement.classList.add('accordion')
   articleElement.innerHTML=
   `
   <div class="head">
   <span>${articleInfo.title}</span>
   <button class="button" id="${articleInfo._id}" onclick="moreOnClick(event)">More</button>
   </div>
   `
   let main= document.getElementById('main')
   main.appendChild(articleElement)
});
   }catch(error){

   }
}
async function moreOnClick(e){

}
solution()