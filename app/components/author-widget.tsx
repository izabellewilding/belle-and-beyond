// components/AuthorWidget.jsx

export const  AuthorWidget = () => {
    return (
      <div className=" bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-6">
        {/* Round Image */}
        <img
          src="/your-face.jpg" // Replace with your image path or URL
          alt="Author Face"
          className="w-42 h-42 rounded-full object-cover border-2 border-gray-300"
        />
  
        {/* Bullet Point Description */}
        <div className="text-gray-700 space-y-2 text-lg">
          Passionate tech writer
          10+ years in web development
         Enjoys sharing coding tutorials
         Hi I'm Izabelle! A photographer, artist, software engineer and newly appointed blogger!
        </div>
      </div>
    );
  }
  