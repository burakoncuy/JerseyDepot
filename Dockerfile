# FROM python:3.9.18-alpine3.18

# RUN apk add build-base

# RUN apk add postgresql-dev gcc python3-dev musl-dev

# ARG FLASK_APP
# ARG FLASK_ENV
# ARG DATABASE_URL
# ARG SCHEMA
# ARG SECRET_KEY

# WORKDIR /var/www

# COPY requirements.txt .

# RUN pip install -r requirements.txt
# RUN pip install psycopg2

# COPY . .

# RUN flask db upgrade
# RUN flask seed all
# CMD gunicorn app:app

FROM python:3.9.18-alpine3.18

# Install dependencies
RUN apk add build-base
RUN apk add postgresql-dev gcc python3-dev musl-dev

WORKDIR /var/www

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV SECRET_KEY=${SECRET_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV SCHEMA=${SCHEMA}

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

# Do NOT run migrations at build time
CMD flask db upgrade && flask seed all && gunicorn app:app
