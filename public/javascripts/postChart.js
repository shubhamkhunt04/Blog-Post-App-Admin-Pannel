// If the database containes large number of recordes then the ploating chart operations takes time so here setting the alert for the admin admin(wait 1 min).

let alert = `
<div class="alert alert-danger" role="alert">
  Please wait for 1 min
</div>
`
document.getElementById('alert').innerHTML = alert;


// API call

let url = "http://localhost:3000/posts";
let params = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

let time = [];
let numLikes = [];
let numComments = [];
fetch(url, params)
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    json.results.forEach(element => {
      numLikes.push(element.numLikes);
      numComments.push(element.numComments);
      let date = new Date(element.datePublished).toLocaleDateString('en-GB');
      time.push(date);
    });
    drawChartTimeVSLikes(time, numLikes);
    drawChartTimeVSComments(time, numComments);
    document.getElementById('alert').innerHTML = "";
  });

function drawChartTimeVSLikes(xAxis, yAxis) {

  let ctx = document.getElementById("timeVslikes").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: xAxis,
      datasets: [{
        label: "Time vs Number Of Likes",
        data: yAxis,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      }, ],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }, ],
      },
    },
  });
}


function drawChartTimeVSComments(xAxis, yAxis) {

  let ctx = document.getElementById("timeVscomments").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: xAxis,
      datasets: [{
        label: "Time vs Number Of Comments",
        data: yAxis,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      }, ],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }, ],
      },
    },
  });
}