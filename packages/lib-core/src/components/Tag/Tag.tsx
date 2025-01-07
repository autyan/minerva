import React, { useCallback } from "react";
import classNames from "classnames";
import { IoClose } from "react-icons/io5";
import type { TagProps } from "./types";
import styles from "./tag.module.scss";

/**
 * Tag 组件
 * 用于标记和分类的小标签
 * @param children - 标签内容
 * @param variant - 标签变体样式
 * @param size - 标签尺寸
 * @param shape - 标签形状
 * @param closable - 是否可关闭
 * @param onClose - 关闭回调
 * @param clickable - 是否可点击
 * @param onClick - 点击回调
 * @param icon - 自定义图标
 * @param bordered - 是否显示边框
 * @param elevation - 是否显示阴影
 * @param bgColor - 自定义背景色
 * @param textColor - 自定义文字颜色
 * @param borderColor - 自定义边框颜色
 * @param className - 自定义类名
 * @param style - 自定义样式
 * @param disabled - 是否禁用
 * @param closeIcon - 自定义关闭图标
 * @param ripple - 是否显示波纹效果
 */
const Tag: React.FC<TagProps> = ({
  children,
  variant = "default",
  size = "medium",
  shape = "rounded",
  closable = false,
  onClose,
  clickable = false,
  onClick,
  icon,
  bordered = false,
  elevation = false,
  bgColor,
  textColor,
  borderColor,
  className,
  style,
  disabled = false,
  closeIcon,
  ripple = true,
}) => {
  // 处理关闭事件
  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (!disabled && onClose) {
        onClose(e);
      }
    },
    [disabled, onClose],
  );

  // 处理点击事件
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!disabled && clickable && onClick) {
        onClick(e);
      }
    },
    [disabled, clickable, onClick],
  );

  // 处理波纹效果
  const handleRipple = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!ripple || disabled) return;

      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();
      const rippleElement = document.createElement("span");
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      rippleElement.style.width = rippleElement.style.height = `${diameter}px`;
      rippleElement.style.left = `${e.clientX - rect.left - radius}px`;
      rippleElement.style.top = `${e.clientY - rect.top - radius}px`;
      rippleElement.className = styles.ripple;

      element.appendChild(rippleElement);

      setTimeout(() => {
        element.removeChild(rippleElement);
      }, 600);
    },
    [ripple, disabled],
  );

  const tagStyles: React.CSSProperties = {
    ...style,
    backgroundColor: bgColor,
    color: textColor,
    borderColor: borderColor,
  };

  return (
    <div
      className={classNames(
        styles.tag,
        styles[variant],
        styles[size],
        styles[shape],
        {
          [styles.clickable]: clickable && !disabled,
          [styles.bordered]: bordered,
          [styles.elevation]: elevation,
          [styles.disabled]: disabled,
        },
        className,
      )}
      style={tagStyles}
      onClick={(e) => {
        handleClick(e);
        handleRipple(e);
      }}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.content}>{children}</span>
      {closable && (
        <span className={styles.closeIcon} onClick={handleClose}>
          {closeIcon || <IoClose />}
        </span>
      )}
    </div>
  );
};

export default Tag;
