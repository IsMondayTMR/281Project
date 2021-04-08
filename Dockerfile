FROM python:3

WORKDIR /usr/src/app

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend .

ENV PYTHONPATH "${PYTHONPATH}:/usr/src/app"

CMD [ "python", "./backend/run.py" ]