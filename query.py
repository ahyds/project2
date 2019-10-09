from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import json
import os
import requests
from config import api_key
import time
#import pandas as pd
#from pprint import pprint
#api_key="55ef2f571a72890aed28dcf59e6ec29a"

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection and drop the collections if exist
app.config["MONGO_URI"] = "mongodb://localhost:27017/project_weather"
mongo = PyMongo(app)
mongo.db.city_weather_current.drop()
mongo.db.city_weather_forecast.drop()
mongo.db.city_weather_uv.drop()

# use json to read a json file to get city name and country code that has population larger than 100,000
with open("current.city.list.json",encoding="utf8") as jsonfile:
    json_data = json.load(jsonfile)
    #print(f"The first response is {json.dumps(json_data[0], indent=2)}.")

# sort the data by population in descending order
sorted_data = sorted(json_data, key = lambda i: i['stat']['population'],reverse=True)

cities = []
countrycodes = []
populations = []
number_of_cities = 600 


for i in range(number_of_cities):
    try:
        cities.append(sorted_data[i]['name'])
        countrycodes.append(sorted_data[i]['country'])
        populations.append(sorted_data[i]['stat']['population'])
    except:
        pass


url = "http://api.openweathermap.org/data/2.5/"
units = "metric"
cityfound = 0
citynotfound = 0

for x in range(600):
    
    city = cities[x]
    countrycode = countrycodes[x]

    try: 
        # query current weather data and upload to mongodb
        query_url = f"{url}weather?appid={api_key}&q={city},{countrycode}&units={units}"
        response = requests.get(query_url).json()
        time.sleep(1)
        print(response['name'])
        mongo.db.city_weather_current.insert_one(response)
    
        # get the lontitude and lattitude of this city
        lon = response['coord']['lon']
        lat = response['coord']['lat']
        print(lon,lat)

        # query forecast weather data and upload to mongodb
        query_url = f"{url}forecast?appid={api_key}&q={city},{countrycode}&units={units}"
        response = requests.get(query_url).json()
        time.sleep(1)
        mongo.db.city_weather_forecast.insert_one(response)
        
        # query current UV data and upload to mongodb
        query_url = f"{url}uvi?appid={api_key}&units={units}&lat={lat}&lon={lon}"
        response = requests.get(query_url).json()
        response['name'] = city
        time.sleep(1)
        mongo.db.city_weather_uv.insert_one(response)
        cityfound += 1
        print(f"{cityfound} cities data have been found")
        

    except:
        citynotfound += 1
        print(f"{citynotfound} cities data CANNOT be found")
        pass

print(f"there are totally {cityfound} cities data have been found, and {citynotfound} cities data CANNOT be found")


