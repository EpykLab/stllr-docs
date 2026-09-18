FROM python:3.13-alpine AS builder

WORKDIR /app

COPY requirements.lock ./
RUN pip install --no-cache-dir --requirement requirements.lock

COPY mkdocs.yml ./
COPY scripts/post_build.py ./scripts/post_build.py
COPY site_docs ./site_docs
RUN mkdocs build --strict

FROM nginx:1.29-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/site /usr/share/nginx/html

EXPOSE 8080
