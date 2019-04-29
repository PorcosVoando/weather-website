const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',function(e){
    e.preventDefault()
    messageone.textContent = 'Loading...'
    messagetwo.textContent = '...'
    const location = search.value
    var url =  '/weather?address=' + location
    fetch(url).then(function(response){
    response.json().then(function(data){
        if(data.error){
            messageone.textContent = data.error
        } else {
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast
        }
    })
})
})