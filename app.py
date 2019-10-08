from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from bson.json_util import dumps

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/project_weather"
mongo = PyMongo(app)

@app.route("/")
def home():
    # Ani's advance version
    # data = {
    #     "weather_current": mongo.db.city_weather_current.find(),
    #     "weather_forecast": mongo.db.weather_forecast.find()
    # }
    # return render_template("index.html", data = data)

    # original version
    weather_current = mongo.db.city_weather_current.find()
    weather_forecast = mongo.db.city_weather_forecast.find()
    return render_template("index.html", current = weather_current,forecast = weather_forecast)

@app.route("/uv")
def uvpage():
    uv_forecast = mongo.db.city_weather_uv.find()
    return render_template("uv.html", uv = uv_forecast)

@app.route("/current")
def currentpage():
    weather_current = mongo.db.city_weather_current.find()
    return render_template("current.html", current = weather_current)

@app.route("/forecast")
def forecastpage():
    weather_forecast = mongo.db.city_weather_forecast.find()
    return render_template("forecast.html", forecast = weather_forecast)

@app.route("/_current_data.json")
def weathercurrent():
    weather_current_json = mongo.db.city_weather_current.find()
    return dumps(weather_current_json)

@app.route("/_uv_forecast.json")
def uvforecast():
    uv_forecast_json = mongo.db.city_weather_uv.find()
    return dumps(uv_forecast_json)

@app.route("/_forecast_data.json")
def weatherforecast():
    weather_forecast_json = mongo.db.city_weather_forecast.find()
    return dumps(weather_forecast_json)


if __name__ == "__main__":
    app.run(debug=True)