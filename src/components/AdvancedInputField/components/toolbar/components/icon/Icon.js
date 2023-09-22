import { css, cx } from "@emotion/css"
import React from "react"

export const Icon = React.forwardRef(
    (
        { className, ...props },
        ref
    ) => (
        <span
            {...props}
            ref={ref}
            className={cx(
                'material-icons',
                className,
                css`
          font-size: 18px;
          vertical-align: text-bottom;
        `
            )}
        />
    )
)