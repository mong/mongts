import requests
import bs4

url = "https://www.helse-forde.no"

request = requests.get(url)
soup = bs4.BeautifulSoup(request.content, "lxml")

image_div = soup.find("div", {"class": "start-page__banner-image"}).find("picture").find("img").get("src")

image_url = url + image_div

image_data = requests.get(image_url).content

with open('apps/skde/public/img/forsidebilder/test.jpg', 'wb') as handler:
    handler.write(image_data)