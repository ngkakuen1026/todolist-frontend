import React from 'react'

const TaskCategories = () => {
  return (
    <div className=''>
      <h1 className="text-4xl font-bold mb-8">Create New Task</h1>
      <form>
            <div className="mb-4">
              <label
                htmlFor="category-name"
                className="block font-bold mb-2"
              >
                Category Name
              </label>
              <input
                type="text"
                id="category-name"
                placeholder="Enter category name"
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500"
              >
                Create
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
    </div>
  )
}

export default TaskCategories
