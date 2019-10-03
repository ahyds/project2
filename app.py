from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo


# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/project_weather"
mongo = PyMongo(app)

@app.route("/")
def home():
    weather_current = mongo.db.city_weather_current.find()
    # for item in weather_current:
    # #if bool(item['name']):
    #     try:
    #         print(item['name'])
    #     except:
    #         pass
    return render_template("index.html", current = weather_current)

# Find all records of data from the mongo database
# weather_current = mongo.db.city_weather_current.find()

# for item in weather_current:
#     #if bool(item['name']):
#     try:
#         print(item['name'])
#     except:
#         pass

if __name__ == "__main__":
    app.run(debug=True)