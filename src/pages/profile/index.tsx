import { ConstructionIcon } from "../../icons/constructionIcon";

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center flex flex-col items-center">
        <div className="mb-4 flex items-center justify-center">
          <ConstructionIcon style={{ width: 64, height: 64 }} fill="#baa398" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-brown">coming soon</h1>
        <p className="text-lg text-gray-700 max-w-xl">
          we are working on a new section with statistics and more data so you
          can have full control of your productivity and progress. stay tuned!
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
