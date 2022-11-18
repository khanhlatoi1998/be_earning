/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx,scss}",
  ],
  theme: {
      extend: {
          colors: {
              color_01: '#fff',
              color_02: '#000',
              color_03: '#04004D',
              color_04: '#004DFF',
              color_05: '#E5E5E5;',
              color_06: ' #BBCFFB',
              color_07: '#D3D7DB',
              color_08: '#BBCFFB',

              color_09: '#FF0366',
              color_10: '#00000038',
              color_11: '#04B800',
          },

          fontSize: {
              'title': '17px'
          },

          minHeight: {
              '1/2': '50px',
          },

          boxShadow: {
              'item': "0px 7px 32px rgba(0, 0, 0, 0.07)",
              'block': "0px -7px 64px rgba(0, 0, 0, 0.07)",
              'around': "0 0 10px 0 rgb(0 0 0 / 12%)",
          },

          width: {
              '100': '100px',
              '200': '200px',
              '300': '300px',
              '400': '400px',
              '500': '500px',
              '600': '600px',
              '700': '700px',
              '800': '800px',
              '900': '900px',
          },

          height: {
              '100': '100px',
              '200': '200px',
              '300': '300px',
              '400': '400px',
              '500': '500px',
              '600': '600px',
              '700': '700px',
              '800': '800px',
              '900': '900px',
          }
      },
  },
  plugins: [],
}
