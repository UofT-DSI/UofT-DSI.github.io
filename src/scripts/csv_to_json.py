import csv
import json
import os

def csv_to_json(csv_file_path, json_file_path, photos_folder, encoding='utf-8'):
    if not os.path.isfile(csv_file_path):
        raise FileNotFoundError(f"The CSV file {csv_file_path} does not exist.")
    
    if not os.path.exists(photos_folder):
        raise FileNotFoundError(f"The photos folder {photos_folder} does not exist.")

    data = []
    photo_extensions = {'.png', '.jpeg', '.jpg'}
    
    with open(csv_file_path, encoding=encoding) as csv_file:
        reader = csv.DictReader(csv_file)
        
        for row in reader:
            name = '_'.join(row['name'].split()).lower()
            photo_filename = next(
                (f"{name}{ext}" for ext in photo_extensions if os.path.exists(os.path.join(photos_folder, f"{name}{ext}"))),
                ""
            )
            
            if photo_filename:
                row['photo'] = os.path.join('images/participant_photos', photo_filename)
            else:
                row['photo'] = ""
            
            if row['linkedin'] and not row['linkedin'].startswith('https://'):
                row['linkedin'] = 'https://' + row['linkedin']
            
            if row['github'] and not row['github'].startswith('https://'):
                row['github'] = 'https://' + row['github']
            
            data.append(row)
    
    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    csv_file_path = '../../public/data/participant_directory.csv'
    json_file_path = '../data/participants.json'
    photos_folder = '../../public/images/participant_photos'
    csv_to_json(csv_file_path, json_file_path, photos_folder, encoding='utf-8')