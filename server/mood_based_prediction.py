import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn import preprocessing

df = pd.read_csv('data_moods.csv')

# lets make a year column from release date
df['release_year'] = df['release_date'].apply(lambda x : x.split('-')[0])
df['age'] = df['release_year'].apply(lambda x : 2023 - int(x))

# Preprocessing the data
le = preprocessing.LabelEncoder()
df['mood_num'] = le.fit_transform(df.mood) 
le.fit_transform(df.mood) 

# Creating a new df with only specific required columns
new_df = df[['name', 'album', 'artist', 'popularity','age', 'loudness', 'length', 'danceability', 'instrumentalness', 'energy', 'valence', 'acousticness', 'mood']]
new_df.head()

new_df[:1]
new_df[['popularity','age', 'loudness', 'length', 'danceability', 'instrumentalness', 'energy', 'valence', 'acousticness']][:1].values.tolist()[0]
new_df['tags'] = new_df.apply(lambda x : x[['popularity','age', 'loudness', 'length', 'danceability', 'instrumentalness', 'energy', 'valence', 'acousticness']].values.tolist(), axis = 1)

new_df = new_df[['name','album','artist','mood','tags']]


happy = new_df[new_df['mood'] == 'Happy'].reset_index().drop(['index'], axis=1)
sad = new_df[new_df['mood'] == 'Happy'].reset_index().drop(['index'], axis=1)
disgust = new_df[new_df['mood'] == 'Sad'].reset_index().drop(['index'], axis=1)
fear = new_df[new_df['mood'] == 'Calm'].reset_index().drop(['index'], axis=1)
angry = new_df[new_df['mood'] == 'Calm'].reset_index().drop(['index'], axis=1)
surprise = new_df[new_df['mood'] == 'Energetic'].reset_index().drop(['index'], axis=1)
neutral = new_df[new_df['mood'] == 'Energetic'].reset_index().drop(['index'], axis=1)


happy['id'] = happy.index + 1
sad['id'] = sad.index + 1
disgust['id'] = disgust.index + 1
fear['id'] = fear.index + 1
angry['id'] = angry.index + 1
surprise['id'] = surprise.index + 1
neutral['id'] = neutral.index + 1