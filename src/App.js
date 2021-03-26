import Calendar from "./components/Calendar";
import { useState } from "react";

function App() {
  const [availability, setAvailability] = useState([]);
  return (
    <div className='App'>
      <Calendar availability={availability} setAvailability={setAvailability} />
    </div>
  );
}

export default App;
