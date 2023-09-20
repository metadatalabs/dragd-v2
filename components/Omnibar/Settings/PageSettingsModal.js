import React, { useState } from "react";
import GenericModal from "../../UI/GenericModal";
import { ErrorText } from "../../ui-helpers";
import { deleteSite, updateSite } from "../../DataProvider";
import { useRouter } from "next/navigation";
import { DeployToIpfs } from "./SiteSettings";
import KVPEditor from "./KVPEditor";
import NameUpdater from "./SettingsModules/NameUpdater";

const pages = ["Page Settings", "Site Settings", "Delete"];
export default function PageSettingsModal({ siteData, onComplete }) {
  const [page, setPage] = useState(pages[0]);
  return (
    <GenericModal onDone={() => onComplete()}>
      <div className="card-actions justify-end -mx-2 -mt-4">
        <button
          onClick={() => {
            onComplete();
          }}
          className="btn btn-square btn-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="tabs w-full -mt-5 mb-3">
        {pages.map((item, index) => {
          return (
            <a
              className={`tab tab-bordered ${item == page ? "tab-active" : ""}`}
              onClick={() => setPage(item)}
            >
              {item}
            </a>
          );
        })}
        <a className="cursor-default tab tab-bordered flex grow pointer-events-none"></a>
      </div>

      {page == pages[0] && (
        <>
          <div className={"flex flex-col items-center space-y-2"}>
            <NameUpdater siteData={siteData} />
            <ChangeTheme />
            <AccessControls />
            <HeadUpdater siteData={siteData} />
            <DevTools siteData={siteData} />
          </div>
        </>
      )}

      {page == pages[1] && (
        <>
          <div className="alert shadow-xs p-2 text-xs mb-2">
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info flex-shrink-0 w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="pl-2">
                Site settings affect all pages under <b>{siteData.siteName}</b>
              </span>
            </div>
          </div>
          <div className={"flex flex-col items-center space-y-2"}>
            <DeployToIpfs siteData={siteData} />
          </div>
        </>
      )}

      {page == pages[2] && (
        <>
          <div className={"flex flex-col items-center space-y-2"}>
            <DeletePage siteData={siteData} onComplete={onComplete} />
          </div>
        </>
      )}
    </GenericModal>
  );
}

const HeadUpdater = ({ siteData }) => {
  const [head, setHead] = React.useState(
    siteData.page?.head || {
      title: "My Dragd Page",
      description: "",
      keywords: "",
      image: "",
    }
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const updateSiteSubmit = async (newHead) => {
    setLoading(true);

    const updatedSite = {
      ...siteData,
      page: {
        ...siteData.page,
        head: { ...newHead, type: "head" },
      },
    };

    var query = updateSite(siteData._id, updatedSite);

    query.then((result) => {
      setError(null);
      setLoading(false);
    });
  };
  return (
    <>
      <label className="label w-full">
        <span className="label-text text-lg">Headers</span>
      </label>{" "}
      <KVPEditor
        initialObject={head}
        loading={loading}
        onSubmit={async (updatedObject) => {
          await updateSiteSubmit(updatedObject);
        }}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};

const ChangeTheme = () => {
  return (
    <>
      <button
        className="btn btn-sm btn-ghost btn-outline"
        onClick={() => {
          globalThis.showTemplatePicker();
        }}
      >
        Choose a new template
      </button>
    </>
  );
};

const accessModes = ["public", "private", "gated"];
const AccessControls = () => {
  const [access, setAccess] = useState("public");
  return (
    <>
      <label className="label w-full">
        <span className="label-text text-lg">Access Control</span>
      </label>{" "}
      <div className="w-full">
        {accessModes.map((item) => {
          return (
            <AccessOptions
              value={item}
              access={access}
              onChange={(value) => {
                setAccess(value);
              }}
            />
          );
        })}
      </div>
    </>
  );
};

const AccessOptions = ({ access, value, onChange }) => {
  return (
    <div
      className={"card border rounded flex flex-col p-2 my-2"}
      key={value}
      onClick={(e) => {
        if (value == access) return;
        e.preventDefault();
        e.stopPropagation();
        onChange(value);
      }}
    >
      <div className={"flex flex-row"}>
        <input
          type="radio"
          name={"access"}
          value={value}
          checked={value == access}
          onClick={(e) => {
            if (value == access) return;

            e.stopPropagation(); // Prevent the event from bubbling up
            onChange(value);
          }}
        />
        <div className={"flex px-2 capitalize text-left  text-slate-600"}>
          <label className={"font-bold w-14"}>{value}</label>
          <label className={"text-slate-600/50"}>
            {value == "public"
              ? "Anyone can view this page."
              : value == "private"
              ? "Only you can view this page."
              : "Set custom access controls."}
          </label>
        </div>
      </div>
      {value == "gated" && access == "gated" && (
        <div className="flex flex-col align-start">
          <label className="label">ERC721 Address</label>
          <input
            className="input input-sm input-bordered"
            placeholder="0x..."
            type="text"
          />
        </div>
      )}
    </div>
  );
};

const DevTools = ({ siteData }) => {
  const [showCode, setShowCode] = React.useState(false);

  return (
    <>
      <div className="w-full text-right">
        <button
          className={`rounded-sm ${showCode ? "bg-slate-300" : ""}`}
          onClick={() => setShowCode(!showCode)}
        >
          ⚙️
        </button>
      </div>
      {showCode && (
        <div className="mockup-code text-left w-full overflow-x-scroll">
          <pre className="max-h-60 overflow-y-scroll overflow-x-hidden ">
            {JSON.stringify(siteData, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
};

const DeletePage = ({ siteData, onComplete }) => {
  const [error, setError] = React.useState(null);
  const router = useRouter();
  const deleteSiteSubmit = async (id) => {
    var query = deleteSite({ id });
    query
      .then((result) => {
        router.push("/" + siteData.siteName);
        onComplete();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className={"flex flex-col items-center w-full mt-6"}>
      <span className="text-lg">
        Are you sure you want to delete {siteData.pageName}?
      </span>
      <span className="text-xs mb-6">
        It cannot be recovered in the editor.
      </span>

      <button
        className="btn btn-error w-36 mt-3 mb-5"
        onClick={(e) => {
          deleteSiteSubmit(siteData._id);
        }}
      >
        Delete Page
      </button>
      {error}
    </div>
  );
};
