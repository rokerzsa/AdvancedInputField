import { css, cx } from "@emotion/css"
import React from "react"
const DisplayCode = ({ attributes, children }) => {
    return (
        <span
            {...attributes}
            onClick={ev => ev.preventDefault()}
            // Margin is necessary to clearly show the cursor adjacent to the button
            className={css`
          margin: 0 0.1em;
          background-color: #efefef;
          padding: 2px 6px;
          border: 1px solid #767676;
          border-radius: 2px;
          font-size: 0.9em;
        `}
        >
            {children}
        </span>
    )
}

export default DisplayCode