"""
Главный файл всей системы, именно здесь
происходит запуск backend части
"""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.chat.chat import chat_router
from backend.db.orm import SyncOrm
from backend.auth.auth_jwt import auth_router
from backend.admin.router import admin_router
from pathlib import Path
import logging

app = FastAPI()
app.include_router(chat_router)
app.include_router(auth_router)
app.include_router(admin_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).parent.parent
logger = logging.getLogger('system')


@app.on_event('startup')
async def server_start():
    logging.basicConfig(filename=BASE_DIR / 'logs.log', level=logging.INFO)
    logger.info('starter')
    sync_orm = SyncOrm()
    # sync_orm.drop_tables()
    sync_orm.create_tables()


if __name__ == '__main__':
    uvicorn.run(app, port=8000)
