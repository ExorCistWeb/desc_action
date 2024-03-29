"""
Модуль содержит функционал роутера для чата
"""
from fastapi import APIRouter
from backend.db.orm import SyncOrm
from backend.chat.models import ReviewModel


sync_orm = SyncOrm()

# Индивидуальный роутер для чата
chat_router = APIRouter(
    prefix='/chat',
    tags=['Chat']
)


@chat_router.post('/add_review')
async def add_review(review: ReviewModel) -> dict:
    """
    Функция принимает отзыв пользователя и записывает его в БД
    """

    sync_orm.insert_user_review_to_db(**review.dict())
    return {
        'data': None,
        'status': 'ok'
    }
