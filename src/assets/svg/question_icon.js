import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={28}
            height={28}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M36 45a4 4 0 11-8 0 4 4 0 018 0zm23-13A27 27 0 1132 5a27.03 27.03 0 0127 27zm-6 0a21 21 0 10-21 21 21.023 21.023 0 0021-21zM32 16c-6.065 0-11 4.485-11 10v1a3 3 0 006 0v-1c0-2.205 2.25-4 5-4s5 1.795 5 4-2.25 4-5 4a3 3 0 00-3 3v2a3 3 0 005.932.64C39.578 34.47 43 30.593 43 26c0-5.515-4.935-10-11-10z"
                fill="#B9D149"
            />
        </Svg>
    )
}

export default SvgComponent
