import json
import random

skills_pool = [
    "JavaScript", "React", "Node.js", "Python", "Data Science",
    "Machine Learning", "Java", "Spring Boot", "MySQL", "HTML", "CSS",
    "PHP", "Laravel", "Angular", "Vue.js", "TypeScript", "Ruby", "Rails",
    "C#", ".NET", "Flutter", "Swift", "Kotlin", "C++", "C"
]

def generate_students(num_students):
    students = []
    for i in range(1, num_students + 1):
        student = {
            "id": str(i),
            "name": f"Student {i}",
            "email": f"student{i}@example.com",
            "skills": random.sample(skills_pool, k=random.randint(2, 5)),
            "image_url": "http://previewcf.turbosquid.com/Preview/2016/02/15__00_57_29/LegoMan3dmodel02.jpg2c46f164-e496-4ca8-8081-be0a435578e6Original.jpg"
        }
        students.append(student)
    return students

# Generating 100 fake students
students_list = generate_students(100)

# Writing the students list to a JSON file
with open('students.json', 'w') as f:
    json.dump(students_list, f, indent=4)

print("Generated 100 fake students in 'students.json'")