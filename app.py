from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo


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
    uv_current = mongo.db.city_weather_uv.find()
    
    return render_template("index.html", current = weather_current, forecast = weather_forecast,uv = uv_current)



if __name__ == "__main__":
    app.run(debug=True)