import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={18}
            height={21}
            viewBox="0 0 41 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M12.439 39c-2.192 0-3.965 2.156-3.965 4.792 0 2.635 1.773 4.791 3.965 4.791 2.191 0 3.984-2.156 3.984-4.791 0-2.636-1.793-4.792-3.984-4.792zm19.922 0c-2.191 0-3.964 2.156-3.964 4.792 0 2.635 1.773 4.791 3.964 4.791 2.192 0 3.985-2.156 3.985-4.791 0-2.636-1.793-4.792-3.985-4.792zm-2.888-11.98c1.494 0 2.809-.982 3.486-2.467L40.09 9.004c.168-.363.254-.773.25-1.188a2.76 2.76 0 00-.273-1.18 2.222 2.222 0 00-.725-.862c-.3-.207-.64-.316-.985-.316H8.872L7 .667H.485v4.791H4.47l7.172 18.185-2.69 5.845c-1.454 3.21.458 7.116 3.487 7.116h23.907v-4.791H12.439l2.191-4.792h14.842zM10.765 10.25h24.206l-5.498 11.98H15.486l-4.722-11.98z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SvgComponent
