import { computed, watch, onMounted, ref, provide } from "vue";
import { useStore } from "vuex";
import moment from "moment";

export default function useQueueComposable() {

  const currentAppointmentInServing = ref(null);

  const store = useStore();

  const servingRoomAppointments = computed(() => store.state.appointments.servingroom);

  function getCurrentAppointment() {
    const allAppointments = (typeof servingRoomAppointments.value !== 'undefined') ? [...servingRoomAppointments.value] : [];
    let currentAppointment = allAppointments.filter(
      (appointment) => appointment.status_id === 7
    );
    currentAppointment.forEach((el) => {
      el["updatedTime"] = moment(el["updated-at"]).format("hh:mm a");
      el["updatedDate"] = moment(el["updated-at"]).format("LL");
    });
    // currentAppointment.forEach((element) =>
    //   element.slots.map((el) => {
    //     el["start"] = el["start-time"];
    //     el["end"] = el["end-time"];
    //     return currentAppointment;
    //   })
    // );
    return currentAppointment;
  }
  
  watch(servingRoomAppointments, () => {
    currentAppointmentInServing.value = getCurrentAppointment();
  })

  provide("servingRoomAppointments", servingRoomAppointments)

  return {
    servingRoomAppointments,
  }

  // onMounted(() => { 
  //   getCurrentAppointment();
  //   console.log(currentAppointmentInServing)
  // });
}