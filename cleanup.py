import pandas
import json

df = pandas.read_csv("title.basics.tsv", sep='\t')
df = df.drop(columns=['isAdult','startYear', 'endYear', 'runtimeMinutes', 'genres'])
df = df.query('titleType == "movie"')
df = df.drop(columns=['titleType', 'primaryTitle'])

content = json.loads(df.to_json(index=False, orient="table"))["data"]

with open("movies.json", "w") as fd:
    fd.write(json.dumps(content, indent=4))

