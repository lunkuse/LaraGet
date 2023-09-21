import { reactive } from "vue"
import validations from "./dictionaries/validations.js";
export const types = {
    BLOCKER:'blocker',
    SUGGESTION:'suggestion',
    ADDITION:'addition',
    HISTORY:'history',
    HISTORY_NON_EXISTENT:'history_non_existent',
};
export function useTreatmentRules(){

    const rules = reactive({
        validations,
        message: {
            isError: false,
            isPrompt: false,
            message: null
        }
    });

    function validate(code, selectedTreatments){
        let getValidationRules = rules.validations.filter(r => r.code === code);
        if(getValidationRules.length !== 0){
            let validation = getValidationRules[0];
            switch (validation.type) {
                case types.BLOCKER:
                    //selected treatments shud not include  validation.dependencies
                    if(selectedTreatments.filter(s => validation.dependencies.includes(s.treatment_code)).length !== 0){
                        rules.message.isError = true;
                        rules.message.message = `Selected Code ${code} cannot be paired together with any of the following treatments:[${validation.dependencies.join(',')}]`;
                        return rules.message;
                    }
                    break;
                case types.ADDITION:
                    //selected treatments shud include validation.properties
                    if(selectedTreatments.filter(s => validation.dependencies.includes(s.treatment_code)).length === 0){
                        rules.message.isError = true;
                        rules.message.message = `Selected Code ${code} must be paired together with at least the following treatments:[${validation.dependencies.join(',')}]`;
                        return rules.message;
                    }
                    break;
                case types.SUGGESTION:
                    //validate the selected treatments are not in validation.dependencies, if not suggest dependencies
                    if(selectedTreatments.filter(s => validation.dependencies.includes(s.treatment_code)).length === 0){
                        rules.message.isPrompt = true;
                        rules.message.message = `Suggestion: selected Code ${code} can be added with the following treatments:[${validation.dependencies.join(',')}]`;
                        return rules.message;
                    }
                    break;
                case types.HISTORY:
                    //TODO figure a way to check if validation.dependencies have been done before, if yes, proceed
                    break;
                case types.HISTORY_NON_EXISTENT:
                    //TODO figure a way to check if validation.dependencies have not been done before proceeding
                    break;
            }

        }
        return rules.message;
    }

    return {
        rules,
        validate
    }

}