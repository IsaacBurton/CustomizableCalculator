import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useFetch } from './useFetch';

export function useCourse(courseId) {
  const [course, setCourse] = useState("");
  const navigate = useNavigate();
  const makeRequest = useFetch();

  async function fetchCourse() {
      const response = await makeRequest(`/courses/${courseId}`, 'GET');

      if (response.ok) {
          const {course} = await response.json();
          setCourse(course);
      } else {
          navigate('/');
      }
  }

  useEffect(() => {
      fetchCourse();
  }, [courseId]);

  return course;
}