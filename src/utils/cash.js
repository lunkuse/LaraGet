import $ from 'cash-dom'
 export default class Cash {
        static cashDom() {
            console.log('cash reached')
            $('body')
            .removeClass('main')
            .removeClass('error-page')
            .addClass('login')
        }}