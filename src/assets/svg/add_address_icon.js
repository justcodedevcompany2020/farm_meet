import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={12}
            height={21}
            viewBox="0 0 27 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M5.35 46.07l20.966-20.834a2.16 2.16 0 00.527-.806c.105-.29.157-.6.157-.93 0-.33-.052-.64-.157-.93a2.16 2.16 0 00-.527-.806L5.35.868C4.77.29 4.044 0 3.173 0a3.06 3.06 0 00-2.24.93C.311 1.55 0 2.274 0 3.1c0 .827.311 1.55.933 2.17l18.29 18.23L.934 41.73c-.58.578-.87 1.29-.87 2.138 0 .848.31 1.582.932 2.202.623.62 1.348.93 2.178.93.83 0 1.555-.31 2.177-.93z"
                fill="#4E7234"
            />
        </Svg>
    )
}

export default SvgComponent
