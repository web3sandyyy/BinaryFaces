import "./App.css";
import { useState } from "react";
import SHA256 from "crypto-js/sha256";
import glassesOptions from "./constants/glasses";
import maleBodyOptions from "./constants/body/maleBody";
import femaleBodyOptions from "./constants/body/femaleBody";
import unisexBodyOptions from "./constants/body/unisexBody";
import maleHeadOptions from "./constants/head/maleHead";
import femaleHeadOptions from "./constants/head/femaleHead";
import unisexHeadOptions from "./constants/head/unisexHead";
import normalFaceOptions from "./constants/faceExpression/normalFace";
import noGlassFaceOptions from "./constants/faceExpression/noGlasssesFace";
import facialHairOptions from "./constants/facialHair";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [avatar, setAvatar] = useState(null);

  const getDeterministicValue = (hashSlice, options) => {
    const index = parseInt(hashSlice, 16) % options.length;
    return options[index];
  };

  const getGenderFromBody = (bodyAsset) => {
    if (femaleBodyOptions.includes(bodyAsset)) return "female";
    if (maleBodyOptions.includes(bodyAsset)) return "male";
    return "unisex";
  };

  const generateAvatar = () => {
    const hash = SHA256(inputValue).toString();

    const bodyAllOptions = [
      ...femaleBodyOptions,
      ...maleBodyOptions,
      ...unisexBodyOptions,
    ];
    const body = getDeterministicValue(hash.slice(0, 4), bodyAllOptions);
    const gender = getGenderFromBody(body);

    let headOptions;
    if (gender === "female") {
      headOptions = [...femaleHeadOptions, ...unisexHeadOptions];
    } else {
      headOptions = [...maleHeadOptions, ...unisexHeadOptions];
    }
    const head = getDeterministicValue(hash.slice(4, 8), headOptions);

    const face = getDeterministicValue(hash.slice(8, 12), [
      ...noGlassFaceOptions,
      ...normalFaceOptions,
    ]);

    let glasses = "none";
    if (normalFaceOptions.includes(face)) {
      glasses = getDeterministicValue(hash.slice(12, 16), glassesOptions);
    }

    let facialHair = null;
    if (gender !== "female") {
      facialHair = getDeterministicValue(hash.slice(16, 20), facialHairOptions);
    }

    setAvatar({
      face,
      body,
      head,
      glasses,
      facialHair,
      gender,
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-1/2">
        <h1 className="text-xl font-bold mb-4">Generate Your Avatar</h1>

        <input
          type="text"
          placeholder="Enter value (e.g. address)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full mb-4"
        />

        <button
          onClick={generateAvatar}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate
        </button>

        {avatar && (
          <div className="relative h-[200px] w-[200px] border-2 border-emerald-600 flex justify-center">
            <img
              src={avatar.body}
              alt="body"
              className="absolute h-[100px] bottom-0"
            />
            <img
              src={avatar.head}
              alt="head"
              className="absolute h-[80px] top-[28px] right-[56px]"
            />
            <img
              src={avatar.face}
              alt="face"
              className="absolute h-[40px] top-[60px] right-[64px]"
            />
            {avatar.gender !== "female" && avatar.facialHair && (
              <img
                src={avatar.facialHair}
                alt="facial-hair"
                className="absolute h-[30px] top-[80px] right-[70px]"
              />
            )}
            {avatar.glasses !== "none" && (
              <img
                src={avatar.glasses}
                alt="glasses"
                className="absolute h-[20px] top-[66px] right-[64px]"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
