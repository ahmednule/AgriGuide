import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

const ResourcesLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[93vh] flex bg-emerald-50">
      <aside className=" w-1/5 bg-gradient-to-r p-10 pt-20 from-emerald-800 to-emerald-700 h-full">
        <h2 className="text-emerald-200 text-xl">Resources</h2>
        <h3 className="mt-5 mb-1 text-lg text-emerald-200">
          <FontAwesomeIcon icon={faCaretRight} /> Pests
        </h3>
        <ol className="text-emerald-300 space-y-1">
          <li>
            <Link className="hover:text-emerald-500" href="/resources/aphids">
              Aphid
            </Link>
          </li>
          <li>
            <Link className="hover:text-emerald-500" href="">
              Whiteflies
            </Link>
          </li>
          <li>
            <Link className="hover:text-emerald-500" href="">
              Spider Mites
            </Link>
          </li>
          <li>
            <Link className="hover:text-emerald-500" href="">
              Caterpillars
            </Link>
          </li>
          <li>
            <Link className="hover:text-emerald-500" href="">
              Thrips
            </Link>
          </li>
        </ol>
        <h3 className="mt-3 mb-1  text-lg text-emerald-200">
          <FontAwesomeIcon icon={faCaretRight} /> Diseases
        </h3>
        <ol className="text-emerald-300 space-y-1">
          <li>
            <Link className="hover:text-emerald-500" href="">
              Aphid
            </Link>
          </li>
          <li>
            <Link className="hover:text-emerald-500" href="">
              Whiteflies
            </Link>
          </li>
          <li>
            <Link className="hover:text-emerald-500" href="">
              Spider Mites
            </Link>
          </li>
          <li>
            <Link className="hover:text-emerald-500" href="">
              Caterpillars
            </Link>
          </li>
          <li>
            <Link className="hover:text-emerald-500" href="">
              Thrips
            </Link>
          </li>
        </ol>
      </aside>
      <main className="p-20 w-4/5 h-full overflow-y-scroll text-emerald-900">
        {children}
      </main>
    </div>
  );
};

export default ResourcesLayout;
