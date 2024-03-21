import { EditUser } from "./editUser"

export const ModalUser = ({user}) => {


  return (

    <>
    <dialog id="modalEditUser" className="modal">
       <div className="modal-box lg:max-w-xl  bg-gray-400">
         <form method="dialog">
           <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
             ✕
           </button>
         </form>
         <div>
           <form method="dialog">
             <EditUser user={user}/>
           </form>
         </div>
       </div>
     </dialog>
   </>
 )
  
}
