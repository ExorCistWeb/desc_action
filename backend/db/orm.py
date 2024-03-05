from sqlalchemy import insert
from models import Base
from database import sync_engine, session_factory
from models import ReviewsOrm, ChatOrm


class SyncOrm(object):
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not isinstance(cls._instance, cls):
            cls._instance = object.__new__(cls, *args, **kwargs)
        return cls._instance

    @staticmethod
    def create_tables():
        Base.metadata.drop_all(sync_engine)
        Base.metadata.create_all(sync_engine)

    @staticmethod
    def insert_data():
        reviews = ReviewsOrm(
            user_name='Voskan',
            user_email='79999999999',
            user_reviews='good',
            user_star_rating=3
        )
        chat = ChatOrm(
            user_name='Voskan',
            user_email='79999999999',
            message='Как купить у вас услугу'
        )
        with session_factory() as session:
            session.add_all([reviews, chat])
            session.commit()
