import React from "react";
import { useFormStatus } from "react-dom";
import ReactMarkdown from "react-markdown";

const ScanResponse = ({ response, isScanSuccess }: { response: string, isScanSuccess: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <>
      {isScanSuccess &&
        (!pending ? (
          <div>
            <h3 className="text-lg font-bold mb-4 text-emerald-950">
              Response
            </h3>
            <div className="markdown-content">
              <ReactMarkdown className="bg-emerald-200 text-wrap p-5 rounded-xl">
                {response}
              </ReactMarkdown>
            </div>
          </div>
        ) : null)}
    </>
  );
};

export default ScanResponse;
