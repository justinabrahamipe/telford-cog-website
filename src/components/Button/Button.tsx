import React from "react";
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

interface ButtonProps extends Omit<MuiButtonProps, 'color'> {
  text: string;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant = "contained",
  color = "primary",
  size = "medium",
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      sx={{
        fontWeight: 500,
        borderRadius: 2,
        textTransform: 'none',
        px: 3,
        py: 1.2,
        boxShadow: variant === 'contained' ? 2 : 0,
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: variant === 'contained' ? 4 : 1,
        },
        transition: 'all 0.2s ease-in-out',
      }}
      {...props}
    >
      {text}
    </MuiButton>
  );
};

export default Button;