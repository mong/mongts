import requests
import bs4
import json
import urllib

with urllib.request.urlopen("http://localhost:4000/info/url") as url: 
  data = json.load(url)

for unit in data: 
  unit_name = unit["short_name"]
  unit_url = unit["url"]

  request = requests.get(unit_url)
  soup = bs4.BeautifulSoup(request.content, "lxml")

  image_div = soup.find("div", {"class": "start-page__banner-image"}).find("picture").find("img").get("src")

  image_url = unit_url + image_div

  image_data = requests.get(image_url).content

  with open("apps/skde/public/img/forsidebilder/" + unit_name + ".jpg", 'wb') as handler:
      handler.write(image_data)