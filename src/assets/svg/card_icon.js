import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={40}
            height={32}
            viewBox="0 0 93 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M83.25 0h-74C4.116 0 .046 4.116.046 9.25L0 64.75A9.218 9.218 0 009.25 74h74a9.218 9.218 0 009.25-9.25V9.25A9.218 9.218 0 0083.25 0zm0 64.75h-74V37h74v27.75zm0-46.25h-74V9.25h74v9.25z"
                fill="#C5C5C5"
            />
        </Svg>
    )
}

export default SvgComponent
