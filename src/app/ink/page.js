"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/components/Cards/DisplayCards";

export default function IncomePage() {
  return (
    <main className="w-full min-h-[calc(100vh-80px)]">
      <div className="h-full text-[#d2d2d2] bg-[#333333] p-8 flex justify-center items-center gap-4 flex-col md:flex-row">
        <Card className={`w-full bg-[#232323]`}>
          <CardHeader className={`bg-[#232323]`}>Planned</CardHeader>
          <CardBody className={`bg-[#232323] h-[168px] flex items-center justify-center`}>
            <p className="text-5xl font-bold text-center text-[#d2d2d2]">
              #<span className=" md:text-7xl">123123</span>
            </p>
          </CardBody>
          <CardFooter className={`bg-[#232323]`}></CardFooter>
        </Card>
        <Card className={`w-full bg-[#232323]`}>
          <CardHeader className={`bg-[#232323]`}>Actual</CardHeader>
          <CardBody className={`bg-[#232323] h-[168px] flex items-center justify-center`}>
            <p className="text-5xl font-bold text-center text-[#d2d2d2]">
              #<span className=" md:text-7xl">123123</span>
            </p>
          </CardBody>
          <CardFooter className={`bg-[#232323]`}></CardFooter>
        </Card>
        <Card className={`w-full bg-[#232323]`}>
          <CardHeader className={`bg-[#232323]`}>Graph</CardHeader>
          <CardBody className={`bg-[#232323] h-[168px] flex items-center justify-center`}>
            <p className="text-5xl font-bold text-center text-[#d2d2d2]">
              #<span className=" md:text-7xl">123123</span>
            </p>
          </CardBody>
          <CardFooter className={`bg-[#232323]`}></CardFooter>
        </Card>
      </div>
    </main>
  );
}
