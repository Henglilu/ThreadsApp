import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";



async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
    return null;
  }

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // get activities
  const activity = await getActivity(userInfo._id);


      return (
      <section>
          <h1 className="head-text mb-10">Activity</h1>

          <section className="mt-top-10 flex flex-col gap-5">
            {activity.length > 0 ? (
              <>
              {activity.map((activity) => (
                <Link
                key={activity._id}
                href={`/thread/${activity.parentId}`}
                >
                  <article className="activity-card">
                    <Image 
                      src={activity.author.image}
                      alt="profile pic"
                      width={20}
                      height={20}
                      className="rounded-full object-full"
                    />
                    <p className="!text-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">
                        {activity.author.name}
                      </span>{''}
                      replied to your thread
                    </p>
                  </article>
                </Link>
              ))}
              </>
            ): <p className="!text-base-regular text-light-3"> No Activity yet</p>}

          </section>
      </section>
    )
  }
  
  export default Page