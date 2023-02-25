#!/usr/bin/env python3
bing = "https://www.bing.com/images/search?q="

from bs4 import BeautifulSoup
from requests_html import HTMLSession
import json
import base64


missing_img = "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"

def get_parsed_page(url):
    s = HTMLSession()
    response = s.get(url)
    response.html.render()

    return BeautifulSoup(response.html.html, 'html5lib')

def get_image(image):
    images = get_parsed_page(bing + image)

    image = images.find("img", {"class": "mimg"})

    image_link = image["src"]

    if len(image_link) < 500:
        print(image_link)
        return image_link
    else:
        return missing_image

with open("recipes.json", "r") as infile:
    data = json.load(infile)

    for recipe in data['recipes']:
        print(recipe["name"])
        #image_link = get_image(recipe["name"])
        image_link = missing_img
        try:
            image_link = get_image(recipe["name"])
        except:
            pass
        recipe["image_link"] = image_link

    with open("recipes2.json", "w") as outfile:
        outfile.write(json.dumps(data, indent=4))
