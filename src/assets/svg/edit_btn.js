import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={29}
            height={29}
            viewBox="0 0 67 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M67 17.553a3.348 3.348 0 00-.972-2.379L51.824.971a3.351 3.351 0 00-2.378-.97 3.35 3.35 0 00-2.378.97l-9.481 9.48L.972 47.064A3.35 3.35 0 000 49.442v14.203a3.35 3.35 0 003.35 3.35h14.204a3.353 3.353 0 002.546-.971L56.514 29.41l9.514-9.312c.306-.325.555-.699.737-1.106a3.347 3.347 0 000-.804 2.34 2.34 0 000-.469l.235-.167zM16.18 60.296H6.7v-9.48l33.265-33.263 9.481 9.48L16.18 60.295zm37.99-37.987l-9.481-9.48 4.757-4.723 9.447 9.447-4.724 4.756z"
                fill="#4E7234"
            />
        </Svg>
    )
}

export default SvgComponent
