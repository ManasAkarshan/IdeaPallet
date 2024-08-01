"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../public/logo.png";
import { ArrowRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { BallTriangle, Circles} from "react-loader-spinner";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.push("/dashboard");
      }
      setLoading(false);
    }
  }, [isSignedIn, isLoaded, router]);

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center"> <Circles height={100} width={100} color="cyan"/> </div>
      ) : (
        <div
          className=" flex flex-col min-h-screen"
          style={{
            background: "#232526",
            background: "-webkit-linear-gradient(to right, #232526, #414345)",
            background: "linear-gradient(to right, #232526, #414345)",
          }}
        >
          <div className="w-full flex justify-between items-center min-h-[5vh] p-2 px-10 max-sm:px-3 bg-secondary shadow-md">
            <Image src={logo} width={50} height={50}></Image>
          </div>

          <div className="mx-auto max-w-[1280px] flex justify-between gap-20 max-sm:flex-col max-sm:justify-center max-sm:items-center lg:mt-16 mt-32">
            {/* Left */}
            <div className="basis-1/2 px-3 flex flex-col justify-center gap-4 max-sm:items-center">
              <p className="text-6xl flex">
                Idea <span className="text-cyan-500 ">Pallet</span>
                <Image
                  src={logo}
                  className="ml-4"
                  width={60}
                  height={40}
                ></Image>
              </p>
              <p className="max-sm:text-center">
                IdeaPallet is an AI-powered content generator that helps you
                create high-quality articles, blog posts, and other written
                materials on a wide range of topics. Whether you are looking for
                inspiration or need to quickly generate engaging content,
                ContentCanvas makes it easy to produce well-structured text in
                seconds.
              </p>
              <Button
                onClick={() => router.push("/dashboard")}
                className="mx-auto w-40 py-4 "
              >
                Get Started
                <ArrowRight className="ml-1" />
              </Button>
            </div>
            {/* Right */}
            <div className="basis-1/2 flex max-sm:justify-center ">
              <img
                src="/news.png"
                className="w-full h-full max-sm:w-[60%]"
              ></img>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
