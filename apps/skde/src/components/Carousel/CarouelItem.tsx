import React, { forwardRef } from "react";

export interface CarouselItemProps {
  tag?: React.ElementType;
  style?: React.CSSProperties;
  label: string;
  children: React.ReactNode;
}

export const CarouselItem = forwardRef(
  (
    { tag: Tag = "div", children, ...rest }: CarouselItemProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    externalRef: React.MutableRefObject<any>,
  ) => {
    return (
      <Tag ref={externalRef} className={`${"slideClasses"}${""}`} {...rest}>
        {children}
      </Tag>
    );
  },
);

CarouselItem.displayName = "CarouselItem";
