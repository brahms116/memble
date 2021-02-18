# DataContext

## Events

- AppInit
- SelectLength(length)
  - If different, reset the select text values
- SelectText(index 0-5)
- SelectBook
- SelectChapter
- SelectVerse
- SelectMode
- EnterLetter
  - Returns if complete
- StopTyping
- ResumeTyping
- EnterPauseMenu
- Quit
- Recite

# Navigation Context

## State

- SelectionStage
- FromTextSelectStage
- ToTestSelectStage

## Events

- ChangeStage => the new stage
- Reset => returns the new state

# User Context

## State

- UserLvl
- Points

## Events

- AppStart -fetch from local storage?
- Add points

# Game Settings Context

## State

- LengthMode
- GameMode
- SelectedFromBook
- SelectedFromChapter
- SelectedFromVerse
- SelectedToBook
- SelctedToChapter
- SelectedToVerse

## Event

- SetLength
- SetMode
- SetFromBook .... etc

# Game Context

## State

- inputValue
- currentWord
- currentSegment
- currentProgressionScore
- totalProgressionScore
- words
  - a 2d array containing verses on the vertical and words horizontal
  - each cell will have a label and a controller:AnimationControls

## Events

- NewLetter
- Reset
