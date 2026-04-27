import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2300);
    return () => clearTimeout(timer);
  }, []);

  // keep same behavior as old toggle
  if (isLoading) return null;

  return (
    <StyledWrapper>
      <label className="switch">
        <input
          type="checkbox"
          className="input__check"
          checked={isDark}
          onChange={toggleTheme}
        />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9998;

  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
    transform-style: preserve-3d;
    perspective: 500px;
    animation: toggle__animation 3s infinite;
  }

  .switch::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    filter: blur(20px);
    z-index: -1;
    border-radius: 50px;
    background-color: #d8ff99;
    background-image:
      radial-gradient(at 21% 46%, hsla(183,65%,60%,1) 0px, transparent 50%),
      radial-gradient(at 23% 25%, hsla(359,74%,70%,1) 0px, transparent 50%),
      radial-gradient(at 20% 1%, hsla(267,83%,75%,1) 0px, transparent 50%),
      radial-gradient(at 86% 87%, hsla(204,69%,68%,1) 0px, transparent 50%),
      radial-gradient(at 99% 41%, hsla(171,72%,77%,1) 0px, transparent 50%),
      radial-gradient(at 55% 24%, hsla(138,60%,62%,1) 0px, transparent 50%);
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #fdfefedc;
    transition: 0.4s;
    border-radius: 30px;
  }

  .slider:before {
    content: "";
    position: absolute;
    height: 1.4em;
    width: 1.4em;
    left: 0.3em;
    bottom: 0.35em;
    border-radius: 50%;
    transition: 0.4s;
    box-shadow:
      rgba(0, 0, 0, 0.17) 0px -10px 10px inset,
      rgba(0, 0, 0, 0.09) 0px -1px 15px -8px;
    background-color: #ff99fd;
    background-image:
      radial-gradient(at 81% 39%, hsla(327,79%,79%,1) 0px, transparent 50%),
      radial-gradient(at 11% 72%, hsla(264,64%,79%,1) 0px, transparent 50%),
      radial-gradient(at 23% 20%, hsla(75,98%,71%,1) 0px, transparent 50%);
  }

  .input__check:checked + .slider {
    background-color: #17202a;
  }

  .input__check:checked + .slider:before {
    transform: translateX(1.5em);
  }

  @keyframes toggle__animation {
    0%, 100% {
      transform: translateY(-10px) rotateX(15deg) rotateY(-20deg);
    }
    50% {
      transform: translateY(0px) rotateX(15deg) rotateY(-20deg);
    }
  }
`;

export default ThemeToggle;
