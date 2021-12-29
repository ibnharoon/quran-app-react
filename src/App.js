import './App.css';
import Page from './components/Pages/Pages';
import useWindowDimensions from './utils/windows';
import Constants from './constants/constants';
import { Fragment, useState } from 'react';
    
function App() {
  let [currentPage, setCurrentPage] = useState(1);
  let [touchStartX, setTouchStartX] = useState(0);
  let [touchEndX, setTouchEndX] = useState(0);
  let [beingTouched, setBeingTouched] = useState(false);
  
  function handleStart(clientX) {
    setTouchStartX(clientX);
    setBeingTouched(true);
  }
  
  function handleMove(clientX) {
    if (beingTouched) {
      setTouchEndX(clientX);
    }
  }
  
  function handleEnd(clientX) {
    let deltaX = clientX - touchStartX;
    if (deltaX < 0) {
        if (currentPage < Constants.NPAGE) {
            currentPage += 1;
        }
    } else if (deltaX > 0) {
        if (currentPage > 1) {
            currentPage -= 1;
        }
    }
    setCurrentPage(currentPage);
    setTouchStartX(0);
    setTouchEndX(0);
    setBeingTouched(false);
  }
  
  function handleTouchStart(touchStartEvent) {
    touchStartEvent.preventDefault();
    handleStart(touchStartEvent.targetTouches[0].clientX);
  }
  
  function handleTouchMove(touchMoveEvent) {
    handleMove(touchMoveEvent.targetTouches[0].clientX);
  }
  
  function handleTouchEnd() {
    handleEnd();
  }
  
  function handleMouseDown(mouseDownEvent) {
    mouseDownEvent.preventDefault();
    handleStart(mouseDownEvent.clientX);
  }
  
  function handleMouseMove(mouseMoveEvent) {
    handleMove(mouseMoveEvent.clientX);
  }
  
  function handleMouseUp(mouseUpEvent) {
    handleEnd(mouseUpEvent.clientX);
  }
  
  function handlePreviousPage(e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage -= 1;
    }

    setCurrentPage(currentPage);
  }

  function handleNextPage(e) {
    e.preventDefault();
    if (currentPage < Constants.NPAGE) {
      currentPage += 1;
    }

    setCurrentPage(currentPage);
  }
  
  let dimension = useWindowDimensions();

  return (
    <Fragment>
      <div className="App" style={{
        width: dimension.width,
        height: dimension.height
      }} >
      
        { /* Top Bar */}
        <div className="top-bar" style={{
          width: dimension.width,
          height: dimension.topoutline
        }}>

          { /* top left corner */}
          <div className={currentPage % 2 ? 'top-left-corner-even' : 'top-left-corner-odd'}
            style={{
              width: dimension.lnavwidth,
              height: dimension.topoutline
            }}>
          </div>

          { /* top page outline */}
          <div className="top-outline" style={{
            width: dimension.width - (dimension.lnavwidth * 2),
            height: dimension.topoutline
          }}>
          </div>

          <div className={currentPage % 2 ? 'top-right-corner-even' : 'top-right-corner-odd'}
            style={{
              width: dimension.rnavwidth,
              height: dimension.bottomoutline
            }}>
          </div>
        </div>

        { /* Middle Bar */}
        <div className="middle-bar" style={{
          width: dimension.width,
          height: (dimension.height - (dimension.topoutline + dimension.bottomoutline))
        }}>
          { /* previous is actually next page in RTL language */}
          <div className={currentPage % 2 ? 'middle-navigation-even' : 'middle-navigation-odd'}
            style={{
              width: dimension.lnavwidth,
              height: (dimension.height - (dimension.topoutline + dimension.bottomoutline))
            }}
            onClick={ clickEvent => handleNextPage(clickEvent)}
        >
          </div>

          <div className="pcontent" 
            style={{
            width: (dimension.width - (dimension.lnavwidth + dimension.rnavwidth)),
            height: (dimension.height - (dimension.topoutline + dimension.bottomoutline))
            }}
            onMouseDown={mouseDownEvent => handleMouseDown(mouseDownEvent)}
            onMouseMove={mouseMoveEvent => handleMouseMove(mouseMoveEvent)}
            onMouseUp={mouseUpEvent => handleMouseUp(mouseUpEvent)}
            onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
            onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
            onTouchEnd={handleTouchEnd}
          >
            <Page dimension={dimension} currentPage={currentPage} />
          </div>

          { /* next is actually previous page in RTL language */}
          <div className={currentPage % 2 ? 'right-navigation-even' : 'right-navigation-odd'}
            style={{
              width: dimension.rnavwidth,
              height: (dimension.height - (dimension.topoutline + dimension.bottomoutline))
            }} onClick={ clickEvent => handlePreviousPage(clickEvent)}>
          </div>
        </div>

        { /* Bottom Bar */}
        <div className="bottom-bar" style={{
          width: dimension.width,
          height: dimension.lnavwidth
        }}>
          { /* bottom left corner */}
          <div className={currentPage % 2 ? 'bottom-left-corner-even' : 'bottom-left-corner-odd'}
            style={{
              width: dimension.lnavwidth,
              height: dimension.lnavwidth
            }}>
          </div>

          { /* bottom page outline */}
          <div className="bottom-outline" style={{
            width: dimension.width - (dimension.lnavwidth * 2),
            height: dimension.bottomoutline
          }}>
          </div>

          { /* bottom right corner */}
          <div className={currentPage % 2 ? 'bottom-right-corner-even' : 'bottom-right-corner-odd'}
            style={{
              width: dimension.rnavwidth,
              height: dimension.bottomoutline
            }}>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
