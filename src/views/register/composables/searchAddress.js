import Swal from "sweetalert2";
import axios from "axios";
import {useI18n} from "vue-i18n";
import {computed} from "vue";


export default function searchAddress() {
  const {t} = useI18n();
  const swal = Swal.mixin({
    position: "top-end",
    toast: true,
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 3000,
    showCloseButton: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    buttonsStyling: true,
  });

  const searchHome = async (postCode, houseNumber, houseExt) => {
console.log('full address',postCode, houseNumber, houseExt)
    let streetNumberAndPremise = houseNumber + " " + houseExt;
    const authKey = "wdCQOdGg74MQAMah"
    if(streetNumberAndPremise){
    try {
      const { data, status } = await axios.get("https://api.pro6pp.nl/v2/autocomplete/nl",
      {
          params: { authKey, postalCode: postCode, streetNumberAndPremise},
        }
      );
    
      if (status === 200) {
        swal.fire({
          title: t('translation.forms.success'),
          text: t('translation.forms.addressFound'),
          icon: "success",
        });

        return { street: data?.street, municipality: data?.municipality, province: data?.province, ext: data?.premise, country: data?.country, countryCode: data?.countryCode};
      }
      
    } catch (err) {
      swal.fire({
        title: t('translation.forms.warning'),
        text: t('translation.forms.addressNotFound'),
        icon: "warning",
      });
    }
    swal.fire({
      title: t('translation.forms.warning'),
      text: t('translation.forms.addressNotFound'),
      icon: "warning",
    });
    console.log('address status')
    return null;
  }
  };

  return {
    searchHome,
  };
}
