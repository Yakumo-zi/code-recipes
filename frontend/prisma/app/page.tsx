import UserForm from "@/components/UserForm";
import { getAllUsers } from "@/lib/mysql";

export default async function Home() {
  const users = await getAllUsers()
  return (
    <div>
      <div>
        {
          users.map(user => {
            return (
              <div key={user.id}>
                {user.name}--{user.email}
              </div>
            )
          })
        }
      </div>
      <UserForm />
    </div>
  );
}
