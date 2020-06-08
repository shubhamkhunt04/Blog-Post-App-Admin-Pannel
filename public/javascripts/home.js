let url = "http://localhost:3000/authors?page=1&limit=10";
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
        let totalUser = json.totalPages * json.results.length

        let totalUserStr = String(totalUser)
        document.getElementById('totalUser').innerHTML = totalUserStr;
    })


let URLS = "http://localhost:3000/posts?page=1&limit=10";
let PARAMS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}
fetch(URLS, PARAMS)
    .then((res) => {
        return res.json();
    })
    .then((json) => {
        let totalPost = json.totalPages * json.results.length

        let totalPostStr = String(totalPost)
        document.getElementById('totalPost').innerHTML = totalPostStr;
    })