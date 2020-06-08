getSortUserList = (URL, PARAMS) => {
    fetch(URL, PARAMS)
        .then((res) => {
            return res.json();
        })
        .then((json) => {

            let inedex = 1;
            let html1 = `<!-- table start -->
        <div class="container my-4 table-responsive text-center">
         <table class="table table-striped">
             <thead>
             <tr>
             <th scope="col">Index</th>
             <th scope="col">FirstName</th>
             <th scope="col">LastName</th>
             <th scope="col">Phone</th>
             <th scope="col">Number Of Posts</th>
             <th scope="col">Number Of Comments</th>
             <th scope="col">Number Of Likes</th>
           </tr>
             </thead>
             <tbody>
        `;
            let html2 = `` // dynamic content
            let html3 = `  </tbody>
        </table>
    </div>
    <!-- table end -->`;

            json.results.forEach(element => {

                html2 += `
            <tr>
                <th scope="row">${inedex}</th>
                <td>${element.firstName}</td>
                <td>${element.lastName}</td>
                <td>${element.phone}</td>
                <td>${element.numPosts}</td>
                <td>${element.numComments}</td>
                <td>${element.numLikes}</td>
             </tr>`
                inedex++;
            });


            let html = html1 + html2 + html3
            document.getElementById('userdata').innerHTML = html;

            //Displaying Pagination
            paginatinHandlerForSortUser(json)
        })
        .catch((err) => console.log("Error occure ", err));
}

// paginatinHandler Function For Displaying Pagination Dynamically  
const paginatinHandlerForSortUser = (jsondata) => {
    let countPaginationNumber = jsondata.totalPages;
    let html = ""
    if (countPaginationNumber == undefined) {
        countPaginationNumber = 1;
    }
    for (let i = 0; i < countPaginationNumber; i++) {
        html += `         
        <li class="page-item"><button id="${i+1}" onClick=pageContentFinderForSortUser(this.id)>${i+1}</button></li>
        `
    }
    document.getElementById('paginationNumber').innerHTML = html;
}

// pageContentFinder For Finding TargetPage Content
pageContentFinderForSortUser = (targetPage) => {

    let targetPages = parseInt(targetPage);

    let paginationURL = `http://localhost:3000/authors/${window.sortingOption}?page=${targetPages}&limit=200`;
    let paginationParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    getSortUserList(paginationURL, paginationParams);
}



// This API Call Occure when User select the sorting options
document.getElementById('inlineFormCustomSelect').addEventListener('change', (e) => {
    console.log("Options changed")
    window.sortingOption = e.target.value;
    e.preventDefault();

    // If user Select Choose... then show all data without performing any sorting operations
    if (window.sortingOption === "Choose...") {
        window.sortingOption = "";
    }
    // All Previous Content on page is cleared 
    document.getElementById('userdata').innerHTML = "";

    console.log(window.sortingOption);

    let url = `http://localhost:3000/authors/${window.sortingOption}?page=1&limit=200`;
    document.getElementById('userdata').innerHTML = "";

    let params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(url);
    getSortUserList(url, params)
})
