from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    BETTER_AUTH_SECRET: str
    GEMINI_API_KEY: str
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Todo App Phase 2"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
