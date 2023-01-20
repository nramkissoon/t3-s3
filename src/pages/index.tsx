import { type NextPage } from "next";
import { StandardDropzone } from "../components/StandardDropzone";
import { MultipartDropzone } from "../components/MultipartDropzone";
import type { RouterOutputs } from "../utils/api";
import { api } from "../utils/api";

// Lists the objects that have been uploaded to S3
const UploadedObjects = ({
  objects,
}: {
  objects: RouterOutputs["s3"]["getObjects"];
}) => {
  if (!objects || objects.length === 0)
    return <div>No objects uploaded yet.</div>;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Uploaded Objects</h2>
      {objects.map((object) => (
        <div key={object.Key}>
          <a
            href={`https://t3-app-dropzone-example.s3.amazonaws.com/${
              object.Key as string
            }`}
            target="_blank"
            rel="noreferrer"
          >
            {object.Key}
          </a>
        </div>
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = api.s3.getObjects.useQuery();

  return (
    <>
      <main className="dark h-full bg-zinc-900 p-10 text-zinc-50">
        <h1 className="mb-2 text-center text-xl font-semibold">
          create-t3-app dropzone examples with react-dropzone + axios + S3
          presigned URLs
        </h1>
        <p className="mb-8 text-center">
          Open DevTools to see logs and learn how these components work
        </p>
        <div className="flex justify-center gap-32">
          <StandardDropzone />
          <MultipartDropzone />
        </div>
        <div className="mt-12 flex justify-center">
          {!isLoading && data && <UploadedObjects objects={data} />}
        </div>
      </main>
    </>
  );
};

export default Home;
