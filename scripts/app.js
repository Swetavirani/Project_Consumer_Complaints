function graph4(product){
    const api_url = "http://127.0.0.1:5001/api/v1.0/productpie.json/"+ product ;
    d3.json(api_url).then(function(data) {
        let product = Object.keys(data)
        let counts = Object.values(data)
        let barColors = [ "#b91d47", "#00aba9", "#2b5797", "#7z8877"]


        new Chart("graph4", {
            type: "pie",
            data: {
              labels: product,
              datasets: [{
                backgroundColor: barColors,
                data: counts
              }]
            },
            options: {
              title: {
                display: true,
                text: "Response to Consumer",
                fontSize: 30
                
              },
              
              
            }
        });
    });

  

}

function graph1(product){
  const api_url = "http://127.0.0.1:5001/api/v1.0/productdata.json";
  d3.json(api_url).then(function(data) {
      let product = Object.keys(data)
      let counts = Object.values(data)
      let barColors = [ "#b91d47", "#00aba9", "#2b5797","#b01d77", "#09bba7", "#7z8877", "#b01d88", "#10eba3", "#7b5707"]


      new Chart("graph1", {
          type: "horizontalBar",
          data: {
            labels: product,
            datasets: [{
              backgroundColor: barColors,
              data: counts
            }]
          },
          options: {
            responsive: true,
            indexAxis: 'y',
            legend: {
              display: false
              },
            title: {
              display: true,
              text: "Number of Complaints by each Products Type",
              fontSize: 30
            },
            scales: {
              yAxes:[{
                ticks:{
                  autoSkip: false,
                  maxRotation: 0,
                  minRotation: 0
                }
              }]
            },
            
            maintainAspectRatio: false

          }
      });
  });

}

function graph2(product){
  const api_url = "http://127.0.0.1:5001/api/v1.0/barchart/" + product;


  d3.json(api_url).then(function(data) {
      const month_1 = data.map(data => {
          return(data.month);
      })
      const year_1 = data.map(data => {
          return(data.year);
      })

      const ct = data.map(data => {
          return(data.count);
      })

      console.log(data);
      console.log(month_1);
      console.log(year_1);
      console.log(ct)

      //Assigning variables to the different elements for use later
      s_month = month_1;
      m_year = year_1;
      s_count = ct;


      let trace1 = {
          //x: s_month,
          x: ["Apr","May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec", "Jan","Feb","Mar",],
          y: s_count,
          name: "Consumer Complaints By Month",
          type: "bar",
          orientation: "V"
      };
      
      // Data array
      // `data` has already been defined, so we must choose a new name here:
      let traceData = [trace1];
      
      // Apply a title to the layout
      let layout = {
          title: "Consumer Complaint Trend",
          font: {size :20},
          height: 500,
      };
      
      
      
      Plotly.newPlot("graph2", traceData, layout);

  });
}

function graph3(product){
  const api_url = "http://127.0.0.1:5001/api/v1.0/top10Company/"+ product ;
  d3.json(api_url).then(function(data) {
    let companies = new Array();
    let counts = new Array(); 
    let array = Object.values(data)
    for(let i = 0 ; i < data.length ; i++){
      companies.push(data[i]["company"])
      counts.push(data[i]["count"])
    }

      let barColors = [ "#b91d47", "#00aba9", "#2b5797", "#7z8877"]
      
      const chartData = {
        labels: companies,
        datasets: [
        {
            label: "Top 10 Companies",
            data: counts,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
        }
       ]
      };

      const chartOptions = {
        responsive: true,
        legend: {
        display: false
        },
        title: {
          display: true,
          text: "Top 10 Companies",
          fontSize: 30
          
        },
        maintainAspectRatio: false,
        scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
         }
        ]

       }
      };
      new Chart("graph3", {
          type: "horizontalBar",
          data: chartData,
          options: chartOptions
      });
  });

}

function leftBox(product){
  const api_url = "http://127.0.0.1:5001/api/v1.0/leftbox.json/"+ product;
  d3.json(api_url).then(function(data) {
    let left_box = d3.select("#product_count").html("");
    left_box.append("h4").text(Object.values(data)).classed("text-center", true);

  });
}

function rightBox(product){
  const api_url = "http://127.0.0.1:5001/api/v1.0/rightbox.json/"+ product;
  d3.json(api_url).then(function(data) {
    let right_box = d3.select("#unq_companies").html("");
    right_box.append("h4").text(Object.values(data)).classed("text-center", true);

  });
}

function resetCanvas(){
  document.getElementById("graph3").remove();     
  let canvas3 = document.createElement('canvas');     
  canvas3.setAttribute('id','graph3');     
  canvas3.setAttribute("style","height : 450px");         
  document.querySelector('#graph3_div').appendChild(canvas3);
  document.getElementById("graph4").remove();
       
  let canvas4 = document.createElement('canvas');     
  canvas4.setAttribute('id','graph4');       
  document.querySelector('#graph4_div').appendChild(canvas4);
  
};



function init(){

  const drop_down_url = "http://127.0.0.1:5001/api/v1.0/productList";
  
  d3.json(drop_down_url).then(function(data) {

    let dropdown = d3.select("#selDataset");
    for(let i = 0 ; i < data.length ; i++){
      dropdown.append("option").text(Object.values(data[i]))
    }
    const default_value = Object.values(data[0]) ;
    graph1(default_value);
    graph2(default_value);
    graph3(default_value);
    graph4(default_value);
    leftBox(default_value);
    rightBox(default_value);
  });
}

function optionChanged(product) {
  resetCanvas();
  graph1(product);
  graph2(product);
  graph3(product);
  graph4(product);
  leftBox(product);
  rightBox(product);


}

init();