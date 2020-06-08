// If the database containes large number of recordes then the ploating chart operations takes time so here setting the alert for the admin(wait 1 min).

document.getElementById('alert').innerHTML = alert;



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
    alert("Please Enter Starting Date And Ending Date For Ploating Chart")
  } else {

    // Appending both date and the Resultant date(finalDate) and passing an API URL as parameter.
    let finalDate = startDate.toLocaleDateString() + "and" + endDate.toLocaleDateString();

    finalDate = finalDate.split('/').join('-');


    // call the Post API
    let url = `http://localhost:3000/posts/${finalDate}`;
    let params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    let time = [];
    let numLikes = [];
    let numComments = [];

    fetch(url, params)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        json.forEach(element => {
          numLikes.push(element.numLikes);
          numComments.push(element.numComments);
          let date = new Date(element.datePublished).toLocaleDateString('en-GB');
          time.push(date);
        });
        drawChartTimeVSLikesDynamically(time, numLikes);
        drawChartTimeVSCommentsDynamically(time, numComments);
      })
  }
})


function drawChartTimeVSLikesDynamically(xAxis, yAxis) {

  let ctx = document.getElementById("timeVslikesDynamic").getContext("2d");
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


function drawChartTimeVSCommentsDynamically(xAxis, yAxis) {

  let ctx = document.getElementById("timeVscommentsDynamic").getContext("2d");
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