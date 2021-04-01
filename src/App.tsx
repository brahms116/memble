import "./styles/global.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LengthPage from "./pages/LengthPage";
import VerseSelectPage from "./pages/VerseSelectPage";
import PickBookPage from "./pages/PickBookPage";
import PickChapterPage from "./pages/PickChapterPage";
import ModePage from "./pages/ModePage";
import GamePage from "./pages/GamePage";
import PauseMenuPage from "./pages/PauseMenuPage";
import FinishPage from "./pages/FinishPage";
import DataContextProvider from "./context/DataContext";
import ErrorPage from "./pages/ErrorPage";
import FromURL from "./pages/FromURLPage";

function App() {
  return (
    <DataContextProvider>
      <Router>
        <Switch>
          <Route path="/game" exact component={GamePage} />
          <Route path="/length" exact component={LengthPage} />
          <Route path="/text" exact component={VerseSelectPage} />
          <Route path="/book" exact component={PickBookPage} />
          <Route path="/chaptverse" exact component={PickChapterPage} />
          <Route path="/mode" exact component={ModePage} />
          <Route path="/pause" exact component={PauseMenuPage} />
          <Route path="/finish" exact component={FinishPage} />
          <Route path="/error" exact component={ErrorPage} />
          <Route path="/url" component={FromURL} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </DataContextProvider>
  );
}

export default App;
