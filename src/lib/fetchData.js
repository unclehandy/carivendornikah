export async function fetchUser(id) {
    const result = await fetch(
        `http://localhost:3000/api/users/${id}`,
      {
        cache: 'no-store',
      },
    )
    const data = await result.json()
    return data
}