import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M46 12.051a2.3 2.3 0 00-.667-1.633L35.581.667A2.3 2.3 0 0033.948 0a2.3 2.3 0 00-1.633.667l-6.509 6.509L.667 32.313A2.3 2.3 0 000 33.946v9.75a2.3 2.3 0 002.3 2.3h9.752a2.3 2.3 0 001.748-.666l25.001-25.137 6.532-6.394c.21-.223.38-.48.506-.759a2.306 2.306 0 000-.552c.01-.107.01-.215 0-.322l.161-.115zM11.109 41.397H4.6v-6.509l22.839-22.837 6.509 6.509-22.839 22.837zm26.082-26.08l-6.509-6.509 3.266-3.242 6.486 6.485-3.243 3.266z"
                fill="#4E7234"
            />
        </Svg>
    )
}

export default SvgComponent
