import * as React from "react"
        import Svg, { Path } from "react-native-svg"

        function SvgComponent(props) {
        return (
<Svg
        width={28}
        height={27}
        viewBox="0 0 64 63"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        >
<Path
d="M6.585 53.732l12.517-12.32a21.462 21.462 0 01-5.05-15.354c.386-5.567 2.937-10.774 7.124-14.536 4.186-3.763 9.685-5.791 15.352-5.665 5.668.127 11.067 2.4 15.075 6.346 4.009 3.945 6.318 9.26 6.447 14.84.128 5.578-1.933 10.991-5.755 15.112s-9.111 6.633-14.767 7.013a22.258 22.258 0 01-15.598-4.972L9.415 56.518A2.002 2.002 0 018 57.095a2.03 2.03 0 01-1.415-.577 1.968 1.968 0 01-.586-1.393 1.944 1.944 0 01.586-1.393zM54 27.562c0-3.504-1.056-6.93-3.034-9.844a17.942 17.942 0 00-8.078-6.525 18.265 18.265 0 00-10.4-1.009 18.09 18.09 0 00-9.216 4.85 17.634 17.634 0 00-4.926 9.072 17.46 17.46 0 001.024 10.237A17.783 17.783 0 0026 42.295a18.205 18.205 0 0010 2.986 18.166 18.166 0 0012.722-5.195A17.599 17.599 0 0054 27.563z"
fill="#B8B8B8"
/>
        </Svg>
        )
        }

        export default SvgComponent
