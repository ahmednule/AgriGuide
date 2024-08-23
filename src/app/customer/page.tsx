import MobileNav from "@/components/ui/MobileNav";
import { Button, Link } from "@nextui-org/react";

const CustomerPage = () => {
  return (
    <>
      <MobileNav />
      <h1 className="text-3xl text-emerald-800 font-bold">Customer Panel</h1>
      <p className="text-emerald-800 mt-5">
        This panel allows you to easily access your Scan History to review past
        diagnoses, track the status of ongoing scans with the Progress Tracker,
        and connect with experts via the Consultant Chat for personalized
        support.
      </p>
      <div className="gap-3 mt-5 flex flex-wrap">
        <Button
          as={Link}
          href="/customer/scan-history"
          className="!bg-emerald-600 text-white"
        >
          Scan history
        </Button>
        <Button
          as={Link}
          href="/customer/progress-tracker"
          className="!bg-emerald-600 text-white"
        >
          Progress tracker
        </Button>
        <Button
          as={Link}
          href="/customer/contact-consultant"
          className="!bg-emerald-600 text-white"
        >
          Consultant chat
        </Button>
      </div>
    </>
  );
};

export default CustomerPage;
