import React, { useRef } from "react";
import { IconButtonProps } from "./types";
import { Tooltip } from "../Tooltip";
import { ProgressIndicator } from "../ProgressIndicator";
import styles from "./iconButton.module.scss";

/**
 * IconButton component
 * @param icon - Icon element to be displayed
 * @param variant - Button variant (primary, secondary, etc.)
 * @param size - Button size (small, medium, large)
 * @param shape - Button shape (circle, square)
 * @param disabled - Whether the button is disabled
 * @param loading - Whether the button is loading
 * @param active - Whether the button is active
 * @param className - Additional CSS classes
 * @param tooltip - Tooltip content
 * @param tooltipProps - Additional tooltip props
 * @param showTooltip - Whether to show the tooltip
 * @param color - Custom icon color
 * @param activeColor - Custom active icon color
 * @param bgColor - Custom background color
 * @param hoverColor - Custom hover background color
 * @param fillColor - Custom fill color
 * @returns An icon button component
 */
const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = "default",
  size = "medium",
  shape = "circle",
  disabled = false,
  loading = false,
  active = false,
  className = "",
  tooltip,
  showTooltip = false,
  color,
  activeColor,
  bgColor,
  hoverColor,
  fillColor,
  onClick,
  tabIndex = 0,
  ariaLabel,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const buttonContent = (
    <button
      ref={buttonRef}
      className={`
        ${styles.iconButton}
        ${styles[variant]}
        ${styles[size]}
        ${styles[shape]}
        ${disabled ? styles.disabled : ""}
        ${loading ? styles.loading : ""}
        ${active ? styles.active : ""}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      tabIndex={disabled ? -1 : tabIndex}
      aria-label={ariaLabel || "icon button"}
      aria-disabled={disabled || loading}
      role="button"
      style={
        {
          color,
          backgroundColor: bgColor,
          "--active-color": activeColor,
          "--hover-color": hoverColor,
          "--fill-color": fillColor,
        } as React.CSSProperties
      }
      {...props}
    >
      {loading ? (
        <ProgressIndicator size={size} type="spinner" ariaLabel="Loading" />
      ) : (
        icon
      )}
    </button>
  );

  return showTooltip && tooltip ? (
    <Tooltip {...tooltip}>{buttonContent}</Tooltip>
  ) : (
    buttonContent
  );
};

export default React.memo(IconButton);
