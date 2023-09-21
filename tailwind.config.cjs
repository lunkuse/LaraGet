// const primaryColors = require('@left4code/tw-starter/dist/js/colors')
const primaryColors = require('./node_modules/@left4code/tw-starter/dist/js/colors')
module.exports = {
    mode: 'jit',
    purge: [
        './src/**/*.{php,html,js,jsx,ts,tsx,vue}',
        './resources/**/*.{php,html,js,jsx,ts,tsx,vue}',
        './node_modules/@left4code/tw-starter/**/*.js'
    ],
    darkMode: 'class',
    theme: {
        borderColor: theme => ({
            ...theme('colors'),
            DEFAULT: primaryColors.gray['300']
        }),
      
        colors: {
            ...primaryColors,
            white: 'white',
            black: 'black',
            current: 'current',
            transparent: 'transparent',
            theme: {
                // 1: '#FFF4EF',
                1: '#FF782E',
                2: '#fff8f2',
                3: '#FF782E',
                4: '#FF782E',
                5: '#FF782E',
                6: '#D32929',
                7: '#FF782E',
                8: '#FF782E',
                9: '#91C714',
                10: '#FF782E',
                11: '#F78B00',
                12: '#FBC500',
                13: '#FF782E',
                14: '#FF782E',
                15: '#FF782E',
                16: '#FF782E',
                17: '#FFEFD9',
                18: '#D8F8BC',
                19: '#FF782E',
                20: '#FF782E',
                21: '#FF782E',
                22: '#FF782E',
                23: '#FF782E',
                24: '#FF782E',
                25: '#e6e3e1',
                26: '#FF782E',
                27: '#FF782E',
                28: '#FF782E',
                29: '#FF782E',
                30: '#FF782E',
                // green color for sucess
                31: '#4BB543',
                // orange
                32: '#FF782E',
                // pink
                33: '#f705af',
                // red
                34: 'red',
                // maroon
                35: '#800000',
                // bg color
                36: '#FF782E',
                37: '#ff8c00',
                38: '#eaf9ff',
                39: '#1C3FAA',
                40: '#FF782E',
                41: '#f5af89',
                // success
                42: '#37d159',
                // red
                43: '#FF2400',
                // warning
                44: '#ff9f0f',
                // blue
                45:'#6600FF',
                46:'#F1F5F9',
                // gray
                47:'#808080'

            }
        },
        extend: {
            fontFamily: {
                roboto: ['Roboto']
            },
            container: {
                center: true
            },
            maxWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%'
            },
            strokeWidth: {
                0.5: 0.5,
                1.5: 1.5,
                2.5: 2.5
            }
        }
    },
    variants: {
        extend: {
            boxShadow: ['dark']
        }
    }
}