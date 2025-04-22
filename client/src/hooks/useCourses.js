import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const makeRequest = useFetch();
  async function fetchCourses() {
    const response = await makeRequest("/courses/");
    if (response.ok) {
      const {courses} = await response.json();
      setCourses(courses);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, [])

  return courses;
}