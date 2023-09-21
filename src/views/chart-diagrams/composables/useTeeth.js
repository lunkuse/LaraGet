import {reactive, computed} from "vue";
import {upperJawOrdered,lowerJawOrdered} from "./dictionaries/teeth.js";
import {useStore} from "vuex";
import moment from "moment";
export function useTeeth(){
    const store = useStore();

    /* patient teeth logic */
    // const activePatient = store.state.treatments.activePatient;
    const userInfo= computed(() => store.state.auth.user);
	const activePatient = computed(() => userInfo.value);

    const isAdult = () => {
        let age = moment().diff(moment(activePatient?.birth_date, "DD-MM-YYYY"), "years")
        return (age >= 22);
    }

    /* adult teeth */
    const adultTeethNumberData = reactive({
        quadrantOne: [11,12,13,14,15,16,17,18],
        quadrantTwo: [21,22,23,24,25,26,27,28],
        quadrantThree: [31,32,33,34,35,36,37,38],
        quadrantFour: [41,42,43,44,45,46,47,48],
    })

    const adultOrderedNumberedUpperTeeth = () => {
        let orderedFirstQuadrant = adultTeethNumberData.quadrantOne.sort((a,b) => b - a);
        return orderedFirstQuadrant.concat(adultTeethNumberData.quadrantTwo);
    }

    const adultOrderedNumberedLowerTeeth = () => {
        let orderedFourthQuadrant = adultTeethNumberData.quadrantFour.sort((a,b) => b - a);
        return orderedFourthQuadrant.concat(adultTeethNumberData.quadrantThree);
    }

    const adultFullOrderedNumberedTeeth = () => {
        return adultOrderedNumberedUpperTeeth().concat(adultOrderedNumberedLowerTeeth());
    }

    /* end of adult teeth */
    /* infant teeth */
    const infantOrderedNumberedUpperTeeth = () => {
        return allTeethData.upperJawOrdered().map(teeth => teeth.infantToothNumber);
    }
    const infantOrderedNumberedLowerTeeth = () => {
        return allTeethData.lowerJawOrdered().map(teeth => teeth.infantToothNumber);
    }

    const infantFullOrderedNumberedTeeth = () => {
        return infantOrderedNumberedUpperTeeth().concat(infantOrderedNumberedLowerTeeth());
    }

    /* add teeth data */
    const allTeethData = reactive({
        upperJawOrdered,
        lowerJawOrdered
    })

    const fullOrderedTeeth = () => {
        return allTeethData.upperJawOrdered().concat(allTeethData.lowerJawOrdered());
    }

    return {
        adultTeethNumberData,
        upperJawOrdered,
        lowerJawOrdered,
        adultOrderedNumberedUpperTeeth,
        adultOrderedNumberedLowerTeeth,
        adultFullOrderedNumberedTeeth,
        fullOrderedTeeth,
        isAdult
    }
}