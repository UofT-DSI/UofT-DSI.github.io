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
    
    # Get the list of participant photos
    participant_photos = set()
    for participant in participants:
        # print(os.path.basename(participant["photo"]))
        photo = participant.get('photo', '')
        if photo:
            participant_photos.add(os.path.basename(photo))

    # Get the list of all photos in the photos folder
    # List all entries in the photos folder
    all_entries = os.listdir(photos_folder)

    # Initialize an empty list to store photo files
    photo_files = []

    # Iterate over each entry
    for entry in all_entries:
        # Create the full path to the entry
        full_path = os.path.join(photos_folder, entry)
        
        # Check if the entry is a file (and not a directory)
        if os.path.isfile(full_path):
            # print(os.path.isfile(full_path))
            # If it's a file, add it to the photo_files list
            photo_files.append(entry)

    # Create the extra_photos_folder if it doesn't exist
    if not os.path.exists(extra_photos_folder):
        os.makedirs(extra_photos_folder)

    # print(photo_files)
    participant_photos_lower = {p.lower() for p in participant_photos}

    # Move extra photos to the extra_photos_folder
    for photo in photo_files:
        # Normalize the case by converting both to lowercase
        photo_lower = photo.lower()  
        if photo_lower not in participant_photos_lower:
            shutil.move(os.path.join(photos_folder, photo), os.path.join(extra_photos_folder, photo))
            print(f"Moved extra photo {photo} to {extra_photos_folder}")

    print("Photo validation and moving completed.")

if __name__ == "__main__":
    json_file_path = '../data/participants.json'
    photos_folder = '../../public/images/participant_photos'
    extra_photos_folder = '../../public/images/extra_photos'
    validate_and_move_photos(json_file_path, photos_folder, extra_photos_folder)