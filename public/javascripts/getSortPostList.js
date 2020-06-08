getSortPostList = (URL, PARAMS) => {
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
                 <th scope="col">Title</th>
                 <th scope="col">Description</th>
                 <th scope="col">AuthorId</th>
                 <th scope="col">DatePublished</th>
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
            if (window.sortingOption === "comments" || window.sortingOption === "likes") {
                json.results.forEach(element => {

                    let date = new Date(element.datePublished);

                    html2 += `
                    <tr>
                    <th scope="row">${inedex}</th>
                    <td>${element.title}</td>
                    <td class="text-justify">${element.description}</td>
                    <td>${element.authorId}</td>
                    <td>${date}</td>
                    <td>${element.numComments}</td>
                    <td>${element.numLikes}</td>
                     </tr>`
                    inedex++;
                });
            } else {
                json.forEach(element => {
                    let date = new Date(element.datePublished);

                    html2 += `
                    <tr>
                    <th scope="row">${inedex}</th>
                    <td>${element.title}</td>
                    <td class="text-justify">${element.description}</td>
                    <td>${element.authorId}</td>
                    <td>${date}</td>
                    <td>${element.numComments}</td>
                    <td>${element.numLikes}</td>
                     </tr>`
                    inedex++;
                });
            }


            let html = html1 + html2 + html3
            document.getElementById('postsdata').innerHTML = html;

            //Displaying Pagination
            paginatinHandlerForSortPost(json)
        })
        .catch((err) => console.log("Error occure ", err));
}

// paginatinHandler Function For Displaying Pagination Dynamically  
const paginatinHandlerForSortPost = (jsondata) => {
    let countPaginationNumber = jsondata.totalPages;
    let html = ""
    if (countPaginationNumber == undefined) {
        countPaginationNumber = 1;
    }
    for (let i = 0; i < countPaginationNumber; i++) {
        html += `         
        <li class="page-item"><button id="${i+1}" onClick=pageContentFinderForSortPost(this.id)>${i+1}</button></li>
        `
    }
    document.getElementById('paginationNumber').innerHTML = html;
}
// pageContentFinder For Finding TargetPage Content
pageContentFinderForSortPost = (targetPage) => {

    let targetPages = parseInt(targetPage);

    let paginationURL = `http://localhost:3000/posts/${window.sortingOption}?page=${targetPages}&limit=400`;
    let paginationParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    getSortPostList(paginationURL, paginationParams);
}



// This API Call Occure when User select the sorting options
document.getElementById('inlineFormCustomSelect').addEventListener('change', (e) => {

    window.sortingOption = e.target.value;
    e.preventDefault();

    // If user Select Choose... then show all data without performing any sorting operations
    if (window.sortingOption === "Choose...") {
        window.sortingOption = "";
    }

    if (window.sortingOption == "last12hrs" || window.sortingOption == "lastday" || window.sortingOption == "last3days" || window.sortingOption == "lastweek" || window.sortingOption == "lastmonth") {
        document.getElementById('paginationNumber').innerHTML = ""; // Removing Pagination UI
    }

    // All Previous Content on page is cleared 
    document.getElementById('postsdata').innerHTML = "";

    let url = `http://localhost:3000/posts/${window.sortingOption}?page=1&limit=400`;
    document.getElementById('postsdata').innerHTML = "";

    let params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    getSortPostList(url, params)
})