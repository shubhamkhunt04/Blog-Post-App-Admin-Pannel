startDate = document.getElementById('startDate').addEventListener('change', (e) => {

    window.startDateValue = e.target.value; // Storing target date into global variable
})
endDate = document.getElementById('endDate').addEventListener('change', (e) => {
    window.endDateValue = e.target.value;
})

document.getElementById('filter').addEventListener('click', (e) => {

    let startDate = new Date(String(window.startDateValue));
    let endDate = new Date(String(window.endDateValue));

    if (String(startDate) == "Invalid Date" || String(endDate) == "Invalid Date") {
        alert("Please Enter Starting Date And Ending Date")
    } else {

        // Appending both date and the Resultant date(finalDate) and passing an API URL as parameter.
        let finalDate = startDate.toLocaleDateString() + "and" + endDate.toLocaleDateString();

        finalDate = finalDate.split('/').join('-');


        // call the Post API
        let url = `http://localhost:3000/posts/${finalDate}`;
        document.getElementById('postsdata').innerHTML = "";
        let params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(url, params)
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

                let html = html1 + html2 + html3
                document.getElementById('paginationNumber').innerHTML = ""; // Remove Pagination UI
                document.getElementById('postsdata').innerHTML = html;
            })
            .catch((err) => console.log("Error occure ", err));
    }

})