from sqlalchemy import insert
from models import Base
from database import sync_engine, session_factory
from models import ReviewsOrm, ChatOrm


def create_tables():
    Base.metadata.drop_all(sync_engine)
    Base.metadata.create_all(sync_engine)


def insert_data():
    reviews = ReviewsOrm(
        user_name='Voskan',
        user_phone_number='79999999999',
        user_reviews='good',
        user_star_rating=4
    )
    chat = ChatOrm(
        user_name='Voskan',
        user_phone_number='79999999999',
        message='Как купить у вас услугу'
    )
    with session_factory() as session:
        session.add_all([reviews, chat])
        session.commit()
