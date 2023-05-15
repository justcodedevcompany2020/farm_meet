import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={28}
            height={32}
            viewBox="0 0 64 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M16 .313c-2.95 0-5.333 2.374-5.333 5.312V37.5H5.333C2.383 37.5 0 39.874 0 42.813c0 2.938 2.383 5.312 5.333 5.312h5.334v5.313H5.333C2.383 53.438 0 55.81 0 58.75c0 2.938 2.383 5.313 5.333 5.313h5.334v5.312c0 2.939 2.383 5.313 5.333 5.313s5.333-2.374 5.333-5.313v-5.313H48c2.95 0 5.333-2.373 5.333-5.312 0-2.938-2.383-5.313-5.333-5.313H21.333v-5.312H40c13.25 0 24-10.708 24-23.906C64 11.02 53.25.312 40 .312H16zM40 37.5H21.333V10.937H40c7.367 0 13.333 5.944 13.333 13.282S47.367 37.5 40 37.5z"
                fill="#C5C5C5"
            />
        </Svg>
    )
}

export default SvgComponent
