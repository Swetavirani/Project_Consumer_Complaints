<h1 align="center"> Consumer Complaints </h1>

## Description

In this project data is analyzed about consumer complaints received by the Consumer Financial Protection Bureau. There are visualizations made for the  following:

- The proportion of response types
- The  trend of the consumer complaints received by month
- A count of the complaints by product
- The top 10 companies that received the most complaints

The data was found from the Consumer Data Protection Bureau and a csv file was downloaded from the website that was then cleaned and uploaded to a sql database then used to create an API for the specific data needed.


## Installation

What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running:
   - Download csv from link below in Features section and place in Resources folder
   - Download , clear the output and run etl_and_databse_creation.ipynb
   - Download the rest of the files app.py, app.js, and index.html
   - Run app.py so routes are live, check a route to make sure its loading.
   - View index.html in browser to view Dashboard

## Process
   First a csv with the data is cleaned using pandas and numpy on the etl.ipynb file, then the a new clean csv file is created that features only the relevent data needed. Then SQL Alchemy is used to load clean csv file data into a PostgreSQL database table.  Then in the app.py file flask is used to create an api with multiple routes that will then be used to query the data needed for each chart.
   <img width="482" alt="image" src="https://user-images.githubusercontent.com/118862894/233406114-d5fe8cab-cd1f-462d-b074-724254426038.png">
   
   
In the HTML file the layout for the page is created as well as the ids that will hold the charts that visualize the data, D3.js, Plotly, and Chart.js are used as well. Finally in the app.js file the charts are created by calling on the api created from the app.py file and using functions to create the charts and display the data based on what product the user selects.

<img width="958" alt="image" src="https://user-images.githubusercontent.com/118862894/233416495-ea8058af-ed0c-486c-abbd-f22fb2114a68.png">


## Features & Links to data

Drop Down that filters the graphs by products.

Link to CSV file:
https://drive.google.com/file/d/1qzsQb8-X30WOynfYO04x5GI1AJvHbp8u/view?usp=share_link

https://www.consumerfinance.gov/data-research/consumer-complaints/search/?chartType=line&dateInterval=Month&dateRange=3y&date_received_max=2023-04-11&date_received_min=2020-04-11&lens=Overview&searchField=all&tab=Trends
