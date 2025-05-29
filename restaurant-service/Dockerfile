
# Uradna Python slika
FROM python:3.11-slim

# Nastavi delovno mapo
WORKDIR /app

# Kopiraj vse v kontejner
COPY . .

# Namesti odvisnosti
RUN pip install --upgrade pip && pip install -r requirements.txt

# Nastavi okoljske spremenljivke
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=.

# Zaženi strežnik
CMD ["python", "app/server.py"]
