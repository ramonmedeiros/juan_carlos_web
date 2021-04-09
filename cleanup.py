import pandas
df = pandas.read_csv("title.basics.tsv", sep='\t')
df = df.drop(columns=['isAdult','startYear', 'endYear', 'runtimeMinutes', 'genres'])
df = df.query('titleType == "movie"')
df = df.drop(columns=['titleType', 'primaryTitle'])
df.to_csv("movies.csv")
