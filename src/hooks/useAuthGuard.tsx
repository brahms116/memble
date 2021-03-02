import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useAuthGuard(selectionStage: number) {
  const history = useHistory();
  const pathName = history.location.pathname;
  return () => {
    if (selectionStage === 3 && pathName !== "/game" && pathName !== "/pause")
      history.push("/game");
    else if (selectionStage === 4 && pathName !== "/finish")
      history.push("/finish");
    else if (
      pathName.match("/text") ||
      pathName.match("/chapverse") ||
      pathName.match("/book")
    ) {
      if (selectionStage < 1) history.push("/");
    } else if (pathName.match("/mode")) {
      if (selectionStage < 2) history.push("/text");
    } else if (pathName.match("/game") || pathName.match("/pause")) {
      if (selectionStage < 3) history.push("/mode");
    } else if (pathName.match("/finish")) {
      if (selectionStage < 4) history.push("/game");
    }
  };
}
