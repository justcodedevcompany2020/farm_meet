import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={35}
            height={35}
            viewBox="0 0 82 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M24.593 65.6c-4.509 0-8.157 3.69-8.157 8.2s3.648 8.2 8.157 8.2 8.198-3.69 8.198-8.2-3.689-8.2-8.198-8.2zm40.989 0c-4.509 0-8.157 3.69-8.157 8.2s3.648 8.2 8.157 8.2 8.198-3.69 8.198-8.2-3.69-8.2-8.198-8.2zm-5.943-20.5a8.159 8.159 0 007.173-4.223l14.674-26.609A4.085 4.085 0 0077.92 8.2H17.256L13.403 0H0v8.2h8.198l14.756 31.119-5.534 10.004c-2.992 5.494.943 12.177 7.173 12.177H73.78v-8.2H24.593l4.509-8.2h30.537zM21.15 16.4h49.801L59.64 36.9H30.864L21.15 16.4z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SvgComponent
