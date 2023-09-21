import { provide, ref } from "vue";
import moment from "moment";
import customAxios from "./custom-axios";
import Swal from "sweetalert2";
import { useStore } from "vuex";

export default function addNewPatientFunctionality() {
  const store = useStore();
  const patient = JSON.parse(localStorage.getItem("patient"));
  const patientId = patient.id;
  const pDetails = ref({
    pFname: "",
    pLname: "",
    pOname: "",
    pPhone: "",
    pSecPhone: "",
    pEmail: "",
    pRelation: "",
    pImage: null,
    pCsn: null,
    pGender: "",
    pNationality: "",
    pCountry: "",
    pRegion: "",
    pPostalCode: "",
    pHomeAddress: "",
    pState: "",
    pStreet: "",
    pMaritalStatus: "",
    pDob: null,
  });

  const pRelationships = ref([
    { gname: "mother", gkey: "mother", name: "mother" },
    { gname: "father", gkey: "father", name: "father" },
    { gname: "brother", gkey: "brother", name: "brother" },
    { gname: "sister", gkey: "sister", name: "sister" },
    { gname: "spouse", gkey: "spouse", name: "spouse" },
    { gname: "cousin", gkey: "cousin", name: "cousin" },
    { gname: "daughter", gkey: "daughter", name: "daughter" },
    { gname: "son", gkey: "son", name: "son" },
    { gname: "uncle", gkey: "uncle", name: "uncle" },
    { gname: "aunt", gkey: "aunt", name: "aunt" },
    { gname: "grandparent", gkey: "grandparent", name: "grandparent" },
  ]);
  const pMaritalStatuses = ref([
    { name: "single", id: "single" },
    { name: "married", id: "married" },
    { name: "divorced", id: "divorced" },
    { name: "engaged", id: "engaged" },
    { name: "separated", id: "separated" },
  ]);
  const pGenders = ref([
    { name: "male", id: "male" },
    { name: "female", id: "female" },
  ]);

  const messages = ref({
    pFnameMissing: false,
    pLnameMissing: false,
    pOnameMissing: false,
    pPhoneMissing: false,
    pEmailMissing: false,
    pRelationMissing: false,
    pNationalityMissing: false,
    pImageMissing: false,
    pGenderMissing: false,
    pMaritalStatusMissing: false,
    pCsnMissing: false,
    pDobMissing: false,
    pCountryMissing: false,
    pRegionMissing: false,
    pPostalCodeMissing: false,
    pHomeAddressMissing: false,
    pStateMissing: false,
    pStreetMissing: false,
    addSuccess: "",
    mainErrorMessage: "",
  });

  const newMemberPreview = ref(null);
  const onProfileChange = async (event) => {
    if (event.target.files.length > 0) {
      pDetails.value.pImage = event.target.files[0];
      let src = URL.createObjectURL(event.target.files[0]);
      newMemberPreview.value.src = src;
    }
  };

  const patientImageKey = ref(0);

  const clearPatientImage = () => {
    patientImageKey.value = patientImageKey.value++;
    pDetails.value.pImage = null;
    newMemberPreview.value.src = null;
  };

  const submitPatientDetails = async () => {
    if (!pDetails.value.pFname) {
      messages.value.pFnameMissing = true;
      return;
    }
    if (!pDetails.value.pLname) {
      messages.value.pLnameMissing = true;
      return;
    }
    if (!pDetails.value.pPhone) {
      messages.value.pPhoneMissing = true;
      return;
    }
    if (!pDetails.value.pEmail) {
      messages.value.pEmailMissing = true;
      return;
    }
    if (!pDetails.value.pRelation) {
      messages.value.pRelationMissing = true;
      return;
    }
    if (!pDetails.value.pGender) {
      messages.value.pGenderMissing = true;
      return;
    }
    if (!pDetails.value.pMaritalStatus) {
      messages.value.pMaritalStatusMissing = true;
      return;
    }
    if (!pDetails.value.pDob) {
      messages.value.pDobMissing = true;
      return;
    } else if (moment(!pDetails.value.pDob).isValid()) {
      messages.value.pDobMissing = true;
      return;
    }
    if (!pDetails.value.pCsn) {
      messages.value.pCsnMissing = true;
      return;
    }
    if (!pDetails.value.pNationality) {
      messages.value.pNationalityMissing = true;
      return;
    }
    if (!pDetails.value.pCountry) {
      messages.value.pCountryMissing = true;
      return;
    }
    if (!pDetails.value.pRegion) {
      messages.value.pRegionMissing = true;
      return;
    }
    if (!pDetails.value.pPostalCode) {
      messages.value.pPostalCodeMissing = true;
      return;
    }
    if (!pDetails.value.pHomeAddress) {
      messages.value.pHomeAddressMissing = true;
      return;
    }
    if (!pDetails.value.pState) {
      messages.value.pStateMissing = true;
      return;
    }
    if (!pDetails.value.pStreet) {
      messages.value.pStreetMissing = true;
      return;
    }

    const formData = new FormData();
    formData.append("patientId", parseInt(patientId));
    formData.append("firstName", pDetails.value.pFname);
    formData.append("lastName", pDetails.value.pLname);
    formData.append("middleName", pDetails.value.pOname);
    formData.append("email", pDetails.value.pEmail);
    formData.append("phoneNumber", pDetails.value.pPhone);
    formData.append("secondPhoneNumber", pDetails.value.pSecPhone);
    formData.append("citizenServiceNumber", pDetails.value.pCsn);
    formData.append("maritalStatus", pDetails.value.pMaritalStatus);
    formData.append("nationality", pDetails.value.pNationality);
    formData.append("country", pDetails.value.pCountry);
    formData.append("state", pDetails.value.pState);
    formData.append("street", pDetails.value.pStreet);
    formData.append("region", pDetails.value.pRegion);
    formData.append("homeAddress", pDetails.value.pHomeAddress);
    formData.append("gender", pDetails.value.pGender);
    formData.append("dateOfBirth", pDetails.value.pDob);
    formData.append("postalCode", pDetails.value.pPostalCode);
    formData.append("relationToPatient", pDetails.value.pRelation);
    if (pDetails.value.pImage) {
      formData.append("imagePath", pDetails.value.pImage);
    }

    const response = await customAxios.post(
      "v2/family_members/add_as_new_patient",
      formData
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
      messages.value.addSuccess = data.payload;
      swalWithBootstrapButtons
        .fire({
          title: "Success!!",
          text: messages.value.addSuccess,
          icon: "success",
          confirmButtonText: "Ok",
        })
        .then((result) => {
          if (result.isConfirmed) {
            store.dispatch("fetchAllFamilyMembers");
            document.getElementById("closeNewPatient").click();
          }
        });
    } else {
      messages.value.mainErrorMessage = data.payload;
      swalWithBootstrapButtons
        .fire({
          title: "Error!!",
          text: messages.value.mainErrorMessage,
          icon: "warning",
          confirmButtonText: "Ok",
        })
        .then((result) => {
          if (result.isConfirmed) {
            store.dispatch("fetchAllFamilyMembers");
            document.getElementById("closeNewPatient").click();
          }
        });
    }
  };

  provide("pDetails", pDetails);
  return {
    pDetails,
    pRelationships,
    pGenders,
    pMaritalStatuses,
    submitPatientDetails,
    messages,
    onProfileChange,
    newMemberPreview,
    clearPatientImage,
    patientImageKey,
  };
}
