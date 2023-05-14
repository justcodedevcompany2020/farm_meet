import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={25}
            height={25}
            viewBox="0 0 57 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M38.864 20.727a10.364 10.364 0 11-20.727 0 10.364 10.364 0 0120.727 0zm-5.182 0a5.182 5.182 0 11-10.364 0 5.182 5.182 0 0110.364 0z"
                fill="#B4B4B4"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.5 0C12.76 0 0 12.76 0 28.5S12.76 57 28.5 57 57 44.24 57 28.5 44.24 0 28.5 0zM5.182 28.5a23.23 23.23 0 004.943 14.359 23.28 23.28 0 0118.543-9.177 23.278 23.278 0 0118.375 8.96A23.319 23.319 0 105.182 28.5zM28.5 51.818a23.223 23.223 0 01-14.696-5.213 18.116 18.116 0 0114.864-7.741 18.113 18.113 0 0114.74 7.565A23.225 23.225 0 0128.5 51.82z"
                fill="#B4B4B4"
            />
        </Svg>
    )
}

export default SvgComponent
