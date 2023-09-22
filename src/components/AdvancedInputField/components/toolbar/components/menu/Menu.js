import { css, cx } from "@emotion/css"
import React from "react"

export const Menu = React.forwardRef(
    (
        { className, ...props },
        ref
    ) => (
        <div
            {...props}
            data-test-id="menu"
            ref={ref}
            className={cx(
                className,
                css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
            )}
        />
    )
)