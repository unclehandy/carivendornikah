import { DashboardProfileUser } from '@/components/dashboardProfileUser'
import { cookies } from 'next/headers';

async function getUsers () {
   const token = cookies().get("token").value; 
  //  return token;
   const res = await fetch ("http://localhost:3000/api/users",{
    headers: {
      Authorization : `Bearer ${token}`
    }
   });
   const data = await res.json();
   return data;
}

export default async function Page() {
 
  return (
    <div>
      <DashboardProfileUser />
    </div>
  )
}
