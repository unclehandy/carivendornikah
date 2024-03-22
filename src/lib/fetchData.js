import { checkEnvironment } from "@/config/apiUrl"

export async function fetchUser(id) {
    const result = await fetch(
        `${checkEnvironment()}/api/users/${id}`,
      {
        cache: 'no-store',
      },
    )
    const data = await result.json()
    return data
}