// import { type NextPage } from "next";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useState } from "react";

// import { api } from "../../utils/api";

// const Home: NextPage = () => {
//   const editCollection = api.collectionsRouter.editCollection.useMutation();
//   const router = useRouter();
//   const [collection, setCollection] = useState<string>("");

//   const handleCreateCollection = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Creating Collection");
//     await editCollection.mutateAsync({ name: collection });
//     await router.push("/collections/list-collections");
//   };

//   return (
//     <>
//       <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
//         <Link href="/">Home</Link>
//         <h1 className="text-white">Create a collection</h1>
//         <form onSubmit={handleCreateCollection} className="flex flex-col gap-4">
//           <label className={"text-white"} htmlFor="collection">
//             Collection Name
//           </label>
//           <input
//             id="collection-name"
//             className={"p-2 text-black"}
//             value={collection}
//             onChange={(e) => setCollection(e.target.value)}
//             required
//           />
//           <button className="bg-white text-black">Create</button>
//         </form>
//       </main>
//     </>
//   );
// };

// export default Home;
