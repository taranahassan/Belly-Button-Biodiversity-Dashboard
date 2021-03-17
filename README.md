# Plotly charts on dashboard deployment

# Overview of project:

The purpose of this project is creating a dashboard to showcase test results from samples taken from volunteers. <br>
Charts were created using the analysis done on the bacteria found in belly buttons, then showcased on the dashboard to provide access to each individual (test subject) to pull and view their results.  Each test subject is identified by an ID no. that is linked to the bacteria sample.  Each ID no. also stores an array of information; their ethnicity, age, gender, location and frequency per week of washing the belly button. <br>

Using plotly on javascript, 3 charts were made using the analysis results:   


  - **Bar chart** shows the top 10 bacteria cultures found for the selected ID no., starting with hightest count for a specific bacteria.

  - **Bubble chart** shows the types of bacteria per sample.  Each bubble shows the measure of the relative bacteria.

  - **Gauge chart** displays the frequency of wash done per week by each test subject.

The results can be populated for each test subject by selecting their specific ID no. from the drop down menu.  All 3 charts will generate the results based on ID no. selected.

Final step of this project was customizing the html display for better visualization.  
