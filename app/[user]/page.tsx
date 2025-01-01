import { BlogPosts } from "app/components/posts";
import { ENS_RESOLVER, NETWORK_CONFIG } from "lib/consts";
import { ENSProfile, PostWithMetadata } from "lib/interfaces";
import { getPosts } from "lib/getPosts";
import _ from "lodash";
import Image from "next/image";

const getUserDetails = async (user: string) => {
  const res = await fetch(ENS_RESOLVER + `/${user}`);
  return res.json();
};

const getPostsWithMetadata = (
  postsRaw: any[],
  userDetails: { ens_primary?: string; address: string },
): PostWithMetadata[] => {
  return _.chain(postsRaw)
    .map((item) => {
      const decodedData = JSON.parse(item.decodedDataJson);

      return {
        title: _.get(decodedData[0], "value.value"),
        content: _.get(decodedData[1], "value.value"),
        metadata: {
          chainId: 1, // Ethereum mainnet
          hash: item.txid,
          publishedAt: item.timeCreated,
          author: userDetails.ens_primary || userDetails.address,
        },
      };
    })
    .value() as PostWithMetadata[];
};

export default async function User({ params }) {
  const { user } = params;
  const userDetails = (await getUserDetails(user)) as ENSProfile;
  const postsRaw = await getPosts(userDetails.address);

  const posts = getPostsWithMetadata(postsRaw, userDetails);

  return (
    <section>
      <div>
        <Image
          src={`https://api.ensdata.net/media/avatar/${user}`}
          alt={userDetails.ens}
          width={100}
          height={100}
        />
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          {userDetails.ens ||
            `${userDetails.address.slice(0, 6)}...${userDetails.address.slice(-4)}`}
        </h1>
      </div>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts posts={posts} />
    </section>
  );
}
