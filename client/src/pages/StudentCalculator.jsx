import { Calculator } from "../components/Calculator";
import { useFunctions } from "../hooks/useFunctions";

export function StudentCalculator({ courseId }) {
  const [functions, setFunctions] = useFunctions(courseId);

  return (
    <div className="container">
      <h2>Welcome, Student!</h2>
      <Calculator functions={ functions } />
    </div>
  );
}