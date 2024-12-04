// components/DepartmentGrid.js
import React from "react";

const DepartmentGrid = () => {
  // Mock Data
  const data = [
    {
      year: "Final Year (2022 - 2026)",
      departments: [
        { name: "ECE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-green-100" },
        { name: "CSE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-red-100" },
        { name: "EEE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-yellow-100" },
        { name: "Bio", count: 262, sections: ["A", "B", "C", "D"], color: "bg-blue-100" },
        { name: "MECH", count: 262, sections: ["A", "B", "C", "D"], color: "bg-yellow-200" },
      ],
    },
    {
      year: "Third Year (2023 - 2027)",
      departments: [
        { name: "ECE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-green-100" },
        { name: "CSE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-red-100" },
        { name: "EEE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-yellow-100" },
        { name: "Bio", count: 262, sections: ["A", "B", "C", "D"], color: "bg-blue-100" },
        { name: "MECH", count: 262, sections: ["A", "B", "C", "D"], color: "bg-yellow-200" },
        { name: "IT", count: 262, sections: ["A", "B", "C", "D"], color: "bg-green-200" },
      ],
    },
    {
      year: "Second Year (2024 - 2028)",
      departments: [
        { name: "ECE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-green-100" },
        { name: "CSE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-red-100" },
        { name: "EEE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-yellow-100" },
        { name: "Bio", count: 262, sections: ["A", "B", "C", "D"], color: "bg-blue-100" },
        { name: "MECH", count: 262, sections: ["A", "B", "C", "D"], color: "bg-yellow-200" },
        { name: "IT", count: 262, sections: ["A", "B", "C", "D"], color: "bg-green-200" },
      ],
    },
    {
      year: "First Year (2025 - 2029)",
      departments: [
        { name: "ECE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-green-100" },
        { name: "CSE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-red-100" },
        { name: "EEE", count: 262, sections: ["A", "B", "C", "D"], color: "bg-yellow-100" },
        { name: "Bio", count: 262, sections: ["A", "B", "C", "D"], color: "bg-blue-100" },
        { name: "MECH", count: 262, sections: ["A", "B", "C", "D"], color: "bg-yellow-200" },
        { name: "IT", count: 262, sections: ["A", "B", "C", "D"], color: "bg-green-200" },
      ],
    },
  ];

  return (
    <div className="p-4 space-y-8">
      {data.map((yearGroup, index) => (
        <div key={index}>
          <h2 className="text-xl font-bold text-gray-800 mb-4">{yearGroup.year}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {yearGroup.departments.map((dept, deptIndex) => {
              const studentsPerSection = Math.floor(dept.count / dept.sections.length);
              return (
                <div
                  key={deptIndex}
                  className={`p-4 border rounded-lg ${dept.color} shadow hover:shadow-lg transition`}
                >
                  <h3 className="font-semibold text-lg text-gray-700">{dept.name}</h3>
                  <p className="text-sm text-gray-500">Total: {dept.count}</p>
                  <div className="grid grid-cols-4 gap-2 mt-3 text-center text-gray-700">
                    {dept.sections.map((section, secIndex) => (
                      <div
                        key={secIndex}
                        className="p-2 bg-white rounded-md font-medium shadow-sm"
                      >
                        {section}
                        <div className="text-xs text-gray-500">
                          {studentsPerSection}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentGrid;
