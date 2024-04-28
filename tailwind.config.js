/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      color: {
        grey: '#636363',
        lightGrey: '#EBEBEB',
        lighterGrey:'#F9FAFB',
        2: '#FEDCE0',
        3: '#FCA7B1',
        4: '#FB8A98',
        5: '#FA6C7E',
        7: '#FA6C7E',
        pink: '#F94F64',
        9: '#CF4253',
        a: '#A63543',
        b: '#A63543',
        c: '#531A21',
        white:'#fff',
        black: '#000',
        blue: "#4285F4",
        red: '#E72929',
        green: '#41B06E',
        offwhite: "#F5F5F5"
      }

    },
    flex: {
      '1':1,
      '2': 2,
      '6':6,
      '3': 3
    },
   
    
  },
  plugins: [],
}

