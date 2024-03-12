import "./App.css";
import { useEffect, useState } from "react";

const MousePosition = ({ render }) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMousePositionChange = (e) => {
      // Use e.clientX and e.clientY to access the mouse position on the screen
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMousePositionChange);
    //element.addEventListener(eventType, handlerFunction);

    return () => {
      window.removeEventListener("mousemove", handleMousePositionChange);
    };
  }, []);

  // What should be returned here?
  return render(mousePosition);
};

// This component should not receive any props

const PanelMouseLogger = ({mousePosition}) => {
  // The below if statement can be removed after the render props pattern is implemented
  //渲染属性模式”（render prop）来显示鼠标坐标 是指调用MousePosition组件（<MousePosition />）
  //此外在这种情况下通常命名为render或有时候是children属性
  //render属性，它的值是一个函数，这个函数知道如何利用MousePosition组件提供的数据（例如，鼠标的x和y坐标）来渲染界面：
 
  //所以render={(mousePosition) 这里的mousePosition仅仅是坐标值
  return (
    <MousePosition render={(mousePosition) => (
      <div className="BasicTracker">
        <p>Mouse position:</p>
        <div className="Row">
          <span>x: {mousePosition.x}</span>
          <span>y: {mousePosition.y}</span>
        </div>
  </div>
)} />
  );
    };

// This component should not receive any props
const PointMouseLogger = ({mousePosition}) => {
  // The below if statement can be removed after the render props pattern is implemented

  return (
    <MousePosition render={(mousePosition) => (
      <p>({mousePosition.x}, {mousePosition.y})</p>)
    } />) 
};

function App() {
  return (
    <div className="App">
      <header className="Header">Little Lemon Restaurant 🍕</header>
      <PanelMouseLogger />
      <PointMouseLogger />
    </div>
  );
}

export default App;
