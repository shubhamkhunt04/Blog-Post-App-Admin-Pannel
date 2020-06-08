// getPostList function for Diplaying Firstpage Data
const getUserList = (URL, PARAMS) => {

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
            paginatinHandlerForUserList(json)
        })
        .catch((err) => console.log("Error occure ", err));
}

// paginatinHandler Function For Displaying Pagination Dynamically  
const paginatinHandlerForUserList = (jsondata) => {
    let countPaginationNumber = jsondata.totalPages;
    let html = "";
    if (countPaginationNumber == undefined) {
        countPaginationNumber = 1; // For Displaying atleast 1 button of pagination
    }
    for (let i = 0; i < countPaginationNumber; i++) {
        html += `         
        <li class="page-item"><button id="${i+1}" onClick=pageContentFinderForUserList(this.id)>${i+1}</button></li>
        `
    }
    document.getElementById('paginationNumber').innerHTML = html;
}

// pageContentFinder For Finding TargetPage Content
pageContentFinderForUserList = (targetPage) => {

    let targetPages = parseInt(targetPage);

    fetch(url, params)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            document.getElementById('userdata').innerHTML = "";

            let paginationURL = `http://localhost:3000/authors?page=${targetPages}&limit=200`;
            let paginationParams = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            getUserList(paginationURL, paginationParams);
        })
}



let url = "http://localhost:3000/authors?page=1&limit=200";
document.getElementById('userdata').innerHTML = "";
let params = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}
// By Default Display First Page Data
getUserList(url, params);
