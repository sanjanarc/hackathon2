

import json;
import random;


f = open('database.json')

data = json.load(f);


for recipe in data["recipes"]:
    recipe["likes"] = int(random.random() * 100)


with open("database2.json", "w") as outfile:
    json.dump(data, outfile, indent=4)