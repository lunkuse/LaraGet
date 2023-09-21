
import Swal from "sweetalert2";


export function sweatAlertToast({position,titling,moreOb,icon}) {
  let moreOb1=moreOb??{}
  Swal.fire({
    position: position??'top-end',
    icon: icon??'success',
    title: titling??'Your work has been saved',
    showConfirmButton: false,
    timer: 7000,
    toast: true,
    showCloseButton: true,
    showClass: {
      popup: 'swal2-show'
    },
    buttonsStyling: true,
    ...moreOb1
  })
}

export function sweatAlertConfirm({text,titling,moreOb},confiredAction) {
    let moreOb1=moreOb??{}
console.log('in ')
Swal.fire({
    title: titling??'Are you sure?',
    text: text??"You won't be able to revert this!",
    // text: text??'warning',
    showCancelButton: true,
    confirmButtonColor: '#ff5000',
    cancelButtonColor: 'rgb(221, 51, 51)',
    confirmButtonText: 'Confirm!',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    buttonsStyling: true,
    timer: 8500,
     ...moreOb1,
  }).then((result) => {
    if (result.isConfirmed) {
      if(typeof confiredAction=='function')
        confiredAction()
      
    }
  })
}

    ////