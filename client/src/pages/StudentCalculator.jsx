import { Calculator } from "../components/Calculator";
import { useFunctions } from "../hooks/useFunctions";

export function StudentCalculator({ courseId }) {
  const [functions, setFunctions] = useFunctions(courseId);

  return (
    <div>
      <h2>Welcome, Student!</h2>
      <p>This is your Calculator page.</p>
      <Calculator functions={ functions } />
    </div>
  );
}