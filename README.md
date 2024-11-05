# Binary Faces Avatar Generator

**Binary Faces** is a deterministic avatar generator that creates unique, customizable black-and-white avatars based on input values. Each avatar generated is consistent for the same input, ensuring a reliable and reproducible avatar for a given seed. Built with TypeScript, it provides strong type support and customization options for developers.

## Features

- **Deterministic Avatars**: Consistently generates the same avatar for a given input.
- **Customizable Styles**: Supports various customization options such as size, background color, border, and face-only view.
- **TypeScript Support**: Full TypeScript support for type safety and intellisense.

## Screenshots

<div align="center">
  <img src="./src/assets/screen-shots/screenshot1.png" width="30%" alt="Binary Faces Screenshot" />
  <img src="./src/assets/screen-shots/screenshot2.png" width="30%" alt="Binary Faces Screenshot" />
  <img src="./src/assets/screen-shots/screenshot3.png" width="30%" alt="Binary Faces Screenshot" />
</div>
<div align="center">
  <img src="./src/assets/screen-shots/screenshot4.png" width="30%" alt="Binary Faces Screenshot" />
  <img src="./src/assets/screen-shots/screenshot5.png" width="30%" alt="Binary Faces Screenshot" />
  <img src="./src/assets/screen-shots/screenshot6.png" width="30%" alt="Binary Faces Screenshot" />
</div>


## Installation

Install the package via npm:

```bash
npm install binary-faces
```

or via Yarn:

```bash
yarn add binary-faces
```

## Usage

```tsx
import React from "react";
import AvatarGenerator from "binary-faces";

const App = () => {
  return (
    <div>
      <h1>Binary Faces Avatar</h1>
      <AvatarGenerator value="unique_seed_value" />
    </div>
  );
};

export default App;
```

## Props

The component accepts several props to customize the avatar appearance. Here’s a breakdown of each prop and its default values:

| Prop Name      | Type    | Description                                                                    | Default    |
|----------------|---------|--------------------------------------------------------------------------------|------------|
| `value`        | string  | Seed value for deterministic avatar generation.                                | `""`       |
| `isRounded`    | boolean | If true, displays the avatar with rounded corners.                             | `false`    |
| `width`        | number  | Width and height of the avatar in pixels.                                      | `100`      |
| `bgColor`      | string  | Background color of the avatar container.                                      | `"white"`  |
| `onlyFace`     | boolean | If true, zooms in on the face, cropping the avatar to show only the face.      | `false`    |
| `border`       | boolean | If true, adds a border around the avatar.                                      | `false`    |
| `borderColor`  | string  | Color of the border around the avatar (if border is enabled).                  | `"black"`  |
| `borderSize`   | number  | Thickness of the border around the avatar (if border is enabled), in pixels.   | `2`        |

## Example with Custom Props

```jsx
import React from "react";
import AvatarGenerator from "binary-faces";

const App = () => {
  return (
    <div>
      <h1>Customized Avatar</h1>
      <AvatarGenerator 
        value="another_unique_seed"
        isRounded={true}
        width={150}
        bgColor="lightgray"
        onlyFace={true}
        border={true}
        borderColor="blue"
        borderSize={3}
      />
    </div>
  );
};

export default App;

```
