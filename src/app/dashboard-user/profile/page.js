import { DashboardProfileUser } from '@/components/dashboardProfileUser'
import { cookies } from 'next/headers';

async function getUsers () {
   const userId = cookies().get("id").value; 
  //  return token;
   const res = await fetch (`http://localhost:3000/api/users/${userId}`);
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
