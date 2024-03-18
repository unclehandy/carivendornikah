import React from 'react'
import { ArchiveIcon, ChevronRightIcon } from 'lucide-react'

export const MainMenu = () => {
    return (
      <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white">
        <ul className="overflow-y-auto pt-4">
          <div className="block hover:bg-gray-700 py-2 px-4 mb-1">
            <p className="text-white font-semibold">Performance</p>
          </div>
          <li className="block hover:bg-gray-700 py-2 px-4">
            <a href="/performance/analysis" className="text-white">
              Performance Analysis
              <ChevronRightIcon className="float-right ml-2 text-white" />
            </a>
          </li>
          <li className="block hover:bg-gray-700 py-2 px-4">
            <a href="/performance/video" className="text-white">
              Video Analysis
              <ChevronRightIcon className="float-right ml-2 text-white" />
            </a>
          </li>
          <div className="block hover:bg-gray-700 py-2 px-4 mt-1 mb-1">
            <p className="text-white font-semibold">Health & Wellness</p>
          </div>
          <li className="block hover:bg-gray-700 py-2 px-4">
            <a href="/health-and-wellness/injury-tracker" className="text-white">
              Injury Tracker
              <ChevronRightIcon className="float-right ml-2 text-white" />
            </a>
          </li>
          <li className="block hover:bg-gray-700 py-2 px-4">
            <a href="/health-and-wellness/nutrition-tracker" className="text-white">
              Nutrition Tracker
              <ChevronRightIcon className="float-right ml-2 text-white" />
            </a>
          </li>
        </ul>
      </div>
    )
  }