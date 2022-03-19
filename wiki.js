let searchInput = elem("#searchInput");
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        displaySearchResults(searchInput.value);
      });
      function displaySearchResults(x) {
        let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${x}`;

        fetch(url)
          .then(function (response) {
                  let load=new Loader();
                  load.start();
                  load.addText("Peculiar wikipedia loading","0.5em");
                  load.animateText();
                  load.remove(3000);
            return response.json();
          })
          .then(function (data) {
               
            let resultsArray = data.query.search;
            console.log(resultsArray);
            resultsOnPage(resultsArray);
          })
          .catch(function () {
            console.log("An error occurred");
          });
      }

      function resultsOnPage(myArray) {
        resultsList.innerHTML = " ";
        resultsList.insertAdjacentHTML(
          "beforeend",
          `<h2>Search Results for ${searchInput.value} </h2>`
        );myArray.forEach(function (item) {
          let itemTitle = item.title;
          let itemSnippet = item.snippet;
          let itemUrl = encodeURI(
            `https://en.wikipedia.org/wiki/${item.title}`
          );

          resultsList.insertAdjacentHTML(
            "beforeend",
            `<div class="resultItem">
<a href="${itemUrl}" target="_blank"><h3 class="resultTitle">
${itemTitle}
</h3></a>
<p class="resultSnippet"><a href="${itemUrl}">
${itemSnippet}</a></p>

</div>`
          );
        });
        let resultTitle = document.querySelector(".resultTitle");
        for (i = 0; i < resultTittle.length; i++) {
          resultTitle[i].addEventListener("click", () => {
            var httpRequest = new XMLHttpRequest();

            httpRequest.onreadystatechange = writeContent;

            function sendGetRequest() {
              httpRequest.open(
                "GET",
                `https://en.m.wikipedia.org/wiki/${itemTitle}`
              );
              httpRequest.send();
            }
            function writeContent() {
              if (httpRequest.readyState === 4) {
                if (httpRequest.status == 200) {
                  var response = httpRequest.responseText;
                  elem("#result").innerHTML += response;
                  elem("#result").style.display = "flex";
                  alert("clicked");
                } else {
                  alert("There was a problem with the request.");
                }
              } else {
               
              alert(null);
              }
            }
          });
        }
        }