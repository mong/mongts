export const rehypeWrapWithDiv = () => {
  return (tree) => {
    const divWrapper = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "div",
          children: tree.children,
          properties: { class: "main-content" },
        },
      ],
    };

    return divWrapper;
  };
};
