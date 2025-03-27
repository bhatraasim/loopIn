import React from 'react';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

const people = [
  {
    name: 'Vishnu Kumar ',
    role: 'UX Designer at Divim Technology'
  },
  {
    name: 'Aman Verma',
    role: 'Frontend Developer at Google'
  },
  {
    name: 'Priya Sharma',
    role: 'Product Manager at Microsoft'
  },
];

function getInitials(name: string | undefined) {
    if (!name) return ""; // Return empty if name is undefined
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
  
function PeopleYouMightKnow() {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-96 mt-20">
      <h2 className="text-lg font-semibold mb-3">People you might know</h2>
      {people.map((person, index) => (
        <div key={index} className="flex items-center justify-between border-b py-3 last:border-b-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border bg-gray-300 flex items-center justify-center text-lg font-semibold text-white">
              {getInitials(person.name)}
            </div>
            <div>
              <p className="font-semibold">{person.name}</p>
              <p className="text-sm text-gray-500">{person.role}</p>
            </div>
          </div>
          <button className="flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 transition">
            <UserPlus size={16} /> Connect
          </button>
        </div>
      ))}
      <div className="text-center mt-3">
        <Link href="/network" className="text-blue-600 hover:underline"> View all recommendations →</Link>
      </div>
    </div>
  );
}

export default PeopleYouMightKnow;
