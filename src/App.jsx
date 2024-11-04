import AvatarGenerator from "./AvatarGenerator";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="avatar-preview-container">
        <h1 className="avatar-title">Avatar Preview</h1>
        <AvatarGenerator value=""  width={400} bgColor="#10b981" isRounded="true" onlyFace="true" border="true" borderSize={5} />
      </div>
    </div>
  );
}

export default App;
