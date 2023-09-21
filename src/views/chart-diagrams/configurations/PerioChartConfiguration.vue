<template>
	<TransitionRoot appear :show="openModal" as="template">
		<Dialog as="div" @close="closeGeneralNotesModal" class="relative z-10">
			<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
				leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95">
						<div
							class="w-full max-w-md transform overflow-hidden rounded bg-slate-50 p-4 text-left align-middle shadow-xl transition-all">
							<DialogTitle as="h2"
								class="text-lg font-bold leading-6 text-gray-900 w-full items-center justify-between flex">
								<span>{{ $t('treatments.perioChart') }}
									{{ $t('treatments.configuration',2) }}</span>
								<XCircleIcon class="h-6 text-rose-600" @click="closeModal()" />
							</DialogTitle>

							<div class="w-full flex space-x-1 bg-gray-200 my-2 h-12 text-xs">
								<div @click="changeTab('add')" :class="{
									'border-orange-500 border-b-4 text-orange-500':
										activeTab === 'add',
								}" class="cursor-pointer font-medium leading-6 uppercase w-auto items-center justify-between flex h-full">
									<span class="mx-2">{{ $t('treatments.add') }} {{ $t('treatments.configuration') }}</span>
								</div>
								<div @click="changeTab('view')" :class="{
									'border-orange-500 border-b-4 text-orange-500':
										activeTab === 'view',
								}" class="cursor-pointer font-medium leading-6 uppercase w-auto items-center justify-center flex h-full">
									<span class="mx-2">{{ $t('treatments.view') }} {{ $t('treatments.configuration', 2) }}</span>
								</div>
							</div>

							<div v-if="activeTab === 'add'">
								<DialogTitle as="h5"
									class="text-sm font-normal leading-6 text-gray-900 w-full items-center justify-between flex">
									{{ $t('treatments.configureTeethQuadrants') }}
								</DialogTitle>

								<label for=""
									class="text-xs mt-3 -mb-2 text-slate-500 italic">{{ $t('treatments.name') }}</label>
								<input class="h-12 w-full text-xs pl-2 border rounded" placeholder="Arrangement one"
									v-model="arrangementName" />

								<div class="w-full h-auto grid grid-cols-2 gap-2 mt-2">
									<div
										class="border rounded h-40 hover:bg-orange-500 text-xs flex items-center justify-center hover:text-white"
										v-for="quadrant in quadrants" :key="quadrant.id" :class="{
											'bg-orange-500 text-white': selectedQuadrants.includes(
												quadrant.id
											),
										}" @click="selectQuadrant(quadrant)">
										{{ quadrant.name }}
									</div>
								</div>
								<div class="my-2 text-xs italic">
									{{ $t('treatments.arrangement') }} /
									{{ $t('treatments.order') }} :
									{{ quadrantArrangement.join(", ") }}
								</div>
								<div class="mt-4 w-full flex items-center">
									<button type="submit" v-if="!isSaving" @click="saveConfiguration()"
										class="border w-full border-orange-500 text-orange-500 hover:bg-orange-500 flex space-x-2 items-center justify-center hover:text-white cursor-pointer h-9 p-2 text-sm rounded font-normal">
										<SaveIcon class="h-6" />
										<span>{{ $t('treatments.save') }}</span>
									</button>
									<button type="submit" v-if="isSaving"
										class="border w-full border-orange-500 bg-orange-500 flex space-x-2 items-center justify-center text-white cursor-pointer h-9 p-2 text-sm rounded font-normal">
										<Loader />
										<span>{{ $t('treatments.saving') }}</span>
									</button>
								</div>
							</div>

							<div class="h-[450px] overflow-auto" v-if="activeTab === 'view'">
								<DialogTitle as="h5"
									class="text-xs font-normal leading-6 italic w-full items-center justify-between flex">
									{{ $t('treatments.availableQuadrantSequence') }}
									/ {{ $t('treatments.order',2) }}
								</DialogTitle>

								<div v-for="configuration in configurations" :key="configuration"
									class="flex w-full h-16 items-center border px-2 justify-between rounded my-1">
									<span class="text-xs">{{ configuration.name }}</span>
									<div class="h-full flex items-center space-x-1">
										<div class="h-10 w-10 rounded bg-orange-500 flex items-center justify-center text-white"
											v-for="quadrant in configuration.arrangement.quandrants" :key="quadrant">
											{{ quadrant.replace('quadrant-', '') }}
										</div>
										<div @click="activateArrangement(configuration.arrangement.sequence)" :class="[
											configuration.arrangement.sequence.every(
												(value, index) =>
													value ===
													activeSequence?.[index]
											)
												? 'bg-green-600 text-white'
												: 'text-green-600 bg-slate-200 hover:bg-green-600 hover:text-white',
										]" class="cursor-pointer h-10 w-10 rounded flex items-center justify-center">
											<CheckCircleIcon class="h-5 w-6" />
										</div>
										<div
											class="cursor-pointer h-10 w-10 rounded flex items-center justify-center text-red-600 bg-slate-200 hover:bg-red-600 hover:text-white">
											<TrashIcon class="h-5 w-6" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
