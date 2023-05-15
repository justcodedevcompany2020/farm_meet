import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={33}
            height={34}
            viewBox="0 0 78 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M23.394 62.8c-4.29 0-7.76 3.51-7.76 7.8s3.47 7.8 7.76 7.8c4.288 0 7.797-3.51 7.797-7.8s-3.509-7.8-7.797-7.8zm38.989 0c-4.289 0-7.759 3.51-7.759 7.8s3.47 7.8 7.759 7.8 7.798-3.51 7.798-7.8-3.51-7.8-7.798-7.8zm-5.654-19.5a7.76 7.76 0 006.824-4.017L77.51 13.972A3.886 3.886 0 0074.119 8.2H16.415L12.75.4H0v7.8h7.798l14.036 29.601-5.264 9.516c-2.846 5.226.897 11.583 6.824 11.583H70.18v-7.8H23.394l4.288-7.8H56.73zM20.12 16H67.49L56.73 35.5H29.358L20.119 16z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SvgComponent
