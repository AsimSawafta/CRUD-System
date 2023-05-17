var courseName = document.getElementById('courseName')
var courseCetegory = document.getElementById('courseCetegory')
var coursePrice = document.getElementById('coursePrice')
var courseDescriptions = document.getElementById('courseDescriptions')
var courseCapacity = document.getElementById('courseCapacity')
var addBtn = document.getElementById('click')
var search = document.getElementById('search')
var data = document.getElementById('data')
var update=document.getElementById('update')
update.style.display='none'
var clear=document.getElementById('clear')


var courses 
if(JSON.parse(localStorage.getItem('courses')===null))
{
  courses =[];
}
else
{
  courses = JSON.parse(localStorage.getItem('courses'))
}
displayData()
checkInput()

addBtn.onclick = function (e) {
  e.preventDefault()
  addCourse()
  resetInput()
  displayData();
  isNameValid=false
  isPriceValid=false
  isCapacityValid=false
  isDesValid=false
  isCateValid=false
  checkInput();
  a();
  
 
}
clear.onclick=function(e){
  e.preventDefault()
  
  resetInput();
  // update.style.display='none'
  // addBtn.style.display='inline-block'
  isNameValid=false
  isPriceValid=false
  isCapacityValid=false
  isDesValid=false
  isCateValid=false
  checkInput();
 
  a();
  v();
}

function addCourse() {
  var course = {
    courseName: courseName.value,
    courseCetegory: courseCetegory.value,
    coursePrice: coursePrice.value,
    courseDescriptions: courseDescriptions.value,
    courseCapacity: courseCapacity.value,
  }
  courses.push(course);
  localStorage.setItem('courses',JSON.stringify(courses))
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'course added successfuly',
    showConfirmButton: false,
    timer: 1100
  })
}
function resetInput() {
  courseName.value = ''
  courseCetegory.value = ''
  coursePrice.value = ''
  courseDescriptions.value = ''
  courseCapacity.value = ''

}


function displayData() {
  var result = ``
  for (var i = 0; i < courses.length; i++) {
    result += `
    <tr>
    <td>${i + 1}</td>
    <td>${courses[i].courseName}</td>
    <td>${courses[i].courseCetegory}</td>
    <td>${courses[i].coursePrice}</td>
    <td>${courses[i].courseDescriptions}</td>
    <td>${courses[i].courseCapacity}</td>
    <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
    <td><button class="btn btn-danger" id="delete${i}" onclick="deleteCourses(${i})">delete</button></td>
    </tr>`
  }
  data.innerHTML = result
}

function ameenaAlhbla(){
  for (let i = 0; i < courses; i++) {
    console.log(document.getElementById(`deleteCourseBtn${i}`))
    
  }
  
}
ameenaAlhbla();



document.getElementById('deleteBtn').onclick = function () {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      courses = []
      data.innerHTML = ''
      localStorage.setItem('courses',JSON.stringify(courses))
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })


}

function deleteCourses(index) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(index, 1);
      localStorage.setItem('courses',JSON.stringify(courses))
 
      displayData();
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

}


search.onkeyup = function () {
  var result = ``
  for (var i = 0; i < courses.length; i++) {
    if (courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())) {
      result += `
        <tr>
        <td>${i + 1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCetegory}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDescriptions}</td>
        <td>${courses[i].courseCapacity}</td>
        <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
        <td><button class="btn btn-danger "   onclick="deleteCourses(${i})">delete</button></td>
        </tr>`
    }
    data.innerHTML = result
  }
}

var deleteCourseBtn=document.getElementById('.deleteCourseBtn')
console.log(deleteCourseBtn);
var currentIndex=0;
function getCourse(index) {
  
  isNameValid=true;
  isPriceValid=true;
  isCapacityValid=true;
  isDesValid=true;
  isCateValid=true;
  checkInput();
  var course = courses[index]
currentIndex=index;
  courseName.value = course.courseName;
  courseCetegory.value = course.courseCetegory;
  coursePrice.value = course.coursePrice;
  courseDescriptions.value = course.courseDescriptions;
  courseCapacity.value = course.courseCapacity;
  update.style.display='inline'
  addBtn.style.display='none'
  document.getElementById('deleteBtn').setAttribute('disabled', 'disabled')
  console.log(document.getElementById(`delete${index}`));
  for (let i = 0; index < courses.length; i++) {
    document.getElementById(`delete${i}`).setAttribute('disabled', 'disabled')
  }
 
    
// document.getElementById(`delete${index}`).setAttribute('disabled', 'disabled')
}
update.onclick=function(e){
  e.preventDefault();
  updateCourse()
  displayData()
  resetInput()
  isNameValid=true
  isPriceValid=true
  isCapacityValid=true
  isDesValid=true
  isCateValid=true
  document.getElementById('deleteBtn').removeAttribute('disabled')
  update.removeAttribute('disabled')
  checkInput()
  a()
  update.style.display='none'
  addBtn.style.display='inline'

}
function updateCourse(){
  

  var course = {
    courseName: courseName.value,
    courseCetegory: courseCetegory.value,
    coursePrice: coursePrice.value,
    courseDescriptions: courseDescriptions.value,
    courseCapacity: courseCapacity.value,
  }
  courses[currentIndex].courseName=courseName.value;
  courses[currentIndex].courseCetegory=courseCetegory.value;
  courses[currentIndex].coursePrice=coursePrice.value;
  courses[currentIndex].courseDescriptions=courseDescriptions.value;
  courses[currentIndex].courseCapacity=courseCapacity.value;
  localStorage.setItem('courses',JSON.stringify(courses))

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'course updated successfuly',
    showConfirmButton: false,
    timer: 900
  })
  
  
}

