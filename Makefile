
create-movies-json:
	curl -O https://datasets.imdbws.com/title.basics.tsv.gz
	gunzip title.basics.tsv.gz
	pip install pandas
	python cleanup.py
	mv movies.json public/
