import React, { useState } from "react";
import LevelSelector from "./LevelSelector";

export default {
  title: "Game/LevelSelector",
  component: LevelSelector,
};

const Template = (args) => {
  const [selected, setSelected] = useState(args.selectedLevel);

  return (
    <LevelSelector
      {...args}
      selectedLevel={selected}
      onSelect={setSelected}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  selectedLevel: "1 (3×2)",
};

export const Level3Selected = Template.bind({});
Level3Selected.args = {
  selectedLevel: "3 (6×4)",
};

export const Level5Selected = Template.bind({});
Level5Selected.args = {
  selectedLevel: "5 (8×6)",
};