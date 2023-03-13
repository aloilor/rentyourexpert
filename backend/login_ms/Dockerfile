FROM python:3.10-alpine
WORKDIR /login_ms
COPY requirements.txt /login_ms
RUN pip3 install -r requirements.txt
copy login_ms.py /login_ms


ENV FLASK_APP login_ms.py
ENV FLASK_ENV development
ENV FLASK_RUN_PORT 5001
ENV FLASK_RUN_HOST 0.0.0.0

EXPOSE 5001


CMD ["flask", "run"]