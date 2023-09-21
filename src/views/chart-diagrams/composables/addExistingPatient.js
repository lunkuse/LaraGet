import { ref } from "vue";
import customAxios from "./custom-axios";
import Swal from "sweetalert2";
import { useStore } from "vuex";

export default function addExistingPatientFunctionality() {
  const store = useStore();
  const patient = JSON.parse(localStorage.getItem("patient"));
  const patientId = patient.id;
  const selectedPatient = ref("");
  const message = ref("Added patient Successfully");
  const error = ref("");

  const submitExistingPatientDetails = async () => {
    const details = {
      selectedPatientId: selectedPatient.value.id,
      currentPatientId: patientId,
    };
    const response = await customAxios.post(
      "v2/family_members/add_as_existing_patient",
      details
    );
    let data = response.data;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    if (data.status === "SUCCESS") {
      message.value = "Patient Added Successfully";
      swalWithBootstrapButtons
        .fire({
          title: "Success!!",
          text: message.value,
          icon: "success",
          confirmButtonText: "Ok",
        })
        .then((result) => {
          if (result.isConfirmed) {
            store.dispatch("fetchAllFamilyMembers");
            document.getElementById("closeExistingPatient").click();
          }
        });
    } else {
      error.value = data.payload;
      swalWithBootstrapButtons
        .fire({
          title: "Error!!",
          text: error.value,
          icon: "warning",
          confirmButtonText: "Ok",
        })
        .then((result) => {
          if (result.isConfirmed) {
            store.dispatch("fetchAllFamilyMembers");
            document.getElementById("closeExistingPatient").click();
          }
        });
    }
  };

  return {
    submitExistingPatientDetails,
    selectedPatient,
    message,
    error,
  };
}
