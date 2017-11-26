Test Problem
	
   We need to develop a kind of a web crawler which collects some information from the Alexa
web analytics service (www.alexa.com). Alexa provides statistics information about web sites
around the world arranged in a form of global ranking, rankings by country or by category and
so on. The crawler needs to be implemented in the form of the command line tool.
The information which needs to be collected is global rank values for top sites in a particular
Country.

   The crawler has to accept a country code (two letters ISO country code, ISO31661
alpha 2) as a parameter, retrieve Global Rank of Top 50 sites for the specified country, and
save this report to the HTML file in a form of the table with four columns: country rank, site URL,
global rank, link to Alexa’s page with site stats.

How to start? 

1) Make sure NodeJS is installed
2) Download this repo
3) Open NodeJS command prompt or cmd (on Windows) 
4) $ cd AlexaTest
5) $ npm install
6) $ node main
