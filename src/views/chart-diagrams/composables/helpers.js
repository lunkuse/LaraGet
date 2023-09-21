/*
	* @Author: Benjamin Kooma
	* @Email: kooma.benjamin@gmail.com
	* @LinkedIn: https://www.linkedin.com/in/kooma-benjamin-b90970168/
	* @Github: https://github.com/koomabenjamin
	* @GitLab: https://gitlab.com/kooma.benjamin
	* @Tel: +256-780-827-765, +256-754-827-766
*/

import { inject, provide, computed, ref } from "vue";
import { useStore } from "vuex";
import customAxios from "../../custom-axios";
import useQueueComposable from "../composables/queue-composable";
import {useI18n} from "vue-i18n";

export default function useHelpers() {

	const swal = inject("$swal");

	const store = useStore();

	const treatmentBlob = inject("treatmentBlob");
	
	const activePatient = computed(() => store.state.treatments.activePatient);

	const currentAppointment = computed(() => store.state.appointments.currentAppointmentInServing);

	const activeTreatment = computed(
		() => store.state.treatments.activeTreatment
	);

	const user = sessionStorage.getItem("dentalSoftUser");

	const {t} = useI18n();

	const confirmationToast = swal.mixin({
		title: `${t('treatments.youSure')}`,
		text: `${t('treatments.wontRevertText')
			}`,
		icon: 'question',
		showCancelButton: true,
		confirmButtonText: `${t('treatments.yesProceed')
			}`,
		cancelButtonText: `${t('treatments.noCancel')
			}`,
		reverseButtons: true,
	});

	const Toast = swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", swal.stopTimer);
			toast.addEventListener("mouseleave", swal.resumeTimer);
		},
	});

	const handleDoneTreatmentResponseSuccess = () => {
		Toast.fire({
			icon: "success",
			title: `${t('treatments.actionPerformed')}`,
		});
	};

	const handleDoneTreatmentResponseError = () => {
		Toast.fire({
			icon: "error",
			title: `${t('treatments.actionFailed')}`,
		});
	};

	const saveDoneTreatment = async (
		blob,
		completionState,
		paymentStatus,
		treatments,
		treatmentPrices,
		activeTooth = null
	) => {
		const url =
			Object.keys(activeTreatment.value).length !== 0
				? "v1/donetreatments/edit"
				: "v1/donetreatments/create";

		let responseSuccess = false;

		const treatmentRequest = ref({
			visitId: currentAppointment?.value?.id,
			patientId: activePatient.value?.id,
			doneTreatmentId: activeTreatment.value?.id ?? 0,
			sections: JSON.stringify(blob ?? treatmentBlob.value),
			paymentStatus: paymentStatus ?? 0,
			treatmentComplete: completionState ?? 0,
			treatment: JSON.stringify(treatments),
			treatmentPrice: treatmentPrices.join(","),
			tooth: activeTooth
		});

		// console.log('treatment ========>', currentAppointment.value, treatmentRequest.value)

		const toastStatus = await confirmationToast.fire();

		if (toastStatus.isConfirmed) {
			const response = await customAxios.post(url, treatmentRequest.value);
			const payload = response?.data?.payload;
			if (typeof payload !== "undefined" && payload.length > 0) {
				store.dispatch("SET_ACTIVE_TREATMENT", payload[0]);
				handleDoneTreatmentResponseSuccess();
				return Promise.resolve(true);
			} else {
				handleDoneTreatmentResponseError();
				return Promise.reject(false);
			}
		}
	};

	const saveTemporaryInvoice = async (treatmentData, invoiceComment) => {

		let stagedInvoices = {};

		const formatedTreatments = (Array.isArray(treatmentData.treatments)) ? treatmentData.treatments.map((treatment) => {
			return {
				name: treatment?.treatment ?? treatment?.name,
				treatmentCode: treatment?.code ?? treatment?.treatmentCode,
				treatmentPrice: treatment?.price ?? treatment?.treatmentPrice,
			}
		}) : [];

		let grandTotal = 0;
		let itemPrices = formatedTreatments.map((x) => parseFloat(x?.treatmentPrice ?? 0)).reduce((x,y) => x+y,0)

		if (Array.isArray(treatmentData.toothNumber)) {
			let toothArray = treatmentData.toothNumber;
			toothArray.forEach((tooth) => {
				Object.assign(stagedInvoices, { [tooth]: { treatments: formatedTreatments } })
				grandTotal += itemPrices;
			});
		} else {
			Object.assign(stagedInvoices, { [treatmentData.toothNumber]: { treatments: formatedTreatments } })
			grandTotal += itemPrices;
		}

		const request = {
			patientId: activePatient.value?.id,
			appointmentId: activeTreatment.value?.visit_id ?? currentAppointment.value?.id,
			grandTotal: grandTotal.toFixed(2),
			items: stagedInvoices,
			comments: invoiceComment,
			invoiceNumber: 'INV-0001',
			status: 0,
		}
		// console.log(request, formatedTreatments, grandTotal);
		try {
			const response = await customAxios.post('v1/temporary_invoices', request);
			console.table(response.data.payload);
		} catch (error) {
			console.log(error);
		}
	}

	const saveGeneralNote = async (billItem, remark) => {
		// Create general-note record
		const generalRemarkObject = {
			patient_id: activePatient.value?.id,
			tooth_element: billItem.toothElement,
			general_remark_category: "Treatments",
			general_remark_description: remark,
			treatment_ids: billItem.treatments,
			treatment_amounts: billItem.treatmentPrices,
			created_by: JSON.parse(user)?.id,
			updated_by: JSON.parse(user)?.id,
			treatment_status: billItem.treatmentComplete,
			treatment_codes: billItem.treatment_codes,
		};
		// console.log(generalRemarkObject, billItem);
		await customAxios.post("v1/general_remarks", generalRemarkObject);
	};

	provide("confirmationToast", confirmationToast);
	provide("Toast", Toast);
	provide(
		"handleDoneTreatmentResponseSuccess",
		handleDoneTreatmentResponseSuccess
	);
	provide("handleDoneTreatmentResponseError", handleDoneTreatmentResponseError);
	provide("saveDoneTreatment", saveDoneTreatment);
	provide("saveGeneralNote", saveGeneralNote);
	provide("saveTemporaryInvoice", saveTemporaryInvoice);

	return {
		confirmationToast,
		Toast,
		saveGeneralNote,
		saveDoneTreatment,
		saveTemporaryInvoice,
	};
}
