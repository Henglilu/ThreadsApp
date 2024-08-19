import PostThread from "@/components/forms/poshThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();

    if (!user) {
      redirect("/login");
      return null;
    }

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');

  return  (
    <>

  <h1 className="head-text">Create Thread</h1>

  <PostThread userId={userInfo._id}/>
  </>
  )
}

export default Page;
