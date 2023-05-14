import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={12}
            height={20}
            viewBox="0 0 27 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M21.65 46.07L.684 25.236a2.161 2.161 0 01-.527-.806C.052 24.14 0 23.83 0 23.5c0-.33.052-.64.157-.93.103-.29.278-.558.527-.806L21.65.868C22.23.29 22.956 0 23.827 0s1.618.31 2.24.93c.622.62.933 1.344.933 2.17 0 .827-.311 1.55-.933 2.17L7.777 23.5l18.29 18.23c.58.578.87 1.29.87 2.138 0 .848-.31 1.582-.932 2.202-.622.62-1.348.93-2.178.93-.83 0-1.555-.31-2.177-.93z"
                fill="#4E7234"
            />
        </Svg>
    )
}

export default SvgComponent
