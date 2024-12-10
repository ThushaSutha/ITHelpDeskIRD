
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { fontFamily:{
      display:['cinzel'], display1:['merriweather-bold'], display2:['Roboto Condensed'], display3:['Roboto Condensed']
    }},
    screens: {
      'xs': '240px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
});
