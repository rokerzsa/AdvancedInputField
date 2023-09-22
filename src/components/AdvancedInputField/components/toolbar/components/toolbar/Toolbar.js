import { css, cx } from "@emotion/css"
import React from "react"
import { Menu } from "../menu/Menu"
export const Toolbar = React.forwardRef(
    (
        { className, ...props },
        ref
    ) => (
        <Menu
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          margin-bottom: 20px;
        `
            )}
        />
    )
)