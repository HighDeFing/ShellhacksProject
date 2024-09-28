import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-dvh w-screen items-center justify-center border-2 align-middle">
      <div>
        <p className="text-9xl font-bold text-red-500">test</p>
      </div>
    </div>
  );
}

export default App;
