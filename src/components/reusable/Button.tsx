import { useState } from "react";

const Button = (props: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isHovered
            ? props.hoverBgColor || props.bgColor
            : props.bgColor,
          color: isHovered
            ? props.hoverTextColor || props.textColor
            : props.textColor,
          border: `2px solid ${props.borderColor}`,
          borderRadius: isHovered ? "9999px" : "10px",
          transition:
            "border-radius 0.2s ease-in-out, transform 0.2s ease, background-color 0.2s ease, color 0.2s ease",
          transform: isHovered ? "scale(1.10)" : "scale(1)",
        }}
        className="px-7 py-2 cursor-pointer"
      >
        {props.name}
      </button>
    </div>
  );
};

export default Button;