import {
	onMounted,
	onBeforeMount,
	shallowRef,
	ref,
	inject,
	watch,
	computed,
	provide,
} from "vue";
import { useStore } from "vuex";
// import customAxios from "../../../custom-axios";
import customAxios from "../../../axios";
import moment from "moment";
import BigLoader from "../BigLoader.vue";
import Loader from "../BigLoader.vue";
import {
	EyeIcon,
	ClockIcon,
	UserIcon,
	PlusCircleIcon,
	CogIcon,
	XCircleIcon,
	DocumentAddIcon,
	XIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CheckCircleIcon,
	SaveIcon,
	PencilAltIcon,
	TrashIcon,
} from "@heroicons/vue/outline";
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
	DialogTitle,
} from "@headlessui/vue";
import { SelectorIcon } from "@heroicons/vue/solid";
// import Images from "";
import useConstants from "../composables/charting/constants";

// async function fetchImages() {
// 	return await import('../../assets/data/images.json');
// }


const activeTab = ref("add");

const changeTab = (tab) => (activeTab.value = tab);

const configurations = ref([]);

const quadrants = ref([
	{
		id: "quadrant-1",
		name: "Quadrant 1",
		array: ["11", "12", "13", "14", "15", "16", "17", "18"],
	},
	{
		id: "quadrant-2",
		name: "Quadrant 2",
		array: ["21", "22", "23", "24", "25", "26", "27", "28"],
	},
	{
		id: "quadrant-3",
		name: "Quadrant 3",
		array: ["31", "32", "33", "34", "35", "36", "37", "38"],
	},
	{
		id: "quadrant-4",
		name: "Quadrant 4",
		array: ["41", "42", "43", "44", "45", "46", "47", "48"],
	},
]);

const swal = inject("$swal");

const selectedTeeth = ref([]);

const isSaving = ref(false);

const openModal = ref(false);

const loadingConfigurations = ref(true);

const arrangementName = ref("");

const selectedQuadrants = ref([]);

const quadrantArrangement = ref([]);

const activeSequence = inject('activeSequence');

const selectQuadrant = (quadrant) => {
	let indexOfQuadrant = selectedQuadrants.value.indexOf(quadrant.id);
	if (!selectedQuadrants.value.includes(quadrant.id))
		selectedQuadrants.value.push(quadrant.id);
	else if (indexOfQuadrant !== -1)
		selectedQuadrants.value.splice(indexOfQuadrant, 1);
	let teeth = [];
	selectedQuadrants.value.forEach((q) =>
		quadrants.value
			.find((el) => el.id === q)
			.array.forEach((tooth) => teeth.push(tooth))
	);
	quadrantArrangement.value = [...new Set(teeth)];
};

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const saveConfiguration = async () => {
	if (quadrantArrangement.value.length !== 32) {
		alert(
			`${t('treatments.beSureToSelectTheQuadrants')
			}`
		);
		return;
	}
	if (arrangementName.value === "") {
		alert(
			`${t('treatments.beSureToEnterName')
			}.`
		);
		return;
	}
	isSaving.value = true;
	let teeth = [];
	selectedQuadrants.value.forEach((q) =>
		quadrants.value
			.find((el) => el.id === q)
			.array.forEach((tooth) => teeth.push(tooth))
	);
	let configurationObject = {
		name: arrangementName.value,
		arrangement: { quandrants: [...new Set(selectedQuadrants.value)], sequence: teeth },
	};
	const response = await customAxios.post(
		"v1/perio_configurations",
		configurationObject
	);
	// quadrantArrangements.value = response.data.payload;
	configurations.value = response.data.payload;
	isSaving.value = false;
};

const activateArrangement = (sequence) => activeSequence.value = sequence;

const confirmationToast = swal?.mixin({
	title: `${t('treatments.youSure')}`,
	text: `${t('treatments.wontRevertText')
		}`,
	icon: `${t('treatments.warning')}`,
	showCancelButton: true,
	confirmButtonText: `${t('treatments.yesProceed')
		}`,
	cancelButtonText: `${t('treatments.noCancel')
		}`,
	reverseButtons: true,
});

const Toast = swal?.mixin({
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

const getTreatmentStatus = (id) =>
	treatmentStatuses.find((status) => status.id === id)?.["name"];

const showModal = () => (openModal.value = true);

const closeModal = () => (openModal.value = false);

const saveGeneralRemark = async () => {
	const perioConfiguration = {
		name: activePatient.value?.id,
		arrangement: selectedTooth.value,
	};
	isSaving.value = true;
	const response = await customAxios.post(
		"v1/perio_configurations",
		perioConfiguration
	);
	const { payload } = response?.data;
	if (typeof payload !== "undefined" && Array.isArray(payload)) {
		allGeneralRemarks.value = payload;
		const filteredPayload =
			selectedTeeth.value.length === 0
				? payload
				: payload.filter((item) =>
					selectedTeeth.value.includes(parseInt(item.tooth_element))
				);
		generalRemarks.value = filteredPayload;
	}
	isSaving.value = false;
	addGeneralNotesModal.value = false;
};
const fetchConfigurations = async () => {
	const response = await customAxios.get("v1/perio_configurations");
	configurations.value = response.data.payload;
};

onMounted(() => {
	fetchConfigurations();
});

defineExpose({ showModal, closeModal });
</script>

<style scoped>

</style>
