import React from 'react';
import StudentCard from '../components/student_card/student_card';
import students from '../data/students.json';
import styles from './home_styles.module.css'; // Make sure to import the styles correctly

const Home: React.FC = () => {
    return (
        <div className={styles.student_grid}>
            {students.map(student => (
                <StudentCard key={student.id} student={student} />
            ))}
        </div>
    );
};

export default Home;