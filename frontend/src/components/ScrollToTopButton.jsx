import { useState, useEffect } from "react";
import "./ScrollToTopButton.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ScrollToTopButton = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const scrollableElement = document.querySelector(".App");

    const checkScrollTop = () => {
      if (scrollableElement.scrollTop > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    scrollableElement.addEventListener("scroll", checkScrollTop);
    return () => {
      scrollableElement.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

  const scrollToTop = () => {
    const scrollableElement = document.querySelector(".App");
    scrollableElement.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showScroll && (
        <button
          className="scrollToTop"
          onClick={scrollToTop}
        >
          <FontAwesomeIcon icon={faArrowUp}/>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
