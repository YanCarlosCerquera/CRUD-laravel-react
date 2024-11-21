
import Swal from "sweetalert2";
import "assets/styles/swal-style.css"

// This will add '.cc-swal2-zindex9999' class to Swal container element
// import "../../../assets/styles/swal-style.css"
// const swalLoginRegisterAlert = Swal.misin({
//   customClass: {
//     container: "cc-swal2-zindex9999",
//   }
// })

// This will add 'z-index' style to Swal container element
const ccSwalZindex = {
  zIndex: 99999,
};
const swalLoginRegisterAlert = Swal.mixin({
  willOpen: () => {
    const container = Swal.getContainer();
    Object.assign(container.style, ccSwalZindex);
  },
});

const swalLWithZIndexAlert = Swal.mixin({
  willOpen: () => {
    const container = Swal.getContainer();
    Object.assign(container.style, ccSwalZindex);
  },
});

// swalWithBootstrapButtons.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonText: "Yes, delete it!",
//   cancelButtonText: "No, cancel!",
//   reverseButtons: true
// }).then((result) => {
//   if (result.isConfirmed) {
//     swalWithBootstrapButtons.fire({
//       title: "Deleted!",
//       text: "Your file has been deleted.",
//       icon: "success"
//     });
//   } else if (
//     /* Read more about handling dismissals below */
//     result.dismiss === Swal.DismissReason.cancel
//   ) {
//     swalWithBootstrapButtons.fire({
//       title: "Cancelled",
//       text: "Your imaginary file is safe :)",
//       icon: "error"
//     });
//   }
// });

export {swalLoginRegisterAlert, swalLWithZIndexAlert};