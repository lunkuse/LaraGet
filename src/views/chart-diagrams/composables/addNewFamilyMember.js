import { provide, ref } from "vue";
import moment from "moment";
import customAxios from "./custom-axios";
import Swal from "sweetalert2";
import { useStore } from "vuex";

export default function addFamilyMemberFunctionality() {
  const store = useStore();
  const patient = JSON.parse(localStorage.getItem("patient"));
  const patientId = patient.id;
  const fDetails = ref({
    fFname: "",
    fLname: "",
    fOname: "",
    fSecPhone: "",
    fPhone: "",
    fEmail: "",
    fRelation: "",
    fImage: null,
    fCsn: null,
    fGender: "",
    fNationality: "",
    fCountry: "",
    fRegion: "",
    fPostalCode: "",
    fHomeAddress: "",
    fState: "",
    fStreet: "",
    fMaritalStatus: "",
    fDob: null,
  });

  const fRelationships = ref([
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
  const fMaritalStatuses = ref([
    { name: "single", id: "single" },
    { name: "married", id: "married" },
    { name: "divorced", id: "divorced" },
    { name: "engaged", id: "engaged" },
    { name: "separated", id: "separated" },
  ]);
  const fGenders = ref([
    { name: "male", id: "male" },
    { name: "female", id: "female" },
  ]);
  const messages = ref({
    fFnameMissing: false,
    fLnameMissing: false,
    fOnameMissing: false,
    fPhoneMissing: false,
    fEmailMissing: false,
    fRelationMissing: false,
    fNationalityMissing: false,
    fImageMissing: false,
    fGenderMissing: false,
    fMaritalStatusMissing: false,
    fCsnMissing: false,
    fDobMissing: false,
    fCountryMissing: false,
    fRegionMissing: false,
    fPostalCodeMissing: false,
    fHomeAddressMissing: false,
    fStateMissing: false,
    fStreetMissing: false,
    addSuccess: "",
    mainErrorMessage: "",
  });

  const memberPreview = ref(null);
  const onFileChange = async (event) => {
    if (event.target.files.length > 0) {
      fDetails.value.fImage = event?.target?.files[0];
      let src = URL.createObjectURL(event.target.files[0]);
      memberPreview.value.src = src;
      // preview.style.display = "block";
    }
  };
  const famImageKey = ref(0);

  const clearFamImage = () => {
    famImageKey.value = famImageKey.value++;
    fDetails.value.fImage = null;
    memberPreview.value.src = null;
  };

  const submitFamilyMemberDetails = async () => {
    if (!fDetails.value.fFname) {
      messages.value.fFnameMissing = true;
      return;
    }
    if (!fDetails.value.fLname) {
      messages.value.fLnameMissing = true;
      return;
    }
    if (!fDetails.value.fPhone) {
      messages.value.fPhoneMissing = true;
      return;
    }
    if (!fDetails.value.fEmail) {
      messages.value.fEmailMissing = true;
      return;
    }
    if (!fDetails.value.fRelation) {
      messages.value.fRelationMissing = true;
      return;
    }
    if (!fDetails.value.fCsn) {
      messages.value.fCsnMissing = true;
      return;
    }
    if (!fDetails.value.fGender) {
      messages.value.fGenderMissing = true;
      return;
    }
    if (!fDetails.value.fNationality) {
      messages.value.fNationalityMissing = true;
      return;
    }
    if (!fDetails.value.fCountry) {
      messages.value.fCountryMissing = true;
      return;
    }
    if (!fDetails.value.fRegion) {
      messages.value.fRegionMissing = true;
      return;
    }
    if (!fDetails.value.fPostalCode) {
      messages.value.fPostalCodeMissing = true;
      return;
    }
    if (!fDetails.value.fHomeAddress) {
      messages.value.fHomeAddressMissing = true;
      return;
    }
    if (!fDetails.value.fState) {
      messages.value.fStateMissing = true;
      return;
    }
    if (!fDetails.value.fStreet) {
      messages.value.fStreetMissing = true;
      return;
    }
    if (!fDetails.value.fMaritalStatus) {
      messages.value.fMaritalStatusMissing = true;
      return;
    }
    if (!fDetails.value.fDob) {
      messages.value.fDobMissing = true;
      return;
    } else if (moment(!fDetails.value.fDob).isValid()) {
      messages.value.fDobMissing = true;
      return;
    }

    const formData = new FormData();
    formData.append("patientId", parseInt(patientId));
    formData.append("firstName", fDetails.value.fFname);
    formData.append("lastName", fDetails.value.fLname);
    formData.append("middleName", fDetails.value.fOname);
    formData.append("email", fDetails.value.fEmail);
    formData.append("phoneNumber", fDetails.value.fPhone);
    formData.append("secondPhoneNumber", fDetails.value.fSecPhone);
    formData.append("citizenServiceNumber", fDetails.value.fCsn);
    formData.append("maritalStatus", fDetails.value.fMaritalStatus);
    formData.append("nationality", fDetails.value.fNationality);
    formData.append("country", fDetails.value.fCountry);
    formData.append("state", fDetails.value.fState);
    formData.append("street", fDetails.value.fStreet);
    formData.append("region", fDetails.value.fRegion);
    formData.append("homeAddress", fDetails.value.fHomeAddress);
    formData.append("gender", fDetails.value.fGender);
    formData.append("dateOfBirth", fDetails.value.fDob);
    formData.append("postalCode", fDetails.value.fPostalCode);
    formData.append("relationToPatient", fDetails.value.fRelation);
    if (fDetails.value.fImage) {
      formData.append("imagePath", fDetails.value.fImage);
    }

    const response = await customAxios.post(
      "v2/family_members/create",
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
      messages.value.addSuccess = "Added family member successfully";
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
            document.getElementById("closeFamilyMember").click();
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
            document.getElementById("closeFamilyMember").click();
          }
        });
    }
  };
  provide("fDetails", fDetails);
  return {
    fDetails,
    fRelationships,
    fMaritalStatuses,
    fGenders,
    submitFamilyMemberDetails,
    messages,
    onFileChange,
    memberPreview,
    clearFamImage,
    famImageKey,
  };
}
