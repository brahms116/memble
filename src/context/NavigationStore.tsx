import { useState } from "react";

export default function NavigationStore() {
  // SELECTION STAGE INDEX
  // 0 -- Nothing has been selected
  // 1 -- Passage length choosen
  // 2 -- Passage choosen
  // 3 -- GameMode choosen, game in play
  // 4 -- Game finished
  const [selectionStage, setSelectionStage] = useState(0);
  const [fromTextSelectStage, setFromTextSelectStage] = useState(0);
  const [toTextSelectStage, setToTextSelectStage] = useState(0);
  const changeStage = (stage: number) => {
    setSelectionStage(stage);
    return stage;
  };
  const resetTextSelect = () => {
    setFromTextSelectStage(0);
    setToTextSelectStage(0);
    return {
      selectionStage,
      fromTextSelectStage,
      toTextSelectStage,
    };
  };
  const resetAll = () => {
    resetTextSelect();
    setSelectionStage(0);
    return {
      selectionStage,
      fromTextSelectStage,
      toTextSelectStage,
    };
  };
  return {
    state: {
      selectionStage,
      fromTextSelectStage,
      toTextSelectStage,
    },
    events: {
      changeStage,
      resetTextSelect,
      resetAll,
    },
  };
}
