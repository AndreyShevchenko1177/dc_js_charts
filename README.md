Write React application, visualizing retail data from the attached csv file with two interconnected charts.

Data in attached csv file contains time series of retail data, per week of year, for products in different categories.

Application should consist of a common navigation bar and two pages. Both pages should be React components, each wrapping one of the two connected DC.js charts. Navigation bar should display two connected controls:

1. Drop down control, allowing to select one of the parameters (markdown, revenues or margin) to be summed up and displayed on both charts.
2. "Reset all" button or link, which resets all selection and filters on both charts.

First page should contain a pie chart, every pie displaying a sum of the selected parameter (one of: markdown, revenues, margin) per category, in a selected date range.

Second page should contain a time series line chart, displaying the value of a sum of the selected parameter of all selected categories along the y axis, and time along the x axis. "Brush" selection should allow selection of a date range on the second chart, which will recalculate and redraw automatically first chart. In a same way, selection of specific categories by clicking on pie chart, will recalculate second chart to sum up only selected categories.

Besides charts, both pages should display filters as text labels, to simplify testing.
Filters should display a list of selected categories, or All, if all categories are selected (default value) and a current date range, if brush is applied to the time series chart .

Try using some React UI framework for layout/navigation bar/ UI controls.

Make sure source code is properly indented and documented; build and run scripts are provided, ts, less/sass sources are minified; readme.md containig build/run instructions are provided in the root of the source directory.


