import { DashboardProfileUser } from '@/components/dashboardProfileUser'
import { cookies } from 'next/headers';
import { checkEnvironment } from "@/config/apiUrl";

async function getUsers () {
   const userId = cookies().get("id").value; 
  //  return token;
   const res = await fetch (`${checkEnvironment()}/api/users/${userId}`);
   const data = await res.json();
   return data;
}


export default async function Page() {
  const {data} = await getUsers();
  // console.log(data);
  return (
    <div>
      <DashboardProfileUser dataUser={data} />
    </div>
  )
}
