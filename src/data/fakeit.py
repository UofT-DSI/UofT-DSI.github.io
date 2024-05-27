import json
import random
import itertools

skills_pool = ["Data Science", "Machine Learning Software Foundations"]

first_names = ["John", "Jane", "Alex", "Emily", "Chris", "Katie", "Michael", "Sarah", "David", "Laura"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Hernandez"]

# Generate permutations of first and last names
name_combinations = list(itertools.product(first_names, last_names))
random.shuffle(name_combinations)

def generate_students(num_students):
    students = []
    for i in range(1, num_students + 1):
        first_name, last_name = name_combinations[i % len(name_combinations)]
        email = f"{first_name}{last_name}@example.com".lower()
        linkedin_link = f"https://www.linkedin.com/in/{first_name.lower()}{last_name.lower()}"
        student = {
            "id": str(i),
            "name": f"{first_name} {last_name}",
            "email": email,
            "skills": random.choice(skills_pool),
            "image_url": "http://previewcf.turbosquid.com/Preview/2016/02/15__00_57_29/LegoMan3dmodel02.jpg2c46f164-e496-4ca8-8081-be0a435578e6Original.jpg",
            "description": "A data scientist excels in analyzing and interpreting complex digital data, such as the usage statistics of a website, especially in order to assist a business in its decision-making. With expertise in both statistical analysis and machine learning, they manage the entire data pipeline from data collection and cleaning, to applying analytical techniques and presenting insights. They leverage powerful tools and algorithms to uncover hidden patterns, predict trends, and boost business solutions. Passionate about turning raw data into actionable strategies, they play a pivotal role in driving business success in the digital era.",
            "contribution": "https://joshuatz.com/media/github_contributions_graph_example.png",
            "links": [
                {
                    "title": "LinkedIn",
                    "url": linkedin_link
                },
                {
                    "title": "Portfolio",
                    "url": f"https://www.{first_name}{last_name.lower()}portfolio.com"
                }
            ]
        }
        students.append(student)
    return students

# Generating 100 fake students
students_list = generate_students(100)

# Writing the students list to a JSON file
with open('students.json', 'w') as f:
    json.dump(students_list, f, indent=4)

print("Generated 100 fake students in 'students.json'")