/*

validation
*/
var isNameValid=false
var isCateValid=false
var isPriceValid=false
var isDesValid=false
var isCapacityValid=false
/*
name:
start with capetal
3-10
no number
regex /^[A-Z][a-z]{2-10}$ / 


*/
function checkInput(){
  if(isNameValid && isCateValid &&isPriceValid &&isDesValid&& isCapacityValid)
  {
    addBtn.removeAttribute('disabled')
    update.removeAttribute('disabled')
  }
  else{
    addBtn.setAttribute('disabled','disabled')
    update.setAttribute('disabled','disabled')
  }
}

document.getElementById('nameAlert').style.display ='none'
courseName.onkeyup=function(){
  var pattern=/^[A-Z]{1}([\s]|[a-z]){1,18}[a-z\s]$/;
  if(pattern.test(courseName.value))
  {
    isNameValid=true
    if(courseName.classList.contains('is-invalid')){
      courseName.classList.replace('is-invalid','is-valid')
    }
    document.getElementById('nameAlert').style.display='none'
    courseName.classList.add('is-valid')
  }
  else{
    isNameValid=false
    if(courseName.classList.contains('is-valid')){
      courseName.classList.replace('is-valid','is-invalid')
     
    }
    document.getElementById('nameAlert').style.display='block'
    courseName.classList.add('is-invalid')
  }
  checkInput();
}



function a(){
  addBtn.setAttribute('disabled','disabled')
 courseName.classList.remove('is-valid')
 courseCapacity.classList.remove('is-valid')
 coursePrice.classList.remove('is-valid')
 courseDescriptions.classList.remove('is-valid')
 courseCetegory.classList.remove('is-valid')
 
 
}
function v(){
  coursePrice.classList.remove('is-invalid')
  courseName.classList.remove('is-invalid')
  courseCetegory.classList.remove('is-invalid')
  courseDescriptions.classList.remove('is-invalid')
 courseCapacity.classList.remove('is-invalid')

  document.getElementById('priceAlert').style.display='none'
  document.getElementById('nameAlert').style.display='none'
  document.getElementById('catAlert').style.display='none'
  document.getElementById('descAlert').innerHTML=''
}


/*

start with capetal
3-10
no number
regex /^[A-Z][a-z]{2-10}$ / 


*/
document.getElementById('catAlert').style.display='none'
courseCetegory.onkeyup=function(){
  var pattern=/^[A-Z]{1}([\s]|[a-z]){1,18}[a-z\s]$/;
  if(pattern.test(courseCetegory.value))
  {
    isCateValid=true
    if(courseCetegory.classList.contains('is-invalid')){
      courseCetegory.classList.replace('is-invalid','is-valid')
    }
    document.getElementById('catAlert').style.display='none'
    courseCetegory.classList.add('is-valid')
  }
  else{
    isCateValid=false
    if(courseCetegory.classList.contains('is-valid')){
      courseCetegory.classList.replace('is-valid','is-invalid')
    }
   
    courseCetegory.classList.add('is-invalid')
    document.getElementById('catAlert').style.display='block'
  }
  checkInput();
}




/*

start capital
3-120
numbers
regex /^[A-Z][A-Za-z0-9\s]{2,120}$/


*/
courseDescriptions.onkeyup=function(){
  var pattern=/^[A-Z][A-Za-z0-9\s]{2,120}$/
  if(pattern.test(courseDescriptions.value))
  {
    isDesValid=true
    if(courseDescriptions.classList.contains('is-invalid')){
      courseDescriptions.classList.replace('is-invalid','is-valid')
    }
    
    courseDescriptions.classList.add('is-valid')
    document.getElementById('descAlert').innerHTML=''
    
  }
  else{
    isDesValid=false
    if(courseDescriptions.classList.contains('is-valid')){
      courseDescriptions.classList.replace('is-valid','is-invalid')
    }
    courseDescriptions.classList.add('is-invalid')
    document.getElementById('descAlert').innerHTML='*Please start with capital and Descriptions must between 3-120 chars'
  }
  checkInput();
}



document.getElementById('priceAlert').style.display='none'

coursePrice.onkeyup=function(){
  //var pattern=/^[0-9]{2,3}$/
  if(coursePrice.value>=100 &&coursePrice.value<1000)//pattern.test(coursePrice.value)
  {
    isPriceValid=true
    if(coursePrice.classList.contains('is-invalid')){
      coursePrice.classList.replace('is-invalid','is-valid')
    }
    document.getElementById('priceAlert').style.display='none'
    coursePrice.classList.add('is-valid')
  }
  else{
    isPriceValid=false
    if(coursePrice.classList.contains('is-valid')){
      coursePrice.classList.replace('is-valid','is-invalid')
    }
    document.getElementById('priceAlert').style.display='block'
    coursePrice.classList.add('is-invalid')
  }
  checkInput();
}

/*


3-4
number



*/
courseCapacity.onkeyup=function(){
  var pattern=/^[0-9]{2,3}$/
  if(courseCapacity.value>=70 &&courseCapacity.value<=100)
  {
    isCapacityValid=true
    if(courseCapacity.classList.contains('is-invalid')){
      courseCapacity.classList.replace('is-invalid','is-valid')
    }
    
    courseCapacity.classList.add('is-valid')
    document.getElementById('capacityAlert').innerHTML=''
  }
  else{
    isCapacityValid=false
    if(courseCapacity.classList.contains('is-valid')){
      courseCapacity.classList.replace('is-valid','is-invalid')
    }
   
    courseCapacity.classList.add('is-invalid')
    document.getElementById('capacityAlert').innerHTML='*70-100'
  }
  checkInput();
}