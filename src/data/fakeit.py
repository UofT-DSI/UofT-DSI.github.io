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

    daniel_razavi = {
        "id": str(1),
        "name": "Daniel Razavi",
        "email": "daniel.razavi@utoronto.ca",
        "skills": "Data Science and Machine Learning Software Foundations",
        "image_url": "/dans_photo.jpg",
        "description": "Daniel Razavi is currently working as a Senior Software Developer at UofT-DSI, where he leads a team of developers in creating innovative solutions for data science initiatives. In this role, he has been instrumental in designing and implementing scalable software systems that enhance data processing and analysis capabilities. Previously, Daniel worked as a Software Development Engineer at Amazon, where he contributed to the development of highly scalable e-commerce systems and services. During his time at Amazon, he was recognized for his ability to optimize performance and streamline operations, resulting in significant improvements in system efficiency. Daniel holds a degree in Computer Science and is passionate about leveraging technology to solve complex problems. In his free time, he enjoys mentoring junior developers and contributing to open-source projects.",
        "contribution": "https://joshuatz.com/media/github_contributions_graph_example.png",
        "links": [
            {
                "title": "LinkedIn",
                "url": "https://www.linkedin.com/in/danielrazavi"
            },
            {
                "title": "Portfolio",
                "url": "https://www.danielrazavi.com"
            }
        ]
    }
    students.append(daniel_razavi)

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
