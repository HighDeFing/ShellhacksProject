import React from "react";
import { FaChevronUp, FaChevronDown, FaCircle } from "react-icons/fa";

const TeamTable = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Andrea Thompson",
      email: "andythompson@example.com",
      imageUrl: "/imgs/head-shots/1.jpg",
      rank: "1st",
      maxRank: "112th",
      status: "online",
      statusColor: "bg-green-200 text-green-800",
    },
    {
      id: 2,
      name: "Thomas Smith",
      email: "tsmith@example.com",
      imageUrl: "/imgs/head-shots/5.jpg",
      rank: "2nd",
      maxRank: "41st",
      status: "online",
      statusColor: "bg-green-200 text-green-800",
    },
    {
      id: 3,
      name: "John Anderson",
      email: "john.a@example.com",
      imageUrl: "/imgs/head-shots/2.jpg",
      rank: "3rd",
      maxRank: "9th",
      status: "offline",
      statusColor: "bg-yellow-200 text-yellow-800",
    },
    {
      id: 4,
      name: "Craig Peterson",
      email: "craigpeterson@example.com",
      imageUrl: "/imgs/head-shots/6.jpg",
      rank: "4th",
      maxRank: "1st",
      status: "online",
      statusColor: "bg-green-200 text-green-800",
    },
    {
      id: 5,
      name: "Jen Horowitz",
      email: "j.horowitz@example.com",
      imageUrl: "/imgs/head-shots/3.jpg",
      rank: "5th",
      maxRank: "9999th",
      status: "pending",
      statusColor: "bg-slate-200 text-slate-800",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl overflow-x-scroll rounded-lg bg-white shadow-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-slate-200 text-sm uppercase text-slate-400">
            <th className="w-8 pl-4"></th>
            <th className="p-4 text-start font-medium">Team Member</th>
            <th className="p-4 text-start font-medium">Rank</th>
            <th className="p-4 text-start font-medium">Max Rank</th>
            <th className="p-4 text-start font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr
              key={member.id}
              className={`text-sm ${index % 2 === 0 ? "bg-slate-100" : "bg-white"}`}
              style={{ opacity: 1 }}
            >
              <td className="w-8 pl-4 text-lg">
                <button className="hover:text-violet-600">
                  <FaChevronUp />
                </button>
                <button className="hover:text-violet-600">
                  <FaChevronDown />
                </button>
              </td>
              <td className="flex items-center gap-3 overflow-hidden p-4">
                <img
                  src={member.imageUrl}
                  alt={`${member.name} photo`}
                  className="h-10 w-10 shrink-0 rounded-full bg-slate-300 object-cover object-top"
                />
                <div>
                  <span className="mb-1 block font-medium">{member.name}</span>
                  <span className="block text-xs text-slate-500">
                    {member.email}
                  </span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2 font-medium text-violet-500">
                  <span>{member.rank}</span>
                  {member.rank === "1st" && <FaCircle className="text-xl" />}
                </div>
              </td>
              <td className="p-4 font-medium">{member.maxRank}</td>
              <td className="p-4">
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${member.statusColor}`}
                >
                  {member.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
