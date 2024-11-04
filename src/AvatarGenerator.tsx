import React from "react";
import SHA256 from "crypto-js/sha256";
import glassesOptions from "./constants/glasses";
import maleBodyOptions from "./constants/body/maleBody";
import femaleBodyOptions from "./constants/body/femaleBody";
import unisexBodyOptions from "./constants/body/unisexbody";
import maleHeadOptions from "./constants/head/maleHead";
import femaleHeadOptions from "./constants/head/femaleHead";
import unisexHeadOptions from "./constants/head/unisexHead";
import normalFaceOptions from "./constants/faceExpression/normalFace";
import noGlassFaceOptions from "./constants/faceExpression/noGlasssesFace";
import facialHairOptions from "./constants/facialHair";
import "./AvatarGenerator.css";

interface AvatarGeneratorProps {
  value?: string;
  isRounded?: boolean;
  width?: number;
  bgColor?: string;
  onlyFace?: boolean;
  border?: boolean;
  borderColor?: string;
  borderSize?: number;
}

interface AvatarParts {
  face: string;
  body: string;
  head: string;
  glasses: string | null;
  facialHair: string | null;
  gender: "male" | "female" | "unisex";
}

const AvatarGenerator = ({
  value = "",
  isRounded = false,
  width = 100,
  bgColor = "white",
  onlyFace = false,
  border = false,
  borderColor = "black",
  borderSize = 2,
}: AvatarGeneratorProps) => {
  const getDeterministicValue = (
    hashSlice: string,
    options: string[]
  ): string => {
    const index = parseInt(hashSlice, 16) % options.length;
    return options[index];
  };

  const getGenderFromBody = (
    bodyAsset: string
  ): "male" | "female" | "unisex" => {
    if (femaleBodyOptions.includes(bodyAsset)) return "female";
    if (maleBodyOptions.includes(bodyAsset)) return "male";
    return "unisex";
  };

  const generateAvatar = (): AvatarParts => {
    const hash = SHA256(value).toString();
    const bodyAllOptions = [
      ...femaleBodyOptions,
      ...maleBodyOptions,
      ...unisexBodyOptions,
    ];
    const body = getDeterministicValue(hash.slice(0, 4), bodyAllOptions);
    const gender = getGenderFromBody(body);

    const headOptions =
      gender === "female"
        ? [...femaleHeadOptions, ...unisexHeadOptions]
        : [...maleHeadOptions, ...unisexHeadOptions];
    const head = getDeterministicValue(hash.slice(4, 8), headOptions);

    const face = getDeterministicValue(hash.slice(8, 12), [
      ...noGlassFaceOptions,
      ...normalFaceOptions,
    ]);

    const glasses = normalFaceOptions.includes(face)
      ? getDeterministicValue(hash.slice(12, 16), glassesOptions)
      : "none";

    const facialHair =
      gender !== "female"
        ? getDeterministicValue(hash.slice(16, 20), facialHairOptions)
        : null;

    return { face, body, head, glasses, facialHair, gender };
  };

  const avatar = generateAvatar();

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${width}px`,
        backgroundColor: bgColor,
        borderRadius: isRounded ? "50%" : "0",
        overflow: "hidden",
        border: border ? `${borderSize}px solid ${borderColor}` : "none",
      }}
    >
      <div
        className="avatar-container"
        style={{
          width: `${width}px`,
          height: `${width}px`,
          ...(onlyFace && {
            scale: "1.5",
            top: "20%",
            right: "5%",
          }),
        }}
      >
        <img src={avatar.body} alt="body" className="avatar-body" />
        <img src={avatar.head} alt="head" className="avatar-head" />
        <img src={avatar.face} alt="face" className="avatar-face" />
        {avatar.gender !== "female" && avatar.facialHair && (
          <img
            src={avatar.facialHair}
            alt="facial-hair"
            className="avatar-facial-hair"
          />
        )}
        {avatar.glasses && avatar.glasses !== "none" && (
          <img src={avatar.glasses} alt="glasses" className="avatar-glasses" />
        )}
      </div>
    </div>
  );
};

export default AvatarGenerator;
