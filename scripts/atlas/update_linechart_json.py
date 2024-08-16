#!/usr/bin/env python3

import json
from pprint import pprint
from collections import defaultdict
import sys

def change_linechart(item, data, ds_info):
  if item["type"] != "linechart":
    return item

  dataset = next(filter(
    lambda d: d["type"] == "data" and d["label"] == item["data"],
    data["innhold"]
  ))

  value_id = item.pop("y")
  linevar_getter = item.pop("label")

  linevars = []
  for dataitem in dataset["data"]:
    if not dataitem[linevar_getter] in linevars:
      linevars.append(dataitem[linevar_getter])

  translations = {
    "Kvinner": "Women",
    "Menn": "Men",
    "Snitt 2018-2019": "Average 2018-2019",
    "Pandemi: 2020": "Pandemic: 2020",
    "Snitt 2021-2022": "Average 2021-2022"
  }
  ds_info[item["data"]] = (value_id, linevars, item["x"][0], linevar_getter)

  linevarsLabels = { "nb": linevars, "en": list(map(lambda v: translations.get(v, v), linevars)) }
  return item | {"linevars": linevars, "linevarsLabels": linevarsLabels}

def change_data(item, data, ds_info):
  if item["type"] != "data" or item["label"] not in ds_info.keys():
    return item

  value_id, linevars, x_var, linevar_getter = ds_info[item["label"]]

  x_var_data = defaultdict(dict)
  for entry in item["data"]:
    x_var_data[entry[x_var]][entry[linevar_getter]] = entry[value_id]

  item["data"] = [{ x_var: k} | v for k, v in x_var_data.items()]

  return item

def update_file(jsonfile):
  with open(jsonfile) as f:
    data = json.load(f)

  ds_info = {}

  return json.dumps(
    { "innhold": list(map(lambda entry: change_data(change_linechart(entry, data, ds_info), data, ds_info),
                          data["innhold"])) },
    indent=2, ensure_ascii=False
  )



for file in sys.argv[1:]:
  #update_file('../../apps/skde/public/helseatlas/data/radiologi/mr_caput_rb1.json')
  new = update_file(file)
  with open(f"{file}", "w") as f:
    f.write(new)
