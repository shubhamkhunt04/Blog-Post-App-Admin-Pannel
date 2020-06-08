// getPostList function for Diplaying Firstpage Data
const getPostList = (URL, PARAMS) => {

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
            let html = html1 + html2 + html3
            document.getElementById('postsdata').innerHTML = html;


            //Displaying Pagination
            paginatinHandler(json)
        })
        .catch((err) => console.log("Error occure ", err));
}

// paginatinHandler Function For Displaying Pagination Dynamically  
const paginatinHandler = (jsondata) => {
    let countPaginationNumber = jsondata.totalPages;
    let html = "";
    if (countPaginationNumber == undefined) {
        countPaginationNumber = 1;
    }
    for (let i = 0; i < countPaginationNumber; i++) {
        html += `         
        <li class="page-item"><button id="${i+1}" onClick=pageContentFinder(this.id)>${i+1}</button></li>
        `
    }
    document.getElementById('paginationNumber').innerHTML = html;
}

// pageContentFinder For Finding TargetPage Content
pageContentFinder = (targetPage) => {

    let targetPages = parseInt(targetPage);

    fetch(url, params)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            document.getElementById('postsdata').innerHTML = "";


            let paginationURL = `http://localhost:3000/posts?page=${targetPages}&limit=400`;
            let paginationParams = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            getPostList(paginationURL, paginationParams);
        })
}


let url = `http://localhost:3000/posts?page=1&limit=400`;
document.getElementById('postsdata').innerHTML = "";
let params = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}
// By Default Display First Page Data
getPostList(url, params);