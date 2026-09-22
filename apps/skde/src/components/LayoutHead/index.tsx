"use client";

import { useEffect } from "react";

export const LayoutHead = (props: {
  title: string;
  content: string;
  href: string;
}) => {
  const { title, content, href } = props;

  useEffect(() => {
    document.title = title;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    description?.setAttribute("content", content);

    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    icon?.setAttribute("href", href);
  }, [content, href, title]);

  return null;
};
