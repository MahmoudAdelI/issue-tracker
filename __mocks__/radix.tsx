jest.mock("@radix-ui/themes", () => {
  const React = jest.requireActual("react");
  return {
    Heading: React.forwardRef(
      ({ children }: any, ref: React.Ref<HTMLDivElement>) => (
        <div ref={ref}>{children}</div>
      )
    ),
    Badge: ({
      color,
      variant,
      children,
      ...props
    }: {
      color: string;
      variant: string;
      children: React.ReactNode;
    }) => (
      <span data-color={color} data-variant={variant} {...props}>
        {children}
      </span>
    ),
    // Select: {
    //   Root: ({ children, ...props }: { children: React.ReactNode }) => (
    //     <div data-testid="select-root" {...props}>
    //       {children}
    //     </div>
    //   ),
    //   Trigger: ({ placeholder, ...props }: { placeholder?: string }) => (
    //     <button data-testid="select-trigger" {...props}>
    //       {placeholder || "Trigger"}
    //     </button>
    //   ),
    //   Content: ({ children, ...props }: { children: React.ReactNode }) => (
    //     <div data-testid="select-content" {...props}>
    //       {children}
    //     </div>
    //   ),
    //   Group: ({ children, ...props }: { children: React.ReactNode }) => (
    //     <div data-testid="select-group" {...props}>
    //       {children}
    //     </div>
    //   ),
    //   Label: ({ children, ...props }: { children: React.ReactNode }) => (
    //     <div data-testid="select-label" {...props}>
    //       {children}
    //     </div>
    //   ),
    //   Item: ({
    //     value,
    //     children,
    //     ...props
    //   }: {
    //     value: string;
    //     children: React.ReactNode;
    //   }) => (
    //     <div data-testid={`select-item-${value}`} {...props}>
    //       {children}
    //     </div>
    //   ),
    // },
    Button: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <button ref={ref} data-testid="radix-button" {...props}>
        {children}
      </button>
    )),

    Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
    Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Text: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Flex: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Grid: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Card: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});
