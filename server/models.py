import uuid
from typing import Optional
from pydantic import BaseModel, Field


class Song(BaseModel):
    _id: str = Field(...)
    name: str = Field(...)
    artist: str = Field(...)
    album: str = Field(...)
    mood: str = Field(...)
    song_id: str = Field(...)
    image: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "name": "Power",
                "artist": "Hardwell, KSHMR",
                "album": "...",
                "mood": "Happy",
                "song_id": 3,
                "image": "image-link"
            }
        }


class SongUpdate(BaseModel):
    _id: Optional[str]
    name: Optional[str]
    artist: Optional[str]
    album: Optional[str]
    mood: Optional[str]
    songId: Optional[int]

    class Config:
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "name": "Power",
                "artist": "Hardwell, KSHMR",
                "album": "Power",
                "mood": "Happy",
                "image": "image-link"
            }
        }



class User(BaseModel):
    _id: str = Field(...)
    username: str = Field(...)
    liked_songs: list = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "username": "Prajwal Jaiswal",
                "liked_songs": [1,2,3],
            }
        }


class UserUpdate(BaseModel):
    _id: Optional[str]
    username: Optional[str]
    liked_songs: Optional[int]

    class Config:
        schema_extra = {
            "example": {
                "username": "Prajwal Jaiswal",
                "liked_songs": [1,2,3],
            }
        }
