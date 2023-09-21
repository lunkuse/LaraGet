import { toRaw } from "vue";
export default function price(amount) {
    amount = parseFloat(amount);
        amount = typeof amount == "number" ? amount : 0.0;

        // let currency_setting = toRaw(store.getters["getGeneralSettings"]?.currency);
        let currency_setting = 'ugx';

        // console.log('currecny settings',currency_setting )
        let formated_price = amount.toFixed(
            currency_setting?.no_of_decimals
        );

        if (currency_setting?.truncate_price == 1) {
            if (formated_price > 999999.99 && formated_price < 1000000000) {
                formated_price =
                    (formated_price / 1000000).toFixed(
                        currency_setting?.no_of_decimals
                    ) + "M";
            } else if (formated_price > 1000000000) {
                formated_price =
                    (formated_price / 1000000000).toFixed(
                        currency_setting?.no_of_decimals
                    ) + "B";
            }
        }

        formated_price =
            currency_setting?.decimal_separator == "1"
                ? formated_price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                : formated_price
                    .replace(".", ",")
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

        switch (currency_setting?.symbol_format) {
            case "2":
                formated_price = formated_price + " " + currency_setting?.code;
                break;
            case "3":
                formated_price =
                    currency_setting?.code + "  " + formated_price;
                break;
            case "4":
                formated_price =
                    formated_price + "  " + currency_setting?.code;
                break;
            default:
                formated_price = currency_setting?.code + " " + formated_price;
        }
        return formated_price;
}