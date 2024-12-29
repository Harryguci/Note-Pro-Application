import { useEffect, useState } from "react";
import { INotePageProp } from "./NotePage.interface";
import NavigatorWrapper from "./components/NavigatorWrapper";
import "./notePage.css";
import { NoteArea } from "./components/NoteArea";

function NotePage(props: INotePageProp) {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="container-fluid note-page-container">
        <div className="row h-100 flex-row flex-nowrap">
          <NavigatorWrapper
            activePage="default"
            defaultWidth={Math.max(screenSize.width / 10, 300)}
          />
          <div className="col-10 h-100 bg-white">
            <NoteArea />
          </div>
        </div>
      </div>
    </>
  );
}

export default NotePage;
