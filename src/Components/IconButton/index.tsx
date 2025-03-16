import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  children: React.ReactNode;
}
const IconButton: React.FC<IconButtonProps> = ({ color, children, ...props }) => {
  return (
    <button className={`btn-card ${color}`} {...props}>
      {typeof children === "string" ? (
        <img src={children} alt="button icon" />
      ) : (
        children
      )}
    </button>
  );
};

export default IconButton;
