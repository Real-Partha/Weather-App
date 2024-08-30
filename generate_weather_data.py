import csv
import random
from datetime import datetime, timedelta

def generate_weather_data(num_entries=10000):
    cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']
    start_date = datetime(2020, 1, 1)
    
    with open('weather_data.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Date', 'City', 'Temperature', 'Precipitation', 'Wind Speed', 'Humidity'])
        
        for _ in range(num_entries):
            date = start_date + timedelta(days=random.randint(0, 365*4))
            city = random.choice(cities)
            temperature = round(random.uniform(-10, 40), 1)
            precipitation = round(random.uniform(0, 100), 1)
            wind_speed = round(random.uniform(0, 30), 1)
            humidity = round(random.uniform(0, 100), 1)
            
            writer.writerow([date.strftime('%Y-%m-%d'), city, temperature, precipitation, wind_speed, humidity])

if __name__ == '__main__':
    generate_weather_data()
