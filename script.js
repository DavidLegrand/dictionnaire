var endpoint = "http://localhost:3000/dictionnaire"

var resultList = document.getElementById('result')

document.getElementById('search').addEventListener('keyup', function (event) {
  if (event.target.value.trim()) {
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var results = JSON.parse(xhr.response)
        resultList.innerHTML = ""
        results.forEach(function (result) {
          var li = document.createElement("li")
          li.textContent = result
          resultList.appendChild(li)
        })
      }
    }

    var data = "?q=" + event.target.value

    xhr.open('GET', endpoint + data)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send()

  }

})