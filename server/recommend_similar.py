import numpy as np
import pandas as pd
import json

all_songs = pd.read_csv('new_all_songs.csv')

vectors = []
for i in range(all_songs.shape[0]):
    vectors = vectors + [json.loads(all_songs.tags[i])]

# print(vectors[0])

def Repeat(x):
    _size = len(x)
    repeated = []
    for i in range(_size):
        k = i + 1
        for j in range(k, _size):
            if x[i] == x[j] and x[i] not in repeated:
                repeated.append(x[i])
    return repeated
Repeat(vectors)

from sklearn.metrics.pairwise import cosine_similarity
similarity = cosine_similarity(vectors)

def recommend(id):
    recommended_songs = []
    distances = similarity[id - 1]
    song_list = sorted(list(enumerate(distances)), reverse = True, key = lambda x: x[1])[1:6]
    for i in song_list:
        recommended_songs.append({
            'song_id': int(all_songs.iloc[i[0]]['song_id']),
            'name': all_songs.iloc[i[0]]['name'],
            'album': all_songs.iloc[i[0]]['album'],
            'artist': all_songs.iloc[i[0]]['artist'],
            'image': all_songs.iloc[i[0]]['image'],
            'mood': all_songs.iloc[i[0]]['mood']
            })
    return recommended_songs
