import os
import json
import shutil

def validate_and_move_photos(json_file_path, photos_folder, extra_photos_folder):
    """
    Validate the number of photos against the participants listed in the JSON file and move extra photos to a separate folder.

    Args:
        json_file_path (str): Path to the JSON file containing participant data.
        photos_folder (str): Path to the folder containing participant photos.
        extra_photos_folder (str): Path to the folder where extra photos will be moved.

    Raises:
        FileNotFoundError: If the JSON file does not exist.
        FileNotFoundError: If the photos folder does not exist.
    """
    # Check if JSON file exists
    if not os.path.isfile(json_file_path):
        raise FileNotFoundError(f"The JSON file {json_file_path} does not exist.")
    
    # Check if photos folder exists
    if not os.path.exists(photos_folder):
        raise FileNotFoundError(f"The photos folder {photos_folder} does not exist.")

    # Read the JSON file
    with open(json_file_path, 'r', encoding='utf-8') as f:
        participants = json.load(f)
    
    # Get the number of participants
    num_participants = len(participants)
    print(f"Number of participants in JSON: {num_participants}")

    # Get the list of photos
    photo_files = [f for f in os.listdir(photos_folder) if os.path.isfile(os.path.join(photos_folder, f))]
    num_photos = len(photo_files)
    print(f"Number of photos in folder: {num_photos}")

    # Create the extra_photos_folder if it doesn't exist
    if not os.path.exists(extra_photos_folder):
        os.makedirs(extra_photos_folder)

    # Check for extra photos
    participant_photos = {p['photo'].split('/')[-1] for p in participants if 'photo' in p}
    extra_photos = [photo for photo in photo_files if photo not in participant_photos]

    if extra_photos:
        print(f"Moving extra photos to {extra_photos_folder}: {extra_photos}")
        for photo in extra_photos:
            shutil.move(os.path.join(photos_folder, photo), os.path.join(extra_photos_folder, photo))
    else:
        print("No extra photos found.")

if __name__ == "__main__":
    json_file_path = '../data/students.json'
    photos_folder = '../../public/images/participant_photos'
    extra_photos_folder = '../../public/images/extra_photos'
    validate_and_move_photos(json_file_path, photos_folder, extra_photos_folder)